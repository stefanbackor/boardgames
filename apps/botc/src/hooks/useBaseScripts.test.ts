import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useBaseScripts } from './useBaseScripts'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('useSampleScripts', () => {
  it('should return sample scripts with English translations', () => {
    const { result } = renderHook(() => useBaseScripts())

    expect(result.current).toHaveLength(3)
    expect(result.current[0]).toMatchObject({
      key: 'tb',
      name: 'Trouble Brewing',
      url: 'https://www.botcscripts.com/api/scripts/178/json/',
    })
    expect(result.current[1]).toMatchObject({
      key: 'snv',
      name: 'Sects and Violets',
      url: 'https://www.botcscripts.com/api/scripts/180/json/',
    })
    expect(result.current[2]).toMatchObject({
      key: 'bmr',
      name: 'Bad Moon Rising',
      url: 'https://www.botcscripts.com/api/scripts/181/json/',
    })
  })

  it('should preserve URLs from data', () => {
    const { result } = renderHook(() => useBaseScripts())

    expect(result.current[0].url).toBe(
      'https://www.botcscripts.com/api/scripts/178/json/',
    )
    expect(result.current[1].url).toBe(
      'https://www.botcscripts.com/api/scripts/180/json/',
    )
    expect(result.current[2].url).toBe(
      'https://www.botcscripts.com/api/scripts/181/json/',
    )
  })

  it('should return all scripts', () => {
    const { result } = renderHook(() => useBaseScripts())

    const scriptKeys = result.current.map((s: { key: string }) => s.key)
    const expectedKeys = ['tb', 'snv', 'bmr']

    expect(scriptKeys).toEqual(expectedKeys)
  })

  it('should memoize results', () => {
    const { result, rerender } = renderHook(() => useBaseScripts())

    const firstResult = result.current
    rerender()
    const secondResult = result.current

    expect(firstResult).toStrictEqual(secondResult)
  })
})
