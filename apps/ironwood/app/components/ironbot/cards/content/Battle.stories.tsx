import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import { IBTurnProcedure } from '~/constants/ironbot'
import { loadDeck } from '~/utils/deck/loadDeck'
import { Pile } from '~/utils/state/types'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { Battle } from './Battle'

type Story = StoryObj<typeof Battle>

const meta: Meta<typeof Battle> = {
  title: 'Ironbot/CardAction/Battle',
  component: Battle,
}

export default meta

export const Alert: Story = {
  parameters: {
    ...memoryRouterParameters({
      state: {
        ironbot_1_turn_procedure: IBTurnProcedure.ALERT,
      },
    }),
  },
}

export const Exhausted: Story = {
  parameters: {
    ...memoryRouterParameters({
      state: {
        ironbot_1_turn_procedure: IBTurnProcedure.EXHAUSTED,
      },
    }),
  },
}

export const ExhaustedExecuted: Story = {
  ...Exhausted,
  play: async ({ canvasElement, storyGlobals: { router } }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByTestId('execute-button'))

    const state = router.state.location.state
    expect(state.ironbot_1_turn_procedure).toBe('alert')
    expect(loadDeck(state.cards).size(Pile.DISCARD_SPECIAL)).toBe(1)
  },
}
