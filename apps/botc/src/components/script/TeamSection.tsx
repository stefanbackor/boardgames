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
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Role } from '../../data/types'
import { RoleCard } from './RoleCard'
import { AddRoleModal } from './AddRoleModal'
import { useAddRoleModalStore } from '../../stores/addRoleModalStore'

interface TeamSectionProps {
  team: string
  teamColor: 'blue' | 'red' | 'orange'
  roles: Role[]
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = roles.findIndex((r) => r.id === active.id)
    const newIndex = roles.findIndex((r) => r.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1 && onReorderRoles) {
      onReorderRoles(team, oldIndex, newIndex)
    }
  }

  // Calculate number of rows needed for column-first layout with 2 columns
  const numRows = Math.ceil(roles.length / 2)

  return (
    <>
      <Flex key={team} direction="column">
        <Flex direction="row" align="center" gap="2" my="2">
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
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={roles.map((r) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            <Box
              className="role-grid"
              style={
                {
                  '--grid-rows': numRows,
                } as React.CSSProperties
              }
            >
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  onRemove={onRemoveRole}
                  onSearch={canAddRoles ? handleSearch : undefined}
                  isDraggable={!!onReorderRoles}
                />
              ))}
            </Box>
          </SortableContext>
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
