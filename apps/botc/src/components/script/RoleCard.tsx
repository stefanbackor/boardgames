import {
  Flex,
  Heading,
  Text,
  Badge,
  IconButton,
  Box,
  Tooltip,
} from '@radix-ui/themes'
import { ExternalLink, Replace, GripVertical, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Role } from '../../data/types'
import { roles as baseRoles } from '../../data/roles'

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
    opacity: isDragging ? 0.5 : 1,
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

  return (
    <Flex
      ref={setNodeRef}
      style={{ ...style, breakInside: 'avoid', position: 'relative' }}
      gap="3"
      my="1"
      align="stretch"
      className="role-card"
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
      {role.isCustom ? (
        <img
          src={role.image}
          alt={role.name}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            flexShrink: 0,
            scale: 1.3,
            objectFit: 'cover',
          }}
        />
      ) : (
        <Tooltip
          content={t('Open {{roleName}} official wiki', {
            roleName: role.name,
          })}
        >
          <Box
            asChild
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              flexShrink: 0,
            }}
            className="role-avatar-link"
          >
            <a
              href={getWikiUrl(role.id)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <img
                src={role.image}
                alt={role.name}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  scale: role.image?.includes('wiki.bloodontheclocktower.com')
                    ? 1.3
                    : 1,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
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
          </Box>
        </Tooltip>
      )}
      <Flex direction="column" justify="center" align="start">
        <Flex align="center" gap="1">
          <Heading size="4">{role.name}</Heading>
          {role.isCustom && (
            <Badge color="gray" size="1" className="no-print">
              {role.id}
            </Badge>
          )}
          {onSearch && role.isCustom && (
            <Tooltip content={t('Replace custom character')}>
              <IconButton
                size="1"
                variant="soft"
                color="blue"
                className="no-print"
                aria-label={t('Replace custom character')}
                onClick={() => onSearch(role.id)}
              >
                <Replace size={14} />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
        <Text size="2" style={{ lineHeight: '1.33' }}>
          {role.ability}
        </Text>
      </Flex>
    </Flex>
  )
}
