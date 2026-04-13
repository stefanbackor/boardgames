#!/usr/bin/env python3
"""
Extract role data, jinx data, and night order from the official BOTC script tool,
and optionally update the local TypeScript data files in-place.

The official script tool at script.bloodontheclocktower.com is a static client-side
app with the complete game database embedded in its JavaScript bundle. This script
fetches the bundle, extracts the data, and can either output JSON or update the
local .ts files directly.

Usage:
    python3 scripts/sync-from-script-tool.py              # JSON output only
    python3 scripts/sync-from-script-tool.py --apply       # Update .ts files in-place
    python3 scripts/sync-from-script-tool.py --dry-run     # Show what would change
"""

import argparse
import json
import os
import re
import sys
import urllib.request

SCRIPT_TOOL_URL = 'https://script.bloodontheclocktower.com'
WIKI_API_URL = 'https://wiki.bloodontheclocktower.com/api.php'

# Role IDs where the wiki icon filename doesn't match the role ID
WIKI_ICON_OVERRIDES = {
    'bigwig': 'big_wig',
}

# Paths relative to apps/botc/
ROLES_TS = 'src/data/roles.en.ts'
JINXES_TS = 'src/data/jinxes.en.ts'
NIGHT_FIRST_TSX = 'src/components/script/NightFirstSetup.tsx'
NIGHT_OTHER_TSX = 'src/components/script/NightOtherSetup.tsx'


