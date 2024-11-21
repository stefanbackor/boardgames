import type { Meta, StoryObj } from '@storybook/react'

import { IBAction, IBStance, IBTurnProcedure } from '~/constants/ironbot'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { CardAction } from './CardAction'

type Story = StoryObj<typeof CardAction>

const meta: Meta<typeof CardAction> = {
  title: 'Ironbot/CardAction/Expansive/Exhausted',
  component: CardAction,
  parameters: {
    ...memoryRouterParameters({
      state: {
        ironbot_action_stance: IBStance.EXPANSIVE,
        ironbot_1_turn_procedure: IBTurnProcedure.EXHAUSTED,
      },
    }),
  },
}

export default meta

export const Battle: Story = {
  args: {
    action: IBAction.BATTLE,
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
