import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Theme } from '@radix-ui/themes'
import { getRouter } from './router'
import { initAnalytics, sendPageview } from './utils/analytics'

import '@radix-ui/themes/styles.css'
import './styles.css'
import './i18n'

const router = getRouter()

// Initialize Google Analytics
initAnalytics()

// Track route changes
router.subscribe('onResolved', () => {
  const url = window.location.pathname + window.location.search
  sendPageview(url)
})

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <Theme
        accentColor="purple"
        appearance="light"
        panelBackground="solid"
        hasBackground={false}
      >
        <RouterProvider router={router} />
      </Theme>
    </StrictMode>,
  )
}
