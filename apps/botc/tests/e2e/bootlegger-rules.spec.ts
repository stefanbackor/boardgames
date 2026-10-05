import type { Locator } from '@playwright/test'
import { test, expect } from './fixtures'
import { moveCursorToLineEdge, tabToNextControl } from './keyboard'
import { openScript } from './script-state'

// Rules alone must bring in the Bootlegger, without an explicit character entry.
const scriptWithRules = [
  { id: '_meta', name: 'Homebrew Script', bootlegger: ['Original rule'] },
  'chef',
  'imp',
]

async function expectRefused(control: Locator, card: Locator) {
  await expect(control).toHaveAttribute('aria-disabled', 'true')
  const page = control.page()
  const editsBefore = await page.getByText('Changes made').count()
  await card.hover()
  await control.click({ force: true })
  // The click event has completed. Let React's queued render and the following
  // paint finish before checking that a refused action recorded no edit.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      }),
  )
  await expect(card).toBeVisible()
  await expect(page.getByText('Changes made')).toHaveCount(editsBefore)
}

test.describe('Bootlegger homebrew rules', () => {
  test('adds, edits, cancels and removes rules with the keyboard and pointer', async ({
    page,
    browserName,
  }) => {
    await openScript(page, scriptWithRules)
    const original = page.getByText('Original rule', { exact: true })
    await expect(original).toBeVisible()
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    const row = card.locator('.bootlegger-rule').first()
    const remove = row.getByRole('button', { name: 'Remove rule' })
    await expect
      .poll(() =>
        remove.evaluate((element) => {
          const style = getComputedStyle(element)
          return { opacity: style.opacity, pointerEvents: style.pointerEvents }
        }),
      )
      .toEqual({ opacity: '0', pointerEvents: 'none' })

    await original.click()
    await moveCursorToLineEdge(page, 'end')
    await page.keyboard.type(' draft')
    await page.keyboard.press('Escape')
    await expect(original).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)

    await original.click()
    await moveCursorToLineEdge(page, 'start')
    await page.keyboard.type('   ')
    await page.keyboard.press('Enter')
    await expect(original).toHaveText('Original rule')
    await expect(page.getByText('Changes made')).toHaveCount(0)

    await original.click()
    await page.mouse.move(0, 0)
    await expect
      .poll(() =>
        remove.evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe('1')
    await tabToNextControl(page, browserName)
    await expect(remove).toBeFocused()
    await expect(remove).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(original).toHaveCount(0)
    // The last rule disappearing must leave an editor ready for its replacement.
    await expect(
      page.getByRole('heading', { name: 'Bootlegger' }),
    ).toBeVisible()

    const add = page.getByRole('button', { name: 'Add rule' })
    await add.click()
    await expect(add).toBeDisabled()
    await page.keyboard.type('New')
    await expect(add).toBeEnabled()
    await page.keyboard.press('Enter')
    const replacement = page.getByText('New', { exact: true })
    await replacement.click()
    await moveCursorToLineEdge(page, 'end')
    await page.keyboard.type(' edited')
    await page.keyboard.press('Enter')
    await expect(page.getByText('New edited', { exact: true })).toBeVisible()

    await add.click()
    await page.keyboard.type('Drop')
    await page
      .getByRole('button', { name: 'Remove rule' })
      .last()
      .click({ force: true })
    await expect(page.getByText('Drop', { exact: true })).toHaveCount(0)

    await add.click()
    await page.keyboard.type('Other rule')
    await page.keyboard.press('Enter')
    const second = page.getByText('Other rule', { exact: true })
    await second.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')
    await expect(second).toHaveCount(0)

    const remaining = card.locator('.bootlegger-rule').first()
    await remaining.scrollIntoViewIfNeeded()
    await remaining.hover()
    await remaining.getByRole('button', { name: 'Remove rule' }).click()
    await expect(page.getByText('New edited')).toHaveCount(0)
  })

  test('removes a plain Bootlegger and adds it back with rules', async ({
    page,
  }) => {
    await openScript(page, [
      { id: '_meta', name: 'Plain Script' },
      'chef',
      'imp',
      'bootlegger',
    ])
    await expect(page.getByText('Plain Script').first()).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Bootlegger' }),
    ).toBeVisible()
    const addBootlegger = async () => {
      await page
        .locator('.team-header')
        .filter({ hasText: 'Loric' })
        .getByRole('button')
        .click()
      await page
        .getByRole('button', { name: /Bootlegger/ })
        .first()
        .click()
      await page.getByRole('button', { name: 'Done' }).click()
    }
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await card.hover()
    await card
      .getByRole('button', { name: 'Remove character' })
      .click({ force: true })
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toHaveCount(
      0,
    )
    await addBootlegger()
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('New rule')
    await page.keyboard.press('Enter')
    await expect(page.getByText('New rule', { exact: true })).toBeVisible()
  })

  test('shows and edits rules through every translated control', async ({
    page,
  }) => {
    await openScript(page, scriptWithRules)
    await expect(page.getByText('Original rule')).toBeVisible()
    const languages = [
      { option: 'Čeština', roleName: 'Pašerák', addRule: 'Přidat pravidlo' },
      {
        option: 'Deutsch',
        roleName: 'Bootlegger',
        addRule: 'Regel hinzufügen',
      },
      { option: 'English', roleName: 'Bootlegger', addRule: 'Add rule' },
      { option: 'Magyar', roleName: 'Csempész', addRule: 'Szabály hozzáadása' },
      {
        option: 'Nederlands',
        roleName: 'Bootlegger',
        addRule: 'Voeg regel toe',
      },
      { option: 'Polski', roleName: 'Przemytnik', addRule: 'Dodaj zasadę' },
    ]
    for (const language of languages) {
      await test.step(language.option, async () => {
        await page.getByRole('combobox').click()
        await page
          .getByRole('option', { name: language.option, exact: true })
          .click()
        await expect(
          page.getByRole('heading', { name: language.roleName }),
        ).toBeVisible()
        await expect(
          page.getByText('Original rule', { exact: true }),
        ).toBeVisible()
        await expect(
          page.getByRole('button', { name: language.addRule }),
        ).toBeEnabled()
      })
    }
    // One edit through a translated control checks the wiring; the editing
    // lifecycle is covered above, independent of the current language.
    await page.getByRole('button', { name: 'Dodaj zasadę' }).click()
    await page.keyboard.insertText('Translated rule')
    await page.keyboard.press('Enter')
    await expect(
      page.getByText('Translated rule', { exact: true }),
    ).toBeVisible()
  })

  test('saves on the first click while typing and while an emptied rule awaits blur', async ({
    page,
  }) => {
    await openScript(page, scriptWithRules)
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Typed into Save')
    await page.getByRole('button', { name: 'Save', exact: true }).click()
    await expect(page.getByText('Saved', { exact: true })).toBeVisible()
    const saved = () =>
      page.evaluate(() => {
        const id = new URL(location.href).searchParams.get('id')!
        const scripts = JSON.parse(localStorage.getItem('botc-saved-scripts')!)
          .state.scripts
        return JSON.stringify(scripts[id].scriptData)
      })
    expect(await saved()).toContain('Typed into Save')
    expect(await saved()).toContain('Original rule')
    await expect(page.getByText('Changes made')).toHaveCount(0)

    // The empty-on-Save regression needs a fresh shared script: an already
    // saved, unmodified script has no Save button until an edit is committed.
    await openScript(page, scriptWithRules)
    await page.getByText('Original rule', { exact: true }).click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Backspace')
    await expect(page.getByText('Changes made')).toHaveCount(0)
    await page.getByRole('button', { name: 'Save', exact: true }).click()
    await expect(page.getByText('Original rule', { exact: true })).toHaveCount(
      0,
    )
    await expect(page.getByText('Changes made')).toHaveCount(0)
    await expect.poll(saved).not.toContain('Original rule')
    expect(new URL(page.url()).searchParams.get('id')).toBeTruthy()
  })

  test('refuses removal and replacement and explains both by hover and keyboard', async ({
    page,
    browserName,
  }) => {
    await openScript(page, scriptWithRules)
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible()
    const remove = card.getByRole('button', { name: 'Remove character' })
    const replace = card.getByRole('button', { name: 'Replace character' })
    await expectRefused(remove, card)
    await expectRefused(replace, card)
    await remove.hover({ force: true })
    const tooltip = page.getByRole('tooltip', {
      name: 'Homebrew characters or rules require the Bootlegger',
    })
    await expect(tooltip).toBeVisible()
    await page.mouse.move(0, 0)
    await card.scrollIntoViewIfNeeded()
    // Keep the focused controls in view so Tab does not cause a scroll that
    // would dismiss the tooltip it just opened.
    await expect
      .poll(() =>
        card.evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeGreaterThanOrEqual(0)
    await replace.focus()
    await tabToNextControl(page, browserName)
    await expect(remove).toBeFocused()
    await expect(remove).toBeVisible()
    await expect(tooltip).toBeVisible()

    await page.getByText('Original rule', { exact: true }).click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')
    await expect(page.getByText('Original rule')).toHaveCount(0)
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

  test('keeps card actions out of the rule editor until an action is focused', async ({
    page,
  }) => {
    await openScript(page, scriptWithRules)
    const card = page
      .locator('.role-card')
      .filter({ hasText: 'Bootlegger' })
      .first()
    await expect(card).toBeVisible()
    const controls = card.locator('.role-card-controls')
    const opacity = () =>
      controls.evaluate((element) => getComputedStyle(element).opacity)
    await page.mouse.move(0, 0)
    await expect.poll(opacity).toBe('0')
    await card.locator('.editable-rule').first().focus()
    await controls.evaluate(async (element) => {
      // Force style resolution and await any transition caused by focus.
      getComputedStyle(element).opacity
      await Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      )
    })
    expect(await opacity()).toBe('0')
    await controls.getByRole('button').last().focus()
    await expect.poll(opacity).toBe('1')
  })

  test('removes the clicked rule when another empty rule blurs before the click', async ({
    page,
  }) => {
    await openScript(page, [
      {
        id: '_meta',
        name: 'Three rules',
        bootlegger: ['First rule', 'Second rule', 'Third rule'],
      },
      'chef',
      'imp',
    ])
    const rules = page.locator('.bootlegger-rule')
    const first = rules.nth(0).locator('.editable-rule')
    await first.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Backspace')
    await expect(first).toHaveText('')
    await rules.nth(1).hover()
    await rules.nth(1).getByRole('button', { name: 'Remove rule' }).click()
    await expect(page.getByText('Second rule')).toHaveCount(0)
    await expect(page.getByText('First rule', { exact: true })).toBeVisible()
    await expect(page.getByText('Third rule', { exact: true })).toBeVisible()
  })
})

test('refuses Bootlegger actions for a homebrew character', async ({
  page,
}) => {
  await openScript(page, [
    { id: '_meta', name: 'Homebrew character' },
    { id: 'mybrew', name: 'My Brew', team: 'townsfolk', ability: 'Does it' },
    'chef',
    'imp',
  ])
  const card = page
    .locator('.role-card')
    .filter({ hasText: 'Bootlegger' })
    .first()
  await expect(card).toBeVisible()
  await expectRefused(
    card.getByRole('button', { name: 'Remove character' }),
    card,
  )
})

test('refuses Djinn actions for a jinx and explains why', async ({ page }) => {
  await openScript(page, [
    { id: '_meta', name: 'Jinxed Script' },
    'alchemist',
    'spy',
    'chef',
    'imp',
  ])
  const card = page.locator('.role-card').filter({ hasText: 'Djinn' }).first()
  await expect(card).toBeVisible()
  const remove = card.getByRole('button', { name: 'Remove character' })
  await expectRefused(remove, card)
  await expectRefused(
    card.getByRole('button', { name: 'Replace character' }),
    card,
  )
  await remove.hover({ force: true })
  await expect(
    page.getByRole('tooltip', { name: 'Jinxed characters require the Djinn' }),
  ).toBeVisible()
})
