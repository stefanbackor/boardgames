import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Theme } from '@radix-ui/themes'
import { BootleggerRules } from './BootleggerRules'

/**
 * Radix measures its tooltip triggers, and jsdom has no ResizeObserver. Only
 * the tests that re-render hit it - a tooltip that never opens never measures -
 * so it is stubbed here rather than left to whichever test happens to trip it.
 */
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

const renderRules = (props: Parameters<typeof BootleggerRules>[0]) =>
  render(
    <Theme>
      <BootleggerRules {...props} />
    </Theme>,
  )

const button = (name: string) =>
  screen.queryByRole('button', { name }) as HTMLButtonElement | null

describe('BootleggerRules', () => {
  it('should render nothing read-only without rules', () => {
    const { container } = renderRules({ rules: [] })

    expect(container.querySelector('.bootlegger-rules')).toBeNull()
  })

  it('should list rules read-only without any controls', () => {
    renderRules({ rules: ['Rule A'] })

    expect(screen.getByText('Rule A')).toBeDefined()
    expect(button('Add rule')).toBeNull()
    expect(button('Remove rule')).toBeNull()
  })

  it('should offer the controls when editable', () => {
    renderRules({ rules: ['Rule A'], onChange: vi.fn() })

    expect(button('Add rule')?.disabled).toBe(false)
    expect(button('Remove rule')?.disabled).toBe(false)
  })

  /**
   * Radix draws the tooltip body whether or not it was given any content, so a
   * line with nothing to say must not be wrapped in a tooltip at all - the
   * `data-state` a tooltip trigger stamps on its child is what gives it away.
   */
  describe('tooltips', () => {
    it('should label an editable rule and its remove button', () => {
      const { container } = renderRules({
        rules: ['Rule A'],
        onChange: vi.fn(),
      })

      expect(
        container.querySelector('.editable-rule')?.getAttribute('data-state'),
      ).toBe('closed')
      expect(button('Remove rule')?.getAttribute('data-state')).toBe('closed')
    })

    it('should leave a read-only rule unwrapped', () => {
      renderRules({ rules: ['Rule A'] })

      expect(screen.getByText('Rule A').getAttribute('data-state')).toBeNull()
    })

    it('should leave a frozen rule and its dead button unwrapped', () => {
      renderRules({ rules: ['Rule A'], frozen: true })

      expect(screen.getByText('Rule A').getAttribute('data-state')).toBeNull()
      expect(button('Remove rule')?.getAttribute('data-state')).toBeNull()
    })
  })

  /**
   * The drag preview copies an editable card and has to match its height, so
   * the controls that make up that height have to be drawn - just dead.
   */
  describe('frozen', () => {
    it('should draw the editable layout with its controls disabled', () => {
      renderRules({ rules: ['Rule A'], frozen: true })

      expect(screen.getByText('Rule A')).toBeDefined()
      expect(button('Add rule')?.disabled).toBe(true)
      expect(button('Remove rule')?.disabled).toBe(true)
    })

    it('should still draw the add button with no rules at all', () => {
      renderRules({ rules: [], frozen: true })

      expect(button('Add rule')?.disabled).toBe(true)
    })

    it('should not make the text editable', () => {
      renderRules({ rules: ['Rule A'], frozen: true })

      expect(
        screen.getByText('Rule A').getAttribute('contenteditable'),
      ).not.toBe('true')
    })
  })
})

/**
 * The rule list as the app holds it: edits are committed to a parent that hands
 * the new list straight back. The spy records what was committed, so a test can
 * assert both the call and what the next render was given.
 *
 * A stateless spy would not do for the flow tests - appending a rule turns the
 * pending line into a real one, and that only happens if the new list comes
 * back in.
 */
