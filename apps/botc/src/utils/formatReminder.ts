/**
 * Makes the uppercase parts of a night reminder bold.
 *
 * @param text - The reminder text
 * @returns The text with its uppercase parts wrapped in `<strong>`
 */
export function formatReminder(text: string): string {
  // Whole uppercase words of 2+ letters, in any language, with a one-letter word
  // like the Hungarian "A" allowed between two of them. \b would not do: it only
  // knows ASCII, so it would stop short of an accented letter.
  return text.replace(
    /(?<![\p{L}\p{N}])\p{Lu}{2,}(?:(?:\s+\p{Lu})*\s+\p{Lu}{2,})*(?![\p{L}\p{N}])/gu,
    (match) => `<strong>${match}</strong>`,
  )
}