def find_botc_root():
    """Find the apps/botc directory by walking up from the script location."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Script is in apps/botc/scripts/
    botc_root = os.path.dirname(script_dir)
    if os.path.exists(os.path.join(botc_root, 'src', 'data', 'roles.en.ts')):
        return botc_root
    # Try from cwd
    for candidate in ['apps/botc', '.']:
        if os.path.exists(os.path.join(candidate, 'src', 'data', 'roles.en.ts')):
            return candidate
    print('ERROR: Could not find apps/botc directory', file=sys.stderr)
    sys.exit(1)


def fetch_bundle():
    """Fetch the HTML page and find + download the JS module bundle."""
    print('Fetching script tool page...')
    with urllib.request.urlopen(SCRIPT_TOOL_URL) as resp:
        html = resp.read().decode()

    # Find the module script tag (e.g. <script type=module src=/workspace.3c82003c.js defer>)
    # Attributes may or may not be quoted
    match = re.search(r'<script\s+type=(?:")?module(?:")?\s+src=(?:")?(/workspace\.[a-f0-9]+\.js)', html)
    if not match:
        # Fallback: src before type
        match = re.search(r'<script\s+src=(?:")?(/workspace\.[a-f0-9]+\.js)(?:")?\s+type=(?:")?module', html)
    if not match:
        print('ERROR: Could not find module bundle URL in HTML', file=sys.stderr)
        sys.exit(1)

    bundle_path = match.group(1)
    bundle_url = f'{SCRIPT_TOOL_URL}{bundle_path}'
    print(f'Downloading bundle: {bundle_path}')
    with urllib.request.urlopen(bundle_url) as resp:
        return resp.read().decode()


def extract_roles(content):
    """Extract role objects from the bundle by finding balanced brace blocks."""
    roles = {}
    for m in re.finditer(r'\{"id":"([a-z_]+)"', content):
        rid = m.group(1)
        start = m.start()

        # Find balanced closing brace
        depth = 0
        end = start
        for i in range(start, min(start + 3000, len(content))):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
            if depth == 0:
                end = i + 1
                break

        obj_str = content[start:end]

        # Only process role-like objects (have "team" and "ability" fields)
        if '"team"' not in obj_str or '"ability"' not in obj_str:
            continue

        def get_str(name, s=obj_str):
            m = re.search(rf'"{name}":"((?:\\.|[^"])*?)"', s)
            return m.group(1).replace("\\'", "'").replace('\\"', '"') if m else ''

        def get_bool(name, s=obj_str):
            m = re.search(rf'"{name}":(true|false)', s)
            return m.group(1) == 'true' if m else False

        def get_num(name, s=obj_str):
            m = re.search(rf'"{name}":(\d+)', s)
            return int(m.group(1)) if m else 0

        def get_str_array(name, s=obj_str):
            m = re.search(rf'"{name}":\[([^\]]*)\]', s)
            if not m:
                return []
            return re.findall(r'"((?:\\.|[^"])*?)"', m.group(1))

        roles[rid] = {
            'id': rid,
            'name': get_str('name'),
            'edition': get_str('edition'),
            'team': get_str('team'),
            'ability': get_str('ability'),
            'flavor': get_str('flavor'),
            'setup': get_bool('setup'),
            'reminders': get_str_array('reminders'),
            'remindersGlobal': get_str_array('remindersGlobal'),
            'firstNight': get_num('firstNight'),
            'otherNight': get_num('otherNight'),
            'firstNightReminder': get_str('firstNightReminder'),
            'otherNightReminder': get_str('otherNightReminder'),
        }

    return roles


def extract_jinxes(content):
    """Extract jinx pairs from the bundle."""
    jinxes = {}
    for m in re.finditer(r'\{"id":"([a-z_]+)","jinx":\[(.*?)\]\}', content):
        hater_id = m.group(1)
        jinx_block = m.group(2)
        targets = []
        for t in re.finditer(r'\{"id":"([a-z_]+)","reason":"((?:\\.|[^"])*?)"', jinx_block):
            reason = t.group(2).replace("\\'", "'").replace('\\"', '"')
            targets.append({'id': t.group(1), 'reason': reason})
        if targets:
            jinxes[hater_id] = targets

    return jinxes


def extract_night_order(content):
    """Extract the canonical night order arrays."""
    result = {}
    for field in ['firstNight', 'otherNight']:
        matches = re.findall(rf'"{field}":\[([^\]]+)\]', content)
        # Find the large array (the canonical order, not per-role values)
        for match in matches:
            ids = re.findall(r'"([^"]+)"', match)
            if len(ids) > 20:  # Night order has many entries
                result[field] = ids
                break

    return result


def resolve_wiki_icons(role_ids):
    """Resolve wiki image URLs for a list of role IDs via the MediaWiki API.

    Returns a dict of role_id -> image_url. Roles whose icons cannot be
    found are omitted from the result.
    """
    resolved = {}
    ids = list(role_ids)

    # Batch in groups of 50 (MediaWiki API limit)
    for i in range(0, len(ids), 50):
        batch = ids[i:i + 50]
        titles = '|'.join(
            f'File:Icon_{WIKI_ICON_OVERRIDES.get(rid, rid)}.png'
            for rid in batch
        )
        params = (
            f'?action=query&titles={titles}'
            f'&prop=imageinfo&iiprop=url&format=json'
        )
        req = urllib.request.Request(
            WIKI_API_URL + params,
            headers={'User-Agent': 'BOTC-Sync-Script/1.0'},
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())

        # Map normalized titles back to role IDs
        normalize_map = {}
        for n in data.get('query', {}).get('normalized', []):
            normalize_map[n['to']] = n['from']

        # Build reverse map: wiki filename (with underscores) -> role ID
        reverse_overrides = {v: k for k, v in WIKI_ICON_OVERRIDES.items()}

        for page in data.get('query', {}).get('pages', {}).values():
            title = page['title']
            if 'imageinfo' not in page:
                continue
            # Extract wiki name: "File:Icon big wig.png" -> "big_wig"
            wiki_name = title.replace('File:Icon ', '').replace('.png', '').replace(' ', '_')
            # Map back to role ID (check overrides first, then use as-is)
            rid = reverse_overrides.get(wiki_name, wiki_name)
            resolved[rid] = page['imageinfo'][0]['url']

    missing = set(ids) - set(resolved.keys())
    if missing:
        print(f'  Warning: no wiki icon for: {", ".join(sorted(missing))}')

    return resolved


def clean_reminder(text):
    """Clean up reminder text tokens from the bundle format."""
    # Replace :reminder: with ⏺
    text = text.replace(':reminder:', '⏺')
    # Strip *UPPERCASE* markers (formatReminder already bolds uppercase)
    text = re.sub(r'\*([A-Z][A-Z\s\']*[A-Z])\*', r'\1', text)
    return text


# --- In-place update functions ---

def update_roles_ts(botc_root, roles, night_order, dry_run=False):
    """Update roles.en.ts in-place with data from the bundle."""
    path = os.path.join(botc_root, ROLES_TS)
    with open(path) as f:
        text = f.read()

    # Build night order position maps
    fn_pos = {rid: i + 1 for i, rid in enumerate(night_order.get('firstNight', []))}
    on_pos = {rid: i + 1 for i, rid in enumerate(night_order.get('otherNight', []))}

    changes = 0

    for rid, bdata in roles.items():
        role_match = re.search(rf"id: '{rid}'", text)
        if not role_match:
            continue

        role_start = role_match.start()
        next_obj = text.find('\n  {', role_start)
        if next_obj == -1:
            next_obj = len(text)

        section = text[role_start:next_obj]
        new_section = section

        # Update string fields
        for field in ['firstNightReminder', 'otherNightReminder', 'ability']:
            bval = clean_reminder(bdata[field])
            if not bval:
                continue

            pattern = rf"({field}:\s*\n?\s*)(['\"])((?:\\.|(?!\2).)*?)\2"
            m = re.search(pattern, new_section, re.DOTALL)
            if not m:
                continue

            prefix = m.group(1)
            quote = m.group(2)
            current_val = m.group(3)

            # Unescape for comparison
            if quote == "'":
                current_unescaped = current_val.replace("\\'", "'")
                bval_escaped = bval.replace("'", "\\'")
            else:
                current_unescaped = current_val.replace('\\"', '"')
                bval_escaped = bval.replace('"', '\\"')

            if current_unescaped != bval:
                old = m.group(0)
                new = f"{prefix}{quote}{bval_escaped}{quote}"
                new_section = new_section.replace(old, new, 1)
                changes += 1

        # Update image URL (wiki icons)
        bimage = bdata.get('image', '')
        if bimage:
            img_pattern = r"(image:\s*\n?\s*)(['\"])((?:\\.|(?!\2).)*?)\2"
            img_m = re.search(img_pattern, new_section, re.DOTALL)
            if img_m:
                current_img = img_m.group(3)
                if current_img != bimage:
                    old = img_m.group(0)
                    new_section = new_section.replace(old, f"{img_m.group(1)}'{bimage}'", 1)
                    changes += 1

        # Update setup flag
        bsetup = 'true' if bdata['setup'] else 'false'
        setup_m = re.search(r'(setup:\s*)(true|false)', new_section)
        if setup_m and setup_m.group(2) != bsetup:
            new_section = new_section.replace(setup_m.group(0), f"{setup_m.group(1)}{bsetup}", 1)
            changes += 1

        # Update team and edition
        for field in ['team', 'edition']:
            bundle_val = bdata[field]
            pat = re.search(rf"({field}:\s*)'([^']*)'", new_section)
            if pat and pat.group(2) != bundle_val:
                old_val = pat.group(2)
                new_section = new_section.replace(pat.group(0), f"{pat.group(1)}'{bundle_val}'", 1)
                changes += 1
                if field == 'team':
                    print(f'  Note: {rid} team changed from {old_val} to {bundle_val}')

        # Update night order numbers
        official_fn = fn_pos.get(rid, 0)
        fn_m = re.search(r'(firstNight:\s*)(\d+)', new_section)
        if fn_m and int(fn_m.group(2)) != official_fn:
            new_section = new_section.replace(fn_m.group(0), f"{fn_m.group(1)}{official_fn}", 1)
            changes += 1

        official_on = on_pos.get(rid, 0)
        on_m = re.search(r'(otherNight:\s*)(\d+)', new_section)
        if on_m and int(on_m.group(2)) != official_on:
            new_section = new_section.replace(on_m.group(0), f"{on_m.group(1)}{official_on}", 1)
            changes += 1

        if new_section != section:
            text = text[:role_start] + new_section + text[next_obj:]

    # Find roles in the bundle that are missing from the local file
    local_ids = set(re.findall(r"id:\s*'([^']+)'", text))
    new_roles = {rid: bdata for rid, bdata in roles.items() if rid not in local_ids}

    if new_roles:
        # Group new roles by team and insert each into the correct section
        # Team ordering in the file (used to find insertion points)
        team_order = ['townsfolk', 'outsider', 'minion', 'demon',
                      'traveler', 'traveller', 'loric', 'fabled']

        for rid, bdata in sorted(new_roles.items()):
            team = bdata['team']
            # Normalize traveller spelling
            search_team = 'traveler' if team == 'traveller' else team

            # Find the last role of this team to insert after
            team_pattern = rf"team:\s*'{search_team}'"
            team_matches = list(re.finditer(team_pattern, text))
            if not team_matches:
                # Try alternate spelling
                alt = 'traveller' if search_team == 'traveler' else search_team
                team_matches = list(re.finditer(rf"team:\s*'{alt}'", text))

            if team_matches:
                # Insert after the last role of this team
                last_match = team_matches[-1]
                # Find the end of this role object
                insert_after = text.find('\n  {', last_match.start())
                if insert_after == -1:
                    insert_after = text.rfind(']')
            else:
                # Append before the closing bracket
                insert_after = text.rfind(']')

            entry = generate_role_entry(bdata)
            text = text[:insert_after] + entry + text[insert_after:]
            changes += 1

    # Warn about roles in local file that are not in the bundle
    removed_roles = local_ids - set(roles.keys())
    if removed_roles:
        print(f'  Warning: {len(removed_roles)} local role(s) not in official data:')
        for rid in sorted(removed_roles):
            print(f'    - {rid}')
        print('  These may have been removed upstream, or are custom additions.')

    if dry_run:
        if new_roles:
            print(f'  roles.en.ts: {changes} updates ({len(new_roles)} new roles)')
        else:
            print(f'  roles.en.ts: {changes} field updates')
    else:
        with open(path, 'w') as f:
            f.write(text)
        if new_roles:
            print(f'  Updated {path}: {changes} updates ({len(new_roles)} new roles)')
        else:
            print(f'  Updated {path}: {changes} field updates')

    return changes


def generate_role_entry(role):
    """Generate a TypeScript role object entry from extracted role data."""
    def ts_str(val):
        """Escape a string for TypeScript single quotes."""
        if not val:
            return "''"
        escaped = val.replace("'", "\\'")
        return f"'{escaped}'"

    def ts_str_array(arr):
        if not arr:
            return '[]'
        items = ', '.join(ts_str(v) for v in arr)
        return f'[{items}]'

    image = role.get('image', '')
    reminder_fields = []

    lines = [
        "\n  {",
        f"    id: {ts_str(role['id'])},",
        f"    name: {ts_str(role['name'])},",
    ]
    if image:
        lines.append(f"    image:")
        lines.append(f"      {ts_str(image)},")
    lines.extend([
        f"    edition: {ts_str(role.get('edition', ''))},",
        f"    team: {ts_str(role['team'])},",
        f"    firstNight: {role.get('firstNight', 0)},",
        f"    firstNightReminder:",
        f"      {ts_str(clean_reminder(role.get('firstNightReminder', '')))},",
        f"    otherNight: {role.get('otherNight', 0)},",
        f"    otherNightReminder:",
        f"      {ts_str(clean_reminder(role.get('otherNightReminder', '')))},",
        f"    reminders: {ts_str_array(role.get('reminders', []))},",
        f"    remindersGlobal: {ts_str_array(role.get('remindersGlobal', []))},",
        f"    setup: {'true' if role.get('setup') else 'false'},",
        f"    ability:",
        f"      {ts_str(clean_reminder(role.get('ability', '')))},",
    ])
    flavor = role.get('flavor', '')
    if flavor:
        lines.append(f"    flavor:")
        lines.append(f"      {ts_str(flavor)},")
    lines.append("  },")

    return '\n'.join(lines)


def generate_jinxes_ts(botc_root, jinxes, dry_run=False):
    """Regenerate jinxes.en.ts from bundle data."""
    path = os.path.join(botc_root, JINXES_TS)

    lines = ["import { Jinx } from '@/types/jinx'", "", "export const jinxes: Array<Jinx> = ["]

    for hater_id in sorted(jinxes.keys()):
        targets = jinxes[hater_id]
        lines.append("  {")
        lines.append(f"    id: '{hater_id}',")
        lines.append("    hatred: [")
        for target in targets:
            reason = target['reason'].replace("'", "\\'")
            lines.append("      {")
            lines.append(f"        id: '{target['id']}',")
            # Use double quotes if the reason contains apostrophes for readability
            if "\\'" in reason:
                reason_dq = target['reason'].replace('"', '\\"')
                lines.append(f'        reason: "{reason_dq}",')
            else:
                lines.append(f"        reason: '{reason}',")
            lines.append("      },")
        lines.append("    ],")
        lines.append("  },")

    lines.append("]")
    lines.append("")

    new_content = "\n".join(lines)

    if dry_run:
        # Compare with existing
        with open(path) as f:
            old_content = f.read()
        if old_content != new_content:
            print(f'  jinxes.en.ts: would be regenerated')
        else:
            print(f'  jinxes.en.ts: no changes')
    else:
        with open(path, 'w') as f:
            f.write(new_content)
        print(f'  Updated {path}')


def update_night_positions(botc_root, night_order, dry_run=False):
    """Update hardcoded special entry positions in NightFirstSetup.tsx and NightOtherSetup.tsx."""
    fn_order = night_order.get('firstNight', [])
    on_order = night_order.get('otherNight', [])

    # Build position maps
    fn_pos = {rid: i + 1 for i, rid in enumerate(fn_order)}
    on_pos = {rid: i + 1 for i, rid in enumerate(on_order)}

    changes = 0

    # NightFirstSetup.tsx: dusk, minioninfo, demoninfo, dawn
    first_path = os.path.join(botc_root, NIGHT_FIRST_TSX)
    with open(first_path) as f:
        first_text = f.read()

    updates = {
        # (variable name pattern, field, official id)
        (r"(const dusk = \{[^}]*firstNight:\s*)(\d+)", 'dusk'),
        (r"(const dawn = \{[^}]*firstNight:\s*)(\d+)", 'dawn'),
        (r"(const minionInfo = \{[^}]*firstNight:\s*)(\d+)", 'minioninfo'),
        (r"(const demonInfo = \{[^}]*firstNight:\s*)(\d+)", 'demoninfo'),
    }

    for pattern, official_id in updates:
        m = re.search(pattern, first_text, re.DOTALL)
        if m:
            official_val = fn_pos.get(official_id, 0)
            if official_val and int(m.group(2)) != official_val:
                first_text = first_text[:m.start(2)] + str(official_val) + first_text[m.end(2):]
                changes += 1

    if not dry_run:
        with open(first_path, 'w') as f:
            f.write(first_text)

    # NightOtherSetup.tsx: dusk, dawn
    other_path = os.path.join(botc_root, NIGHT_OTHER_TSX)
    with open(other_path) as f:
        other_text = f.read()

    other_updates = {
        (r"(const dusk = \{[^}]*otherNight:\s*)(\d+)", 'dusk'),
        (r"(const dawn = \{[^}]*otherNight:\s*)(\d+)", 'dawn'),
    }

    for pattern, official_id in other_updates:
        m = re.search(pattern, other_text, re.DOTALL)
        if m:
            official_val = on_pos.get(official_id, 0)
            if official_val and int(m.group(2)) != official_val:
                other_text = other_text[:m.start(2)] + str(official_val) + other_text[m.end(2):]
                changes += 1

    if not dry_run:
        with open(other_path, 'w') as f:
            f.write(other_text)

    label = 'would update' if dry_run else 'Updated'
    if changes:
        print(f'  Night sheet positions: {changes} updates')
    else:
        print(f'  Night sheet positions: no changes')

    return changes


def write_json_output(output_dir, roles, jinxes, night_order):
    """Write extracted data as JSON files."""
    os.makedirs(output_dir, exist_ok=True)

    roles_path = os.path.join(output_dir, 'roles.json')
    with open(roles_path, 'w') as f:
        json.dump(roles, f, indent=2, ensure_ascii=False)
    print(f'  Wrote {roles_path}')

    jinxes_path = os.path.join(output_dir, 'jinxes.json')
    with open(jinxes_path, 'w') as f:
        json.dump(jinxes, f, indent=2, ensure_ascii=False)
    print(f'  Wrote {jinxes_path}')

    nightorder_path = os.path.join(output_dir, 'nightorder.json')
    with open(nightorder_path, 'w') as f:
        json.dump(night_order, f, indent=2, ensure_ascii=False)
    print(f'  Wrote {nightorder_path}')


def main():
    parser = argparse.ArgumentParser(description='Extract BOTC data from the official script tool')
    parser.add_argument('--output-dir', default=None,
                        help='Output directory for JSON files (default: scripts/output)')
    parser.add_argument('--apply', action='store_true',
                        help='Update the local .ts files in-place')
    parser.add_argument('--dry-run', action='store_true',
                        help='Show what would change without writing files')
    args = parser.parse_args()

    content = fetch_bundle()
    print(f'Bundle size: {len(content):,} bytes')

    # Extract data
    roles = extract_roles(content)
    print(f'Extracted {len(roles)} roles')

    jinxes = extract_jinxes(content)
    total_pairs = sum(len(v) for v in jinxes.values())
    print(f'Extracted {len(jinxes)} jinx entries ({total_pairs} pairs)')

    night_order = extract_night_order(content)
    for field, order in night_order.items():
        print(f'Extracted {field} order: {len(order)} entries')

    # Resolve wiki icon URLs
    print('Resolving wiki icon URLs...')
    wiki_icons = resolve_wiki_icons(roles.keys())
    print(f'Resolved {len(wiki_icons)}/{len(roles)} wiki icon URLs')

    # Add image URLs to role data
    for rid, url in wiki_icons.items():
        if rid in roles:
            roles[rid]['image'] = url

    print()

    # Always write JSON output
    botc_root = find_botc_root()
    output_dir = args.output_dir or os.path.join(botc_root, 'scripts', 'output')
    print('Writing JSON output:')
    write_json_output(output_dir, roles, jinxes, night_order)

    # Optionally update .ts files
    if args.apply or args.dry_run:
        action = 'Dry run' if args.dry_run else 'Updating .ts files'
        print(f'\n{action}:')
        update_roles_ts(botc_root, roles, night_order, dry_run=args.dry_run)
        generate_jinxes_ts(botc_root, jinxes, dry_run=args.dry_run)
        update_night_positions(botc_root, night_order, dry_run=args.dry_run)

        if not args.dry_run:
            print('\nDone. Review the changes with `git diff` before committing.')


if __name__ == '__main__':
    main()
