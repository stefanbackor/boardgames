import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import {
  IBAction,
  IBStance,
  IBTurnProcedure,
  IC_CARDS,
} from '~/constants/ironbot'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { CardAction } from './CardAction'

type Story = StoryObj<typeof CardAction>

const meta: Meta<typeof CardAction> = {
  title: 'Ironbot/CardAction/Aggressive/Exhausted',
  component: CardAction,
  parameters: {
    ...memoryRouterParameters({
      state: {
        ironbot_action_stance: IBStance.AGGRESSIVE,
        ironbot_1_turn_procedure: IBTurnProcedure.EXHAUSTED,
      },
    }),
  },
  args: {
    card: IC_CARDS[0],
  },
}

export default meta

export const Battle: Story = {
  args: {
    action: IBAction.BATTLE,
  },
}
export const BattleExecuted: Story = {
  ...Battle,
  play: async ({ canvasElement, storyGlobals: { router } }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTestId('execute-button'))

    const state = router.state.location.state
    console.log(state)
    expect(state.ironbot_1_turn_procedure).toBe('alert')
  },
}

export const Card: Story = {
  args: {
    action: IBAction.CARD,
  },
}

export const Compass: Story = {
  args: {
    action: IBAction.COMPASS,
  },
}
export const Crystals: Story = {
  args: {
    action: IBAction.CRYSTALS,
  },
}
export const Drill: Story = {
  args: {
    action: IBAction.DRILL,
  },
}
export const Forge: Story = {
  args: {
    action: IBAction.FORGE,
  },
}
export const Golem: Story = {
  args: {
    action: IBAction.GOLEM,
  },
}
export const Hit: Story = {
  args: {
    action: IBAction.HIT,
  },
}
export const Shield: Story = {
  args: {
    action: IBAction.SHIELD,
  },
}
export const Warband: Story = {
  args: {
    action: IBAction.WARBAND,
  },
}
