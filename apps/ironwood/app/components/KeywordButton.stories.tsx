import { Flex } from '@radix-ui/themes'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'

import { Keyword } from './KeywordButton'

type Story = StoryObj<typeof Keyword>

const meta: Meta<typeof Keyword> = {
  title: 'Components/Keywords',
  parameters: {},
}

export default meta

export const Buttons: Story = {
  render: () => (
    <Flex gap="3" direction="column" justify="start" align="start">
      {Object.entries(Keyword).map(([name, Component]) => (
        // TODO: Fix this. Create each keyword story separately
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Component key={name} count="1" />
      ))}
    </Flex>
  ),
}

export const Plunder: Story = {
  render: () => <Keyword.Plunder count="1" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Plunder'))
  },
}
