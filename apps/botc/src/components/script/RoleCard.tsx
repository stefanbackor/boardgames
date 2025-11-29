import {
  Flex,
  Heading,
  Text,
  IconButton,
  Box,
  Tooltip,
  Button,
} from '@radix-ui/themes'
import { ExternalLink, GripVertical, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Role } from '../../data/types'
import { roles as baseRoles } from '../../data/roles'
import { getProxiedImageUrl } from '../../utils/imageUrl'

interface RoleCardProps {
  role: Role & { isCustom?: boolean }
  onRemove?: (roleId: string) => void
  onSearch?: (roleId: string) => void
  isDraggable?: boolean
}

export function RoleCard({
  role,
  onRemove,
  onSearch,
  isDraggable = false,
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
        scale: role.image?.includes('wiki.bloodontheclocktower.com') ? 1.3 : 1,
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
      {onRemove && (
        <IconButton
          size="1"
          variant="soft"
          color="red"
          className="role-card-remove no-print"
          aria-label={t('Remove character')}
          onClick={() => onRemove(role.id)}
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            opacity: 0,
            transition: 'opacity 0.15s ease-in-out',
          }}
        >
          <Trash size={14} />
        </IconButton>
      )}
      {isDraggable && (
        <Box
          className="role-card-drag no-print"
          aria-label={t('Drag to reorder')}
          style={{
            position: 'absolute',
            top: '4px',
            right: onRemove ? '30px' : '4px',
            opacity: 0,
            transition: 'opacity 0.15s ease-in-out',
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
          mr="2"
          style={{
            display: 'inline',
            lineHeight: 'inherit',
          }}
        >
          {role.name}
        </Heading>
        {onSearch && role.isCustom && (
          <Tooltip className="no-print" content={t('Replace custom character')}>
            <Button
              color="gray"
              size="1"
              variant="ghost"
              className="role-card-search no-print"
              aria-label={t('Replace custom character')}
              onClick={() => onSearch(role.id)}
            >
              {t('Custom')}
            </Button>
          </Tooltip>
        )}
        {role.edition && role.edition.trim() !== '' && (
          <Text color="gray" size="1" className="role-card-edition no-print">
            {t(role.edition, { ns: 'content' })}
          </Text>
        )}
        <br className="role-card-ability-break" />
        <Text
          className="role-card-ability"
          size="2"
          style={{ lineHeight: 'inherit' }}
        >
          {role.ability}
        </Text>
      </Box>
    </Flex>
  )
}
