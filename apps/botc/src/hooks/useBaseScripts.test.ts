import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBaseScripts } from './useBaseScripts'
import type { ScriptMeta } from '@/types'

// Mock react-i18next
const mockT = vi.fn((key: string) => `translated_${key}`)

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}))

describe('useBaseScripts', () => {
  it('should return all scripts with correct keys', () => {
    const { result } = renderHook(() => useBaseScripts())

    const scriptKeys = result.current.map((s: { key: string }) => s.key)
    const expectedKeys = ['tb', 'snv', 'bmr']

    expect(scriptKeys).toEqual(expectedKeys)
  })

  it('should translate script names in _meta', () => {
    mockT.mockClear()
    const { result } = renderHook(() => useBaseScripts())

    // Verify translation function was called for each script name
    expect(mockT).toHaveBeenCalledWith('Trouble Brewing')
    expect(mockT).toHaveBeenCalledWith('Sects and Violets')
    expect(mockT).toHaveBeenCalledWith('Bad Moon Rising')

    // Verify translated names appear in the _meta objects
    const tbMeta = result.current[0].json.find(
      (r): r is ScriptMeta =>
        typeof r === 'object' && 'id' in r && r.id === '_meta',
    )
    expect(tbMeta?.name).toBe('translated_Trouble Brewing')

    const snvMeta = result.current[1].json.find(
      (r): r is ScriptMeta =>
        typeof r === 'object' && 'id' in r && r.id === '_meta',
    )
    expect(snvMeta?.name).toBe('translated_Sects and Violets')

    const bmrMeta = result.current[2].json.find(
      (r): r is ScriptMeta =>
        typeof r === 'object' && 'id' in r && r.id === '_meta',
    )
    expect(bmrMeta?.name).toBe('translated_Bad Moon Rising')
  })

  it('should memoize results based on t function', () => {
    const { result, rerender } = renderHook(() => useBaseScripts())

    const firstResult = result.current
    rerender()
    const secondResult = result.current

    expect(firstResult).toBe(secondResult)
  })
})
