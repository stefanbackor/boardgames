import type { Meta, StoryObj } from '@storybook/react'

import { WBAction, WBStance, WW_CARDS } from '~/constants/woodenbot'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { CardAction } from './CardAction'

type Story = StoryObj<typeof CardAction>

const meta: Meta<typeof CardAction> = {
  title: 'Woodenbot/CardAction/Exalted',
  component: CardAction,
  parameters: {
    ...memoryRouterParameters({
      state: {
        woodenbot_action_stance: WBStance.EXALTED,
      },
    }),
  },
  args: {
    card: WW_CARDS[0],
  },
}

export default meta

export const Card: Story = {
  args: {
    action: WBAction.CARD,
  },
}

export const CardAsRed: Story = {
  args: {
    action: WBAction.CARD_RED,
  },
}

export const Crystals: Story = {
  args: {
    action: WBAction.CRYSTALS,
  },
}

export const Eye: Story = {
  args: {
    action: WBAction.EYE,
  },
}

export const EyeAsRed: Story = {
  args: {
    action: WBAction.EYE_RED,
  },
}

export const Warband: Story = {
  args: {
    action: WBAction.WARBAND,
  },
}

export const WarbandAsRed: Story = {
  args: {
    action: WBAction.WARBAND_RED,
  },
}

export const Shield: Story = {
  args: {
    action: WBAction.SHIELD,
  },
}

export const ShieldAsRed: Story = {
  args: {
    action: WBAction.SHIELD_RED,
  },
}

export const Alert: Story = {
  args: {
    action: WBAction.ALERT,
  },
}

export const AlertAsRed: Story = {
  args: {
    action: WBAction.ALERT_RED,
  },
}

export const Cubes: Story = {
  args: {
    action: WBAction.CUBES,
  },
}

export const CubesAsRed: Story = {
  args: {
    action: WBAction.CUBES_RED,
  },
}

export const Battle: Story = {
  args: {
    action: WBAction.BATTLE,
  },
}

export const Search: Story = {
  args: {
    action: WBAction.SEARCH,
  },
}

export const SearchAsRed: Story = {
  args: {
    action: WBAction.SEARCH_RED,
  },
}

export const Arrows: Story = {
  args: {
    action: WBAction.ARROWS,
  },
}
