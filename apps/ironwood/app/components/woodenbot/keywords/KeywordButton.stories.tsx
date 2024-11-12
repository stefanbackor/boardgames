import { Flex } from '@radix-ui/themes'
import { Meta, StoryObj } from '@storybook/react'

import { Keyword } from './KeywordButton'

type Story = StoryObj<typeof Keyword>

const meta: Meta<typeof Keyword> = {
  title: 'Woodenbot/Keywords',
  parameters: {},
}

export default meta

export const Buttons: Story = {
  render: () => (
    <Flex gap="3" direction="column" justify="start" align="start">
      {Object.entries(Keyword).map(([name, Component]) => (
        <Component key={name} count="1" />
      ))}
    </Flex>
  ),
}

export const Plunder: Story = {
  render: () => <Keyword.Plunder count="1" dialogProps={{ open: true }} />,
}
