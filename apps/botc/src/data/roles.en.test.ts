import { describe, expect, it } from 'vitest'
import { roles } from './roles.en'

describe('English role data', () => {
  it('includes the full Lil Monsta ability text', () => {
    const lilMonsta = roles.find((role) => role.id === 'lilmonsta')

    expect(lilMonsta?.ability).toBe(
      'Each night, Minions choose who babysits Lil\' Monsta & "is the Demon". Each night*, a player might die. [+1 Minion]',
    )
  })
})
