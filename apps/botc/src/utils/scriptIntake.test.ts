import { describe, it, expect } from 'vitest'
import { readMeta } from './scriptIntake'

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
