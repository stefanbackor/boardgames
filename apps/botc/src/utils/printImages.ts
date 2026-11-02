/** Marks the images that only exist on paper */
export const PRINT_IMAGE_CLASS = 'print-role-image'

const POLL_INTERVAL_MS = 100

function allPrintImagesLoaded(): boolean {
  return Array.from(
    document.querySelectorAll<HTMLImageElement>(`img.${PRINT_IMAGE_CLASS}`),
  ).every((image) => image.complete && image.naturalWidth > 0)
}

/**
 * Runs the callback once the print images have loaded, as the browser prints
 * without waiting for them. A failed image counts as not loaded because it may
 * be falling back to its original, so the timeout bounds the wait for one that
 * never loads.
 *
 * @param callback - What to run when the images are ready
 * @param timeoutMs - The longest to wait before running it anyway
 */
export function whenPrintImagesReady(
  callback: () => void,
  timeoutMs = 3000,
): void {
  if (allPrintImagesLoaded()) {
    callback()
    return
  }

  const startedAt = Date.now()
  const interval = setInterval(() => {
    if (allPrintImagesLoaded() || Date.now() - startedAt >= timeoutMs) {
      clearInterval(interval)
      callback()
    }
  }, POLL_INTERVAL_MS)
}
