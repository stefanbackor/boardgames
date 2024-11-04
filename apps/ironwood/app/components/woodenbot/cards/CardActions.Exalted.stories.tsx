import type { Meta, StoryObj } from '@storybook/react'
import { reactRouterParameters } from 'storybook-addon-remix-react-router'

import { WWAction, WWStance } from '~/constants/woodenbot'

import { CardAction } from './CardAction'

type Story = StoryObj<typeof CardAction>

const meta: Meta<typeof CardAction> = {
  title: 'Woodenbot/Cards/Actions/Exalted',
  component: CardAction,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        state: {
          woodenbot_action_stance: WWStance.EXALTED,
        },
      },
    }),
  },
}

export default meta

export const Card: Story = {
  args: {
    action: WWAction.CARD,
  },
}

export const CardAsRed: Story = {
  args: {
    action: WWAction.CARD_RED,
  },
}

export const Crystals: Story = {
  args: {
    action: WWAction.CRYSTALS,
  },
}

export const Eye: Story = {
  args: {
    action: WWAction.EYE,
  },
}

export const EyeAsRed: Story = {
  args: {
    action: WWAction.EYE_RED,
  },
}

export const Warband: Story = {
  args: {
    action: WWAction.WARBAND,
  },
}

export const WarbandAsRed: Story = {
  args: {
    action: WWAction.WARBAND_RED,
  },
}

export const Shield: Story = {
  args: {
    action: WWAction.SHIELD,
  },
}

export const ShieldAsRed: Story = {
  args: {
    action: WWAction.SHIELD_RED,
  },
}

export const Alert: Story = {
  args: {
    action: WWAction.ALERT,
  },
}

export const AlertAsRed: Story = {
  args: {
    action: WWAction.ALERT_RED,
  },
}

export const Cubes: Story = {
  args: {
    action: WWAction.CUBES,
  },
}

export const CubesAsRed: Story = {
  args: {
    action: WWAction.CUBES_RED,
  },
}

export const Battle: Story = {
  args: {
    action: WWAction.BATTLE,
  },
}

export const Search: Story = {
  args: {
    action: WWAction.SEARCH,
  },
}

export const SearchAsRed: Story = {
  args: {
    action: WWAction.SEARCH_RED,
  },
}

export const Arrows: Story = {
  args: {
    action: WWAction.ARROWS,
  },
}
