import { Theme } from '@radix-ui/themes'
import React from 'react'
import '@radix-ui/themes/styles.css'
import '../../app/overrides.css'

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
