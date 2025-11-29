import { useState, useMemo } from 'react'
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
import { jinxes as baseJinxes } from '@/data/jinxes'
import type { Jinx } from '@/types/jinx'

interface TeamSectionProps {
  team: Team
  teamColor: TeamColor
  roles: Role[]
  /**
   * Number of columns for the role grid.
   * - Defaults to 2 (original two-column layout)
   * - Set to 1 for a single-column layout
   */
  columnsCount?: number
  allRoles?: Role[]
  existingRoleIds?: Set<string>
  onAddRole?: (role: Role) => void
  onRemoveRole?: (roleId: string) => void
  onReplaceRole?: (oldRoleId: string, newRole: Role) => void
  onReorderRoles?: (team: string, fromIndex: number, toIndex: number) => void
  scriptRoles?: Role[]
  /**
   * Optional jinx data, already localized for the current language.
   * Falls back to base English jinxes when not provided.
   */
  jinxes?: Jinx[]
}

export function TeamSection({
  team,
  teamColor,
  roles,
  columnsCount = 2,
  allRoles,
  existingRoleIds,
  onAddRole,
  onRemoveRole,
  onReplaceRole,
  onReorderRoles,
  scriptRoles,
  jinxes: jinxesOverride,
}: TeamSectionProps) {
  const { t } = useTranslation()
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

    const oldIndex = roles.findIndex((r) => r.id === active.id)
    const newIndex = roles.findIndex((r) => r.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1 && onReorderRoles) {
      onReorderRoles(team, oldIndex, newIndex)
    }
  }

  const activeRole = activeId ? roles.find((r) => r.id === activeId) : null

  // Clamp the column count to at least 1 and expose via CSS variable.
  const gridColumnsCount = Math.max(1, columnsCount)

  // Use language-appropriate jinx data if provided
  const jinxes = jinxesOverride ?? baseJinxes

  // Compute jinxes for djinn role if scriptRoles is provided
  const djinnJinxes = useMemo(() => {
    if (!scriptRoles) return []

    const scriptRoleIds = new Set(scriptRoles.map((r) => r.id))
    const applicableJinxes: Array<{
      id: string
      name: string
      reason: string
      role1Image: string
      role2Image: string
    }> = []

    // Find all jinxes where both the role and the jinxed role are in the script
    for (const jinxEntry of jinxes) {
      if (scriptRoleIds.has(jinxEntry.id)) {
        // This role is in the script, check its jinxes
        for (const hatred of jinxEntry.hatred) {
          if (scriptRoleIds.has(hatred.id)) {
            // The jinxed role is also in the script
            const role1 = scriptRoles.find((r) => r.id === jinxEntry.id)
            const role2 = scriptRoles.find((r) => r.id === hatred.id)
            if (role1 && role2) {
              applicableJinxes.push({
                id: `${jinxEntry.id}-${hatred.id}`,
                name: `${role1.name} & ${role2.name}`,
                reason: hatred.reason,
                role1Image: role1.image,
                role2Image: role2.image,
              })
            }
          }
        }
      }
    }

    return applicableJinxes
  }, [scriptRoles, jinxes])

  // Compute "hated by" information for each role
  const hatedByMap = useMemo(() => {
    if (!scriptRoles) return new Map()

    const map = new Map<
      string,
      Array<{ id: string; name: string; image: string }>
    >()
    const scriptRoleIds = new Set(scriptRoles.map((r) => r.id))

    // For each jinx entry, if both roles are in the script, add the "hater" to the "hated" role's list
    for (const jinxEntry of jinxes) {
      if (scriptRoleIds.has(jinxEntry.id)) {
        const haterRole = scriptRoles.find((r) => r.id === jinxEntry.id)
        if (!haterRole) continue

        for (const hatred of jinxEntry.hatred) {
          if (scriptRoleIds.has(hatred.id)) {
            // hatred.id is hated by jinxEntry.id
            if (!map.has(hatred.id)) {
              map.set(hatred.id, [])
            }
            map.get(hatred.id)!.push({
              id: haterRole.id,
              name: haterRole.name,
              image: haterRole.image,
            })
          }
        }
      }
    }

    return map
  }, [scriptRoles, jinxes])

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
            items={roles.map((r) => r.id)}
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
              {roles.map((role) => (
                <Box key={role.id} className="role-grid-item">
                  <RoleCard
                    role={role}
                    onRemove={onRemoveRole}
                    onSearch={canAddRoles ? handleSearch : undefined}
                    isDraggable={!!onReorderRoles}
                    jinxes={role.id === 'djinn' ? djinnJinxes : undefined}
                    hatedBy={hatedByMap.get(role.id)}
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
                <RoleCard role={activeRole} isDraggable={false} />
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
