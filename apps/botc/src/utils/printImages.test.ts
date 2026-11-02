import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { PRINT_IMAGE_CLASS, whenPrintImagesReady } from './printImages'

function addPrintImage(state: { complete: boolean; naturalWidth: number }) {
  const image = document.createElement('img')
  image.className = PRINT_IMAGE_CLASS
  Object.defineProperty(image, 'complete', { get: () => state.complete })
  Object.defineProperty(image, 'naturalWidth', {
    get: () => state.naturalWidth,
  })
  document.body.append(image)
}

describe('whenPrintImagesReady', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.replaceChildren()
  })

  it('runs straight away when every print image has loaded', () => {
    addPrintImage({ complete: true, naturalWidth: 150 })
    const callback = vi.fn()

    whenPrintImagesReady(callback)

    expect(callback).toHaveBeenCalledOnce()
  })

  it('waits for an image still loading', () => {
    const state = { complete: false, naturalWidth: 0 }
    addPrintImage(state)
    const callback = vi.fn()

    whenPrintImagesReady(callback)
    vi.advanceTimersByTime(500)
    expect(callback).not.toHaveBeenCalled()

    state.complete = true
    state.naturalWidth = 150
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledOnce()
  })

  it('waits through a failed image, which may be falling back', () => {
    const state = { complete: true, naturalWidth: 0 }
    addPrintImage(state)
    const callback = vi.fn()

    whenPrintImagesReady(callback)

    expect(callback).not.toHaveBeenCalled()
  })

  it('gives up rather than block printing on an image that never loads', () => {
    addPrintImage({ complete: false, naturalWidth: 0 })
    const callback = vi.fn()

    whenPrintImagesReady(callback, 3000)
    vi.advanceTimersByTime(3000)
    vi.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledOnce()
  })
})
