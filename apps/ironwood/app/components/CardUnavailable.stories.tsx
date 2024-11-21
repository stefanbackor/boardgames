import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import { WBStance } from '~/constants/woodenbot'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { CardUnavailable } from './CardUnavailable'

type Story = StoryObj<typeof CardUnavailable>

const meta: Meta<typeof CardUnavailable> = {
  title: 'CardUnavailable',
  component: CardUnavailable,
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
Default.play = async ({ canvasElement, storyGlobals: { router } }) => {
  const canvas = within(canvasElement)
  const executeButton = canvas.getByTestId('execute-button')

  await userEvent.click(executeButton)

  const state = router.state.location.state

  expect(state.woodenbot_action_stance).toBe(WBStance.DISRUPTIVE)
  expect(state.expended_unavailable_done).toBe(true)
  expect(state.crystals).toBe(1)
}
