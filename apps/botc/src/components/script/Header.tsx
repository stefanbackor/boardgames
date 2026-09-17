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
  /**
   * The text as it was when editing started. Edits are committed on every
   * keystroke, so the props are no use to Escape by the time it is pressed -
   * they already hold the text being cancelled rather than the text to go
   * back to.
   */
  const originalNameRef = useRef(name)
  const originalAuthorRef = useRef(author)

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

  const handleNameFocus = () => {
    originalNameRef.current = name
  }

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

    /**
     * Put the trimmed text back on screen before committing it. Whitespace the
     * trim dropped leaves the element holding text the name never took, and
     * the sync effect above only runs when the value changes - so a typed space
     * would sit there until a reload. The element is no longer focused by the
     * time a blur is handled, so writing to it cannot disturb a caret.
     */
    if (headingRef.current.textContent !== newName) {
      headingRef.current.textContent = newName
    }

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
      e.preventDefault()
      if (headingRef.current) {
        // Put the text back and let the blur commit it
        headingRef.current.textContent = originalNameRef.current
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

  const handleAuthorFocus = () => {
    originalAuthorRef.current = author
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

    /**
     * Put the trimmed text back on screen before committing it. Whitespace the
     * trim dropped leaves the element holding text the author never took, and
     * the sync effect above only runs when the value changes - so a typed space
     * would sit there until a reload. The element is no longer focused by the
     * time a blur is handled, so writing to it cannot disturb a caret.
     */
    if (authorRef.current.textContent !== newAuthor) {
      authorRef.current.textContent = newAuthor
    }

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
      e.preventDefault()
      if (authorRef.current) {
        // Put the text back and let the blur commit it
        authorRef.current.textContent = originalAuthorRef.current
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
          {/*
           * Revert sits before Save, and has to keep sitting there: the row is
           * right-aligned, so a button that appears only once something is
           * modified moves everything to its left and leaves everything to its
           * right where it was.
           *
           * Save is the button that must not move. Some edits are only
           * committed when the field they are in loses focus - emptying a
           * homebrew rule is one - and that blur is caused by the very click
           * on Save that is meant to save it. Committing turns "modified" on,
           * so a Revert appearing to the right of Save would slide Save out
           * from under the pointer between the press and the release, and the
           * click would land on neither button. Nothing that shows up with
           * `isModified` belongs after Save.
           */}
          {onRevert && isModified && (
            <Button size="1" color="gray" onClick={onRevert}>
              {t('Revert')}
            </Button>
          )}
          {onSave && showSave && (
            <Button size="1" color="green" onClick={onSave}>
              {t('Save')}
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
            onFocus={handleNameFocus}
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
              onFocus={handleAuthorFocus}
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
