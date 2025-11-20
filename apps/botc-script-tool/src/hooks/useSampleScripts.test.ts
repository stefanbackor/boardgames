import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSampleScripts } from './useSampleScripts'
import { translations } from '../translations'

describe('useSampleScripts', () => {
  it('should return sample scripts with English translations', () => {
    const { result } = renderHook(() => useSampleScripts(translations.en))

    expect(result.current).toHaveLength(3)
    expect(result.current[0]).toEqual({
      key: 'tb',
      name: 'Trouble Brewing',
      url: 'https://www.botcscripts.com/api/scripts/178/json/',
    })
    expect(result.current[1]).toEqual({
      key: 'snv',
      name: 'Sects and Violets',
      url: 'https://www.botcscripts.com/api/scripts/180/json/',
    })
    expect(result.current[2]).toEqual({
      key: 'bmr',
      name: 'Bad Moon Rising',
      url: 'https://www.botcscripts.com/api/scripts/181/json/',
    })
  })

  it('should return sample scripts with Czech translations', () => {
    const { result } = renderHook(() => useSampleScripts(translations.cs))

    expect(result.current).toHaveLength(3)
    expect(result.current[0]).toEqual({
      key: 'tb',
      name: 'Potíže se Vaří',
      url: 'https://www.botcscripts.com/api/scripts/178/json/',
    })
    expect(result.current[1]).toEqual({
      key: 'snv',
      name: 'Sekty a Fialky',
      url: 'https://www.botcscripts.com/api/scripts/180/json/',
    })
    expect(result.current[2]).toEqual({
      key: 'bmr',
      name: 'Zlověstný Východ Měsíce',
      url: 'https://www.botcscripts.com/api/scripts/181/json/',
    })
  })

  it('should preserve URLs from data', () => {
    const { result } = renderHook(() => useSampleScripts(translations.en))

    expect(result.current[0].url).toBe('https://www.botcscripts.com/api/scripts/178/json/')
    expect(result.current[1].url).toBe('https://www.botcscripts.com/api/scripts/180/json/')
    expect(result.current[2].url).toBe('https://www.botcscripts.com/api/scripts/181/json/')
  })

  it('should return all scripts', () => {
    const { result } = renderHook(() => useSampleScripts(translations.en))

    const scriptKeys = result.current.map((s) => s.key)
    const expectedKeys = ['tb', 'snv', 'bmr']

    expect(scriptKeys).toEqual(expectedKeys)
  })

  it('should memoize results', () => {
    const { result, rerender } = renderHook(() => useSampleScripts(translations.en))

    const firstResult = result.current
    rerender()
    const secondResult = result.current

    expect(firstResult).toBe(secondResult)
  })

  it('should update when translations change', () => {
    const { result, rerender } = renderHook(
      ({ t }) => useSampleScripts(t),
      {
        initialProps: { t: translations.en },
      },
    )

    expect(result.current[0].name).toBe('Trouble Brewing')

    rerender({ t: translations.cs })

    expect(result.current[0].name).toBe('Potíže se Vaří')
  })

  it('should fallback to original name if translation is missing', () => {
    // Create a mock translation object without sample script translations
    const mockTranslations = {
      ...translations.en,
      sampleScripts: {} as any,
    }

    const { result } = renderHook(() => useSampleScripts(mockTranslations))

    // Should fallback to the original name from JSON
    expect(result.current[0].name).toBe('Trouble Brewing')
  })
})
