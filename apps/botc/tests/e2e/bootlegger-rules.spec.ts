import { test, expect } from './fixtures'

/**
 * Scripts carry homebrew rules in `_meta.bootlegger`, the same way the official
 * script tool does. The Bootlegger (Loric) card lists them and lets the
 * Storyteller edit them.
 */
const scriptWithRules = [
  {
    id: '_meta',
    name: "Frankenstein's Mayor v1.0.0",
    author: '6[3, 1, 1, 1], 5[3, 0, 1, 1]',
    bootlegger: ['Spy does not know who the Zombuul is'],
  },
  'chef',
  'undertaker',
  'oracle',
  'sage',
  'ravenkeeper',
  'mayor',
  'recluse',
  'lunatic',
  'poisoner',
  'spy',
  'zombuul',
  'sentinel',
  'bootlegger',
]

/**
 * A control the script content refuses. Those are marked `aria-disabled` rather
 * than `disabled` so the tooltip explaining why stays reachable from the
 * keyboard, and `toBeDisabled()` does not recognise that.
 *
 * Pass the card to also press the control and check that pressing it changed
 * nothing. That is the property the attribute only advertises: `aria-disabled`
 * alone stops no clicks, so a handler wired to a refused control would pass an
 * attribute check and still take the role out of the script.
 *
 * The card outliving the click is not the test - the auto-roles put an
 * auto-added Bootlegger straight back, so that would pass either way. What a
 * refused control must not do is record an edit, and the "Changes made" badge
 * is where an edit shows up.
 */
async function expectRefused(
  locator: import('@playwright/test').Locator,
  card?: import('@playwright/test').Locator,
) {
  await expect(locator).toHaveAttribute('aria-disabled', 'true')

  if (!card) return

  const page = card.page()
  const editsBefore = await page.getByText('Changes made').count()

  // The button is only visible while the card is hovered, and a refused one is
  // drawn with the pointer-events of a live control, so the click has to land
  await card.hover()
  await locator.click({ force: true })

  // An edit would show up on the next render, and the assertions below would
  // otherwise be free to pass before it lands
  await page.waitForTimeout(200)

  await expect(card).toBeVisible()
  await expect(page.getByText('Changes made')).toHaveCount(editsBefore)
}

function scriptUrl(scriptData: unknown) {
  const encoded = Buffer.from(JSON.stringify(scriptData), 'utf-8').toString(
    'base64',
  )
  return `/?script=${encodeURIComponent(encoded)}`
}

