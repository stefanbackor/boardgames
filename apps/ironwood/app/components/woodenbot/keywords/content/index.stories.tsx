import { Meta, StoryObj } from '@storybook/react'

import { WWWarriorType } from '~/constants/woodenbot'
import { WagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'
import { memoryRouterParameters } from '~/utils/testing/storybook/memoryRouterParameters'

import { Attack } from './Attack'
import { Discovers } from './Discovers'
import { Locate } from './Locate'
import { MovementInterfere } from './MovementInterfere'
import { MovementPlunder } from './MovementPlunder'
import { MovementSecure } from './MovementSecure'
import { Recruits } from './Recruits'

const meta = {
  title: 'Woodenbot/Keywords/Content',
  parameters: {
    ...memoryRouterParameters(),
  },
} satisfies Meta

export default meta

export const AttackStory: StoryObj<typeof Attack> = {
  render: () => <Attack purpose={WagerCardPurpose.ATTACK_DISRUPTIVE} />,
}

export const DiscoversStory: StoryObj<typeof Discovers> = {
  render: () => <Discovers />,
}

export const LocateStory: StoryObj<typeof Locate> = {
  render: () => <Locate />,
}

export const MovementInterfereStory: StoryObj<typeof MovementInterfere> = {
  render: () => (
    <MovementInterfere count="2" countType={WWWarriorType.WARBAND} />
  ),
}

export const MovementInterfereWarriorStory: StoryObj<typeof MovementInterfere> =
  {
    render: () => (
      <MovementInterfere count="2" countType={WWWarriorType.WOODWALKER} />
    ),
  }

export const MovementPlunderStory: StoryObj<typeof MovementPlunder> = {
  render: () => <MovementPlunder count="2" />,
}

export const MovementSecureStory: StoryObj<typeof MovementSecure> = {
  render: () => <MovementSecure count="2" />,
}

export const RecruitsStory: StoryObj<typeof Recruits> = {
  render: () => <Recruits count="2" />,
}
