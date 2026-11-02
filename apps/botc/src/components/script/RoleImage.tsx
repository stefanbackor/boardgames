import { useState } from 'react'
import { getPrintImageUrl, getProxiedImageUrl } from '@/utils/imageUrl'
import { PRINT_IMAGE_CLASS } from '@/utils/printImages'

interface PrintRoleImageProps {
  /** The role's original image URL */
  image: string
  /** Alternative text, empty when a name sits next to the image */
  alt: string
  /** Sizing and shape, applied to both the screen and the print image */
  style?: React.CSSProperties
}

/**
 * The copy of a role image that only exists on paper, kept small so it does not
 * dominate the size of a saved PDF. It is always in the DOM rather than swapped
 * in for printing, because the browser prints without waiting for a new image
 * to load. The Print action waits for it with `whenPrintImagesReady`.
 *
 * Hosts can block the proxy, and custom images often live on such hosts, so a
 * failed request falls back to the original image.
 */
export function PrintRoleImage({ image, alt, style }: PrintRoleImageProps) {
  const [failedImage, setFailedImage] = useState<string>()

  return (
    <img
      src={failedImage === image ? image : getPrintImageUrl(image)}
      alt={alt}
      className={`${PRINT_IMAGE_CLASS} hidden print:block`}
      style={style}
      onError={() => setFailedImage(image)}
    />
  )
}

interface RoleImageProps extends PrintRoleImageProps {
  /** What to show on screen; defaults to the proxied image */
  screenSrc?: string
}

/** A role image, sourced separately for the screen and for print. */
export function RoleImage({
  image,
  screenSrc = getProxiedImageUrl(image),
  alt,
  style,
}: RoleImageProps) {
  return (
    <>
      <img
        src={screenSrc}
        alt={alt}
        className="block print:hidden"
        style={style}
      />
      <PrintRoleImage image={image} alt={alt} style={style} />
    </>
  )
}
