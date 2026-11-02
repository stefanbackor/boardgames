/** A night step that belongs to no role */
export type NightMarker = 'dusk' | 'dawn' | 'minion' | 'demon'

/** The letter drawn for the night steps that have no icon */
export const NIGHT_MARKER_LETTERS = { minion: 'M', demon: 'D' } as const
