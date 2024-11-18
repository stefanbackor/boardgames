import { Meta, StoryObj } from '@storybook/react'

import { WW_VISION_CARDS } from '~/constants/woodenbot'

import { Chase } from './Chase'
import { Expand } from './Expand'
import { Protect } from './Protect'

const meta = {
  title: 'Ironbot/Modals',
  parameters: {
    routing: [{ path: '/:botId/:actionId' }],
    routerOpts: {
      initialEntries: [
        {
          pathname: '/woodenbot/1',
          search: new URLSearchParams({
            gameId: '123',
            roundId: '456',
          }).toString(),
          state: {
            ironbot_mountains_marked: [WW_VISION_CARDS[0]],
          },
        },
      ],
    },
  },
} satisfies Meta

export default meta

export const ChaseStory: StoryObj<typeof Chase> = {
  render: () => <Chase />,
}

export const ProtectStory: StoryObj<typeof Protect> = {
  render: () => <Protect />,
}

export const ExpandStory: StoryObj<typeof Expand> = {
  render: () => <Expand />,
}
