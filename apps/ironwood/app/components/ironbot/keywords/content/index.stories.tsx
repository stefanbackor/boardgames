import { Meta, StoryObj } from '@storybook/react'

import { Chase } from './Chase'
import { Expand } from './Expand'
import { Protect } from './Protect'

const meta = {
  title: 'Ironbot/Modals',
} satisfies Meta

export default meta

export const ChaseStory: StoryObj<typeof Chase> = {
  render: () => <Chase />,
}

export const ProtectStory: StoryObj<typeof Protect> = {
  render: () => <Protect />,
}

export const ExpandStory: StoryObj<typeof Expand> = {
  render: () => <Expand />,
}
