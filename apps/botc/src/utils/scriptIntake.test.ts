import { describe, it, expect } from 'vitest'
import { readMeta, readScript } from './scriptIntake'
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
