import '@radix-ui/themes/styles.css'
import './overrides.css'

import { Box, Container, Theme } from '@radix-ui/themes'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import sample from 'lodash/sample'
import { type PropsWithChildren } from 'react'

import { Footer } from './components/Footer'
import { IS_PRODUCTION } from './constants/environment'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
]

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

        {IS_PRODUCTION && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-MCJSZY4FKF"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html:
                  `window.dataLayer = window.dataLayer || [];` +
                  `function gtag(){dataLayer.push(arguments);}` +
                  `gtag('js', new Date());` +
                  `gtag('config', 'G-MCJSZY4FKF');`,
              }}
            ></script>
          </>
        )}
      </head>
      <body
        style={{
          backgroundImage: `url("${sample([
            'https://cf.geekdo-images.com/Qk4Narg7ZVrBv9VP-pzv-w__imagepagezoom/img/dIiE9c81r3bM40pbBaJ8Rgee6uU=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8199749.jpg',
          ])}")`,
          backgroundAttachment: 'fixed',
          backgroundOrigin: 'border-box',
          backgroundPosition: 'center -400px',
          backgroundSize: '1500px auto',
          margin: 0,
        }}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App({ children }: PropsWithChildren) {
  return (
    <Theme
      accentColor="green"
      appearance="dark"
      grayColor="sage"
      panelBackground="translucent"
      hasBackground={false}
      style={{
        backgroundColor:
          'color-mix(in srgb, var(--color-background) 75%, transparent)',
        backdropFilter: 'blur(5px)',
      }}
    >
      {children}
      <Container size="2">
        <Box p="3">
          <Outlet />
        </Box>
      </Container>

      <Container size="2">
        <Footer />
      </Container>
    </Theme>
  )
}

export function HydrateFallback() {
  return <></>
}
