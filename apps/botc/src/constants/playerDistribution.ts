/**
 * How many of each team a game has, by player count. The arrays run parallel.
 */
export const PLAYER_DISTRIBUTION = {
  playerCounts: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, '15+'],
  townsfolk: [3, 3, 5, 5, 5, 7, 7, 7, 9, 9, 9],
  outsiders: [0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2],
  minions: [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3],
  demons: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
} as const
