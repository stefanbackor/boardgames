import { gunzipSync } from 'node:zlib'
import { test, expect } from './fixtures'

/**
 * Edits to the script metadata (name, author, homebrew rules) live in the
 * modification store until they are saved, and are resolved into the script
 * wherever one is handed out - so the JSON view, the JSON download and the
 * share link all match what is on screen, saved or not.
 */
const script = [
  { id: '_meta', name: 'Meta Edit Script', author: 'Original Author' },
  'washerwoman',
  'librarian',
  'chef',
  'poisoner',
  'imp',
]

function scriptUrl(scriptData: unknown) {
  const encoded = Buffer.from(JSON.stringify(scriptData), 'utf-8').toString(
    'base64',
  )
  return `/?script=${encodeURIComponent(encoded)}`
}

async function replaceText(
  page: import('@playwright/test').Page,
  currentText: string,
  newText: string,
) {
  await page.getByText(currentText, { exact: true }).first().click()
  await page.keyboard.press('ControlOrMeta+a')
  await page.keyboard.type(newText)
  await page.keyboard.press('Enter')
}

async function readScriptJson(page: import('@playwright/test').Page) {
  // The label is "Paste" on mobile viewports
  await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
  const json = await page.locator('textarea').inputValue()
  await page.getByRole('button', { name: 'Cancel' }).click()
  return json
}

