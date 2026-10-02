/**
 * @fileoverview Small bit manipulation utilities for register words.
 * @module
 */

/**
 * Creates a bitmask by shifting the value 1 left by `n` positions.
 *
 * @param n - Zero-based bit position. The function does not validate this value.
 * @returns The signed 32-bit JavaScript bitwise result. Values outside the unsigned 16-bit range are possible.
 *
 * @example
 * bit(0)  // 0b0001 = 1
 * bit(5)  // 0b0010_0000 = 32
 * bit(15) // 0b1000_0000_0000_0000 = 32768
 */
export const bit = (n: number) => 1 << n;
