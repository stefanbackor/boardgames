import runpy
import unittest
from pathlib import Path


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


if __name__ == '__main__':
    unittest.main()
