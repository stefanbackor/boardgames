// @vitest-environment node
// Node's File can read itself as text, jsdom's cannot
import { describe, it, expect, vi } from 'vitest'
import { readScriptFile, readScriptUrl } from './scriptSources'
import { compressForUrl } from '@/utils/urlCompression'

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