test.describe('Script metadata edits', () => {
  // These tests type metadata key by key, which runs long enough to hit the
  // default timeout when the whole suite shares one dev server
  test.describe.configure({ timeout: 60_000 })

  test('should show an unsaved name in the script JSON view', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')

    const json = await readScriptJson(page)
    expect(json).toContain('Renamed Script')
    expect(json).not.toContain('Meta Edit Script')
  })

  test('should show an unsaved author in the script JSON view', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Original Author').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Original Author', 'New Author')

    const json = await readScriptJson(page)
    expect(json).toContain('New Author')
    expect(json).not.toContain('Original Author')
  })

  test('should clear a name everywhere at once', async ({ page }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    // The heading plus both night order sheets, so an empty name has to reach
    // all three - a cleared name that only clears the heading leaves the sheets
    // showing the name saving is about to drop
    await expect(page.getByText('Meta Edit Script')).toHaveCount(3)

    await page.getByText('Meta Edit Script', { exact: true }).first().click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')

    await expect(page.getByText('Meta Edit Script')).toHaveCount(0)

    const json = await readScriptJson(page)
    expect(json).toContain('"name": ""')
  })

  /**
   * The editors commit trimmed text, so whitespace typed at an edge is an edit
   * that changes nothing - and the element would go on showing the space it
   * committed away, indenting a name that is not indented.
   */
  test('should not leave trimmed whitespace on screen', async ({ page }) => {
    await page.goto(scriptUrl(script))
    const heading = page.getByText('Meta Edit Script', { exact: true }).first()
    await expect(heading).toBeVisible({ timeout: 10000 })

    await heading.click()
    await page.keyboard.press('Home')
    await page.keyboard.type('   ')
    await page.keyboard.press('Enter')

    await expect(heading).toHaveText('Meta Edit Script')
    await expect(page.getByText('Changes made')).toHaveCount(0)

    const author = page.getByText('Original Author', { exact: true }).first()
    await author.click()
    await page.keyboard.press('End')
    await page.keyboard.type('   ')
    await page.keyboard.press('Enter')

    await expect(author).toHaveText('Original Author')
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  /**
   * Edits are committed as they are typed, so by the time Escape is pressed the
   * name on hand is the one being cancelled rather than the one to go back to.
   */
  test('should put the original name and author back when cancelled', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    const heading = page.locator('.editable-heading')
    await expect(heading).toHaveText('Meta Edit Script', { timeout: 10000 })

    await heading.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('Half typed')
    await expect(page.getByText('Changes made')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(heading).toHaveText('Meta Edit Script')
    await expect(page.getByText('Changes made')).toHaveCount(0)

    const author = page.locator('.editable-author')
    await author.click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('Someone else')
    await expect(page.getByText('Changes made')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(author).toHaveText('Original Author')
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should clear an author without putting the old one back', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Original Author').first()).toBeVisible({
      timeout: 10000,
    })

    await page.getByText('Original Author', { exact: true }).first().click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('Delete')
    await page.keyboard.press('Enter')

    await expect(page.getByText('Original Author')).toHaveCount(0)

    const json = await readScriptJson(page)
    expect(json).toContain('"author": ""')
  })

  test('should create a _meta entry for a script that carries none', async ({
    page,
  }) => {
    const withoutMeta = ['washerwoman', 'chef', 'poisoner', 'imp', 'bootlegger']

    await page.goto(scriptUrl(withoutMeta))
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toBeVisible(
      {
        timeout: 10000,
      },
    )

    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Rule without a meta entry')
    await page.keyboard.press('Enter')

    // The _meta entry is created on the fly, so the JSON matches the screen
    const json = await readScriptJson(page)
    expect(json).toContain('_meta')
    expect(json).toContain('Rule without a meta entry')
  })

  test('should not carry unsaved edits over to another script', async ({
    page,
  }) => {
    const otherScript = [
      { id: '_meta', name: 'Other Script', author: 'Other Author' },
      'chef',
      'poisoner',
      'imp',
      'bootlegger',
    ]

    await page.goto(scriptUrl(otherScript))
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toBeVisible(
      {
        timeout: 10000,
      },
    )

    await replaceText(page, 'Other Script', 'Renamed Other')
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Rule of the other script')
    await page.keyboard.press('Enter')
    await expect(page.getByText('Rule of the other script')).toBeVisible()

    // A different script, same tab: the diff above belongs to the one left
    // behind, rules and the Bootlegger they would drag in included
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await expect(page.getByText('Renamed Other')).toHaveCount(0)
    await expect(page.getByText('Rule of the other script')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Bootlegger' })).toHaveCount(
      0,
    )
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should let the back button through when nothing is unsaved', async ({
    page,
  }) => {
    const otherScript = [{ id: '_meta', name: 'Script Left Behind' }, 'chef']

    await page.goto(scriptUrl(otherScript))
    await expect(page.getByText('Script Left Behind').first()).toBeVisible({
      timeout: 10000,
    })

    await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
    await page.locator('textarea').fill(JSON.stringify(script))
    await page.getByRole('button', { name: 'Load Script' }).click()
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()

    // There is nothing to lose, so a prompt here would only be in the way
    const asked: string[] = []
    page.on('dialog', (dialog) => {
      asked.push(dialog.message())
      dialog.dismiss()
    })
    await page.evaluate(() => window.history.back())

    await expect(page.getByText('Script Left Behind').first()).toBeVisible()
    expect(asked).toEqual([])
  })

  test('should ask before the back button drops unsaved edits', async ({
    page,
  }) => {
    const otherScript = [
      { id: '_meta', name: 'Script Left Behind', author: 'Other Author' },
      'chef',
      'imp',
    ]

    await page.goto(scriptUrl(otherScript))
    await expect(page.getByText('Script Left Behind').first()).toBeVisible({
      timeout: 10000,
    })

    /**
     * The second script is loaded in-page, so Back is a popstate rather than a
     * reload - and a popstate fires no beforeunload, which is the whole reason
     * the guard below exists.
     */
    await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
    await page.locator('textarea').fill(JSON.stringify(script))
    await page.getByRole('button', { name: 'Load Script' }).click()
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()
    const editedUrl = page.url()

    // Declining the prompt stays put, edit and all
    const asked: string[] = []
    const decline = (dialog: import('@playwright/test').Dialog) => {
      asked.push(dialog.message())
      dialog.dismiss()
    }
    page.on('dialog', decline)
    await page.evaluate(() => window.history.back())

    await expect(page.getByText('Renamed Script').first()).toBeVisible()
    await expect(page.getByText('Changes made')).toBeVisible()
    expect(asked).toEqual([
      'Your unsaved changes will be lost. Leave this script?',
    ])

    // The navigation was undone, so a second Back has somewhere to go again
    await expect.poll(() => page.url()).toBe(editedUrl)
    page.off('dialog', decline)

    // Accepting goes through, and the script arrived at keeps its own name
    page.on('dialog', (dialog) => dialog.accept())
    await page.evaluate(() => window.history.back())

    await expect(page.getByText('Script Left Behind').first()).toBeVisible()
    await expect(page.getByText('Renamed Script')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should ask before the forward button drops unsaved edits', async ({
    page,
  }) => {
    const otherScript = [{ id: '_meta', name: 'Script Ahead' }, 'chef', 'imp']

    /**
     * The undo of a declined navigation runs the opposite way for Forward than
     * it does for Back, so the address has to be put back rather than stepped
     * back to. Getting it wrong leaves the address on the script that was
     * refused while its predecessor is still on screen - and the reload below
     * would then load that script and take the edits with it.
     */
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
    await page.locator('textarea').fill(JSON.stringify(otherScript))
    await page.getByRole('button', { name: 'Load Script' }).click()
    await expect(page.getByText('Script Ahead').first()).toBeVisible()

    // Back to the first script, so that Forward has somewhere to go
    await page.evaluate(() => window.history.back())
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()
    const editedUrl = page.url()

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    const asked: string[] = []
    const decline = (dialog: import('@playwright/test').Dialog) => {
      asked.push(dialog.message())
      dialog.dismiss()
    }
    page.on('dialog', decline)
    const forwardAsked = page.waitForEvent('dialog')
    await page.evaluate(() => window.history.forward())
    await forwardAsked

    await expect(page.getByText('Renamed Script').first()).toBeVisible()
    await expect(page.getByText('Script Ahead')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toBeVisible()
    expect(asked).toEqual([
      'Your unsaved changes will be lost. Leave this script?',
    ])

    // The address followed the script that stayed, so a reload finds it
    await expect.poll(() => page.url()).toBe(editedUrl)
    page.off('dialog', decline)

    page.on('dialog', (dialog) =>
      dialog.type() === 'beforeunload' ? dialog.accept() : dialog.dismiss(),
    )
    await page.reload()
    await expect(page.getByText('Renamed Script').first()).toBeVisible({
      timeout: 10000,
    })
    await expect(page.getByText('Changes made')).toBeVisible()
  })

  test('should let the forward button through once the prompt is accepted', async ({
    page,
  }) => {
    const otherScript = [{ id: '_meta', name: 'Script Ahead' }, 'chef', 'imp']

    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
    await page.locator('textarea').fill(JSON.stringify(otherScript))
    await page.getByRole('button', { name: 'Load Script' }).click()
    await expect(page.getByText('Script Ahead').first()).toBeVisible()

    await page.evaluate(() => window.history.back())
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    page.on('dialog', (dialog) => dialog.accept())
    await page.evaluate(() => window.history.forward())

    await expect(page.getByText('Script Ahead').first()).toBeVisible()
    await expect(page.getByText('Renamed Script')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should keep putting the address back when Back is declined twice', async ({
    page,
  }) => {
    const otherScript = [
      { id: '_meta', name: 'Script Left Behind' },
      'chef',
      'imp',
    ]

    await page.goto(scriptUrl(otherScript))
    await expect(page.getByText('Script Left Behind').first()).toBeVisible({
      timeout: 10000,
    })

    await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
    await page.locator('textarea').fill(JSON.stringify(script))
    await page.getByRole('button', { name: 'Load Script' }).click()
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()
    const editedUrl = page.url()

    const asked: string[] = []
    page.on('dialog', (dialog) => {
      asked.push(dialog.message())
      dialog.dismiss()
    })

    /**
     * Putting the address back is a push, so it replaces the entry the
     * declined navigation came from rather than piling one on. Declining twice
     * has to leave the script exactly where declining once did - a history
     * that grew or shrank each time would take the second Back somewhere else.
     */
    for (const attempt of [1, 2]) {
      await page.evaluate(() => window.history.back())
      await expect.poll(() => asked.length).toBe(attempt)
      await expect.poll(() => page.url()).toBe(editedUrl)
      await expect(page.getByText('Renamed Script').first()).toBeVisible()
      await expect(page.getByText('Changes made')).toBeVisible()
    }

    // The way out is still there, and it still leads to the other script
    page.removeAllListeners('dialog')
    page.on('dialog', (dialog) => dialog.accept())
    await page.evaluate(() => window.history.back())
    await expect(page.getByText('Script Left Behind').first()).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should ask before pasted JSON drops unsaved edits', async ({
    page,
  }) => {
    const pasted = [{ id: '_meta', name: 'Pasted Script' }, 'chef', 'imp']

    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    /**
     * Loading another script resets the diff, and it does so in-page - so no
     * beforeunload speaks up for the unsaved work. The question is the same one
     * back/forward asks, because what is at stake is the same.
     */
    const paste = async () => {
      await page.getByRole('button', { name: /^(Paste JSON|Paste)$/ }).click()
      await page.locator('textarea').fill(JSON.stringify(pasted))
      await page.getByRole('button', { name: 'Load Script' }).click()
    }

    const asked: string[] = []
    const decline = (dialog: import('@playwright/test').Dialog) => {
      asked.push(dialog.message())
      dialog.dismiss()
    }
    page.on('dialog', decline)
    await paste()

    // Declining keeps the script that is on screen, edit and all
    await expect(page.getByText('Renamed Script').first()).toBeVisible()
    await expect(page.getByText('Pasted Script')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toBeVisible()
    expect(asked).toEqual([
      'Your unsaved changes will be lost. Leave this script?',
    ])

    page.off('dialog', decline)
    page.on('dialog', (dialog) => dialog.accept())
    await paste()

    // Accepting goes through, and the script arrived at carries no diff
    await expect(page.getByText('Pasted Script').first()).toBeVisible()
    await expect(page.getByText('Renamed Script')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should let go of an uploaded file, so the same one can be picked again', async ({
    page,
  }) => {
    const uploaded = [{ id: '_meta', name: 'Uploaded Script' }, 'chef', 'imp']

    const pick = () =>
      page.locator('#file-upload').setInputFiles({
        name: 'uploaded-script.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(uploaded), 'utf-8'),
      })

    await page.goto('/')
    await pick()
    await expect(page.getByText('Uploaded Script').first()).toBeVisible({
      timeout: 10000,
    })

    /**
     * The browser fires no change event for a file the input is already
     * holding, so an input that keeps hold of one makes picking the same file
     * again do nothing at all - and the upload looks broken.
     */
    await expect(page.locator('#file-upload')).toHaveValue('')

    await replaceText(page, 'Uploaded Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    // A refused upload has to let go of it too, or the way back in is the one
    // that closes
    const decline = (dialog: import('@playwright/test').Dialog) =>
      dialog.dismiss()
    page.on('dialog', decline)
    await pick()
    await expect(page.getByText('Renamed Script').first()).toBeVisible()
    await expect(page.locator('#file-upload')).toHaveValue('')

    page.off('dialog', decline)
    page.on('dialog', (dialog) => dialog.accept())
    await pick()
    await expect(page.getByText('Uploaded Script').first()).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should ask before a script loaded from a URL drops unsaved edits', async ({
    page,
  }) => {
    const other = [{ id: '_meta', name: 'Script From URL' }, 'chef', 'imp']
    const encoded = Buffer.from(JSON.stringify(other), 'utf-8').toString(
      'base64',
    )

    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    // A tool URL carrying an encoded script, so nothing is fetched
    const loadUrl = async () => {
      await page.getByRole('button', { name: /^(Load from URL|URL)$/ }).click()
      await page
        .getByRole('textbox')
        .fill(`https://script.example/?script=${encodeURIComponent(encoded)}`)
      await page.getByRole('button', { name: 'Load Script' }).click()
    }

    const asked: string[] = []
    const decline = (dialog: import('@playwright/test').Dialog) => {
      asked.push(dialog.message())
      dialog.dismiss()
    }
    page.on('dialog', decline)
    await loadUrl()

    await expect(page.getByText('Renamed Script').first()).toBeVisible()
    await expect(page.getByText('Script From URL')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toBeVisible()
    expect(asked).toEqual([
      'Your unsaved changes will be lost. Leave this script?',
    ])

    page.off('dialog', decline)
    page.on('dialog', (dialog) => dialog.accept())
    await loadUrl()

    await expect(page.getByText('Script From URL').first()).toBeVisible()
    await expect(page.getByText('Renamed Script')).toHaveCount(0)
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should keep unsaved edits across a reload of the same script', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    await page.reload()

    // Same script, so the diff is still the user's unsaved work
    await expect(page.getByText('Renamed Script').first()).toBeVisible({
      timeout: 10000,
    })
    await expect(page.getByText('Changes made')).toBeVisible()
  })

  test('should keep unsaved edits across a reload of a script loaded from a URL', async ({
    page,
  }) => {
    // Loading a script_url rewrites the URL to the encoded script, so what
    // identifies the script changes without the diff being reset
    await page.route('https://qa.example/script.json', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(script),
      }),
    )

    await page.goto(
      '/?script_url=' + encodeURIComponent('https://qa.example/script.json'),
    )
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed External')
    await expect(page.getByText('Changes made')).toBeVisible()

    await page.reload()

    await expect(page.getByText('Renamed External').first()).toBeVisible({
      timeout: 10000,
    })
    await expect(page.getByText('Changes made')).toBeVisible()
  })

  test('should not claim changes for a role edit a reload undid', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    const chef = page.locator('.role-card').filter({ hasText: 'Chef' }).first()
    await expect(chef).toBeVisible({ timeout: 10000 })

    await chef
      .getByRole('button', { name: 'Remove character' })
      .click({ force: true })
    await expect(page.getByRole('heading', { name: 'Chef' })).toHaveCount(0)
    await expect(page.getByText('Changes made')).toBeVisible()

    // Role edits live in the script data, which the reload rebuilds from the
    // URL - so the removal is gone, and the badge must not say otherwise
    await page.reload()
    await expect(
      page.getByRole('heading', { name: 'Chef' }).first(),
    ).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Changes made')).toHaveCount(0)
  })

  test('should keep the JSON view in step with a diff restored by a reload', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await page.reload()
    await expect(page.getByText('Renamed Script').first()).toBeVisible({
      timeout: 10000,
    })

    // The restored diff lives in the store alone, so the JSON the app hands out
    // has to resolve it rather than rely on the loaded script data carrying it
    const json = await readScriptJson(page)
    expect(json).toContain('Renamed Script')
    expect(json).not.toContain('Meta Edit Script')
  })

  test('should not add empty _meta fields to a script that had none', async ({
    page,
  }) => {
    const withoutMeta = [
      { id: 'probe_custom', name: 'Probe Custom', team: 'townsfolk' },
      'chef',
      'imp',
    ]

    await page.goto(scriptUrl(withoutMeta))
    await expect(
      page.getByRole('heading', { name: 'Bootlegger' }).first(),
    ).toBeVisible({ timeout: 10000 })

    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Rule without a name or author')
    await page.keyboard.press('Enter')

    // _meta is created for the rules, but a name and author the user never
    // wrote must not be invented alongside them
    const meta = JSON.parse(await readScriptJson(page))[0]
    expect(meta.bootlegger).toEqual(['Rule without a name or author'])
    expect('name' in meta).toBe(false)
    expect('author' in meta).toBe(false)
  })

  test('should drop unsaved edits when the changes are reverted', async ({
    page,
  }) => {
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Renamed Script')
    await expect(page.getByText('Changes made')).toBeVisible()

    // Reverting goes back to the script as it was loaded from the URL
    await page.getByRole('button', { name: 'Revert' }).click()

    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()
    const json = await readScriptJson(page)
    expect(json).toContain('Meta Edit Script')
    expect(json).not.toContain('Renamed Script')
  })

  test('should keep updating the same saved script after a revert', async ({
    page,
  }) => {
    /** How many scripts the library holds */
    const savedCount = () =>
      page.evaluate(() => {
        const raw = localStorage.getItem('botc-saved-scripts')
        if (!raw) return 0
        return Object.keys(JSON.parse(raw).state.scripts).length
      })

    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'First Save')
    await page.getByRole('button', { name: 'Save' }).click()
    await expect.poll(savedCount).toBe(1)
    expect(page.url()).toContain('id=')

    // Reverting reloads the script from the URL, and that URL still carries the
    // saved script's id - losing it would have the next save file a second copy
    await replaceText(page, 'First Save', 'Thrown away')
    await page.getByRole('button', { name: 'Revert' }).click()
    await expect(page.getByText('First Save').first()).toBeVisible()

    await replaceText(page, 'First Save', 'Second Save')
    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Second Save').first()).toBeVisible()

    await expect.poll(savedCount).toBe(1)
  })

  /**
   * The name on screen for a script that carries none is a localized
   * placeholder, so saving must not write it into `_meta`: it would become a
   * real name in one user's language, and every share link and JSON download
   * from then on would carry it. The library row is labelled separately.
   */
  test('should not save a placeholder name into the script', async ({
    page,
  }) => {
    const nameless = ['washerwoman', 'chef', 'poisoner', 'imp']

    await page.goto(scriptUrl(nameless))
    await expect(
      page.getByRole('heading', { name: 'Imp' }).first(),
    ).toBeVisible({ timeout: 10000 })

    // The placeholder the script is shown under, which is not a name it carries
    await expect(page.getByText('Shared Script').first()).toBeVisible()

    await page.getByRole('button', { name: 'Save' }).click()
    await expect.poll(() => page.url()).toContain('id=')

    const saved = await page.evaluate(() => {
      const raw = localStorage.getItem('botc-saved-scripts')
      const scripts = JSON.parse(raw!).state.scripts as Record<
        string,
        { name: string; scriptData: Array<unknown> }
      >
      return Object.values(scripts)[0]
    })

    // The script keeps the name it came with, which is none. Were the
    // placeholder written in, a Czech user's save would hand every later reader
    // "Sdílený skript" as the author's own title.
    const meta = saved.scriptData.find(
      (item): item is Record<string, unknown> =>
        typeof item === 'object' && item !== null && 'id' in item,
    )
    expect(meta?.name).toBeUndefined()
    expect(JSON.stringify(saved.scriptData)).not.toContain('Shared Script')

    // ...while the library row and the screen still have something to show
    expect(saved.name).toBe('Shared Script')
    await expect(page.getByText('Shared Script').first()).toBeVisible()
  })
})

