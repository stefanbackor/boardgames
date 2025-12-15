import { useRef } from 'react'
import { Flex, Heading, Text, Button, Tooltip } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'

interface Props {
  name: string
  author: string
  isModified?: boolean
  onSave?: () => void
  onRevert?: () => void
  onNameChange?: (name: string) => void
  onAuthorChange?: (author: string) => void
}

export function Header({
  name,
  author,
  isModified,
  onSave,
  onRevert,
  onNameChange,
  onAuthorChange,
}: Props) {
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const authorRef = useRef<HTMLSpanElement>(null)

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
          {name}
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
            {author || t('Unknown')}
          </span>
        </Tooltip>
      </Text>
      {isModified && (
        <Flex gap="2" align="center" className="no-print">
          <Text size="2" color="orange">
            {t('Changes made')}
          </Text>
          {onSave && (
            <Button size="1" variant="soft" color="green" onClick={onSave}>
              {t('Save')}
            </Button>
          )}
          {onRevert && (
            <Button size="1" variant="soft" color="gray" onClick={onRevert}>
              {t('Revert')}
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  )
}