function renderEditor(initial: string[]) {
  const onChange = vi.fn()

  function Editor() {
    const [rules, setRules] = useState(initial)
    return (
      <BootleggerRules
        rules={rules}
        onChange={(next) => {
          onChange(next)
          setRules(next)
        }}
      />
    )
  }

  const { container } = render(
    <Theme>
      <Editor />
    </Theme>,
  )

  /** The editable lines, in the order they are drawn */
  const lines = () =>
    Array.from(container.querySelectorAll<HTMLElement>('.editable-rule'))

  /**
   * Types into a line the way the browser does: the text lands in the element
   * and an input event follows. contentEditable takes no value prop, so this is
   * the only way in.
   */
  const type = (line: HTMLElement, text: string) => {
    line.textContent = text
    fireEvent.input(line)
  }

  /**
   * A real focus, not a dispatched focus event: the component blurs the line
   * itself to end an edit, and `blur()` only does something to an element the
   * document actually considers focused. Both go through `act` because a plain
   * DOM call is not the dispatch `fireEvent` wraps for us - without it the
   * commit runs but the render it causes has not landed yet.
   */
  const edit = (line: HTMLElement) => act(() => line.focus())

  /** Ends the edit the way Enter and a click elsewhere both do */
  const finish = (line: HTMLElement) => act(() => line.blur())

  const removeButtons = () =>
    screen.getAllByRole('button', { name: 'Remove rule' })

  return { onChange, lines, type, edit, finish, removeButtons, container }
}

