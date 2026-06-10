import '@radix-ui/themes/styles.css'
import '../../app/overrides.css'

import { Theme } from '@radix-ui/themes'
import React from 'react'

export const withRadixTheme = (Story: React.ComponentType) => (
  <Theme
    accentColor="green"
    appearance="dark"
    grayColor="sage"
    panelBackground="translucent"
    hasBackground={false}
  >
    <Story />
  </Theme>
)
