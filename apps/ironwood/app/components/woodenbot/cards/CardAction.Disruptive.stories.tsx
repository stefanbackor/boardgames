import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import {
  WBAction,
  WBStance,
  WW_CARDS,
  WW_VISION_CARDS_INSIDE,
} from '~/constants/woodenbot'
import { loadDeck } from '~/utils/deck/loadDeck'
import { Pile } from '~/utils/state/types'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { CardAction } from './CardAction'

type Story = StoryObj<typeof CardAction>

const meta: Meta<typeof CardAction> = {
  title: 'Woodenbot/CardAction/Disruptive',
  component: CardAction,
  parameters: {
    ...memoryRouterParameters({
      state: {
        woodenbot_action_stance: WBStance.DISRUPTIVE,
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
Card.play = async ({ canvasElement, storyGlobals: { router } }) => {
  const canvas = within(canvasElement)
  const executeButton = canvas.getByTestId('execute-button')

  await userEvent.click(executeButton)

  const state = router.state.location.state
  expect(state.woodenbot_action_stance).toBe(WBStance.DISRUPTIVE)
  expect(loadDeck(state.cards).pile(Pile.HAND_SPECIAL_PRIORITY).length).toBe(1)
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
Cubes.play = async (arg) => {
  const {
    canvasElement,
    storyGlobals: { router },
  } = arg
  const canvas = within(canvasElement)
  const executeButton = canvas.getByTestId('execute-button')

  await userEvent.click(executeButton)

  const state = router.state.location.state
  expect(state.woodenbot_action_stance).toBe(WBStance.DISRUPTIVE)
  expect(state.woodenbot_spirit_cubes).toBe(2)
}

export const CubesAsRed: Story = {
  args: {
    action: WBAction.CUBES_RED,
  },
}
CubesAsRed.play = Cubes.play

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

export const SearchExecuted: Story = { ...Search }
SearchExecuted.play = async (arg) => {
  const {
    canvasElement,
    step,
    storyGlobals: { router },
  } = arg
  const canvas = within(canvasElement)
  const choiceButton = canvas.queryAllByRole('radio')
  const executeButton = canvas.getByTestId('execute-button')

  const mountain = 'AURIA'
  const mountainVisionCard = WW_VISION_CARDS_INSIDE.find(
    (c) => c[0] === mountain,
  )

  await step('Enter email and password', async () => {
    await userEvent.click(
      choiceButton.find((b) => b.getAttribute('value') === mountain)!,
    )
    await userEvent.click(executeButton)
  })

  const state = router.state.location.state
  console.log(state)

  expect(state.woodenbot_action_stance).toBe(WBStance.DISRUPTIVE)
  expect(state.woodenbot_vision_discovery_done['WW01P/search/undefined']).toBe(
    true,
  )
  expect(state.woodenbot_vision_discovery_card['WW01P/search/undefined']).toBe(
    mountainVisionCard,
  )
  expect(
    state.woodenbot_vision_discovery_marked['WW01P/search/undefined'].length,
  ).toBe(5)
  expect(
    state.woodenbot_vision_discovery_marked['WW01P/search/undefined'],
  ).not.toContain(mountainVisionCard)
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
