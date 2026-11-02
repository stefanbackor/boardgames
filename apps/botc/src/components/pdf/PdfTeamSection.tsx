import { Text, View } from '@react-pdf/renderer'
import { Team, TEAM_CONFIG } from '@/constants'
import type { Role } from '@/types'
import { formatRoleDisplayName } from '@/utils/roleDisplayName'
import {
  getDjinnJinxes,
  getHatedByMap,
  type DjinnJinx,
  type JinxedBy,
} from '@/utils/scriptJinxes'
import { PdfRoleImage } from './PdfRoleImage'
import { PdfRuns } from './PdfRuns'
import {
  cssPx,
  PAGE_CONTENT_HEIGHT,
  ROLE_NAME_COLORS,
  styles,
} from './pdfStyles'
import { abilityRuns, balancedColumnSplit } from './pdfText'
import type { ScriptPdfData } from './ScriptPdfDocument'

/** Roughly what fits on a line of a card */
const CHARS_PER_LINE = 57

interface RoleCardProps {
  role: Role
  displayName: string
  hatedBy?: JinxedBy[]
  jinxes?: DjinnJinx[]
  rules?: string[]
}

interface PdfTeamSectionProps {
  team: Team
  data: ScriptPdfData
}

function RoleCard({
  role,
  displayName,
  hatedBy,
  jinxes,
  rules,
}: RoleCardProps) {
  return (
    <View style={styles.card} wrap={false}>
      <PdfRoleImage image={role.image} size={64} />
      <View style={styles.cardText}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: cssPx(4) }}
        >
          <Text
            style={[styles.roleName, { color: ROLE_NAME_COLORS[role.team] }]}
          >
            {displayName}
          </Text>
          {hatedBy?.map((hater) => (
            <PdfRoleImage
              key={hater.id}
              image={hater.image}
              size={20}
              clipped
            />
          ))}
        </View>
        <PdfRuns runs={abilityRuns(role.ability)} size={12} />
        {rules && rules.length > 0 && (
          <View style={styles.rules}>
            {rules.map((rule, index) => (
              <Text key={index} style={{ fontSize: cssPx(12) }}>
                • {rule}
              </Text>
            ))}
          </View>
        )}
        {jinxes && jinxes.length > 0 && (
          <View style={styles.rules}>
            {jinxes.map((jinx) => (
              <View key={jinx.id} style={styles.jinxRow}>
                <PdfRoleImage image={jinx.role1Image} size={24} clipped />
                <PdfRoleImage image={jinx.role2Image} size={24} clipped />
                <Text style={{ flex: 1, fontSize: cssPx(11) }}>
                  <Text style={{ fontSize: cssPx(12), fontWeight: 700 }}>
                    {jinx.name}
                  </Text>{' '}
                  {jinx.reason}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

/** How tall a card will come out in CSS pixels, for laying out a team */
const estimatedCardHeight = (role: Role, rules: string[]) => {
  const lines =
    Math.ceil((role.name.length + role.ability.length) / CHARS_PER_LINE) + 1
  const ruleLines = rules.reduce(
    (sum, rule) => sum + Math.ceil(rule.length / CHARS_PER_LINE),
    0,
  )
  return Math.max(80, 16 + lines * 15) + ruleLines * 16
}

/**
 * One team with its header. Like the printed sheet it moves to the next page
 * whole rather than split, unless it would not fit on any page.
 */
export function PdfTeamSection({ team, data }: PdfTeamSectionProps) {
  const teamRoles = data.roles.filter((role) => role.team === team)
  const hatedByMap = getHatedByMap(data.roles, data.jinxes)
  const djinnJinxes = getDjinnJinxes(data.roles, data.jinxes)

  const rulesFor = (role: Role) =>
    role.id === 'bootlegger' ? data.bootleggerRules.filter(Boolean) : []
  const card = (role: Role) => (
    <RoleCard
      key={role.id}
      role={role}
      displayName={formatRoleDisplayName(role, data.showEnglishNames)}
      hatedBy={hatedByMap.get(role.id)}
      jinxes={role.id === 'djinn' ? djinnJinxes : undefined}
      rules={rulesFor(role)}
    />
  )

  // The columns of the printed sheet: anything without its own count gets two
  const split =
    (TEAM_CONFIG[team].columns ?? 2) === 1
      ? teamRoles.length
      : balancedColumnSplit(
          teamRoles.map((role) => estimatedCardHeight(role, rulesFor(role))),
        )

  const columnHeight = (column: Role[]) =>
    column.reduce(
      (sum, role) => sum + estimatedCardHeight(role, rulesFor(role)),
      0,
    )
  const tallestColumn = Math.max(
    columnHeight(teamRoles.slice(0, split)),
    columnHeight(teamRoles.slice(split)),
  )

  return (
    <View wrap={cssPx(tallestColumn) >= PAGE_CONTENT_HEIGHT}>
      <View style={styles.teamHeader} minPresenceAhead={cssPx(80)}>
        <Text style={styles.teamLabel}>{data.labels.teams[team]}</Text>
        <View style={styles.rule} />
      </View>
      <View style={styles.columns}>
        <View style={styles.column}>{teamRoles.slice(0, split).map(card)}</View>
        {split < teamRoles.length && (
          <View style={styles.column}>{teamRoles.slice(split).map(card)}</View>
        )}
      </View>
    </View>
  )
}
