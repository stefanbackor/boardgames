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
import type { Role } from '../../data/types'
import { RoleCard } from './RoleCard'
import { AddRoleModal } from './AddRoleModal'
import { useAddRoleModalStore } from '../../stores/addRoleModalStore'

interface TeamSectionProps {
  team: string
  teamColor: 'blue' | 'red' | 'orange' | 'green'
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
}: TeamSectionProps) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [replaceRoleId, setReplaceRoleId] = useState<string | undefined>()
  const [activeId, setActiveId] = useState<string | null>(null)
  const setSearchQuery = useAddRoleModalStore((state) => state.setSearchQuery)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const TEAM_TRANSLATION_KEYS = {
    townsfolk: t('Townsfolk'),
    outsider: t('Outsiders'),
    minion: t('Minions'),
    demon: t('Demons'),
    traveler: t('Recommended Travelers'),
    loric: t('Loric'),
  } as const

  const teamLabel =
    TEAM_TRANSLATION_KEYS[team as keyof typeof TEAM_TRANSLATION_KEYS] || team

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

  return (
    <>
      <Flex key={team} direction="column">
        <Flex direction="row" align="center" gap="2" my="1">
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
              variant="soft"
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
          <Separator orientation="horizontal" size="4" />
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