/**
 * The share link has to carry the same script the JSON download does: role
 * edits land in the script data at once and _meta edits live in the store until
 * saving, while the URL is only rewritten on save.
 */
test.describe('Share link', () => {
  test.describe.configure({ timeout: 60_000 })

  /** Records what the page hands to navigator.share instead of opening a sheet */
  async function captureShare(page: import('@playwright/test').Page) {
    await page.addInitScript(() => {
      const shared: Array<string> = []
      Object.defineProperty(window, '__shared', { value: shared })
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: (data: { url: string }) => {
          shared.push(data.url)
          return Promise.resolve()
        },
      })
    })
  }

  /** Reads the script the share URL points at */
  async function sharedScript(page: import('@playwright/test').Page) {
    const urls = await page.evaluate(
      () => (window as unknown as { __shared: Array<string> }).__shared,
    )
    expect(urls).toHaveLength(1)

    const param = new URL(urls[0]).searchParams.get('script')
    expect(param).toBeTruthy()

    return gunzipSync(Buffer.from(param!, 'base64')).toString('utf-8')
  }

  test('should share unsaved name, author and rule edits', async ({ page }) => {
    await captureShare(page)
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await replaceText(page, 'Meta Edit Script', 'Shared Rename')
    await replaceText(page, 'Original Author', 'Shared Author')

    // A rule needs the Bootlegger on screen, so bring it in first
    const loricHeader = page
      .locator('.team-header')
      .filter({ hasText: 'Loric' })
    await loricHeader.getByRole('button').click()
    await page
      .getByRole('button', { name: /Bootlegger/ })
      .first()
      .click()
    await page.getByRole('button', { name: 'Done' }).click()
    await page.getByRole('button', { name: 'Add rule' }).click()
    await page.keyboard.type('Shared homebrew rule')
    await page.keyboard.press('Enter')
    await expect(page.getByText('Shared homebrew rule')).toBeVisible()

    await page.getByRole('button', { name: 'Share', exact: true }).click()

    const shared = await sharedScript(page)
    expect(shared).toContain('Shared Rename')
    expect(shared).toContain('Shared Author')
    expect(shared).toContain('Shared homebrew rule')
    expect(shared).not.toContain('Meta Edit Script')
    expect(shared).not.toContain('Original Author')
  })

  test('should share a script without a name unchanged', async ({ page }) => {
    // The header falls back to a localized placeholder ("Shared Script") for a
    // script that carries no name. That is ours, not the author's, so it must
    // not travel with the link
    const nameless = ['washerwoman', 'chef', 'poisoner', 'imp']

    await captureShare(page)
    await page.goto(scriptUrl(nameless))
    await expect(
      page.getByRole('heading', { name: 'Washerwoman' }).first(),
    ).toBeVisible({ timeout: 10000 })

    // Nothing was edited either, so no Save/Revert prompt on arrival
    await expect(page.getByText('Changes made')).toHaveCount(0)

    await page.getByRole('button', { name: 'Share', exact: true }).click()

    expect(JSON.parse(await sharedScript(page))).toEqual(nameless)
  })

  test('should share an unmodified script unchanged', async ({ page }) => {
    await captureShare(page)
    await page.goto(scriptUrl(script))
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible({
      timeout: 10000,
    })

    await page.getByRole('button', { name: 'Share', exact: true }).click()

    const shared = await sharedScript(page)
    expect(JSON.parse(shared)).toEqual(script)
  })
})
