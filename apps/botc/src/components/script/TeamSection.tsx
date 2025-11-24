import { useState } from 'react'
import { Flex, Badge, Separator, Box, IconButton } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { RoleCard } from './RoleCard'
import { AddRoleModal } from './AddRoleModal'

interface TeamSectionProps {
  team: string
  teamColor: 'blue' | 'red' | 'orange'
  roles: Role[]
  allRoles?: Role[]
  existingRoleIds?: Set<string>
  onAddRole?: (role: Role) => void
  onRemoveRole?: (roleId: string) => void
}

export function TeamSection({
  team,
  teamColor,
  roles,
  allRoles,
  existingRoleIds,
  onAddRole,
  onRemoveRole,
}: TeamSectionProps) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
              onClick={() => setIsModalOpen(true)}
              className="no-print"
              aria-label={t('Add character')}
            >
              <Plus size={14} />
            </IconButton>
          )}
          <Separator orientation="horizontal" size="4" />
        </Flex>
        <Box
          style={{
            columnCount: 2,
            columnWidth: '50%',
            columnGap: 'var(--space-3)',
          }}
        >
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} onRemove={onRemoveRole} />
          ))}
        </Box>
      </Flex>

      {canAddRoles && (
        <AddRoleModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          team={team}
          allRoles={allRoles}
          existingRoleIds={existingRoleIds}
          onAddRole={onAddRole}
          onRemoveRole={onRemoveRole}
        />
      )}
    </>
  )
}