describe('BootleggerRules editing', () => {
  it('should commit a trimmed edit as it is typed', () => {
    const { onChange, lines, type, edit } = renderEditor(['Rule A'])

    edit(lines()[0])
    type(lines()[0], '  Rule A, revised  ')

    expect(onChange).toHaveBeenCalledWith(['Rule A, revised'])
  })

  it('should leave an edit that changes nothing alone', () => {
    const { onChange, lines, type, edit, finish } = renderEditor(['Rule A'])

    edit(lines()[0])
    type(lines()[0], 'Rule A')
    finish(lines()[0])

    expect(onChange).not.toHaveBeenCalled()
  })

  /**
   * Whitespace the trim dropped leaves the element holding text the rule never
   * took. The commit that follows does not change the rule, so nothing else
   * would put it right until a reload.
   */
  it('should put the trimmed text back on screen when editing ends', () => {
    const { onChange, lines, type, edit, finish } = renderEditor(['Rule A'])

    edit(lines()[0])
    type(lines()[0], '   Rule A')
    finish(lines()[0])

    expect(lines()[0].textContent).toBe('Rule A')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should edit one rule of several without touching the rest', () => {
    const { onChange, lines, type, edit } = renderEditor(['A', 'B', 'C'])

    edit(lines()[1])
    type(lines()[1], 'B revised')

    expect(onChange).toHaveBeenCalledWith(['A', 'B revised', 'C'])
  })

  it('should drop a rule that is emptied', () => {
    const { onChange, lines, type, edit, finish } = renderEditor(['A', 'B'])

    edit(lines()[0])
    type(lines()[0], '')
    finish(lines()[0])

    // Emptying is not committed while typing - only ending the edit removes it
    expect(onChange).toHaveBeenCalledExactlyOnceWith(['B'])
    expect(lines()).toHaveLength(1)
  })

  it('should drop a rule through its remove button', () => {
    const { onChange, removeButtons, lines } = renderEditor(['A', 'B'])

    fireEvent.mouseDown(removeButtons()[0])
    fireEvent.click(removeButtons()[0])

    expect(onChange).toHaveBeenCalledWith(['B'])
    expect(lines()[0].textContent).toBe('B')
  })

  /**
   * The same press, from a browser that leaves focus in the rule text rather
   * than moving it to the button - which ones do that is not something to rest
   * correctness on. The list shifts under a line that still has focus, and the
   * text it goes on showing has to be the rule that is there now rather than
   * the one that was just removed.
   */
  it('should redraw a focused line the list shifted under', () => {
    const { onChange, lines, edit, removeButtons } = renderEditor(['A', 'B'])

    edit(lines()[0])

    // No blur in between, which is the whole point of this one
    fireEvent.mouseDown(removeButtons()[0])
    fireEvent.click(removeButtons()[0])

    expect(onChange).toHaveBeenCalledExactlyOnceWith(['B'])
    expect(document.activeElement).toBe(lines()[0])
    expect(lines()[0].textContent).toBe('B')
  })

  /**
   * Pressing remove blurs the line it is sitting on, and that blur must not
   * commit text that is about to be thrown away.
   */
  it('should not commit the text of a rule being removed', () => {
    const { onChange, lines, type, edit, removeButtons } = renderEditor([
      'A',
      'B',
    ])

    edit(lines()[0])
    type(lines()[0], 'A revised')
    onChange.mockClear()

    fireEvent.mouseDown(removeButtons()[0])
    fireEvent.blur(lines()[0])
    fireEvent.click(removeButtons()[0])

    expect(onChange).toHaveBeenCalledExactlyOnceWith(['B'])
  })

  /**
   * The blur a remove press causes runs before the click, and the click names
   * its rule by position - so a blur that dropped a rule would shift the rule
   * being removed, and the one after it would go instead.
   */
  it('should remove the rule whose button was pressed, not the one after it', () => {
    const { onChange, lines, type, edit, finish, removeButtons } = renderEditor(
      ['A', 'B', 'C'],
    )

    // Emptying a rule removes it, and that is still waiting on the blur
    edit(lines()[0])
    type(lines()[0], '')
    expect(onChange).not.toHaveBeenCalled()

    // Press B's button the way a browser sequences it: mouse down, the blur it
    // causes, then the click
    const removeB = removeButtons()[1]
    fireEvent.mouseDown(removeB)
    finish(lines()[0])
    fireEvent.click(removeB)

    expect(onChange).toHaveBeenCalledExactlyOnceWith(['A', 'C'])
    expect(lines().map((line) => line.textContent)).toEqual(['A', 'C'])
  })

  it('should put an emptied rule back while a remove button is held down', () => {
    const { onChange, lines, type, edit, finish, removeButtons } = renderEditor(
      ['A', 'B'],
    )

    edit(lines()[0])
    type(lines()[0], '')

    // Still held down, so the click it may become has yet to name its rule
    fireEvent.mouseDown(removeButtons()[1])
    finish(lines()[0])

    expect(onChange).not.toHaveBeenCalled()
    expect(lines()[0].textContent).toBe('A')
  })

  it('should drop an emptied rule once a press has come to nothing', () => {
    const { onChange, lines, type, edit, finish, removeButtons } = renderEditor(
      ['A', 'B'],
    )

    // Pressed and released away from the button, so no click follows and there
    // is no removal left for the blur below to keep out of the way of
    fireEvent.mouseDown(removeButtons()[1])
    fireEvent.pointerUp(window)

    edit(lines()[0])
    type(lines()[0], '')
    finish(lines()[0])

    expect(onChange).toHaveBeenCalledExactlyOnceWith(['B'])
  })

  it('should commit again after a press that came to nothing', () => {
    const { onChange, lines, type, edit, finish, removeButtons } = renderEditor(
      ['A', 'B'],
    )

    fireEvent.mouseDown(removeButtons()[1])

    // Nothing was removed, so the edit that follows commits as usual
    edit(lines()[0])
    type(lines()[0], '  A revised  ')
    finish(lines()[0])

    expect(onChange).toHaveBeenLastCalledWith(['A revised', 'B'])
    expect(lines()[0].textContent).toBe('A revised')
  })

  describe('adding', () => {
    const addButton = () => screen.getByRole('button', { name: 'Add rule' })

    it('should turn the line waiting for text into a rule', () => {
      const { onChange, lines, type } = renderEditor(['A'])

      fireEvent.click(addButton())
      expect(lines()).toHaveLength(2)

      type(lines()[1], 'B')

      expect(onChange).toHaveBeenCalledExactlyOnceWith(['A', 'B'])
      // The same element carries on as the real rule, so the caret stays put
      expect(lines()).toHaveLength(2)
      expect(lines()[1].textContent).toBe('B')
    })

    it('should keep typing into the rule it just created', () => {
      const { onChange, lines, type } = renderEditor(['A'])

      fireEvent.click(addButton())
      type(lines()[1], 'B')
      type(lines()[1], 'Bo')
      type(lines()[1], 'Bootleg')

      expect(onChange).toHaveBeenLastCalledWith(['A', 'Bootleg'])
      expect(lines()).toHaveLength(2)
    })

    it('should not offer adding while a line is still waiting', () => {
      renderEditor(['A'])

      fireEvent.click(addButton())

      expect((addButton() as HTMLButtonElement).disabled).toBe(true)
    })

    it('should offer adding again once the line has text', () => {
      const { lines, type } = renderEditor(['A'])

      fireEvent.click(addButton())
      type(lines()[1], 'B')

      expect((addButton() as HTMLButtonElement).disabled).toBe(false)
    })

    it('should forget a line nothing was typed into', () => {
      const { onChange, lines, finish } = renderEditor(['A'])

      fireEvent.click(addButton())
      finish(lines()[1])

      expect(onChange).not.toHaveBeenCalled()
      expect(lines()).toHaveLength(1)
    })

    it('should ignore whitespace typed into the waiting line', () => {
      const { onChange, lines, type, finish } = renderEditor(['A'])

      fireEvent.click(addButton())
      type(lines()[1], '   ')
      finish(lines()[1])

      expect(onChange).not.toHaveBeenCalled()
      expect(lines()).toHaveLength(1)
    })

    it('should forget a waiting line dropped through its remove button', () => {
      const { onChange, lines, removeButtons } = renderEditor(['A'])

      fireEvent.click(addButton())
      fireEvent.click(removeButtons()[1])

      expect(onChange).not.toHaveBeenCalled()
      expect(lines()).toHaveLength(1)
    })

    it('should keep the line waiting for text off the printed sheet', () => {
      const { container, lines, type } = renderEditor(['A'])
      const ruleOf = (line: HTMLElement) => line.closest('.bootlegger-rule')!

      fireEvent.click(addButton())

      // Printing mid-edit would otherwise carry an empty bullet the script
      // never had
      expect(ruleOf(lines()[1]).className).toContain('no-print')
      expect(ruleOf(lines()[0]).className).not.toContain('no-print')

      type(lines()[1], 'B')

      // It is a real rule now, so it belongs on the sheet
      expect(ruleOf(lines()[1]).className).not.toContain('no-print')
      expect(
        container.querySelectorAll('.bootlegger-rule.no-print'),
      ).toHaveLength(0)
    })

    it('should add a first rule to a list that has none', () => {
      const { onChange, lines, type } = renderEditor([])

      fireEvent.click(addButton())
      type(lines()[0], 'First')

      expect(onChange).toHaveBeenCalledExactlyOnceWith(['First'])
    })
  })

  /**
   * Escape puts the text back and blurs the line, and it is that blur which
   * commits the restored text - so there is nothing left to fire by hand here.
   */
  describe('cancelling', () => {
    it('should put the original text back', () => {
      const { onChange, lines, type, edit } = renderEditor(['Rule A'])

      edit(lines()[0])
      type(lines()[0], 'Rule A, revised')
      expect(onChange).toHaveBeenCalledWith(['Rule A, revised'])

      fireEvent.keyDown(lines()[0], { key: 'Escape' })

      expect(lines()[0].textContent).toBe('Rule A')
      expect(onChange).toHaveBeenLastCalledWith(['Rule A'])
    })

    it('should drop a rule that had only just been added', () => {
      const { onChange, lines, type, edit } = renderEditor(['A'])

      fireEvent.click(screen.getByRole('button', { name: 'Add rule' }))
      edit(lines()[1])
      type(lines()[1], 'B')
      expect(onChange).toHaveBeenCalledWith(['A', 'B'])

      // The line started out empty, so that is what Escape restores - and an
      // empty rule is a removed one
      fireEvent.keyDown(lines()[1], { key: 'Escape' })

      expect(onChange).toHaveBeenLastCalledWith(['A'])
      expect(lines()).toHaveLength(1)
    })
  })
})
