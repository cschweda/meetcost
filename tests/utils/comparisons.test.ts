import { describe, it, expect } from 'vitest'
import { generateComparison, generateComparisonList } from '~/utils/comparisons'

describe('generateComparison', () => {
  it('returns "0 items" for zero or negative cost', () => {
    expect(generateComparison(0)).toBe('0 items')
    expect(generateComparison(-10)).toBe('0 items')
  })

  it('returns string in format "N item" for positive cost', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateComparison(100)
      expect(result).toMatch(/^\d+ .+$/)
      expect(result).not.toBe('0 items')
    }
  })
})

describe('generateComparisonList', () => {
  it('returns empty array for zero cost', () => {
    const result = generateComparisonList(0)
    expect(result).toEqual([])
  })

  it('returns up to count items', () => {
    const result = generateComparisonList(500, 3)
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('each item matches "N item" format', () => {
    const result = generateComparisonList(500, 3)
    result.forEach((item) => {
      expect(item).toMatch(/^\d+ .+$/)
    })
  })

  it('returns no duplicate items', () => {
    const result = generateComparisonList(10000, 5)
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })

  it('respects custom count', () => {
    const result = generateComparisonList(500, 1)
    expect(result.length).toBeLessThanOrEqual(1)
  })

  it('quantities are positive for sufficiently high cost', () => {
    const result = generateComparisonList(1000, 3)
    result.forEach((item) => {
      const match = item.match(/^(\d+)/)
      expect(match).toBeTruthy()
      if (match) expect(Number(match[1])).toBeGreaterThan(0)
    })
  })
})
