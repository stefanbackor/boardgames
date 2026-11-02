import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { PrintRoleImage, RoleImage } from './RoleImage'
import { getPrintImageUrl } from '@/utils/imageUrl'

const image = 'https://example.com/custom.png'

afterEach(cleanup)

describe('RoleImage', () => {
  it('shows the screen image on screen and the print image in print', () => {
    const { container } = render(
      <RoleImage image={image} screenSrc="/screen.webp" alt="Custom" />,
    )
    const [screen, print] = container.querySelectorAll('img')

    expect(screen.getAttribute('src')).toBe('/screen.webp')
    expect(screen.className).toContain('print:hidden')
    expect(print.getAttribute('src')).toBe(getPrintImageUrl(image))
    expect(print.className).toContain('hidden')
    expect(print.className).toContain('print:block')
  })
})

describe('PrintRoleImage', () => {
  it('falls back to the original image when the proxy cannot serve it', () => {
    const { container } = render(<PrintRoleImage image={image} alt="" />)
    const print = container.querySelector('img')!

    fireEvent.error(print)

    expect(print.getAttribute('src')).toBe(image)
  })

  it('tries the proxy again for a different image', () => {
    const { container, rerender } = render(
      <PrintRoleImage image={image} alt="" />,
    )
    fireEvent.error(container.querySelector('img')!)

    const replacement = 'https://example.com/replacement.png'
    rerender(<PrintRoleImage image={replacement} alt="" />)

    expect(container.querySelector('img')!.getAttribute('src')).toBe(
      getPrintImageUrl(replacement),
    )
  })
})
