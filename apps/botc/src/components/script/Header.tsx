import { useRef, useEffect } from 'react'
import { Flex, Heading, Text, Button, Tooltip, Badge, IconButton } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'

interface Props {
  name: string
  author: string
  isModified?: boolean
  showSave?: boolean
  isSaved?: boolean
  onSave?: () => void
  onRevert?: () => void
  onDelete?: () => void
  onNameChange?: (name: string) => void
  onAuthorChange?: (author: string) => void
}

export function Header({
  name,
  author,
  isModified,
  showSave,
  isSaved,
  onSave,
  onRevert,
  onDelete,
  onNameChange,
  onAuthorChange,
}: Props) {
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const authorRef = useRef<HTMLSpanElement>(null)

  // Sync external name changes to the contentEditable element
  useEffect(() => {
    if (headingRef.current && headingRef.current.textContent !== name) {
      // Only update if the user is not currently editing
      if (document.activeElement !== headingRef.current) {
        headingRef.current.textContent = name
      }
    }
  }, [name])

  // Sync external author changes to the contentEditable element
  useEffect(() => {
    const displayAuthor = author || t('Unknown')
    if (authorRef.current && authorRef.current.textContent !== displayAuthor) {
      // Only update if the user is not currently editing
      if (document.activeElement !== authorRef.current) {
        authorRef.current.textContent = displayAuthor
      }
    }
  }, [author, t])

  const handleNameInput = () => {
    if (!onNameChange || !headingRef.current) return

    const newName = headingRef.current.textContent?.trim() || ''
    if (newName !== name) {
      onNameChange(newName)
    }
  }

  const handleNameBlur = () => {
    if (!onNameChange || !headingRef.current) return

    const newName = headingRef.current.textContent?.trim() || ''
    if (!newName) {
      // Reset to original if empty
      headingRef.current.textContent = name
      onNameChange(name)
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      headingRef.current?.blur()
    } else if (e.key === 'Escape') {
      if (headingRef.current) {
        headingRef.current.textContent = name
        onNameChange?.(name)
        headingRef.current.blur()
      }
    }
  }

  const handleAuthorInput = () => {
    if (!onAuthorChange || !authorRef.current) return

    const newAuthor = authorRef.current.textContent?.trim() || ''
    if (newAuthor !== author) {
      onAuthorChange(newAuthor)
    }
  }

  const handleAuthorBlur = () => {
    // No need to do anything on blur, input handler already updated the value
  }

  const handleAuthorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      authorRef.current?.blur()
    } else if (e.key === 'Escape') {
      if (authorRef.current) {
        authorRef.current.textContent = author || t('Unknown')
        onAuthorChange?.(author || '')
        authorRef.current.blur()
      }
    }
  }

  return (
    <Flex direction="column" gap="2">
      {/* Top row: Editing section with Delete button */}
      {(isModified || showSave || isSaved || onDelete) && (
        <Flex justify="end" align="center" gap="2" className="no-print">
          {isModified && <Badge color="orange">{t('Changes made')}</Badge>}
          {isSaved && !isModified && <Badge color="green">{t('Saved')}</Badge>}
          {onSave && showSave && (
            <Button size="1" color="green" onClick={onSave}>
              {t('Save')}
            </Button>
          )}
          {onRevert && isModified && (
            <Button size="1" color="gray" onClick={onRevert}>
              {t('Revert')}
            </Button>
          )}
          {onDelete && (
            <Tooltip content={t('Delete')}>
              <IconButton size="1" color="red" variant="soft" onClick={onDelete}>
                <Trash2 size={14} />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
      )}

      {/* Bottom row: Script name and author */}
      <Flex direction="row" justify="start" align="baseline" gap="2">
        <Tooltip content={onNameChange ? t('Click to edit') : undefined}>
          <Heading
            ref={headingRef}
            size="7"
            contentEditable={!!onNameChange}
            suppressContentEditableWarning
            onInput={handleNameInput}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            style={{
              cursor: onNameChange ? 'text' : 'default',
              outline: 'none',
            }}
          >
            {!onNameChange && name}
          </Heading>
        </Tooltip>
        <Text size="3" color="gray">
          {t('by')}{' '}
          <Tooltip content={onAuthorChange ? t('Click to edit') : undefined}>
            <span
              ref={authorRef}
              contentEditable={!!onAuthorChange}
              suppressContentEditableWarning
              onInput={handleAuthorInput}
              onBlur={handleAuthorBlur}
              onKeyDown={handleAuthorKeyDown}
              style={{
                cursor: onAuthorChange ? 'text' : 'default',
                outline: 'none',
              }}
            >
              {!onAuthorChange && (author || t('Unknown'))}
            </span>
          </Tooltip>
        </Text>
      </Flex>
    </Flex>
  )
}
