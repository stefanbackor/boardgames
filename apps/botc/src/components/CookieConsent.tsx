import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { Cookie } from 'lucide-react'
import {
  CONSENT_REOPEN_EVENT,
  type ConsentChoice,
  getStoredConsent,
  setConsent,
} from '@/utils/consent'

const PARCHMENT = '#f1ead8'

/**
 * Cookie consent banner.
 *
 * Analytics (Google Analytics) loads in Consent Mode v2 with storage denied by
 * default (see index.html). This banner lets the user grant or refuse
 * analytics_storage. Essential storage (saved scripts, language preference) is
 * strictly necessary and is not gated. The choice is persisted in localStorage.
 *
 * The heading carries the app's theme; the body states the purpose in plain
 * language and links to the full notice, and the actions are unambiguous
 * ("Reject" / "Allow") with equal visual weight, so consent stays valid.
 */
export function CookieConsent() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prompt when the user hasn't decided yet...
    setVisible(getStoredConsent() === null)
    // ...or when they ask to review/change their choice (footer / privacy page).
    const open = () => setVisible(true)
    window.addEventListener(CONSENT_REOPEN_EVENT, open)
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, open)
  }, [])

  // Reserve space at the bottom of the page so the fixed banner never covers
  // content (e.g. the footer). The banner's live height is mirrored onto the
  // page's bottom padding while it is shown, and cleared once it is dismissed.
  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = ''
      return
    }
    const el = boxRef.current
    if (!el) return
    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => {
      observer.disconnect()
      document.body.style.paddingBottom = ''
    }
  }, [visible])

  if (!visible) return null

  const choose = (choice: ConsentChoice) => {
    setConsent(choice)
    setVisible(false)
  }

  return (
    <Box
      ref={boxRef}
      className="no-print"
      position="fixed"
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        padding: 'var(--space-2)',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Box
        role="dialog"
        aria-label={t('Cookie consent')}
        className="cookie-consent"
        style={{
          maxWidth: 400,
          width: '100%',
          pointerEvents: 'auto',
          color: PARCHMENT,
          backgroundColor: '#2b1b40',
          backgroundImage: 'url(/bg-tile-purple-pattern.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px',
          border: '1px solid rgba(241, 234, 216, 0.25)',
          borderRadius: 'var(--radius-4)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          padding: 'var(--space-3)',
        }}
      >
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <Cookie size={16} color={PARCHMENT} aria-hidden />
            <Heading
              as="h2"
              size="2"
              style={{
                fontFamily: "'Sorts Mill Goudy', serif",
                fontWeight: 'normal',
                color: PARCHMENT,
                margin: 0,
              }}
            >
              {t('Bluffing with Cookies')}
            </Heading>
          </Flex>

          <Text
            size="1"
            style={{ color: PARCHMENT, opacity: 0.9, lineHeight: 1.5 }}
          >
            {t(
              'We use Google Analytics cookies to understand how the tool is used and improve it. Essential storage for saving your scripts and language is always on.',
            )}{' '}
            <Link
              href="/privacy"
              style={{ color: PARCHMENT, textDecoration: 'underline' }}
            >
              {t('Privacy & cookies')}
            </Link>
          </Text>

          <Flex gap="2" justify="end" align="center" wrap="wrap">
            <Button
              size="1"
              variant="solid"
              className="cookie-consent-btn"
              onClick={() => choose('denied')}
            >
              {t('Reject')}
            </Button>
            <Button
              size="1"
              variant="solid"
              className="cookie-consent-btn"
              onClick={() => choose('granted')}
            >
              {t('Allow')}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
