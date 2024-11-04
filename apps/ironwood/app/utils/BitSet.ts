/**
 * A simple bitset implementation.
 */
export class BitSet {
  private _n: number

  constructor(n = 0) {
    this._n = n
  }

  /**
   * Get the value of the bitset.
   * @returns
   */
  get() {
    return this._n
  }

  /**
   * Set the bit at the given index.
   * @param index
   */
  set(index: number) {
    this._n |= 1 << index
  }

  /**
   * Test if the bit at the given index is set.
   * @param index
   * @returns
   */
  test(index: number) {
    return (this._n & (1 << index)) !== 0
  }

  /**
   * Clear the bit at the given index.
   * @param index
   */
  clear(index: number) {
    this._n &= ~(1 << index)
  }

  /**
   * Toggle the bit at the given index.
   * @param index
   */
  toggle(index: number) {
    this._n ^= 1 << index
  }

  /**
   * Log the bitset as a binary string.
   * @returns
   */
  log(radix?: number) {
    return this._n.toString(radix || 2)
  }
}
