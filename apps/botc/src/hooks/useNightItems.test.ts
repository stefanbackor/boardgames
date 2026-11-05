// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Role } from '@/types'
import { useFirstNightItems, useOtherNightItems } from './useNightItems'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

const role = (overrides: Partial<Role>) =>
  ({
    id: 'custom',
    name: 'Custom',
    firstNight: 30,
    otherNight: 30,
    firstNightReminder: 'first',
    otherNightReminder: 'other',
    ...overrides,
  }) as Role

describe('night items', () => {
  it('places a role between the steps by its waking order', () => {
    const { result } = renderHook(() =>
      useFirstNightItems([role({ id: 'early', firstNight: 22 })]),
    )

    expect(result.current.map((item) => item.id)).toEqual([
      'dusk',
      'minion-info',
      'early',
      'demon-info',
      'dawn',
    ])
  })

  it('gives a custom role without an image no marker, or it would pass for the Demon step', () => {
    const { result } = renderHook(() => useOtherNightItems([role({})]))
    const custom = result.current.find((item) => item.id === 'custom')

    expect(custom?.marker).toBeUndefined()
    expect(custom?.image).toBeUndefined()
  })

  it('says which steps belong to a custom role, whose image is not proxied', () => {
    const { result } = renderHook(() =>
      useFirstNightItems([
        { ...role({ id: 'custom', image: 'https://x/c.png' }), isCustom: true },
        { ...role({ id: 'official', image: 'official.png' }), isCustom: false },
      ]),
    )
    const step = (id: string) => result.current.find((item) => item.id === id)

    expect(step('custom')?.isCustom).toBe(true)
    expect(step('official')?.isCustom).toBe(false)
  })

  it('leaves out roles that do not wake that night', () => {
    const { result } = renderHook(() =>
      useOtherNightItems([role({ otherNight: 0 })]),
    )

    expect(result.current.map((item) => item.id)).toEqual(['dusk', 'dawn'])
  })
})
