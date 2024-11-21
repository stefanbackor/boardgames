import { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import { WBStance, WW_CARDS_SPECIAL } from '~/constants/woodenbot'
import { createDeck } from '~/utils/deck/createDeck'
import { loadDeck } from '~/utils/deck/loadDeck'
import { Pile } from '~/utils/state/types'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { Alert } from './Alert'

type Story = StoryObj<typeof Alert>

const meta: Meta<typeof Alert> = {
  title: 'Woodenbot/CardAction/Alert',
  component: Alert,
  parameters: {
    ...memoryRouterParameters({
      state: {
        woodenbot_action_stance: WBStance.DISRUPTIVE,
      },
    }),
  },
}

export default meta

export const Default: Story = {
  args: {},
}

export const Executed: Story = { ...Default }
Executed.parameters = {
  ...Default.parameters,
  ...memoryRouterParameters({
    state: {
      crystals: 1,
      // Using cards with "alert" action to trigger +1 crystal
      cards: createDeck(
        [WW_CARDS_SPECIAL.find((card) => card[0] === 'WW05')!],
        [WW_CARDS_SPECIAL.find((card) => card[0] === 'WW29')!],
      ).export(),
    },
  }),
}
Executed.play = async (arg) => {
  const {
    canvasElement,
    storyGlobals: { router },
  } = arg
  const canvas = within(canvasElement)
  const executeButton = canvas.getByTestId('execute-button')

  await userEvent.click(executeButton)

  const state = router.state.location.state
  expect(loadDeck(state.cards).get(Pile.ACTION1_BASE).length).toBe(1)
  expect(state.crystals).toBe(2)
}
