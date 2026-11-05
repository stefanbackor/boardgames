// @vitest-environment node
// Node's File can read itself as text, jsdom's cannot
import { describe, it, expect, vi } from 'vitest'
import {
  readMeta,
  readScript,
  readScriptFile,
  readScriptUrl,
} from './scriptIntake'
import { compressForUrl } from './urlCompression'

describe('readMeta', () => {
  it('reads name, author and Bootlegger rules from _meta', () => {
    const result = readMeta([
      {
        id: '_meta',
        name: 'Test Script',
        author: 'Test Author',
        bootlegger: ['Rule A'],
      },
      'washerwoman',
    ])

    expect(result).toEqual({
      present: true,
      name: 'Test Script',
      author: 'Test Author',
      bootlegger: ['Rule A'],
    })
  })

  it('answers empty fields when there is no _meta', () => {
    expect(readMeta(['washerwoman', 'librarian'])).toEqual({
      present: false,
      name: '',
      author: '',
      bootlegger: [],
    })
    expect(readMeta([]).present).toBe(false)
  })

  it('counts a _meta without fields as present', () => {
    expect(readMeta([{ id: '_meta' }, 'washerwoman'])).toEqual({
      present: true,
      name: '',
      author: '',
      bootlegger: [],
    })
  })

  it('finds _meta anywhere in the script', () => {
    const result = readMeta([
      'washerwoman',
      { id: '_meta', name: 'Script Name', author: 'Author Name' },
    ])

    expect(result.name).toBe('Script Name')
    expect(result.author).toBe('Author Name')
  })

  it('reads only the first _meta', () => {
    const result = readMeta([
      { id: '_meta', name: 'First Script' },
      { id: '_meta', name: 'Second Script' },
    ])

    expect(result.name).toBe('First Script')
  })

  it('skips null entries, bare "_meta" strings and role objects', () => {
    const result = readMeta([
      null,
      '_meta',
      { id: 'washerwoman', name: 'Washerwoman' },
      { id: '_meta', name: 'Test Script' },
    ])

    expect(result.name).toBe('Test Script')
  })

  it('drops name and author that are not strings', () => {
    const result = readMeta([{ id: '_meta', name: 42, author: {} }])

    expect(result).toEqual({
      present: true,
      name: '',
      author: '',
      bootlegger: [],
    })
  })

  it('accepts Bootlegger rules as a single string', () => {
    expect(readMeta([{ id: '_meta', bootlegger: 'Rule' }]).bootlegger).toEqual([
      'Rule',
    ])
  })

  it('trims Bootlegger rules and drops anything that is not one', () => {
    expect(
      readMeta([{ id: '_meta', bootlegger: [1, ' x ', '', null] }]).bootlegger,
    ).toEqual(['x'])
  })

  it('leaves the script data untouched', () => {
    const meta = { id: '_meta', name: 42, logo: 'logo.png' }
    const data = [meta, 'washerwoman']

    readMeta(data)

    expect(data).toEqual([
      { id: '_meta', name: 42, logo: 'logo.png' },
      'washerwoman',
    ])
  })
})

