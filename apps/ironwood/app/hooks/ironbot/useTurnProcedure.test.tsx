import { act, renderHook } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { IBTurnProcedure } from '~/constants/ironbot'

import { useTurnProcedure } from './useTurnProcedure'

describe('useTurnProcedure', () => {
  let router: ReturnType<typeof createMemoryRouter>

  function render(actionId: string) {
    return renderHook(() => useTurnProcedure(), {
      wrapper: ({ children }) => {
        router = createMemoryRouter(
          [
            {
              path: '/:botId/:actionId',
              element: children,
            },
          ],
          {
            initialEntries: [
              {
                pathname: `/ironbot/${actionId}`,
                search: '?game=123&round=456',
                state: {},
              },
            ],
          },
        )
        return <RouterProvider router={router} />
      },
    })
  }

  it('should flip the turn procedure for 2nd action', () => {
    const { result } = render('1')
    act(() => {
      result.current.flipNextTurnProcedure()
    })
    expect(result.current.turnProcedure).toBe(IBTurnProcedure.ALERT)
    expect(router.state.location.state['ironbot_2_turn_procedure']).toBe(
      IBTurnProcedure.EXHAUSTED,
    )
  })

  it('should flip the turn procedure for 3rd action', () => {
    const { result: result2 } = render('2')
    act(() => {
      result2.current.flipNextTurnProcedure()
    })
    expect(result2.current.turnProcedure).toBe(IBTurnProcedure.ALERT)
    expect(router.state.location.state['ironbot_3_turn_procedure']).toBe(
      IBTurnProcedure.EXHAUSTED,
    )
  })

  it('should flip the turn procedure for 1st action', () => {
    const { result } = render('3')
    act(() => {
      result.current.flipNextTurnProcedure()
    })
    expect(result.current.turnProcedure).toBe(IBTurnProcedure.ALERT)
    expect(router.state.location.state['ironbot_1_turn_procedure']).toBe(
      IBTurnProcedure.EXHAUSTED,
    )
  })
})
