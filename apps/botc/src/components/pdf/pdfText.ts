import { formatReminder } from '@/utils/formatReminder'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

/** A stretch of text sharing one weight */
export interface TextRun {
  text: string
  bold: boolean
}

/** Swaps the characters reminders and translations use that no embedded font has */
const toDrawableText = (text: string) =>
  text.replaceAll('⏺', '•').replaceAll('\u2011', '-')

/** Splits an ability into runs, with the text in square brackets bold */
export function abilityRuns(text: string): TextRun[] {
  return toDrawableText(text)
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((part) => ({ text: part, bold: /^\[[^\]]+\]$/.test(part) }))
}

/**
 * Splits a night reminder into runs, weighted the way the night sheet draws it:
 * uppercase words and the markup a script may carry are bold, line breaks stay.
 */
export function reminderRuns(text: string): TextRun[] {
  const root = document.createElement('div')
  root.innerHTML = sanitizeHtml(formatReminder(toDrawableText(text)))

  const walk = (node: Node, bold: boolean): TextRun[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      return [{ text: node.textContent ?? '', bold }]
    }
    const tag = (node as Element).tagName?.toLowerCase()
    if (tag === 'br') return [{ text: '\n', bold }]
    const isBold = bold || tag === 'b' || tag === 'strong'
    return Array.from(node.childNodes).flatMap((child) => walk(child, isBold))
  }

  return walk(root, false).filter((run) => run.text)
}

/**
 * Where to split a list into two columns so they come out as even as they can.
 * Keeps the order, like the CSS columns of the printed sheet: the left column
 * is filled first and takes the extra height when there is a tie.
 *
 * @param heights - The estimated height of each item
 * @returns How many items go into the left column
 */
export function balancedColumnSplit(heights: number[]): number {
  const total = heights.reduce((sum, height) => sum + height, 0)
  let left = 0
  let best = { index: 0, tallest: total }

  heights.forEach((height, index) => {
    left += height
    const tallest = Math.max(left, total - left)
    if (tallest <= best.tallest) best = { index: index + 1, tallest }
  })

  return best.index
}