describe('readScript', () => {
  const script = [{ id: '_meta', name: 'Trouble' }, 'washerwoman']

  it('reads JSON text into a script', () => {
    const result = readScript({ kind: 'text', text: JSON.stringify(script) })

    expect(result).toEqual({
      ok: true,
      script: {
        data: script,
        meta: { present: true, name: 'Trouble', author: '', bootlegger: [] },
        name: 'Trouble',
      },
    })
  })

  it('rejects a JSON object as not a list rather than as bad JSON', () => {
    expect(
      readScript({ kind: 'text', text: '{"id":"_meta","name":"x"}' }),
    ).toEqual({ ok: false, error: { kind: 'not-array' } })
  })

  it('rejects other JSON that is not a list', () => {
    for (const text of ['null', '"str"', '42']) {
      expect(readScript({ kind: 'text', text })).toEqual({
        ok: false,
        error: { kind: 'not-array' },
      })
    }
  })

  it('rejects text that is not JSON', () => {
    expect(readScript({ kind: 'text', text: '[1,' })).toEqual({
      ok: false,
      error: { kind: 'invalid-json' },
    })
  })

  it('falls back to the name hint, then to an empty name', () => {
    const text = JSON.stringify(['washerwoman'])

    const hinted = readScript({ kind: 'text', text, nameHint: 'my-file' })
    const bare = readScript({ kind: 'text', text })

    expect(hinted.ok && hinted.script.name).toBe('my-file')
    expect(bare.ok && bare.script.name).toBe('')
  })

  it('prefers the name hint over a name that is not a string', () => {
    const text = JSON.stringify([{ id: '_meta', name: 42 }])

    const result = readScript({ kind: 'text', text, nameHint: 'my-file' })

    expect(result.ok && result.script.name).toBe('my-file')
  })

  it('passes character data through for parseScript to repair', () => {
    const custom = {
      id: 'x',
      name: 'X',
      team: 'traveler',
      image: ['good.png', 'evil.png'],
    }

    const result = readScript({ kind: 'text', text: JSON.stringify([custom]) })

    expect(result.ok && result.script.data).toEqual([custom])
  })

  it('decodes an encoded share link value', () => {
    const param = compressForUrl(JSON.stringify(script))

    const result = readScript({ kind: 'encoded', param })

    expect(result.ok && result.script.data).toEqual(script)
  })

  it('decodes a link whose "+" was turned into a space', () => {
    // btoa('["~~~"]') is 'WyJ+fn4iXQ==', and URLSearchParams reads its '+' as a space
    const param = 'WyJ fn4iXQ=='

    const result = readScript({ kind: 'encoded', param })

    expect(result.ok && result.script.data).toEqual(['~~~'])
  })

  it('decodes a legacy uncompressed base64 value', () => {
    const param = btoa(JSON.stringify(['washerwoman']))

    expect(readScript({ kind: 'encoded', param })).toMatchObject({
      ok: true,
      script: { data: ['washerwoman'] },
    })
  })

  it('rejects an encoded value that does not decode', () => {
    expect(readScript({ kind: 'encoded', param: '!!!' })).toEqual({
      ok: false,
      error: { kind: 'decode-failed' },
    })
  })

  it('rejects an encoded value that decodes to something other than a list', () => {
    expect(readScript({ kind: 'encoded', param: btoa('not json') })).toEqual({
      ok: false,
      error: { kind: 'invalid-json' },
    })
    expect(
      readScript({ kind: 'encoded', param: btoa('{"id":"_meta"}') }),
    ).toEqual({ ok: false, error: { kind: 'not-array' } })
  })
})

describe('readScriptFile', () => {
  it('names the script after the file when its metadata does not', async () => {
    const file = new File([JSON.stringify(['washerwoman'])], 'my.script.json')

    const result = await readScriptFile(file)

    expect(result.ok && result.script.name).toBe('my.script')
  })

  it('rejects a file that cannot be read', async () => {
    const file = new File([], 'broken.json')

    const result = await readScriptFile(file, () =>
      Promise.reject(new Error('nope')),
    )

    expect(result).toEqual({ ok: false, error: { kind: 'read-failed' } })
  })

  it('rejects a file holding a JSON object as not a list', async () => {
    const file = new File(['{"id":"_meta"}'], 'object.json')

    expect(await readScriptFile(file)).toEqual({
      ok: false,
      error: { kind: 'not-array' },
    })
  })
})

describe('readScriptUrl', () => {
  const respond = (body: string, init?: ResponseInit) =>
    vi.fn(() => Promise.resolve(new Response(body, init)))

  it('rejects a string that is not a URL', async () => {
    expect(await readScriptUrl('not a url', respond('[]'))).toEqual({
      ok: false,
      error: { kind: 'invalid-url' },
    })
  })

  it('decodes a script parameter without fetching', async () => {
    const fetchImpl = respond('[]')
    const param = compressForUrl(JSON.stringify(['washerwoman']))

    const result = await readScriptUrl(
      `https://script.bloodontheclocktower.com/?script=${param}`,
      fetchImpl,
    )

    expect(fetchImpl).not.toHaveBeenCalled()
    expect(result).toMatchObject({
      ok: true,
      script: { data: ['washerwoman'] },
      urlKind: 'encoded_tool_url',
    })
  })

  it('fetches any other URL, named after the file it points at', async () => {
    const result = await readScriptUrl(
      'https://example.com/scripts/boozling.json',
      respond(JSON.stringify(['washerwoman'])),
    )

    expect(result).toMatchObject({
      ok: true,
      script: { data: ['washerwoman'], name: 'boozling' },
      urlKind: 'direct_json',
    })
  })

  it('rejects a fetched JSON object as not a list', async () => {
    expect(
      await readScriptUrl(
        'https://example.com/s.json',
        respond('{"id":"_meta"}'),
      ),
    ).toMatchObject({ ok: false, error: { kind: 'not-array' } })
  })

  it('reports a failed response with its status text', async () => {
    const result = await readScriptUrl(
      'https://example.com/missing.json',
      respond('', { status: 404, statusText: 'Not Found' }),
    )

    expect(result).toMatchObject({
      ok: false,
      error: { kind: 'fetch-failed', statusText: 'Not Found' },
    })
  })

  it('reports a fetch that never got a response', async () => {
    const result = await readScriptUrl('https://example.com/s.json', () =>
      Promise.reject(new TypeError('Failed to fetch')),
    )

    expect(result).toMatchObject({
      ok: false,
      error: { kind: 'network', message: 'Failed to fetch' },
    })
  })
})
