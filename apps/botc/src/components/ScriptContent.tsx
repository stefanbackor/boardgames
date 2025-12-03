import { Flex } from '@radix-ui/themes'
import { Header } from '@/components/script/Header'
import { TeamSection } from '@/components/script/TeamSection'
import { NightFirstSetup } from '@/components/script/NightFirstSetup'
import { NightOtherSetup } from '@/components/script/NightOtherSetup'
import { Footer } from '@/components/Footer'
import type { Role, ParsedRole } from '@/types'
import type { Jinx } from '@/types/jinx'
import type { PrintSections } from '@/components/PrintDropdown'
import { Team, TEAM_CONFIG } from '@/constants'

/**
 * Script metadata type
 */
interface ScriptMeta {
  name?: string
  author?: string
}

/**
 * Props for the ScriptContent component
 */
interface ScriptContentProps {
  /** Parsed roles with resolved data */
  scriptRoles: ParsedRole[]
  /** Display name for the script */
  displayScriptName: string
  /** Script metadata */
  meta: ScriptMeta | undefined
  /** All available roles (translated) */
  roles: Role[]
  /** Active jinx data for current language */
  activeJinxes: Jinx[]
  /** Set of existing role IDs in the script */
  existingRoleIds: Set<string>
  /** Print section visibility configuration */
  printSections: PrintSections
  /** Whether the script has been modified */
  scriptIsModified: boolean
  /** Handler to commit changes */
  onCommit: () => void
  /** Handler to revert changes */
  onRevert: () => void
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
  /** Function to get author from store */
  getAuthor: () => string | null
}

/**
 * Component that renders the main script content when a script is loaded.
 * Displays roles organized by team, night order sheets, and player count table.
 *
 * @example
 * <ScriptContent
 *   scriptRoles={scriptRoles}
 *   displayScriptName={displayScriptName}
 *   meta={meta}
 *   roles={roles}
 *   activeJinxes={activeJinxes}
 *   existingRoleIds={existingRoleIds}
 *   printSections={printSections}
 *   scriptIsModified={scriptIsModified}
 *   onCommit={handleCommitChanges}
 *   onRevert={handleRevertChanges}
 *   onNameChange={setName}
 *   onAuthorChange={setAuthor}
 *   onAddRole={handleAddRole}
 *   onRemoveRole={handleRemoveRole}
 *   onReplaceRole={handleReplaceRole}
 *   onReorderRoles={handleReorderRoles}
 *   getAuthor={getAuthor}
 * />
 */
export function ScriptContent({
  scriptRoles,
  displayScriptName,
  meta,
  roles,
  activeJinxes,
  existingRoleIds,
  printSections,
  scriptIsModified,
  onCommit,
  onRevert,
  onNameChange,
  onAuthorChange,
  onAddRole,
  onRemoveRole,
  onReplaceRole,
  onReorderRoles,
  getAuthor,
}: ScriptContentProps) {
  return (
    <Flex direction="column" gap="9">
      {/* Roles Section */}
      <Flex
        direction="column"
        className={!printSections.roles ? 'print-hide-roles' : ''}
      >
        <Flex direction="column" style={{ pageBreakInside: 'avoid' }}>
          <Header
            name={displayScriptName}
            author={getAuthor() || meta?.author || ''}
            isModified={scriptIsModified}
            onCommit={onCommit}
            onRevert={onRevert}
            onNameChange={onNameChange}
            onAuthorChange={onAuthorChange}
          />
          {/* Render first team (townsfolk) without wrapper for proper page break handling */}
          <TeamSection
            key={Team.Townsfolk}
            team={Team.Townsfolk}
            teamColor={TEAM_CONFIG[Team.Townsfolk].color}
            columnsCount={TEAM_CONFIG[Team.Townsfolk].columns}
            roles={scriptRoles.filter((role) => role.team === Team.Townsfolk)}
            allRoles={roles}
            existingRoleIds={existingRoleIds}
            onAddRole={onAddRole}
            onRemoveRole={onRemoveRole}
            onReplaceRole={onReplaceRole}
            onReorderRoles={onReorderRoles}
            scriptRoles={scriptRoles}
            jinxes={activeJinxes}
          />
        </Flex>
        {/* Render main teams (outsider, minion, demon) */}
        {[Team.Outsider, Team.Minion, Team.Demon].map((team) => {
          const teamRoles = scriptRoles.filter((role) => role.team === team)
          const config = TEAM_CONFIG[team]

          return (
            <div key={team} style={{ pageBreakInside: 'avoid' }}>
              <TeamSection
                team={team}
                teamColor={config.color}
                columnsCount={config.columns}
                roles={teamRoles}
                allRoles={roles}
                existingRoleIds={existingRoleIds}
                onAddRole={onAddRole}
                onRemoveRole={onRemoveRole}
                onReplaceRole={onReplaceRole}
                onReorderRoles={onReorderRoles}
                scriptRoles={scriptRoles}
                jinxes={activeJinxes}
              />
            </div>
          )
        })}
      </Flex>

      {/* Special Teams & Tables Section */}
      <Flex
        direction="column"
        gap="5"
        justify="start"
        align="stretch"
        className={!printSections.tables ? 'print-hide-tables' : ''}
        style={{
          height: '100vh',
          pageBreakBefore: printSections.roles ? 'always' : 'auto',
          pageBreakInside: 'avoid',
        }}
      >
        {[Team.Traveler, Team.Fabled, Team.Loric].map((team) => {
          const teamRoles = scriptRoles.filter((role) => role.team === team)
          const config = TEAM_CONFIG[team]
          const isEmpty = teamRoles.length === 0

          return (
            <div
              key={team}
              className={isEmpty && config.hideIfEmpty ? 'print:hidden' : ''}
            >
              <TeamSection
                team={team}
                teamColor={config.color}
                columnsCount={config.columns}
                roles={teamRoles}
                allRoles={roles}
                existingRoleIds={existingRoleIds}
                onAddRole={onAddRole}
                onRemoveRole={onRemoveRole}
                onReplaceRole={onReplaceRole}
                onReorderRoles={onReorderRoles}
                scriptRoles={scriptRoles}
                jinxes={activeJinxes}
              />
            </div>
          )
        })}
      </Flex>

      {/* First Night Section */}
      <div
        className={!printSections.firstNight ? 'print-hide-first-night' : ''}
        style={{
          pageBreakBefore:
            printSections.roles || printSections.tables ? 'always' : 'auto',
        }}
      >
        <NightFirstSetup roles={scriptRoles} scriptName={displayScriptName} />
      </div>

      {/* Other Nights Section */}
      <Flex
        direction="column"
        gap="5"
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
        <NightOtherSetup roles={scriptRoles} scriptName={displayScriptName} />
        <Footer />
      </Flex>
    </Flex>
  )
}
