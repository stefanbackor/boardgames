import {
  createMemoryRouter,
  RouterProvider,
} from '@remix-run/react/node_modules/react-router-dom'
import { renderHook } from '@testing-library/react'
import { act } from 'react'

import { loadDeck } from '~/utils/deck/loadDeck'
import { testingSetDifficultyValue } from '~/utils/difficulty/testing'
import { Bot, Pile } from '~/utils/state/types'

import { usePrepareRound } from './usePrepareRound'
import { WWDifficulty } from './woodenbot/useDifficulty'

describe('usePrepareRound', () => {
  let router: ReturnType<typeof createMemoryRouter>
  let botId: Bot

  /**
   * Renders the hook with a router and executes the callback once.
   * @param options
   * @returns
   */
  function renderHookWithRouter(options?: {
    difficulty?: Array<WWDifficulty>
    roundId?: string
    gameId?: string
  }) {
    const opts = {
      difficulty: [],
      gameId: '1',
      roundId: '1',
      ...options,
    }

    const ret = renderHook(() => usePrepareRound(), {
      wrapper: ({ children }) => {
        router = createMemoryRouter(
          [
            {
              path: '/:botId',
              element: children,
            },
          ],
          {
            // TODO: Ideally router is created in beforeEach and just navigates to the correct path
            // here in render function.
            initialEntries: [
              {
                pathname: `/${botId}`,
                search: `?game=${opts.gameId}&round=${opts.roundId}`,
                state: {
                  woodenbot_difficulty: opts.difficulty
                    ? testingSetDifficultyValue(opts.difficulty)
                    : 0,
                  ironbot_difficulty: opts.difficulty
                    ? testingSetDifficultyValue(opts.difficulty)
                    : 0,
                },
              },
            ],
          },
        )

        return <RouterProvider router={router} />
      },
    })

    act(() => {
      ret.result.current()
    })

    return ret
  }

  it('should be defined', () => {
    expect(usePrepareRound).toBeDefined()
  })

  describe('Woodenbot', () => {
    beforeEach(() => {
      botId = Bot.WOODENBOT
    })

    it('1 crystal, no spirit cubes, 2 special cards on round prepare', () => {
      renderHookWithRouter()

      expect(router.state.location.state.crystals).toBe(1)
      expect(router.state.location.state.woodenbot_spirit_cubes).toBe(0)
      expect(
        loadDeck(router.state.location.state.cards).size(Pile.HAND_SPECIAL),
      ).toBe(2)
    })

    it('1 crystal, 2 special cards on other round prepare', () => {
      renderHookWithRouter({
        roundId: '2',
      })

      expect(router.state.location.state.crystals).toBe(1)
      expect(
        loadDeck(router.state.location.state.cards).size(Pile.HAND_SPECIAL),
      ).toBe(2)
    })

    it('does not duplicate assets when called twice', () => {
      const { result } = renderHookWithRouter()

      act(() => {
        // +1 extra call
        result.current()
      })

      expect(router.state.location.state.crystals).toBe(1)
    })

    describe('Extra difficulty', () => {
      it('2 spirit cubes in round 1', () => {
        renderHookWithRouter({
          roundId: '1',
          difficulty: [WWDifficulty.ADD_EXTRA_SPIRIT_CUBES],
        })

        expect(router.state.location.state.woodenbot_spirit_cubes).toBe(2)
      })

      it('no spirit cubes in round 2', () => {
        renderHookWithRouter({
          roundId: '2',
          difficulty: [WWDifficulty.ADD_EXTRA_SPIRIT_CUBES],
        })

        expect(router.state.location.state.woodenbot_spirit_cubes).toBe(0)
      })

      it('4 special cards', () => {
        renderHookWithRouter({
          difficulty: [WWDifficulty.ADD_EXTRA_SPECIAL_CARDS],
        })

        expect(
          loadDeck(router.state.location.state.cards).size(Pile.HAND_SPECIAL),
        ).toBe(4)
      })
    })
  })
})
