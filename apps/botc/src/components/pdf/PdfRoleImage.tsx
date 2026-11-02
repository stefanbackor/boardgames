import { Image, View } from '@react-pdf/renderer'
import { getImageScale, getPrintImageUrl } from '@/utils/imageUrl'
import { cssPx } from './pdfStyles'

interface PdfRoleImageProps {
  image?: string
  /** The box to draw it in, in CSS pixels */
  size: number
  /** Crops an oversized image to the box, the way print does for small icons */
  clipped?: boolean
}

/**
 * wsrv.nl serves CORS headers, and JPEG is what react-pdf embeds without
 * re-encoding it. An image left as is, like a data URI, is already in hand.
 */
const pdfImageUrl = (image: string) => {
  const url = getPrintImageUrl(image) ?? image
  return url.startsWith('//') ? `https:${url}` : url
}

/** A role's image, or an empty box of the same size when it has none */
export function PdfRoleImage({ image, size, clipped }: PdfRoleImageProps) {
  const box = cssPx(size)
  const boxStyle = { width: box, height: box }

  if (!image) return <View style={boxStyle} />

  // Wiki images are drawn larger than the box they sit in, see getImageScale
  const drawn = box * getImageScale(image)
  const offset = (box - drawn) / 2

  return (
    <View
      style={
        clipped
          ? { ...boxStyle, borderRadius: box / 2, overflow: 'hidden' }
          : boxStyle
      }
    >
      <Image
        src={pdfImageUrl(image)}
        style={{
          position: 'absolute',
          top: offset,
          left: offset,
          width: drawn,
          height: drawn,
          borderRadius: drawn / 2,
          objectFit: 'cover',
        }}
      />
    </View>
  )
}
