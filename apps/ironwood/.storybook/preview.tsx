import type { Preview } from '@storybook/react-vite'

import { withMemoryRouter } from './decorators/withMemoryRouter'
import { withRadixTheme } from './decorators/withRadixTheme'

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
