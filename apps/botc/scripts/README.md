# BOTC Data Sync Scripts

## Data source

The official BOTC script tool at `script.bloodontheclocktower.com` is a static
client-side app. The complete game database (roles, jinxes, night order) is
embedded in its JavaScript bundle — no API or authentication required.

The bundle URL changes when the tool is updated (hash in filename), but the
extraction script handles this automatically by parsing the HTML page first.

## sync-from-script-tool.py

Extracts role data, jinx data, and night order from the official script tool
bundle. Can output JSON for inspection or update the local TypeScript files
in-place.

### Usage

```sh
cd apps/botc

# JSON output only (for inspection)
python3 scripts/sync-from-script-tool.py

# Preview what would change in the .ts files
python3 scripts/sync-from-script-tool.py --dry-run

# Update .ts files in-place
python3 scripts/sync-from-script-tool.py --apply
```

### What `--apply` updates

- **`src/data/roles.en.ts`** — Abilities, night reminders, setup flags, night
  order numbers, and image URLs. Updates existing roles in-place, preserving
  local-only fields like `source`. Adds new roles that exist in the bundle
  but are missing locally, inserting them into the correct team section.
  Image URLs are resolved from the BOTC wiki via the MediaWiki API (higher
  quality 591x591 PNGs). Cleans reminder text (`:reminder:` → `⏺`, strips
  `*UPPERCASE*` markers).
- **`src/data/jinxes.en.ts`** — Fully regenerated from the bundle data.
- **`src/components/script/NightFirstSetup.tsx`** — Hardcoded positions for
  dusk, dawn, minioninfo, demoninfo.
- **`src/components/script/NightOtherSetup.tsx`** — Same for other nights.

### What it does NOT update

- **Translation overrides** — Only updates the English data files.

### JSON output

Always written to `scripts/output/` (gitignored):

- `roles.json` — All roles with full metadata
- `jinxes.json` — Jinx pairs grouped by top-level role
- `nightorder.json` — Canonical firstNight and otherNight sequences

### Known quirks

- **Field order varies** between role objects in the bundle — the extraction
  script handles this by searching for each field individually.
- **Escaped quotes**: The bundle uses `\'` inside double-quoted strings.
- **Night order numbering**: The official order includes special entries
  (dusk, dawn, minioninfo, demoninfo) in the sequence. The `--apply` flag
  updates both role numbers and the hardcoded night sheet positions.
- **Wiki icon URLs**: Resolved via the MediaWiki API at
  `wiki.bloodontheclocktower.com/api.php`. Most icons follow the naming
  convention `Icon_{id}.png`, but a few exceptions (e.g. `bigwig` →
  `big_wig`) are handled via a lookup table in the script. The wiki icons
  are 591x591 PNG (higher quality than the script tool's 400x400 WebP).
- **Reminder text tokens**: The bundle uses `:reminder:` (placeholder for a
  reminder token icon) and `*UPPERCASE TEXT*` (bold formatting). The script
  cleans these when applying: `:reminder:` becomes `⏺` and `*` markers are
  stripped (the `formatReminder` function already bolds uppercase text).
