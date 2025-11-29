import { Flex, Heading, Text, IconButton, Box, Tooltip } from '@radix-ui/themes'
import { ExternalLink, GripVertical, ReplaceIcon, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Role } from '@/types'
import { roles as baseRoles } from '@/data/roles'
import { getProxiedImageUrl, getImageScale } from '@/utils/imageUrl'

interface RoleCardProps {
  role: Role & { isCustom?: boolean }
  onRemove?: (roleId: string) => void
  onSearch?: (roleId: string) => void
  isDraggable?: boolean
  jinxes?: Array<{
    id: string
    name: string
    reason: string
    role1Image: string
    role2Image: string
  }>
  hatedBy?: Array<{ id: string; name: string; image: string }>
}

export function RoleCard({
  role,
  onRemove,
  onSearch,
  isDraggable = false,
  jinxes,
  hatedBy,
}: RoleCardProps) {
  const { t } = useTranslation()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: role.id,
    disabled: !isDraggable,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    pointerEvents: isDragging ? ('none' as const) : undefined,
  }

  // Get English role name from base roles
  const getEnglishRoleName = (roleId: string) => {
    const baseRole = baseRoles.find((r) => r.id === roleId)
    return baseRole?.name || roleId
  }

  // Format role name for wiki URL
  const getWikiUrl = (roleId: string) => {
    const englishName = getEnglishRoleName(roleId)
    const formattedName = englishName.replace(/\s+/g, '_')
    return `https://wiki.bloodontheclocktower.com/${encodeURIComponent(formattedName)}`
  }

  const roleImage = (
    <img
      src={getProxiedImageUrl(role.image)}
      alt={role.name}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        flexShrink: 0,
        scale: getImageScale(role.image),
        objectFit: 'cover',
        display: 'block',
      }}
    />
  )

  return (
    <Flex
      ref={setNodeRef}
      style={{ ...style, position: 'relative' }}
      gap="3"
      align="center"
      className="role-card break-inside-avoid print:break-inside-avoid-page"
    >
      {(onRemove || onSearch || isDraggable) && (
        <Flex
          gap="1"
          className="role-card-controls no-print"
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            opacity: 0,
            transition: 'opacity 0.15s ease-in-out',
          }}
        >
          {isDraggable && (
            <Tooltip content={t('Drag to reorder')}>
              <Box
                className="role-card-drag"
                aria-label={t('Drag to reorder')}
                style={{
                  cursor: 'grab',
                  backgroundColor: 'var(--gray-a3)',
                  borderRadius: 'var(--radius-2)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  touchAction: 'none',
                }}
                {...attributes}
                {...listeners}
              >
                <GripVertical size={14} />
              </Box>
            </Tooltip>
          )}
          {onSearch && (
            <Tooltip content={t('Replace character')}>
              <IconButton
                size="1"
                variant="soft"
                color="gray"
                className="role-card-search"
                aria-label={t('Replace character')}
                onClick={() => onSearch(role.id)}
              >
                <ReplaceIcon size={14} />
              </IconButton>
            </Tooltip>
          )}
          {onRemove && (
            <IconButton
              size="1"
              variant="soft"
              color="red"
              className="role-card-remove"
              aria-label={t('Remove character')}
              onClick={() => onRemove(role.id)}
            >
              <Trash size={14} />
            </IconButton>
          )}
        </Flex>
      )}
      <Box
        style={{
          position: 'relative',
          flexShrink: 0,
        }}
        width={{ initial: '48px', md: '64px' }}
        height={{ initial: '48px', md: '64px' }}
        className="role-card-image"
      >
        {role.isCustom ? (
          roleImage
        ) : (
          <Tooltip
            content={t('Open {{roleName}} official wiki', {
              roleName: role.name,
            })}
          >
            <a
              href={getWikiUrl(role.id)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
              className="role-avatar-link"
            >
              {roleImage}
              <Box
                className="role-avatar-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                  pointerEvents: 'none',
                }}
              >
                <ExternalLink size={24} color="white" />
              </Box>
            </a>
          </Tooltip>
        )}
      </Box>
      <Box className="role-card-text" my="2" style={{ lineHeight: '1' }}>
        <Heading
          size="4"
          style={{
            lineHeight: 'inherit',
            display: 'inline',
          }}
        >
          {role.name}
        </Heading>
        {hatedBy && hatedBy.length > 0 && (
          <>
            {hatedBy.map((hater) => (
              <Tooltip key={hater.id} content={`Jinxed with ${hater.name}`}>
                <Box
                  display="inline-block"
                  ml="1"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid var(--gray-a6)',
                    verticalAlign: 'bottom',
                  }}
                >
                  <img
                    src={getProxiedImageUrl(hater.image)}
                    alt={hater.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      verticalAlign: 'baseline',
                      scale: getImageScale(hater.image),
                    }}
                  />
                </Box>
              </Tooltip>
            ))}
          </>
        )}

        {!role.isCustom && role.edition && role.edition.trim() !== '' && (
          <Box
            display="inline-block"
            ml="1"
            className="role-card-edition no-print"
          >
            <Tooltip
              content={t('Character edition: {{edition}}', {
                edition: t(role.edition, { ns: 'content' }),
              })}
            >
              <Text
                size="1"
                color="gray"
                style={{ textTransform: 'uppercase' }}
              >
                {role.edition}
              </Text>
            </Tooltip>
          </Box>
        )}
        <br className="role-card-ability-break" />
        <Text
          className="role-card-ability"
          size="2"
          style={{ lineHeight: 'inherit' }}
        >
          {role.ability}
        </Text>
        {jinxes && jinxes.length > 0 && (
          <Box
            mt="2"
            style={{ borderTop: '1px solid var(--gray-a5)', paddingTop: '8px' }}
          >
            {jinxes.map((jinx, index) => (
              <Flex key={index} align="center" gap="2" mb="1">
                <Box
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid var(--gray-a6)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={getProxiedImageUrl(jinx.role1Image)}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      scale: getImageScale(jinx.role1Image),
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid var(--gray-a6)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={getProxiedImageUrl(jinx.role2Image)}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      scale: getImageScale(jinx.role2Image),
                    }}
                  />
                </Box>
                <Box>
                  <Text
                    size="2"
                    weight="bold"
                    style={{ lineHeight: 'inherit' }}
                  >
                    {jinx.name}
                  </Text>{' '}
                  <Text size="1">{jinx.reason}</Text>
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  )
}
