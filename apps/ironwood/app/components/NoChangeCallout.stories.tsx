import type { Meta, StoryObj } from '@storybook/react'

import { WBStance } from '~/constants/woodenbot'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { NoChangeCallout } from './NoChangeCallout'

type Story = StoryObj<typeof NoChangeCallout>

const meta: Meta<typeof NoChangeCallout> = {
  title: 'Components/NoChangeCallout',
  component: NoChangeCallout,
  parameters: {
    ...memoryRouterParameters({
      state: {
        woodenbot_action_stance: WBStance.DISRUPTIVE,
      },
    }),
  },
}

export default meta

export const Default: Story = {}
