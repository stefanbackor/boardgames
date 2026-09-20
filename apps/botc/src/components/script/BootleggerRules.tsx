import { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { Plus, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface RuleLineProps {
  /** The rule text */
  value: string
  /** Placeholder shown while the line is empty */
  placeholder?: string
  /** Whether the line can be edited */
  editable: boolean
  /**
   * Whether this is the line waiting for text. It takes the caret on mount,
   * and it is not part of the script yet - so it must not print either, or a
   * sheet printed mid-edit carries an empty bullet the script never had.
   */
  pending?: boolean
  /** Called with the trimmed text on every keystroke, empty text excluded */
  onInput?: (value: string) => void
  /** Called with the trimmed text when editing finishes */
  onCommit?: (value: string) => void
  /**
   * Whether the line carries a remove button. It is invisible until the line is
   * hovered or focused, but it holds its place in the layout either way - so a
   * frozen copy of an editable line has to draw it too.
   */
  removable?: boolean
  /** Called when the line should be dropped; omitted on a frozen line */
  onRemove?: () => void
  /**
   * Set while a remove button anywhere in the list is being pressed.
   *
   * The blur that press causes runs before the click, and the click names its
   * rule by position - so a blur that dropped a rule first would shift the one
   * the click is about to name, and the wrong rule would go. Shared by the
   * whole list, because the blur lands on a different line than the click.
   */
  removalPending: React.RefObject<boolean>
  /** Tooltip of an editable line */
  editLabel: string
  /** Label of the remove button */
  removeLabel: string
}

/**
 * A tooltip only when there is something to say.
 *
 * Radix draws the tooltip body whether or not it was given any content, so a
 * missing label pops an empty bubble instead of none at all - and a frozen line
 * has no labels, because none of its controls do anything.
 */
function MaybeTooltip({
  content,
  children,
}: {
  content?: string
  children: React.ReactElement
}) {
  return content ? <Tooltip content={content}>{children}</Tooltip> : children
}

/**
 * A single homebrew rule, editable in place the same way the script name is.
 */
function RuleLine({
  value,
  placeholder,
  editable,
  pending,
  onInput,
  onCommit,
  removable,
  onRemove,
  removalPending,
  editLabel,
  removeLabel,
}: RuleLineProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // The text as it was when editing started. Edits are committed while typing,
  // so this is what Escape has to put back.
  const originalRef = useRef(value)
  /**
   * The text this line last sent up, or the text it held when editing began.
   * While the user types, `value` comes straight back as whatever was just
   * sent - that is the one value the sync below has to leave alone.
   */
  const reportedRef = useRef(value)

  /**
   * Sync external changes into the contentEditable element.
   *
   * Whether the element has focus is the wrong thing to ask on its own. A line
   * keeps its element while the list shifts under it - removing a rule hands
   * index 0 the text of what used to be index 1 - so a browser that leaves
   * focus in the text through that would have this skip, and the removed
   * rule's text would sit there until a reload. Which browsers move focus off
   * a contentEditable when a button is pressed is not something to rest that
   * on.
   *
   * So the value is compared against what this line itself last sent up:
   * anything else came from outside and has to land, focus or no focus.
   * Writing it moves the caret, which is what should happen to text the user
   * did not type.
   */
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (document.activeElement === element && value === reportedRef.current) {
      return
    }
    if (element.textContent !== value) {
      element.textContent = value
    }
  }, [value])

  useEffect(() => {
    if (pending) ref.current?.focus()
  }, [pending])

  const readText = () => {
    const element = ref.current
    if (!element) return ''
    // Browsers insert <br> into empty contentEditable elements
    element.querySelectorAll('br').forEach((br) => br.remove())
    return (element.textContent || '').replace(/[\r\n]+/g, ' ').trim()
  }

  const handleFocus = () => {
    // Nothing is being removed any more, whatever the press did or did not
    // become: this edit's blur must not be silenced by it
    removalPending.current = false
    originalRef.current = value
    // Nothing has been sent up in this editing session yet, and the element
    // holds `value` - so that is the text to measure the next one against
    reportedRef.current = value
  }

  const handleInput = () => {
    if (!onInput) return
    const text = readText()
    // Emptying a line means removing it, which only happens once editing ends
    if (!text) return
    reportedRef.current = text
    onInput(text)
  }

  const handleBlur = () => {
    /**
     * A remove button is being pressed, so commit nothing. All a blur has left
     * to do is trim the text and drop the line if it is empty, and dropping a
     * line here would move the one the click is about to remove.
     *
     * The text goes back the way it was instead. This line may well survive the
     * click - only the line the button sits on is certain to go - and `value`
     * has not changed, so the sync effect above would not put it back.
     *
     * The flag is left standing for the click to clear: the click has not
     * happened yet. A press that never becomes one is cleared when the pointer
     * comes up instead.
     */
    if (removalPending.current) {
      const element = ref.current
      if (element && element.textContent !== value) {
        element.textContent = value
      }
      return
    }

    if (!onCommit) return

    const text = readText()

    /**
     * Put the trimmed text back on screen before committing it.
     *
     * Whitespace the trim dropped leaves the element holding text the rule
     * never took: typing a space is an edit that commits the same rule as
     * before, and the sync effect above only runs when `value` changes - so the
     * space would sit there, indenting a rule that is not indented, until a
     * reload. The element is no longer focused by the time a blur is handled,
     * so writing to it cannot disturb a caret.
     */
    const element = ref.current
    if (element && element.textContent !== text) {
      element.textContent = text
    }

    reportedRef.current = text
    onCommit(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      ref.current?.blur()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      if (ref.current) {
        // Put the text back and let the blur commit it, which also drops a
        // rule that was only just added
        ref.current.textContent = originalRef.current
      }
      ref.current?.blur()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain').replace(/[\r\n]+/g, ' ')
    document.execCommand('insertText', false, text)
  }

  return (
    <Flex
      align="start"
      gap="2"
      className={pending ? 'bootlegger-rule no-print' : 'bootlegger-rule'}
    >
      <Text size="2" style={{ lineHeight: 'inherit' }} aria-hidden>
        •
      </Text>
      <MaybeTooltip content={editable ? editLabel : undefined}>
        <Text
          ref={ref}
          size="2"
          contentEditable={editable}
          suppressContentEditableWarning
          onFocus={editable ? handleFocus : undefined}
          onInput={editable ? handleInput : undefined}
          onBlur={editable ? handleBlur : undefined}
          onKeyDown={editable ? handleKeyDown : undefined}
          onPaste={editable ? handlePaste : undefined}
          data-placeholder={editable ? placeholder : undefined}
          className={editable ? 'editable-rule' : undefined}
          style={{
            lineHeight: 'inherit',
            flex: 1,
            // Keep a single long word (a URL, say) from stretching the card
            minWidth: 0,
            overflowWrap: 'anywhere',
            cursor: editable ? 'text' : 'default',
            outline: 'none',
          }}
        >
          {!editable && value}
        </Text>
      </MaybeTooltip>
      {removable && (
        <MaybeTooltip content={onRemove ? removeLabel : undefined}>
          <IconButton
            size="1"
            variant="ghost"
            color="red"
            className="no-print bootlegger-rule-remove"
            aria-label={removeLabel}
            disabled={!onRemove}
            onMouseDown={() => (removalPending.current = true)}
            onClick={onRemove}
          >
            <Trash size={12} />
          </IconButton>
        </MaybeTooltip>
      )}
    </Flex>
  )
}

interface BootleggerRulesProps {
  /** Homebrew rules from `_meta.bootlegger` */
  rules: string[]
  /** Called with the new rule list; omit to render read-only */
  onChange?: (rules: string[]) => void
  /**
   * Renders the editable layout without any of the handlers. The drag preview
   * is a non-interactive copy of an editable card, and the add button is part
   * of that card's height - so leaving it out would make the preview shorter
   * than the card it was picked up from, at every rule count.
   */
  frozen?: boolean
}

/**
 * Homebrew rules shown on the Bootlegger card.
 *
 * Rules are stored in the script's `_meta.bootlegger` field. When `onChange` is
 * provided each rule can be edited in place, removed, and new rules can be
 * appended.
 *
 * @example
 * <BootleggerRules rules={['Spy does not know the Zombuul']} onChange={setRules} />
 */
export function BootleggerRules({
  rules,
  onChange,
  frozen,
}: BootleggerRulesProps) {
  const { t } = useTranslation()
  // A rule that is being typed but is not part of the script yet. It is
  // rendered as one extra line of the same list, so that turning it into a
  // real rule reuses the same element and the caret stays put.
  const [isAdding, setIsAdding] = useState(false)
  // Set once the pending line has become a real rule, so a second input event
  // that still sees the pending props cannot append it twice
  const hasAppendedRef = useRef(false)
  // Set while any of the remove buttons is being pressed, so the blur that
  // press causes leaves the list alone for the click to act on. See RuleLine.
  const removalPendingRef = useRef(false)

  /**
   * A press that never becomes a click must not go on silencing the next blur.
   *
   * Releasing ends the gesture whether or not it landed on the button: the blur
   * the press caused has already run by then, and a click that does follow
   * clears the flag itself. Without this the flag would stand until the next
   * focus, and the blur in between - emptying a rule and clicking away, say -
   * would be taken for part of a removal and put the rule back instead.
   */
  useEffect(() => {
    const endRemovalGesture = () => {
      removalPendingRef.current = false
    }

    window.addEventListener('pointerup', endRemovalGesture)
    return () => window.removeEventListener('pointerup', endRemovalGesture)
  }, [])

  // Whether the text can be typed into, as opposed to whether the editable
  // layout is drawn - a frozen card shows the layout but takes no input
  const editable = !!onChange
  const hasEditorLayout = editable || !!frozen

  if (!hasEditorLayout && rules.length === 0) return null

  const lines = isAdding ? [...rules, ''] : rules
  const isPending = (index: number) => index >= rules.length

  /**
   * Text edits are committed on every keystroke, the same way the script name
   * is. Committing on blur instead would move the Save button (the "Changes
   * made" badge and Revert appear next to it) out from under a click that
   * lands right after typing, and that click would be lost.
   */
  const handleInput = (index: number) => (value: string) => {
    if (!onChange) return

    if (!isPending(index)) {
      if (value === rules[index]) return
      onChange(rules.map((rule, i) => (i === index ? value : rule)))
      return
    }

    // The pending line just became a real rule
    if (hasAppendedRef.current) return
    hasAppendedRef.current = true
    setIsAdding(false)
    onChange([...rules, value])
  }

  const handleCommit = (index: number) => (value: string) => {
    if (!onChange) return

    if (isPending(index)) {
      // Nothing was typed into the pending line
      setIsAdding(false)
      return
    }

    if (!value) {
      // Emptying a rule removes it
      onChange(rules.filter((_, i) => i !== index))
      return
    }

    if (value === rules[index]) return
    onChange(rules.map((rule, i) => (i === index ? value : rule)))
  }

  const handleRemove = (index: number) => () => {
    // The gesture is over, so the next blur commits as usual again
    removalPendingRef.current = false

    /**
     * The line waiting for text goes either way. It is a blur that ends it, and
     * the blur this click caused was told to leave the list alone - so removing
     * any rule while a line is waiting has to end it here instead.
     */
    setIsAdding(false)

    if (isPending(index)) return

    onChange?.(rules.filter((_, i) => i !== index))
  }

  return (
    <Box
      mt="2"
      // With no rules the only content left is the add button, which does not
      // print - so the divider must not print either
      className={
        rules.length > 0 ? 'bootlegger-rules' : 'bootlegger-rules no-print'
      }
      style={{
        borderTop: '1px solid var(--gray-a5)',
        paddingTop: '8px',
      }}
    >
      {lines.map((rule, index) => (
        <RuleLine
          key={index}
          value={rule}
          editable={editable}
          pending={isPending(index)}
          placeholder={
            isPending(index) ? t('Describe the homebrew rule') : undefined
          }
          onInput={editable ? handleInput(index) : undefined}
          onCommit={editable ? handleCommit(index) : undefined}
          removable={hasEditorLayout}
          onRemove={editable ? handleRemove(index) : undefined}
          removalPending={removalPendingRef}
          editLabel={t('Click to edit')}
          removeLabel={t('Remove rule')}
        />
      ))}
      {hasEditorLayout && (
        <Button
          size="1"
          variant="ghost"
          color="gray"
          mt="2"
          className="no-print"
          // While an empty line is waiting to be typed into there is nothing to
          // add, and a disabled button cannot blur that line out from under the
          // caret
          disabled={isAdding || !editable}
          onClick={() => {
            hasAppendedRef.current = false
            setIsAdding(true)
          }}
        >
          <Plus size={12} /> {t('Add rule')}
        </Button>
      )}
    </Box>
  )
}
