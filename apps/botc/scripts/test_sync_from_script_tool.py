import contextlib
import difflib
import io
import json
import runpy
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


sync_script = runpy.run_path(str(Path(__file__).with_name('sync-from-script-tool.py')))


class ExtractRolesTests(unittest.TestCase):
    def test_ability_with_doubly_escaped_quotes(self):
        bundle = (
            '{"id":"lilmonsta","team":"demon","ability":"'
            "Each night, Minions choose who babysits Lil' Monsta & "
            r'\\"is the Demon\\". Each night*, a player might die. [+1 Minion]"}'
        )

        self.assertEqual(
            sync_script['extract_roles'](bundle)['lilmonsta']['ability'],
            "Each night, Minions choose who babysits Lil' Monsta & "
            '"is the Demon". Each night*, a player might die. [+1 Minion]',
        )


class ExtractNightOrderTests(unittest.TestCase):
    def setUp(self):
        self.first = ['dusk', 'minioninfo', 'demoninfo', 'dawn'] + [
            f'first{i}' for i in range(21)
        ]
        self.other = ['dusk', 'dawn'] + [f'other{i}' for i in range(21)]

    def test_split_string_format(self):
        first_ids = '.'.join(self.first)
        other_ids = '.'.join(self.other)
        bundle = (
            f'bZ={{firstNight:`{first_ids}`.split(`.`),'
            f'otherNight:`{other_ids}`.split(`.`)}}'
        )

        self.assertEqual(sync_script['extract_night_order'](bundle), {
            'firstNight': self.first,
            'otherNight': self.other,
        })

    def test_legacy_json_array_format(self):
        bundle = json.dumps({
            'firstNight': self.first,
            'otherNight': self.other,
        }, separators=(',', ':'))

        self.assertEqual(sync_script['extract_night_order'](bundle), {
            'firstNight': self.first,
            'otherNight': self.other,
        })


class SyncCliTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.root = Path(self.temp_dir.name)
        data_dir = self.root / 'src' / 'data'
        setup_dir = self.root / 'src' / 'components' / 'script'
        data_dir.mkdir(parents=True)
        setup_dir.mkdir(parents=True)

        self.roles_path = data_dir / 'roles.en.ts'
        self.roles_path.write_text(
            "export const roles = [\n"
            "  {\n"
            "    id: 'chef',\n"
            "    team: 'townsfolk',\n"
            "    edition: 'tb',\n"
            "    firstNight: 0,\n"
            "    otherNight: 0,\n"
            "    setup: false,\n"
            "    ability: 'Old ability',\n"
            "  },\n"
            "]\n"
        )
        self.jinxes_path = data_dir / 'jinxes.en.ts'
        self.jinxes_path.write_text('export const jinxes = []\n')
        self.first_path = setup_dir / 'NightFirstSetup.tsx'
        self.first_path.write_text(
            'const dusk = { firstNight: 1 }\n'
            'const dawn = { firstNight: 1 }\n'
        )
        self.other_path = setup_dir / 'NightOtherSetup.tsx'
        self.other_path.write_text(
            'const dusk = { otherNight: 1 }\n'
            'const dawn = { otherNight: 1 }\n'
        )
        self.output_dir = self.root / 'output'
        self.role_bundle = (
            '{"id":"chef","team":"townsfolk","edition":"tb","ability":"New ability"}'
        )
        self.night_order = {
            'firstNight': ['dusk', 'minioninfo', 'demoninfo', 'dawn'] + [
                f'first{i}' for i in range(21)
            ],
            'otherNight': ['dusk', 'dawn'] + [f'other{i}' for i in range(21)],
        }

    def split_bundle(self, night_order):
        fields = (
            f'{field}:`{".".join(ids)}`.split(`.`)'
            for field, ids in night_order.items()
        )
        return self.role_bundle + 'bZ={' + ','.join(fields) + '}'

    def run_sync(self, *args, bundle=None):
        if bundle is None:
            bundle = self.split_bundle(self.night_order)
        output = io.StringIO()
        with mock.patch.object(sys, 'argv', ['sync-from-script-tool.py', *args]), \
                mock.patch.dict(sync_script['main'].__globals__, {
                    'fetch_bundle': lambda: bundle,
                    'find_botc_root': lambda: str(self.root),
                    'resolve_wiki_icons': lambda _ids: {},
                }), contextlib.redirect_stdout(output):
            sync_script['main']()
        return output.getvalue()

    def test_dry_run_reports_changes_without_writing_files(self):
        original_files = {
            path: path.read_bytes()
            for path in (
                self.roles_path, self.jinxes_path, self.first_path, self.other_path
            )
        }

        output = self.run_sync('--dry-run')

        self.assertIn('roles.en.ts: 1 field updates', output)
        self.assertIn('jinxes.en.ts: would be regenerated', output)
        self.assertIn('Night sheet positions: 2 updates', output)
        self.assertIn('--- a/src/data/roles.en.ts', output)
        self.assertIn("-    ability: 'Old ability',", output)
        self.assertIn("+    ability: 'New ability',", output)
        self.assertIn('--- a/src/data/jinxes.en.ts', output)
        self.assertIn('--- a/src/components/script/NightFirstSetup.tsx', output)
        self.assertIn('--- a/src/components/script/NightOtherSetup.tsx', output)
        self.assertFalse(self.output_dir.exists())
        self.assertFalse((self.root / 'scripts' / 'output').exists())
        for path, original in original_files.items():
            self.assertEqual(path.read_bytes(), original)

    def test_dry_run_diffs_match_apply_output(self):
        original_files = {
            path: path.read_text()
            for path in (
                self.roles_path, self.jinxes_path, self.first_path, self.other_path
            )
        }
        preview = self.run_sync('--dry-run')

        self.run_sync('--apply', '--output-dir', str(self.output_dir))

        for path, original in original_files.items():
            relative_path = path.relative_to(self.root)
            expected_diff = ''.join(difflib.unified_diff(
                original.splitlines(keepends=True),
                path.read_text().splitlines(keepends=True),
                fromfile=f'a/{relative_path}',
                tofile=f'b/{relative_path}',
            ))
            self.assertTrue(expected_diff)
            self.assertIn(expected_diff, preview)

    def test_apply_writes_json_and_typescript_files(self):
        output = self.run_sync('--apply', '--output-dir', str(self.output_dir))

        self.assertIn("ability: 'New ability'", self.roles_path.read_text())
        self.assertTrue((self.output_dir / 'roles.json').exists())
        self.assertTrue((self.output_dir / 'jinxes.json').exists())
        self.assertTrue((self.output_dir / 'nightorder.json').exists())
        self.assertIn('const dawn = { firstNight: 4 }', self.first_path.read_text())
        self.assertIn('const dawn = { otherNight: 2 }', self.other_path.read_text())
        self.assertIn('Updating .ts files:', output)

    def test_jinx_generation_preserves_long_reason_layout(self):
        reason = 'A long jinx reason that should wrap like the existing file instead of causing formatting churn.'
        with contextlib.redirect_stdout(io.StringIO()):
            sync_script['generate_jinxes_ts'](
                str(self.root),
                {'chef': [{'id': 'baron', 'reason': reason}]},
            )

        self.assertIn(
            f"        reason:\n          '{reason}',",
            self.jinxes_path.read_text(),
        )

    def test_no_flag_exports_json_without_changing_typescript(self):
        original_roles = self.roles_path.read_text()

        self.run_sync('--output-dir', str(self.output_dir))

        self.assertTrue((self.output_dir / 'roles.json').exists())
        self.assertEqual(self.roles_path.read_text(), original_roles)

    def test_dry_run_cannot_be_combined_with_apply_or_output_dir(self):
        for args in (
            ('--dry-run', '--apply'),
            ('--dry-run', '--output-dir', str(self.output_dir)),
        ):
            with self.subTest(args=args), mock.patch.object(sys, 'argv', ['sync-from-script-tool.py', *args]), \
                    contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as error:
                sync_script['main']()
            self.assertEqual(error.exception.code, 2)
        self.assertFalse(self.output_dir.exists())

    def test_missing_night_order_aborts_every_mode_before_writing(self):
        original_files = {
            path: path.read_bytes()
            for path in (
                self.roles_path, self.jinxes_path, self.first_path, self.other_path
            )
        }
        modes = (
            (),
            ('--dry-run',),
            ('--apply', '--output-dir', str(self.output_dir)),
        )
        for mode in modes:
            for missing_field in self.night_order:
                with self.subTest(mode=mode, missing_field=missing_field):
                    partial_order = {
                        field: order
                        for field, order in self.night_order.items()
                        if field != missing_field
                    }
                    bundle = self.split_bundle(partial_order)
                    errors = io.StringIO()
                    with contextlib.redirect_stderr(errors), \
                            self.assertRaises(SystemExit) as error:
                        self.run_sync(*mode, bundle=bundle)
                    self.assertEqual(error.exception.code, 1)
                    self.assertIn(missing_field, errors.getvalue())
                    self.assertFalse(self.output_dir.exists())
                    self.assertFalse((self.root / 'scripts' / 'output').exists())
                    for path, original in original_files.items():
                        self.assertEqual(path.read_bytes(), original)

    def test_invalid_night_order_aborts_before_writing(self):
        invalid_orders = (
            {'firstNight': ['dusk', 'dawn'], 'otherNight': self.night_order['otherNight']},
            {
                'firstNight': self.night_order['firstNight'],
                'otherNight': ['dusk', 'dusk', 'dawn'] + [f'other{i}' for i in range(21)],
            },
            {
                'firstNight': self.night_order['firstNight'],
                'otherNight': [f'other{i}' for i in range(21)],
            },
        )
        for night_order in invalid_orders:
            with self.subTest(night_order=night_order):
                bundle = self.split_bundle(night_order)
                with contextlib.redirect_stderr(io.StringIO()), \
                        self.assertRaises(SystemExit) as error:
                    self.run_sync('--apply', bundle=bundle)
                self.assertEqual(error.exception.code, 1)
                self.assertFalse((self.root / 'scripts' / 'output').exists())
                self.assertIn("ability: 'Old ability'", self.roles_path.read_text())


if __name__ == '__main__':
    unittest.main()
