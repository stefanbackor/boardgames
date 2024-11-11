import type { Preview } from '@storybook/react'
import { withRadixTheme } from './decorators/withRadixTheme'
import { withMemoryRouter } from './decorators/withMemoryRouter'

const preview: Preview = {
  decorators: [withMemoryRouter, withRadixTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
