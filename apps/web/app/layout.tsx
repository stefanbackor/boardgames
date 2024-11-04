import './globals.css'
import '@radix-ui/themes/styles.css'

import { Container, Section, Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import { Bubblegum_Sans, Noto_Serif } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const bubblegumSans = Bubblegum_Sans({
  weight: '400',
  variable: '--font-bubblegum-sans',
  subsets: ['latin'],
})

const notoSerif = Noto_Serif({
  weight: ['400', '900'],
  variable: '--font-noto-serif',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Boardgames with Stefan',
  description:
    'Hello there! Please enjoy some boardgames solo apps I have created.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${bubblegumSans.variable}`}>
        <ThemeProvider attribute="class">
          <Theme
            appearance="inherit"
            accentColor="yellow"
            hasBackground={false}
            panelBackground="translucent"
            radius="full"
          >
            <Section size="1">
              <Container size="1">{children}</Container>
            </Section>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
