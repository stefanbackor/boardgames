import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

const OG_WIDTH = 1200
const OG_HEIGHT = 630

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url)
    const scriptName =
      url.searchParams.get('name') || 'Blood on the Clocktower Script Tool'

    const origin = `${url.protocol}//${url.host}`
    const logoUrl = `${origin}/android-chrome-512x512.png`

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background:
              'radial-gradient(circle at top left, #1f2937 0%, #020617 55%, #000000 100%)',
            color: '#f9fafb',
            padding: '80px 100px',
            boxSizing: 'border-box',
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: 52,
              overflow: 'hidden',
              boxShadow:
                '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 0 6px rgba(248, 250, 252, 0.1)',
              marginRight: 80,
              flexShrink: 0,
              backgroundColor: '#020617',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="BotC Script Tool"
              width={220}
              height={220}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: OG_WIDTH - 260 - 80 - 120,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 600,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: '#9ca3af',
                marginBottom: 16,
              }}
            >
              Blood on the Clocktower
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#f9fafb',
                textShadow:
                  '0 10px 25px rgba(0, 0, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.7)',
                marginBottom: 24,
              }}
            >
              {scriptName}
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#d1d5db',
              }}
            >
              Script Tool • Night Order • Role Details
            </div>
          </div>
        </div>
      ),
      {
        width: OG_WIDTH,
        height: OG_HEIGHT,
      },
    )
  } catch (error) {
    console.error(error)
    return new Response('Failed to generate OG image', { status: 500 })
  }
}