test.describe('Bootlegger homebrew rules', () => {
  // These tests type rule text key by key, which runs long enough to hit the
  // default timeout when the whole suite shares one dev server
  test.describe.configure({ timeout: 60_000 })

  test('should show the Bootlegger and its homebrew rules', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))

    await expect(page.getByText("Frankenstein's Mayor").first()).toBeVisible({
      timeout: 10000,
    })

    // The Bootlegger is part of the script even though it has no custom characters
    await expect(
      page.getByRole('heading', { name: 'Bootlegger' }),
    ).toBeVisible()
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible()
  })

  test('should keep the Bootlegger when only rules are declared', async ({
    page,
  }) => {
    // Same script, but without "bootlegger" in the character list
    const withoutBootlegger = scriptWithRules.filter(
      (item) => item !== 'bootlegger',
    )

    await page.goto(scriptUrl(withoutBootlegger))

    // The rules alone are enough to bring the Bootlegger in
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toBeVisible(
      { timeout: 10000 },
    )
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible()
  })

  test('should add, edit and remove rules', async ({ page }) => {
    await page.goto(scriptUrl(scriptWithRules))

    const firstRule = page.getByText('Spy does not know who the Zombuul is')
    await expect(firstRule).toBeVisible({ timeout: 10000 })

    // Add a second rule
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('The Mayor may not be executed twice')
    await page.keyboard.press('Enter')

    await expect(
      page.getByText('The Mayor may not be executed twice'),
    ).toBeVisible()

    // Edit the first rule in place
    await firstRule.click()
    await page.keyboard.press('End')
    await page.keyboard.type(' tonight')
    await page.keyboard.press('Enter')

    await expect(
      page.getByText('Spy does not know who the Zombuul is tonight'),
    ).toBeVisible()

    // Emptying a rule removes it
    const secondRule = page.getByText('The Mayor may not be executed twice')
    await secondRule.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')

    await expect(
      page.getByText('The Mayor may not be executed twice'),
    ).toHaveCount(0)
    await expect(
      page.getByText('Spy does not know who the Zombuul is tonight'),
    ).toBeVisible()
  })

  test('should let a plain script gain a Bootlegger and rules', async ({
    page,
  }) => {
    const plainScript = [
      { id: '_meta', name: 'Plain Script', author: 'Author' },
      'chef',
      'undertaker',
      'poisoner',
      'imp',
    ]

    await page.goto(scriptUrl(plainScript))
    await expect(page.getByText('Plain Script').first()).toBeVisible({
      timeout: 10000,
    })

    // No homebrew content yet, so no Bootlegger
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toHaveCount(
      0,
    )

    // Add it from the Loric section
    const loricHeader = page
      .locator('.team-header')
      .filter({ hasText: 'Loric' })
    await loricHeader.getByRole('button').click()
    await page
      .getByRole('button', { name: /Bootlegger/ })
      .first()
      .click()
    await page.getByRole('button', { name: 'Done' }).click()

    await expect(
      page.getByRole('heading', { name: 'Bootlegger' }),
    ).toBeVisible()

    // ...and give it a homebrew rule
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Executions are secret')
    await page.keyboard.press('Enter')

    await expect(page.getByText('Executions are secret')).toBeVisible()
  })

  // Every language the header offers: the rules UI must be reachable and the
  // rule text itself is author content, so it stays as written
  const languages = [
    { option: 'Čeština', roleName: 'Pašerák', addRule: 'Přidat pravidlo' },
    { option: 'Deutsch', roleName: 'Bootlegger', addRule: 'Regel hinzufügen' },
    { option: 'English', roleName: 'Bootlegger', addRule: 'Add rule' },
    { option: 'Magyar', roleName: 'Csempész', addRule: 'Szabály hozzáadása' },
    { option: 'Nederlands', roleName: 'Bootlegger', addRule: 'Voeg regel toe' },
    { option: 'Polski', roleName: 'Przemytnik', addRule: 'Dodaj zasadę' },
  ]

  for (const language of languages) {
    test(`should show and edit rules in ${language.option}`, async ({
      page,
    }) => {
      await page.goto(scriptUrl(scriptWithRules))
      await expect(
        page.getByText('Spy does not know who the Zombuul is'),
      ).toBeVisible({ timeout: 10000 })

      await page.getByRole('combobox').click()
      await page
        .getByRole('option', { name: language.option, exact: true })
        .click()

      // Translated character name, untouched rule text
      await expect(
        page.getByRole('heading', { name: language.roleName }),
      ).toBeVisible()
      await expect(
        page.getByText('Spy does not know who the Zombuul is'),
      ).toBeVisible()

      /**
       * Adding a rule works through the translated control. The text goes in
       * as one insert rather than key by key: this test is about the
       * translated controls, and rule edits are committed on every keystroke -
       * so typing it out costs a full re-render per character, six times over
       * and once per browser project. The per-keystroke behaviour itself is
       * covered by the tests above.
       */
      await page.getByRole('button', { name: language.addRule }).click()
      await page.keyboard.insertText('Another homebrew rule')
      await page.keyboard.press('Enter')

      await expect(page.getByText('Another homebrew rule')).toBeVisible()
    })
  }

  test('should save a rule that is still being edited when Save is clicked', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Typed straight into Save')

    // No Enter: the rule is committed while typing, so the very first click on
    // Save has to land and save it
    await page.getByRole('button', { name: 'Save', exact: true }).click()

    const savedRules = await page.evaluate(() => {
      return Object.keys(localStorage)
        .map((key) => localStorage.getItem(key) || '')
        .find((value) => value.includes('bootlegger'))
    })

    expect(savedRules).toContain('Spy does not know who the Zombuul is')
    expect(savedRules).toContain('Typed straight into Save')
  })

  test('should save a rule emptied by the same click on Save', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const rule = page.getByText('Spy does not know who the Zombuul is')
    await expect(rule).toBeVisible({ timeout: 10000 })

    /**
     * Emptying a rule is what removes it, and it is the one rule edit committed
     * when the line loses focus rather than while typing - so the blur that
     * commits it is caused by the very click on Save that is meant to save it.
     *
     * Committing turns "modified" on, which brings the Revert button in. The
     * single click still has to land: a Revert appearing to the right of Save
     * would slide Save out from under the pointer between the press and the
     * release, and the click would reach neither button.
     */
    await rule.click()
    await page.keyboard.press('Control+A')
    await page.keyboard.press('Backspace')
    await expect(page.getByText('Changes made')).toHaveCount(0)

    await page.getByRole('button', { name: 'Save', exact: true }).click()

    // Saving clears the diff, so the badge is how the save shows up on screen
    await expect(page.getByText('Saved')).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)
    expect(new URL(page.url()).searchParams.get('id')).toBeTruthy()

    const saved = await page.evaluate(
      () => localStorage.getItem('botc-saved-scripts') || '',
    )
    expect(saved).toContain("Frankenstein's Mayor")
    expect(saved).not.toContain('Spy does not know who the Zombuul is')
  })

  test('should not offer adding a rule while an empty line waits', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible({ timeout: 10000 })

    const addRule = page.getByRole('button', { name: 'Add rule' })
    await addRule.click()

    // Pressing it again would only blur the line the caret sits in
    await expect(addRule).toBeDisabled()

    await page.keyboard.type('A rule worth adding')
    await expect(addRule).toBeEnabled()
    await expect(page.getByText('A rule worth adding')).toBeVisible()
  })

  test('should keep the rules editor after the last rule is deleted', async ({
    page,
  }) => {
    // Only the rules bring the Bootlegger in, there is no "bootlegger" entry
    const withoutBootlegger = scriptWithRules.filter(
      (item) => item !== 'bootlegger',
    )

    await page.goto(scriptUrl(withoutBootlegger))
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toBeVisible(
      {
        timeout: 10000,
      },
    )

    const rule = page.getByText('Spy does not know who the Zombuul is')
    await rule.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')

    await expect(rule).toHaveCount(0)

    // The card stays so that a new rule can be typed right away
    await expect(
      page.getByRole('heading', { name: 'Bootlegger' }),
    ).toBeVisible()
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('A replacement rule')
    await page.keyboard.press('Enter')

    await expect(page.getByText('A replacement rule')).toBeVisible()
  })

  test('should reveal the remove button once the rule is being edited', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const rule = page.getByText('Spy does not know who the Zombuul is')
    await expect(rule).toBeVisible({ timeout: 10000 })

    const removeButton = page.getByRole('button', { name: 'Remove rule' })
    const buttonStyle = () =>
      removeButton.evaluate((element) => {
        const style = getComputedStyle(element)
        return { opacity: style.opacity, pointerEvents: style.pointerEvents }
      })

    // Hidden means it cannot be hit either, so a stray tap next to the text
    // cannot drop a rule
    await expect.poll(buttonStyle).toEqual({
      opacity: '0',
      pointerEvents: 'none',
    })

    // Touch has no hover, so editing the rule is what has to bring it out
    await rule.click()
    await page.mouse.move(0, 0)

    await expect.poll(buttonStyle).toEqual({
      opacity: '1',
      pointerEvents: 'auto',
    })
  })

  test('should not allow removing a Bootlegger that carries rules', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible({ timeout: 10000 })

    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    const remove = card.getByRole('button', { name: 'Remove character' })

    // Removing it would be undone by the auto-roles, so the control is dead -
    // and says why rather than just being absent
    await expectRefused(remove, card)
    await card.hover()
    await remove.hover({ force: true })
    await expect(
      page.getByRole('tooltip', {
        name: 'Homebrew characters or rules require the Bootlegger',
      }),
    ).toBeVisible()

    // Deleting the last rule keeps the editor open, so removal still would not
    // stick and is still refused - but the reason is no longer the rules
    const rule = page.getByText('Spy does not know who the Zombuul is')
    await rule.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')

    await expect(rule).toHaveCount(0)
    await expectRefused(remove, card)

    await page.mouse.move(0, 0)
    await card.hover()
    await remove.hover({ force: true })
    await expect(
      page.getByRole('tooltip', {
        name: 'Save the script to remove the Bootlegger',
      }),
    ).toBeVisible()
  })

  test('should let a Bootlegger without homebrew content be removed', async ({
    page,
  }) => {
    // No homebrew characters and no rules, so nothing pins the Bootlegger
    const plainScript = [
      { id: '_meta', name: 'Plain Script', author: 'Author' },
      'chef',
      'undertaker',
      'poisoner',
      'imp',
      'bootlegger',
    ]

    await page.goto(scriptUrl(plainScript))
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible({ timeout: 10000 })

    await card
      .getByRole('button', { name: 'Remove character' })
      .click({ force: true })

    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toHaveCount(
      0,
    )
  })

  test('should not allow removing a Bootlegger held by a homebrew character', async ({
    page,
  }) => {
    const withCustomRole = [
      { id: '_meta', name: 'Homebrew Script', author: 'Author' },
      { id: 'mybrew', name: 'My Brew', team: 'townsfolk', ability: 'Does it' },
      'chef',
      'poisoner',
      'imp',
    ]

    await page.goto(scriptUrl(withCustomRole))
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible({ timeout: 10000 })

    // The homebrew character brings it in, so removing it would do nothing
    await expectRefused(
      card.getByRole('button', { name: 'Remove character' }),
      card,
    )
  })

  test('should restore the original text when editing is cancelled', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const rule = page.getByText('Spy does not know who the Zombuul is')
    await expect(rule).toBeVisible({ timeout: 10000 })

    await rule.click()
    await page.keyboard.press('End')
    await page.keyboard.type(' and never will')
    await page.keyboard.press('Escape')

    await expect(page.getByText('and never will')).toHaveCount(0)
    await expect(rule).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should not leave trimmed whitespace on a rule', async ({ page }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const rule = page.getByText('Spy does not know who the Zombuul is')
    await expect(rule).toBeVisible({ timeout: 10000 })

    // The rule commits trimmed, so this is an edit that changes nothing - and
    // the space must not be left indenting a rule that is not indented
    await rule.click()
    await page.keyboard.press('Home')
    await page.keyboard.type('   ')
    await page.keyboard.press('Enter')

    await expect(rule).toHaveText('Spy does not know who the Zombuul is')
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should remove a rule through its button without forcing the click', async ({
    page,
  }) => {
    await page.goto(
      scriptUrl([
        {
          id: '_meta',
          name: 'Two rules',
          author: 'QA',
          bootlegger: ['Rule to keep', 'Rule to drop'],
        },
        'chef',
        'imp',
      ]),
    )

    const row = page
      .locator('.bootlegger-rule')
      .filter({ hasText: 'Rule to drop' })
    await expect(row).toBeVisible({ timeout: 10000 })
    await row.evaluate((element) => element.scrollIntoView({ block: 'center' }))

    // Hovering is what reveals the button, and an unforced click is what proves
    // it is really reachable - a forced one would pass either way
    await row.hover()
    await row.getByRole('button', { name: 'Remove rule' }).click()

    await expect(page.getByText('Rule to drop')).toHaveCount(0)
    await expect(page.getByText('Rule to keep')).toBeVisible()
  })

  test('should reach the remove button from the keyboard', async ({ page }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const rule = page.getByText('Spy does not know who the Zombuul is')
    await expect(rule).toBeVisible({ timeout: 10000 })
    await rule.evaluate((element) =>
      element.scrollIntoView({ block: 'center' }),
    )

    await rule.click()
    await page.keyboard.press('Tab')

    await expect(
      page.getByRole('button', { name: 'Remove rule' }).first(),
    ).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toHaveCount(0)
  })

  test('should not put the card controls over a rule being typed', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible({ timeout: 10000 })

    const controls = card.locator('.role-card-controls')
    const opacity = () =>
      controls.evaluate((element) => getComputedStyle(element).opacity)

    /**
     * The reveal is a transition, so a reading taken the instant focus moves
     * catches it part way. Polling waits it out; a state that has to hold gets
     * the same wait spent standing still instead.
     */
    const settled = 300

    // The pointer stays away from the card, or hover would be what the
    // assertions below end up measuring
    await page.mouse.move(0, 0)
    expect(await opacity()).toBe('0')

    /**
     * Focus inside the card is not focus on its controls. Reading one for the
     * other drops a live Remove button onto the text being typed.
     */
    await card
      .locator('.bootlegger-rule [contenteditable]')
      .first()
      .evaluate((element) => (element as HTMLElement).focus())
    await page.waitForTimeout(settled)
    expect(await opacity()).toBe('0')

    // Reaching a control itself still has to show it, tooltip and all
    await controls.getByRole('button').last().focus()
    await expect.poll(opacity, { timeout: 5000 }).toBe('1')
  })

  test('should refuse to replace a Bootlegger it refuses to remove', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible({ timeout: 10000 })

    // Replacing takes the role out of the script just as removing it does, so
    // the guard has to cover both or it is no guard at all
    await expectRefused(
      card.getByRole('button', { name: 'Remove character' }),
      card,
    )
    await expectRefused(
      card.getByRole('button', { name: 'Replace character' }),
      card,
    )
  })

  test('should say why a refused control is refused without a mouse', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible({ timeout: 10000 })

    const replace = card.getByRole('button', { name: 'Replace character' })
    const remove = card.getByRole('button', { name: 'Remove character' })
    await expectRefused(replace)
    await expectRefused(remove)

    // A `disabled` button takes no focus at all, which would leave the reason
    // behind a mouse hover. Tabbing from one refused control to the next only
    // works because they are merely aria-disabled - and the controls have to
    // show themselves on focus, or the tooltip opens on an invisible button.
    await replace.focus()
    await page.keyboard.press('Tab')

    await expect(remove).toBeFocused()
    await expect(remove).toBeVisible()
    await expect(
      page.getByRole('tooltip', {
        name: 'Homebrew characters or rules require the Bootlegger',
      }),
    ).toBeVisible()
  })

  test('should discard a rule that is removed while being typed', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Rule typed by mistake')

    // Dropping the line must not commit what was typed into it
    await page
      .getByRole('button', { name: 'Remove rule' })
      .last()
      .click({ force: true })

    await expect(page.getByText('Rule typed by mistake')).toHaveCount(0)
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible()
  })

  /**
   * Emptying a rule removes it, but only once the edit ends - and pressing
   * another rule's remove button is what ends it. The blur runs before the
   * click, so a rule dropped there would shift the rule the click is about to
   * name by position, and the one after it would go instead. jsdom only lets
   * that sequence be staged by hand; here the browser sequences it itself.
   */
  test('should remove the rule whose button was pressed, not the one after it', async ({
    page,
  }) => {
    await page.goto(
      scriptUrl([
        {
          id: '_meta',
          name: 'Three rules',
          bootlegger: ['First rule', 'Second rule', 'Third rule'],
        },
        ...scriptWithRules.slice(1),
      ]),
    )

    await expect(page.getByText('First rule')).toBeVisible({ timeout: 10000 })

    const rules = page.locator('.bootlegger-rule')
    const first = rules.nth(0).locator('.editable-rule')

    // Clear the first rule, which is a removal still waiting on the blur
    await first.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Backspace')
    await expect(first).toHaveText('')

    // The button is hidden until its own rule is hovered, so the pointer has to
    // go there first - and hovering is not what ends the edit, the press is
    await rules.nth(1).hover()
    await rules.nth(1).getByRole('button', { name: 'Remove rule' }).click()

    // The rule that was pressed is the one that goes. The emptied rule is put
    // back rather than guessed at, so nothing the click did not name is lost.
    await expect(page.getByText('Second rule')).toHaveCount(0)
    await expect(page.getByText('First rule')).toBeVisible()
    await expect(page.getByText('Third rule')).toBeVisible()
  })

  test('should show unsaved rules in the script JSON view', async ({
    page,
  }) => {
    await page.goto(scriptUrl(scriptWithRules))
    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Unsaved rule')
    await page.keyboard.press('Enter')

    // The JSON the app hands out reflects the edit before saving
    // The label is "Paste" on mobile viewports
    await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
    const json = await page.locator('textarea').inputValue()

    expect(json).toContain('Unsaved rule')
    expect(json).toContain('Spy does not know who the Zombuul is')
  })

  test('should save edited rules into the script JSON', async ({ page }) => {
    await page.goto(scriptUrl(scriptWithRules))

    await expect(
      page.getByText('Spy does not know who the Zombuul is'),
    ).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Demon starts knowing 1 Outsider')
    await page.keyboard.press('Enter')

    await page.getByRole('button', { name: 'Save', exact: true }).click()

    // The saved script keeps both rules in _meta.bootlegger
    const savedRules = await page.evaluate(() => {
      const raw = Object.keys(localStorage)
        .map((key) => localStorage.getItem(key) || '')
        .find((value) => value.includes('bootlegger'))
      return raw
    })

    expect(savedRules).toContain('Spy does not know who the Zombuul is')
    expect(savedRules).toContain('Demon starts knowing 1 Outsider')
  })
})

