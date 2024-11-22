import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'

import { WW_VISION_CARDS } from '~/constants/woodenbot'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { Chase } from './Chase'
import { Expand } from './Expand'
import { Protect } from './Protect'

const meta = {
  title: 'Ironbot/Keywords/Content',
  parameters: {
    ...memoryRouterParameters({
      state: {
        ironbot_mountains_marked: [WW_VISION_CARDS[0]],
      },
    }),
  },
} satisfies Meta

export default meta

export const ChaseStory: StoryObj<typeof Chase> = {
  render: () => <Chase />,
}

export const ChaseFullStory: StoryObj<typeof Chase> = {
  render: () => <Chase />,
  play: async ({ canvasElement }) => {
    const { getByTestId } = within(canvasElement)
    await userEvent.click(getByTestId('full-instructions'))
  },
}

export const ProtectStory: StoryObj<typeof Protect> = {
  render: () => <Protect />,
}

export const ExpandStory: StoryObj<typeof Expand> = {
  render: () => <Expand />,
}
export const ExpandFullStory: StoryObj<typeof Expand> = {
  render: () => <Expand />,
  play: async ({ canvasElement }) => {
    const { getByTestId } = within(canvasElement)
    await userEvent.click(getByTestId('full-instructions'))
  },
}
