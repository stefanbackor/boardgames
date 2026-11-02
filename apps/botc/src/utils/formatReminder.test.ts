import { describe, expect, it } from 'vitest'
import { formatReminder } from './formatReminder'

describe('formatReminder', () => {
  it('bolds the token names a storyteller has to find, spaces included', () => {
    expect(formatReminder('Show the THIS IS THE DEMON token.')).toBe(
      'Show the <strong>THIS IS THE DEMON</strong> token.',
    )
  })

  it('leaves a capitalized word alone, or every sentence would start in bold', () => {
    expect(formatReminder('Wake them. A player points.')).toBe(
      'Wake them. A player points.',
    )
  })

  it('bolds a token name to its end when it holds a one-letter word', () => {
    expect(formatReminder('Mutasd meg az EZ A DÉMON jelzőt.')).toBe(
      'Mutasd meg az <strong>EZ A DÉMON</strong> jelzőt.',
    )
  })

  it('does not stop short of an accented letter', () => {
    expect(formatReminder('Pokaż TE POSTACIE NIE SĄ W GRZE. NĚKDO JINÝ')).toBe(
      'Pokaż <strong>TE POSTACIE NIE SĄ W GRZE</strong>. <strong>NĚKDO JINÝ</strong>',
    )
  })

  it('leaves out a one-letter word after the name, which starts the next phrase', () => {
    expect(formatReminder('Show YOU ARE A player points.')).toBe(
      'Show <strong>YOU ARE</strong> A player points.',
    )
  })

  it('does not bold the capitals of a mixed-case word', () => {
    expect(formatReminder('McDONald ÚJra')).toBe('McDONald ÚJra')
  })
})
