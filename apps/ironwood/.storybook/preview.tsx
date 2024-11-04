import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-remix-react-router'
import { withRadixTheme } from './decorators/withRadixTheme'

const preview: Preview = {
  decorators: [withRouter, withRadixTheme],
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
