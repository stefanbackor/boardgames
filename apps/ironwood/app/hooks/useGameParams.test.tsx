import {
  createMemoryRouter,
  RouterProvider,
} from '@remix-run/react/node_modules/react-router-dom'
import { renderHook } from '@testing-library/react'

import { useGameParams } from './useGameParams'

describe('useGameParams', () => {
  it('should return the game params from current URL', () => {
    const { result } = renderHook(() => useGameParams(), {
      wrapper: ({ children }) => {
        const router = createMemoryRouter(
          [
            {
              path: '/:botId/:actionId',
              element: children,
            },
          ],
          {
            initialEntries: [
              {
                // botId and actionId are path params,
                // while gameId and roundId are search params
                pathname: `/woodenbot/3`,
                search: `?game=123&round=456`,
                state: {},
              },
            ],
          },
        )
        return <RouterProvider router={router} />
      },
    })

    expect(result.current).toEqual({
      botId: 'woodenbot',
      gameId: '123',
      roundId: '456',
      actionId: '3',
    })
  })
})
