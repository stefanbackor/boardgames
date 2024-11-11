import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import {
  WW_VISION_CARDS_INSIDE,
  WWAction,
  WWStance,
} from '~/constants/woodenbot'
import { loadDeck } from '~/utils/deck/loadDeck'
import { Pile } from '~/utils/state/types'

import { CardAction } from './CardAction'

type Story = StoryObj<typeof CardAction>

const meta: Meta<typeof CardAction> = {
  title: 'Woodenbot/Cards/Actions/Disruptive',
  component: CardAction,
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
            woodenbot_action_stance: WWStance.DISRUPTIVE,
          },
        },
      ],
    },
  },
}

export default meta

export const Card: Story = {
  args: {
    action: WWAction.CARD,
  },
}
Card.play = async (arg) => {
  const {
    canvasElement,
    storyGlobals: { router },
  } = arg
  const canvas = within(canvasElement)
  const executeButton = canvas.getByTestId('execute-button')

  await userEvent.click(executeButton)

  const state = router.state.location.state
  expect(state.woodenbot_action_stance).toBe(WWStance.DISRUPTIVE)
  expect(loadDeck(state.cards).pile(Pile.HAND_SPECIAL_PRIORITY).length).toBe(1)
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
Cubes.play = async (arg) => {
  const {
    canvasElement,
    storyGlobals: { router },
  } = arg
  const canvas = within(canvasElement)
  const executeButton = canvas.getByTestId('execute-button')

  await userEvent.click(executeButton)

  const state = router.state.location.state
  expect(state.woodenbot_action_stance).toBe(WWStance.DISRUPTIVE)
  expect(state.woodenbot_spirit_cubes).toBe(2)
}

export const CubesAsRed: Story = {
  args: {
    action: WWAction.CUBES_RED,
  },
}
CubesAsRed.play = Cubes.play

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

export const SearchExecuted: Story = { ...Search }
SearchExecuted.play = async (arg) => {
  const {
    canvasElement,
    storyGlobals: { router },
  } = arg
  const canvas = within(canvasElement)
  const choiceButton = canvas.queryAllByRole('radio')
  const executeButton = canvas.getByTestId('execute-button')

  const mountain = 'AURIA'
  const mountainVisionCard = WW_VISION_CARDS_INSIDE.find(
    (c) => c[0] === mountain,
  )

  await userEvent.click(
    choiceButton.find((b) => b.getAttribute('value') === mountain)!,
  )
  await userEvent.click(executeButton)

  const state = router.state.location.state

  expect(state.woodenbot_action_stance).toBe(WWStance.DISRUPTIVE)
  expect(state.woodenbot_vision_discovery_search_card_done).toBe(true)
  expect(state.woodenbot_vision_discovery_search_card_card).toBe(
    mountainVisionCard,
  )
  expect(state.woodenbot_vision_discovery_search_card_marked.length).toBe(5)
  expect(state.woodenbot_vision_discovery_search_card_marked).not.toContain(
    mountainVisionCard,
  )
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
