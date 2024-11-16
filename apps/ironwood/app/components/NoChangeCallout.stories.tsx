import type { Meta, StoryObj } from '@storybook/react'

import { WBStance } from '~/constants/woodenbot'

import { NoChangeCallout } from './NoChangeCallout'

type Story = StoryObj<typeof NoChangeCallout>

const meta: Meta<typeof NoChangeCallout> = {
  title: 'Components/NoChangeCallout',
  component: NoChangeCallout,
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
            woodenbot_action_stance: WBStance.DISRUPTIVE,
          },
        },
      ],
    },
  },
}

export default meta

export const Default: Story = {}
