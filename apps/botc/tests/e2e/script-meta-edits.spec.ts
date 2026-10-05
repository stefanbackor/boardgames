import { readFile } from 'node:fs/promises'
import { gunzipSync } from 'node:zlib'
import { openScript, scriptUrl } from './script-state'
import { test, expect } from './fixtures'
import { moveCursorToLineEdge } from './keyboard'

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

async function replaceText(
  page: import('@playwright/test').Page,
  currentText: string,
  newText: string,
) {
  await page.getByText(currentText, { exact: true }).first().click()
  await page.keyboard.press('ControlOrMeta+a')
  await page.keyboard.insertText(newText)
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
  test('trims, cancels and clears name and author edits', async ({ page }) => {
    await openScript(page, script)
    await expect(page.getByText('Meta Edit Script').first()).toBeVisible()
    await test.step('should not leave trimmed whitespace on screen', async () => {
      const heading = page
        .getByText('Meta Edit Script', { exact: true })
        .first()
      await expect(heading).toBeVisible({ timeout: 10000 })

      await heading.click()
      await moveCursorToLineEdge(page, 'start')
      await page.keyboard.type('   ')
      await page.keyboard.press('Enter')

      await expect(heading).toHaveText('Meta Edit Script')
      await expect(page.getByText('Changes made')).toHaveCount(0)

      const author = page.getByText('Original Author', { exact: true }).first()
      await author.click()
      await moveCursorToLineEdge(page, 'end')
      await page.keyboard.type('   ')
      await page.keyboard.press('Enter')

      await expect(author).toHaveText('Original Author')
      await expect(page.getByText('Changes made')).toHaveCount(0)
    })
    await test.step('should put the original name and author back when cancelled', async () => {
      const heading = page.locator('.editable-heading')
      await expect(heading).toHaveText('Meta Edit Script', { timeout: 10000 })

      await heading.click()
      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.type('Draft')
      await expect(page.getByText('Changes made')).toBeVisible()

      await page.keyboard.press('Escape')

      await expect(heading).toHaveText('Meta Edit Script')
      await expect(page.getByText('Changes made')).toHaveCount(0)

      const author = page.locator('.editable-author')
      await author.click()
      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.type('Else')
      await expect(page.getByText('Changes made')).toBeVisible()

      await page.keyboard.press('Escape')

      await expect(author).toHaveText('Original Author')
      await expect(page.getByText('Changes made')).toHaveCount(0)
    })
    await test.step('should clear a name everywhere at once', async () => {
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
    })
    await test.step('should clear an author without putting the old one back', async () => {
      await expect(page.getByText('Original Author').first()).toBeVisible({
        timeout: 10000,
      })

      await page.getByText('Original Author', { exact: true }).first().click()
      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.press('Delete')
      await page.keyboard.press('Enter')

      await expect(page.getByText('Original Author')).toHaveCount(0)
    })
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

    await openScript(page, otherScript, {
      name: 'Renamed Other',
      bootlegger: ['Rule of the other script'],
    })
    await expect(page.getByText('Renamed Other').first()).toBeVisible()
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

    const unexpectedPrompts: string[] = []
    const noPrompt = (dialog: import('@playwright/test').Dialog) => {
      unexpectedPrompts.push(dialog.message())
      dialog.dismiss()
    }
    page.on('dialog', noPrompt)
    await page.evaluate(() => window.history.back())
    await expect(page.getByText('Script Left Behind').first()).toBeVisible()
    expect(unexpectedPrompts).toEqual([])
    page.off('dialog', noPrompt)
    await page.evaluate(() => window.history.forward())
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
      expect(asked[attempt - 1]).toBe(
        'Your unsaved changes will be lost. Leave this script?',
      )
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
    await openScript(page, script, { name: 'Renamed Script' })
    await expect(page.getByText('Renamed Script').first()).toBeVisible()
    await expect(page.getByText('Changes made')).toBeVisible()

    await page.reload()

    // Same script, so the diff is still the user's unsaved work
    await expect(page.getByText('Renamed Script').first()).toBeVisible({
      timeout: 10000,
    })
    await expect(page.getByText('Changes made')).toBeVisible()
    const json = await readScriptJson(page)
    expect(json).toContain('Renamed Script')
    expect(json).not.toContain('Meta Edit Script')

    // A role edit is transient, unlike persisted metadata.
    const chef = page.locator('.role-card').filter({ hasText: 'Chef' }).first()
    await chef
      .getByRole('button', { name: 'Remove character' })
      .click({ force: true })
    await expect(page.getByRole('heading', { name: 'Chef' })).toHaveCount(0)
    await page.getByRole('button', { name: 'Revert' }).click()
    await chef
      .getByRole('button', { name: 'Remove character' })
      .click({ force: true })
    await expect(page.getByText('Changes made')).toBeVisible()
    await page.reload()
    await expect(
      page.getByRole('heading', { name: 'Chef' }).first(),
    ).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)
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

    await openScript(page, script, { name: 'First Save' })
    await expect(page.getByText('First Save').first()).toBeVisible()
    await page.getByRole('button', { name: 'Save' }).click()
    await expect.poll(savedCount).toBe(1)
    expect(page.url()).toContain('id=')

    // Reverting reloads the script from the URL, and that URL still carries the
    // saved script's id - losing it would have the next save file a second copy
    await replaceText(page, 'First Save', 'Thrown away')
    await page.getByRole('button', { name: 'Revert' }).click()
    await expect(page.getByText('First Save').first()).toBeVisible()
    await expect(page.getByText('Changes made')).toHaveCount(0)
    expect(await readScriptJson(page)).not.toContain('Thrown away')

    await replaceText(page, 'First Save', 'Second Save')
    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('Second Save').first()).toBeVisible()

    await expect.poll(savedCount).toBe(1)
  })

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

test('exports seeded unsaved metadata through JSON, download and Share', async ({
  page,
}) => {
  const sharedUrls: string[] = []
  await page.exposeFunction('captureShareUrl', (url: string) =>
    sharedUrls.push(url),
  )
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: (data: { url: string }) =>
        (
          window as unknown as {
            captureShareUrl: (url: string) => Promise<void>
          }
        ).captureShareUrl(data.url),
    })
  })
  await openScript(page, script, {
    name: 'Shared Rename',
    author: 'Shared Author',
    bootlegger: ['Shared rule'],
  })
  await expect(page.getByText('Shared Rename').first()).toBeVisible()
  await expect(page.getByText('Shared rule', { exact: true })).toBeVisible()
  const expected = [
    {
      id: '_meta',
      name: 'Shared Rename',
      author: 'Shared Author',
      bootlegger: ['Shared rule'],
    },
    ...script.slice(1),
  ]
  expect(JSON.parse(await readScriptJson(page))).toEqual(expected)
  const downloaded = page.waitForEvent('download')
  await page.getByRole('button', { name: /^(Download JSON|JSON)$/ }).click()
  const download = await downloaded
  const path = await download.path()
  expect(path).toBeTruthy()
  expect(JSON.parse(await readFile(path!, 'utf-8'))).toEqual(expected)
  await page.getByRole('button', { name: 'Share', exact: true }).click()
  await expect.poll(() => sharedUrls.length).toBe(1)
  const encoded = new URL(sharedUrls[0]).searchParams.get('script')!
  expect(
    JSON.parse(gunzipSync(Buffer.from(encoded, 'base64')).toString('utf-8')),
  ).toEqual(expected)
})
