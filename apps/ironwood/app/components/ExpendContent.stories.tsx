import type { Meta, StoryObj } from '@storybook/react'

import { Difficulty } from '~/constants/difficulty'
import { WBStance, WW_CARDS_BASE } from '~/constants/woodenbot'
import { testingSetDifficultyValue } from '~/utils/difficulty/testing'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { ExpendContent } from './ExpendContent'

type Story = StoryObj<typeof ExpendContent>

const meta: Meta<typeof ExpendContent> = {
  title: 'ExpendContent',
  component: ExpendContent,
}

export default meta

export const Default: Story = {
  parameters: {
    ...memoryRouterParameters({
      pathname: '/woodenbot/1',
      state: {
        difficulty: testingSetDifficultyValue([Difficulty.RESOLVE_RED_ACTIONS]),
        woodenbot_action_stance: WBStance.DISRUPTIVE,
      },
    }),
  },
  args: {
    cards: WW_CARDS_BASE,
  },
}
