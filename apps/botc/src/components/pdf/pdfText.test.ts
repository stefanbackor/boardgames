// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { abilityRuns, balancedColumnSplit, reminderRuns } from './pdfText'

describe('abilityRuns', () => {
  it('bolds setup changes, which storytellers must not miss', () => {
    expect(abilityRuns('You start knowing. [+1 Outsider]')).toEqual([
      { text: 'You start knowing. ', bold: false },
      { text: '[+1 Outsider]', bold: true },
    ])
  })
})

describe('reminderRuns', () => {
  it('swaps the non-breaking hyphen translations use, which the fonts lack', () => {
    expect(reminderRuns('ano\u2011ne')).toEqual([
      { text: 'ano-ne', bold: false },
    ])
  })

  it('bolds the tokens the storyteller has to show, like the night sheet', () => {
    expect(reminderRuns('Show the THIS IS THE DEMON token.')).toEqual([
      { text: 'Show the ', bold: false },
      { text: 'THIS IS THE DEMON', bold: true },
      { text: ' token.', bold: false },
    ])
  })

  it('swaps the step separator for one the fonts can draw, or it prints as junk', () => {
    expect(reminderRuns('Wake them. ⏺ Point.')).toEqual([
      { text: 'Wake them. • Point.', bold: false },
    ])
  })

  it('keeps line breaks and drops markup a PDF cannot draw', () => {
    expect(reminderRuns('One<br>two <a href="x">link</a>')).toEqual([
      { text: 'One', bold: false },
      { text: '\n', bold: false },
      { text: 'two link', bold: false },
    ])
  })
})

describe('balancedColumnSplit', () => {
  it('splits by height rather than count, so one long card cannot push a page over', () => {
    expect(balancedColumnSplit([100, 10, 10, 10, 10])).toBe(1)
  })

  it('gives the left column the odd card, as CSS columns do', () => {
    expect(balancedColumnSplit([10, 10, 10])).toBe(2)
  })

  it('handles an empty team', () => {
    expect(balancedColumnSplit([])).toBe(0)
  })
})
