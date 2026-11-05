import { useState } from 'react'
import { Flex, Badge, Separator, IconButton, Box } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import type { Role } from '@/types'
import { Team, type TeamColor } from '@/constants'
import { useTeamLabels } from '@/hooks/useTeamLabels'
import { RoleCard } from './RoleCard'
import { AddRoleModal } from './AddRoleModal'
import { useAddRoleModalStore } from '@/stores/addRoleModalStore'
import type { LockReason, RoleView } from '@/utils/scriptView'

interface TeamSectionProps {
  team: Team
  teamColor: TeamColor
  /** The team's characters with their annotations, see buildScriptView */
  roleViews: RoleView[]
  /**
   * Number of columns for the role grid.
   * - Defaults to 2 (original two-column layout)
   * - Set to 1 for a single-column layout
   */
  columnsCount?: number
  allRoles?: Role[]
  existingRoleIds?: ReadonlySet<string>
  onAddRole?: (role: Role) => void
  onRemoveRole?: (roleId: string) => void
  onReplaceRole?: (oldRoleId: string, newRole: Role) => void
  onReorderRoles?: (team: string, fromIndex: number, toIndex: number) => void
  /** Called with the new rule list; omit to render the rules read-only */
  onBootleggerRulesChange?: (rules: string[]) => void
}

export function TeamSection({
  team,
  teamColor,
  roleViews,
  columnsCount = 2,
  allRoles,
  existingRoleIds,
  onAddRole,
  onRemoveRole,
  onReplaceRole,
  onReorderRoles,
  onBootleggerRulesChange,
}: TeamSectionProps) {
  const { t } = useTranslation()
  const lockReasons: Record<LockReason, string> = {
    'homebrew': t('Homebrew characters or rules require the Bootlegger'),
    'unsaved-rules': t('Save the script to remove the Bootlegger'),
    'jinxes': t('Jinxed characters require the Djinn'),
  }
  const teamLabels = useTeamLabels()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [replaceRoleId, setReplaceRoleId] = useState<string | undefined>()
  const [activeId, setActiveId] = useState<string | null>(null)
  const setSearchQuery = useAddRoleModalStore((state) => state.setSearchQuery)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Use team labels hook for translated labels
  const teamLabel = teamLabels[team].label

  const canAddRoles = allRoles && existingRoleIds && onAddRole && onRemoveRole

  const handleSearch = (roleId: string) => {
    setSearchQuery(team, roleId)
    setReplaceRoleId(roleId)
    setIsModalOpen(true)
  }

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      // Clear replace mode when closing
      setReplaceRoleId(undefined)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)

    if (!over || active.id === over.id) return

    const oldIndex = roleViews.findIndex((r) => r.role.id === active.id)
    const newIndex = roleViews.findIndex((r) => r.role.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1 && onReorderRoles) {
      onReorderRoles(team, oldIndex, newIndex)
    }
  }

  const activeRole = activeId
    ? roleViews.find((r) => r.role.id === activeId)
    : undefined

  // Clamp the column count to at least 1 and expose via CSS variable.
  const gridColumnsCount = Math.max(1, columnsCount)

  return (
    <>
      <Flex key={team} direction="column">
        <Flex
          direction="row"
          align="center"
          gap="2"
          my="2"
          className="team-header"
        >
          <Badge
            color={teamColor}
            size="2"
            style={{ textTransform: 'uppercase' }}
          >
            {teamLabel}
          </Badge>
          {canAddRoles && (
            <IconButton
              size="1"
              variant="ghost"
              color={teamColor}
              onClick={() => {
                setReplaceRoleId(undefined)
                setIsModalOpen(true)
              }}
              className="no-print"
              aria-label={t('Add character')}
            >
              <Plus size={14} />
            </IconButton>
          )}
          <Separator decorative orientation="horizontal" size="4" />
        </Flex>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={roleViews.map((r) => r.role.id)}
            strategy={rectSortingStrategy}
          >
            <Box
              className="role-grid role-grid-double"
              style={
                {
                  '--columns-count': gridColumnsCount,
                } as React.CSSProperties
              }
            >
              {roleViews.map(({ role, hatedBy, jinxes, rules, lock }) => (
                <Box key={role.id} className="role-grid-item">
                  <RoleCard
                    role={role}
                    onRemove={onRemoveRole}
                    // Some roles are put straight back by the auto-roles -
                    // homebrew content keeps the Bootlegger, an active jinx
                    // keeps the Djinn - so taking them out would do nothing.
                    // Say why rather than dropping the control.
                    lockedReason={lock && lockReasons[lock]}
                    onSearch={canAddRoles ? handleSearch : undefined}
                    isDraggable={!!onReorderRoles}
                    jinxes={jinxes}
                    hatedBy={hatedBy}
                    rules={rules}
                    onRulesChange={rules ? onBootleggerRulesChange : undefined}
                  />
                </Box>
              ))}
            </Box>
          </SortableContext>
          <DragOverlay>
            {activeRole ? (
              <Box
                style={{
                  cursor: 'grabbing',
                  opacity: 0.9,
                }}
              >
                <RoleCard
                  role={activeRole.role}
                  isDraggable={false}
                  // Frozen rather than read-only, so the preview keeps the
                  // height of the card it was picked up from
                  rules={activeRole.rules}
                  frozenRules={!!onBootleggerRulesChange}
                />
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Flex>

      {canAddRoles && (
        <AddRoleModal
          open={isModalOpen}
          onOpenChange={handleModalOpenChange}
          team={team}
          allRoles={allRoles}
          existingRoleIds={existingRoleIds}
          onAddRole={onAddRole}
          onRemoveRole={onRemoveRole}
          onReplaceRole={onReplaceRole}
          replaceRoleId={replaceRoleId}
        />
      )}
    </>
  )
}
