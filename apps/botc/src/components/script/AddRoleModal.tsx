import { useMemo } from 'react'
import {
  Dialog,
  Flex,
  TextField,
  Text,
  Button,
  IconButton,
  ScrollArea,
  Tooltip,
} from '@radix-ui/themes'
import { Search, X, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '@/types'
import { Team } from '@/constants'
import { useTeamLabels } from '@/hooks/useTeamLabels'
import { roles as baseRoles } from '@/data/roles.en'
import { useAddRoleModalStore } from '@/stores/addRoleModalStore'
import { getProxiedImageUrl } from '@/utils/imageUrl'

interface AddRoleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  team: Team
  allRoles: Role[]
  existingRoleIds: Set<string>
  onAddRole: (role: Role) => void
  onRemoveRole: (roleId: string) => void
  onReplaceRole?: (oldRoleId: string, newRole: Role) => void
  replaceRoleId?: string
}

// Helper function to highlight search term in text
function HighlightedText({
  text,
  highlight,
}: {
  text: string
  highlight: string
}) {
  if (!highlight.trim()) {
    return <>{text}</>
  }

  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  )
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            style={{
              backgroundColor: 'var(--accent-a5)',
              color: 'inherit',
              borderRadius: '2px',
              padding: '0 1px',
            }}
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function AddRoleModal({
  open,
  onOpenChange,
  team,
  allRoles,
  existingRoleIds,
  onAddRole,
  onRemoveRole,
  onReplaceRole,
  replaceRoleId,
}: AddRoleModalProps) {
  const { t } = useTranslation()
  const teamLabelsMap = useTeamLabels()

  // Use Zustand store for persistent search query per team
  const searchQuery = useAddRoleModalStore((state) =>
    state.getSearchQuery(team),
  )
  const setSearchQuery = useAddRoleModalStore((state) => state.setSearchQuery)

  // Use team labels hook for translated labels
  const teamLabels = teamLabelsMap[team]
  const modalTitle = replaceRoleId
    ? teamLabels.replaceLabel
    : teamLabels.addLabel

  // Check if the role being replaced is a custom character
  const isReplacingCustomRole =
    replaceRoleId && !baseRoles.some((r) => r.id === replaceRoleId)

  // Filter roles by search query (name or id), keep in alphabetical order
  // When searching, search across all teams; when empty, show only current team
  const filteredRoles = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return allRoles
      .filter((role) => {
        // If no search query, only show roles from current team
        if (!query) {
          return role.team === team
        }
        // If searching, search across all teams
        return (
          role.name.toLowerCase().includes(query) ||
          role.id.toLowerCase().includes(query) ||
          query.includes(role.id.toLowerCase())
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [allRoles, team, searchQuery])

  const handleSelectRole = (role: Role) => {
    if (replaceRoleId && onReplaceRole) {
      // Replace mode: replace the old role with new one at same position
      onReplaceRole(replaceRoleId, role)
      onOpenChange(false)
    } else {
      // Normal mode: toggle role in script
      const isInScript = existingRoleIds.has(role.id)
      if (isInScript) {
        onRemoveRole(role.id)
      } else {
        onAddRole(role)
      }
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(team, value)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        size="4"
        onOpenAutoFocus={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-6)',
          height: '80vh',
        }}
      >
        <Flex justify="between" align="start" mb="2">
          <div>
            <Dialog.Title mb="1">{modalTitle}</Dialog.Title>
            <Dialog.Description size="2" color="gray">
              {replaceRoleId
                ? isReplacingCustomRole
                  ? t('Replacing custom character: {{roleId}}', {
                      roleId: replaceRoleId,
                    })
                  : t('Replacing: {{roleId}}', { roleId: replaceRoleId })
                : t('Search for a character to add to your script')}
            </Dialog.Description>
          </div>
          <Dialog.Close>
            <IconButton
              size="1"
              variant="ghost"
              color="gray"
              aria-label={t('Close')}
            >
              <X size={16} />
            </IconButton>
          </Dialog.Close>
        </Flex>

        <Flex direction="column" gap="3" style={{ flex: 1, minHeight: 0 }}>
          <TextField.Root
            placeholder={t('Search characters...')}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            autoFocus
            size="2"
            style={{ padding: 'var(--space-2) var(--space-1)' }}
          >
            <TextField.Slot>
              <Search size={16} />
            </TextField.Slot>
            {searchQuery && (
              <TextField.Slot>
                <Button
                  size="1"
                  variant="ghost"
                  color="gray"
                  onClick={() => handleSearchChange('')}
                >
                  {t('Clear')}
                </Button>
              </TextField.Slot>
            )}
          </TextField.Root>

          <ScrollArea
            type="auto"
            scrollbars="vertical"
            style={{
              flex: 1,
              height: '100%',
            }}
          >
            {filteredRoles.length === 0 ? (
              <Text
                size="2"
                color="gray"
                align="center"
                style={{ padding: 'var(--space-4) 0' }}
              >
                {t('No characters found')}
              </Text>
            ) : (
              filteredRoles.map((role) => {
                const isInScript = existingRoleIds.has(role.id)
                return (
                  <Flex key={role.id} width="100%">
                    <Button
                      color="gray"
                      variant="ghost"
                      size="2"
                      radius="medium"
                      style={{
                        color: 'inherit',
                        width: '100%',
                      }}
                      onClick={() => handleSelectRole(role)}
                    >
                      <Flex
                        align="center"
                        gap="2"
                        justify="between"
                        style={{
                          width: '100%',
                          padding:
                            'var(--space-1) var(--space-4) var(--space-1) var(--space-2)',
                        }}
                      >
                        <Tooltip
                          content={role.ability}
                          side="right"
                          delayDuration={300}
                        >
                          <Flex align="center" gap="1">
                            <Text
                              size="1"
                              color="gray"
                              style={{
                                textTransform: 'uppercase',
                                minWidth: '28px',
                                textAlign: 'end',
                              }}
                            >
                              {role.edition || ''}
                            </Text>
                            {role.image && (
                              <img
                                src={getProxiedImageUrl(role.image)}
                                alt={role.name}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                }}
                              />
                            )}

                            <Text
                              size="2"
                              style={{
                                fontWeight: isInScript ? 'bold' : 'normal',
                              }}
                            >
                              <HighlightedText
                                text={role.name}
                                highlight={searchQuery}
                              />
                            </Text>
                          </Flex>
                        </Tooltip>
                        {isInScript && (
                          <Check
                            size={16}
                            style={{ color: 'var(--green-9)', flexShrink: 0 }}
                          />
                        )}
                      </Flex>
                    </Button>
                  </Flex>
                )
              })
            )}
          </ScrollArea>

          <Flex justify="end" mt="2">
            <Dialog.Close>
              <Button variant="soft">{t('Done')}</Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
