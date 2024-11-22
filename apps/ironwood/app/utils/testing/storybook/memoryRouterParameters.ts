import { LocationState } from '~/utils/state/types'

type Props = {
  pathname?: string
  state?: Partial<LocationState>
}

export const memoryRouterParameters = ({
  pathname = '/woodenbot/1',
  state,
}: Props = {}) => {
  return {
    memoryRouter: {
      routes: [{ path: '/:botId/:actionId' }],
      opts: {
        initialEntries: [
          {
            pathname,
            search: new URLSearchParams({
              gameId: '123',
              roundId: '456',
            }).toString(),
            state,
          },
        ],
      },
    },
  }
}
