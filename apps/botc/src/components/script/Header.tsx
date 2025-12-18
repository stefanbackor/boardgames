import { useRef, useEffect } from 'react'
import { Flex, Heading, Text, Button, Tooltip, Badge } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import { Check, Trash2 } from 'lucide-react'

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
    const displayAuthor = author
    if (authorRef.current && authorRef.current.textContent !== displayAuthor) {
      // Only update if the user is not currently editing
      if (document.activeElement !== authorRef.current) {
        authorRef.current.textContent = displayAuthor
      }
    }
  }, [author, t])

  const handleNameInput = () => {
    if (!onNameChange || !headingRef.current) return

    // Remove any <br> elements that browsers insert when content is empty
    const brElements = headingRef.current.querySelectorAll('br')
    brElements.forEach((br) => br.remove())

    // Remove any line breaks from the content
    let newName = headingRef.current.textContent || ''
    newName = newName.replace(/[\r\n]+/g, ' ').trim()

    if (newName !== name) {
      onNameChange(newName)
    }
  }

  const handleNameBlur = () => {
    if (!onNameChange || !headingRef.current) return

    // Remove any <br> elements that browsers insert when content is empty
    const brElements = headingRef.current.querySelectorAll('br')
    brElements.forEach((br) => br.remove())

    const newName = headingRef.current.textContent?.trim() || ''
    // Always call onNameChange with the current value, even if empty
    if (newName !== name) {
      onNameChange(newName)
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

  const handleNamePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    // Remove line breaks and insert as plain text
    const cleanText = text.replace(/[\r\n]+/g, ' ')
    document.execCommand('insertText', false, cleanText)
  }

  const handleAuthorInput = () => {
    if (!onAuthorChange || !authorRef.current) return

    // Remove any <br> elements that browsers insert when content is empty
    const brElements = authorRef.current.querySelectorAll('br')
    brElements.forEach((br) => br.remove())

    // Remove any line breaks from the content
    let newAuthor = authorRef.current.textContent || ''
    newAuthor = newAuthor.replace(/[\r\n]+/g, ' ').trim()

    if (newAuthor !== author) {
      onAuthorChange(newAuthor)
    }
  }

  const handleAuthorBlur = () => {
    if (!onAuthorChange || !authorRef.current) return

    // Remove any <br> elements that browsers insert when content is empty
    const brElements = authorRef.current.querySelectorAll('br')
    brElements.forEach((br) => br.remove())

    const newAuthor = authorRef.current.textContent?.trim() || ''
    // Always call onAuthorChange with the current value, even if empty
    if (newAuthor !== author) {
      onAuthorChange(newAuthor)
    }
  }

  const handleAuthorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      authorRef.current?.blur()
    } else if (e.key === 'Escape') {
      if (authorRef.current) {
        authorRef.current.textContent = author
        onAuthorChange?.(author || '')
        authorRef.current.blur()
      }
    }
  }

  const handleAuthorPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    // Remove line breaks and insert as plain text
    const cleanText = text.replace(/[\r\n]+/g, ' ')
    document.execCommand('insertText', false, cleanText)
  }

  return (
    <Flex direction="column" gap="2">
      {/* Top row: Editing section with Delete button */}
      {(isModified || showSave || isSaved || onDelete) && (
        <Flex justify="end" align="center" gap="2" className="no-print">
          {isModified && <Badge color="orange">{t('Changes made')}</Badge>}
          {isSaved && !isModified && (
            <Badge color="gray" variant="soft">
              <Check size={14} /> {t('Saved')}
            </Badge>
          )}
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
              <Button size="1" color="red" onClick={onDelete}>
                <Trash2 size={14} />
                {t('Delete')}
              </Button>
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
            onPaste={handleNamePaste}
            data-placeholder={onNameChange ? t('Add a name') : undefined}
            style={{
              cursor: onNameChange ? 'text' : 'default',
              outline: 'none',
              minWidth: onNameChange ? '150px' : undefined,
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            className={onNameChange ? 'editable-heading' : undefined}
          >
            {!onNameChange && name}
          </Heading>
        </Tooltip>
        <Flex align="baseline" gap="1">
          <Text
            size="4"
            color="gray"
            style={{ fontFamily: 'var(--heading-font-family)' }}
          >
            {t('by')}{' '}
          </Text>
          <Tooltip content={onAuthorChange ? t('Click to edit') : undefined}>
            <Text
              size="4"
              color="gray"
              ref={authorRef}
              contentEditable={!!onAuthorChange}
              suppressContentEditableWarning
              onInput={handleAuthorInput}
              onBlur={handleAuthorBlur}
              onKeyDown={handleAuthorKeyDown}
              onPaste={handleAuthorPaste}
              data-placeholder={onAuthorChange ? t('Add author') : undefined}
              style={{
                cursor: onAuthorChange ? 'text' : 'default',
                outline: 'none',
                whiteSpace: 'nowrap',
                minWidth: onAuthorChange ? '100px' : undefined,
                display: 'inline-block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'var(--heading-font-family)',
              }}
              className={onAuthorChange ? 'editable-author' : undefined}
            >
              {!onAuthorChange && author}
            </Text>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  )
}