/**
 * The Djinn is brought in by the same auto-roles as the Bootlegger, so a
 * control that would take it back out is refused the same way. It is tested
 * here because this is where the helper for a refused control lives.
 */
test.describe('Auto-added Djinn', () => {
  const jinxedScript = [
    { id: '_meta', name: 'Jinxed Script', author: 'Author' },
    'alchemist',
    'spy',
    'chef',
    'imp',
  ]

  test('should not allow removing a Djinn held by a jinx', async ({ page }) => {
    await page.goto(scriptUrl(jinxedScript))
    const card = page.locator('.role-card').filter({ hasText: 'Djinn' }).first()
    await expect(card).toBeVisible({ timeout: 10000 })

    const remove = card.getByRole('button', { name: 'Remove character' })
    await expectRefused(remove, card)
    await expectRefused(card.getByRole('button', { name: 'Replace character' }))

    await card.hover()
    await remove.hover({ force: true })
    await expect(
      page.getByRole('tooltip', {
        name: 'Jinxed characters require the Djinn',
      }),
    ).toBeVisible()
  })

  test('should let a Djinn without an active jinx be removed', async ({
    page,
  }) => {
    // Only one half of the jinx is in the script, so nothing pins the Djinn
    const withoutJinx = [
      { id: '_meta', name: 'Plain Script', author: 'Author' },
      'alchemist',
      'chef',
      'poisoner',
      'imp',
      'djinn',
    ]

    await page.goto(scriptUrl(withoutJinx))
    await expect(
      page.getByRole('heading', { name: 'Chef' }).first(),
    ).toBeVisible({ timeout: 10000 })

    await expect(page.getByRole('heading', { name: 'Djinn' })).toHaveCount(0)
  })
})
