import { describe, expect, it } from 'vitest'
import type { Role } from '@/types'
import type { Jinx } from '@/types/jinx'
import { getDjinnJinxes, getHatedByMap } from './scriptJinxes'

const role = (id: string) =>
  ({ id, name: id.toUpperCase(), image: `${id}.png` }) as Role

const jinxes = [
  {
    id: 'a',
    hatred: [
      { id: 'b', reason: 'a hates b' },
      { id: 'c', reason: 'a hates c' },
    ],
  },
] as Jinx[]

describe('getDjinnJinxes', () => {
  it('lists a jinx only when both of its roles are in the script', () => {
    expect(getDjinnJinxes([role('a'), role('b')], jinxes)).toEqual([
      {
        id: 'a-b',
        name: 'A & B',
        reason: 'a hates b',
        role1Image: 'a.png',
        role2Image: 'b.png',
      },
    ])
  })

  it('finds nothing when the hating role is not in the script', () => {
    expect(getDjinnJinxes([role('b'), role('c')], jinxes)).toEqual([])
  })
})

describe('getHatedByMap', () => {
  it('marks the hated role with the role that hates it, not the other way round', () => {
    const map = getHatedByMap([role('a'), role('b')], jinxes)

    expect(map.get('b')).toEqual([{ id: 'a', name: 'A', image: 'a.png' }])
    expect(map.has('a')).toBe(false)
  })
})
