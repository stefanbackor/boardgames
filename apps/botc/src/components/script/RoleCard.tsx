import {
  Flex,
  Heading,
  Text,
  Badge,
  IconButton,
  Box,
  Tooltip,
} from '@radix-ui/themes'
import { Minus, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Role } from '../../data/types'
import { roles as baseRoles } from '../../data/roles'

interface RoleCardProps {
  role: Role & { isCustom?: boolean }
  onRemove?: (roleId: string) => void
}

export function RoleCard({ role, onRemove }: RoleCardProps) {
  const { t } = useTranslation()

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
      gap="3"
      my="1"
      align="stretch"
      style={{ breakInside: 'avoid', position: 'relative' }}
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
          <Minus size={14} />
        </IconButton>
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
                  scale: 1.3,
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
        </Flex>
        <Text size="2" style={{ lineHeight: '1.33' }}>
          {role.ability}
        </Text>
      </Flex>
    </Flex>
  )
}
