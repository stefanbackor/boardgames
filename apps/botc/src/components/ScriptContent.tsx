import { Flex, Text } from '@radix-ui/themes'
import { Header } from '@/components/script/Header'
import { TeamSection } from '@/components/script/TeamSection'
import { NightFirstSetup } from '@/components/script/NightFirstSetup'
import { NightOtherSetup } from '@/components/script/NightOtherSetup'
import { PlayerCountTable } from '@/components/script/PlayerCountTable'
import { Footer } from '@/components/Footer'
import type { Role } from '@/types'
import type { PrintSections } from '@/components/PrintDropdown'
import { TEAM_CONFIG } from '@/constants'
import {
  isTeamOnPaper,
  type ScriptView,
  type TeamView,
} from '@/utils/scriptView'
import { useTranslation } from 'react-i18next'

/**
 * Props for the ScriptContent component
 */
interface ScriptContentProps {
  /** The script as players see it, see buildScriptView */
  view: ScriptView
  /** All available roles (translated) */
  roles: Role[]
  /** Print section visibility configuration */
  printSections: PrintSections
  /** Whether the script has been modified */
  scriptIsModified: boolean
  /** Whether to show the save button (script modified or not saved yet) */
  showSave?: boolean
  /** Whether the script is saved (has an ID) */
  isSaved?: boolean
  /** Handler to save changes */
  onSave: () => void
  /** Handler to revert changes */
  onRevert: () => void
  /** Handler to delete script */
  onDelete?: () => void
  /** Handler when script name changes */
  onNameChange: (name: string) => void
  /** Handler when author changes */
  onAuthorChange: (author: string) => void
  /** Handler to add a role */
  onAddRole: (role: Role) => void
  /** Handler to remove a role */
  onRemoveRole: (roleId: string) => void
  /** Handler to replace a role */
  onReplaceRole: (oldRoleId: string, newRole: Role) => void
  /** Handler to reorder roles */
  onReorderRoles: (team: string, fromIndex: number, toIndex: number) => void
  /** Handler when the homebrew rules change */
  onBootleggerRulesChange?: (rules: string[]) => void
}

/**
 * Component that renders the main script content when a script is loaded.
 * Displays roles organized by team, night order sheets, and player count table.
 *
 * @example
 * <ScriptContent
 *   view={view}
 *   roles={roles}
 *   printSections={printSections}
 *   scriptIsModified={scriptIsModified}
 *   onSave={handleSaveChanges}
 *   onRevert={handleRevertChanges}
 *   onNameChange={setName}
 *   onAuthorChange={setAuthor}
 *   onAddRole={handleAddRole}
 *   onRemoveRole={handleRemoveRole}
 *   onReplaceRole={handleReplaceRole}
 *   onReorderRoles={handleReorderRoles}
 * />
 */
export function ScriptContent({
  view,
  roles,
  printSections,
  scriptIsModified,
  showSave,
  isSaved,
  onSave,
  onRevert,
  onDelete,
  onNameChange,
  onAuthorChange,
  onAddRole,
  onRemoveRole,
  onReplaceRole,
  onReorderRoles,
  onBootleggerRulesChange,
}: ScriptContentProps) {
  const { t } = useTranslation()
  const [townsfolk, ...mainTeams] = view.pages.characters

  const teamSection = ({ team, roles: roleViews }: TeamView) => (
    <TeamSection
      key={team}
      team={team}
      teamColor={TEAM_CONFIG[team].color}
      columnsCount={TEAM_CONFIG[team].columns}
      roleViews={roleViews}
      allRoles={roles}
      existingRoleIds={view.roleIds}
      onAddRole={onAddRole}
      onRemoveRole={onRemoveRole}
      onReplaceRole={onReplaceRole}
      onReorderRoles={onReorderRoles}
      onBootleggerRulesChange={onBootleggerRulesChange}
    />
  )

  return (
    <Flex direction="column" gap="9">
      {/* Roles Section */}
      <Flex
        direction="column"
        className={!printSections.roles ? 'print-hide-roles' : ''}
      >
        <Flex direction="column" style={{ pageBreakInside: 'avoid' }}>
          <Header
            name={view.name}
            author={view.author}
            hasAuthor={view.hasAuthor}
            isModified={scriptIsModified}
            showSave={showSave}
            isSaved={isSaved}
            onSave={onSave}
            onRevert={onRevert}
            onDelete={onDelete}
            onNameChange={onNameChange}
            onAuthorChange={onAuthorChange}
          />
          {/* Render first team (townsfolk) without wrapper for proper page break handling */}
          {teamSection(townsfolk)}
        </Flex>
        {/* Render main teams (outsider, minion, demon) */}
        {mainTeams.map((teamView) => (
          <div key={teamView.team} style={{ pageBreakInside: 'avoid' }}>
            {teamSection(teamView)}
          </div>
        ))}
        <Flex mt="4" justify="end">
          <Text size="2" color="gray">
            {t('*Not the first night')}
          </Text>
        </Flex>
      </Flex>

      {/* Special Teams & Tables Section */}
      <Flex
        direction="column"
        gap="5"
        justify="start"
        align="stretch"
        className={!printSections.tables ? 'print-hide-tables' : ''}
        style={{
          minHeight: '100vh',
          pageBreakBefore: printSections.roles ? 'always' : 'auto',
          pageBreakInside: 'avoid',
        }}
      >
        {/* The editable header above stays on the roles page, so this one only shows on paper */}
        <div className="hidden print:block">
          <Header
            name={view.name}
            author={view.author}
            hasAuthor={view.hasAuthor}
          />
        </div>
        {/* An empty team stays on screen to be added to, but not on paper */}
        {view.pages.extras.map((teamView) => (
          <div
            key={teamView.team}
            className={isTeamOnPaper(teamView) ? '' : 'print:hidden'}
          >
            {teamSection(teamView)}
          </div>
        ))}

        {/* Player Count Table */}
        <PlayerCountTable />
      </Flex>

      {/* First Night Section */}
      <div
        className={!printSections.firstNight ? 'print-hide-first-night' : ''}
        style={{
          pageBreakBefore:
            printSections.roles || printSections.tables ? 'always' : 'auto',
        }}
      >
        <NightFirstSetup roles={view.roles} scriptName={view.name} />
      </div>

      {/* Other Nights Section */}
      <div
        className={!printSections.otherNights ? 'print-hide-other-nights' : ''}
        style={{
          pageBreakBefore:
            printSections.roles ||
            printSections.tables ||
            printSections.firstNight
              ? 'always'
              : 'auto',
        }}
      >
        <NightOtherSetup roles={view.roles} scriptName={view.name} />
        <Footer />
      </div>
    </Flex>
  )
}
