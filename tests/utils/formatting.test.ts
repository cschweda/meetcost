import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatHourlyRate,
  formatDuration,
  formatElapsedTime,
  formatDate,
  formatTime,
  formatDateISO,
  formatTime24,
} from '~/utils/formatting'

describe('formatCurrency', () => {
  it('formats numbers as USD currency', () => {
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(123.45)).toBe('$123.45')
    expect(formatCurrency(1000)).toBe('$1,000.00')
    expect(formatCurrency(0.01)).toBe('$0.01')
  })

  it('rounds to 2 decimal places', () => {
    expect(formatCurrency(1.234)).toBe('$1.23')
    expect(formatCurrency(1.236)).toBe('$1.24')
  })
})

describe('formatHourlyRate', () => {
  it('appends /hr to currency', () => {
    expect(formatHourlyRate(50)).toBe('$50.00/hr')
    expect(formatHourlyRate(0)).toBe('$0.00/hr')
  })
})

describe('formatDuration', () => {
  it('formats seconds only', () => {
    const d = formatDuration(45)
    expect(d.totalSeconds).toBe(45)
    expect(d.readable).toContain('45 second')
    expect(d.detail).toBe('45 sec')
  })

  it('formats minutes and seconds', () => {
    const d = formatDuration(125) // 2 min 5 sec
    expect(d.totalSeconds).toBe(125)
    expect(d.minutes).toBe(2)
    expect(d.seconds).toBe(5)
    expect(d.readable).toContain('2 minute')
    expect(d.readable).toContain('5 second')
  })

  it('formats hours, minutes, seconds', () => {
    const d = formatDuration(3665) // 1h 1m 5s
    expect(d.hours).toBe(1)
    expect(d.minutes).toBe(1)
    expect(d.seconds).toBe(5)
    expect(d.totalSeconds).toBe(3665)
    expect(d.readable).toContain('1 hour')
    expect(d.readable).toContain('1 minute')
    expect(d.detail).toBe('1h 1m 5s')
  })

  it('handles singular vs plural', () => {
    expect(formatDuration(1).readable).toContain('1 second')
    expect(formatDuration(60).readable).toContain('1 minute')
    expect(formatDuration(3600).readable).toContain('1 hour')
  })

  it('floors fractional seconds', () => {
    const d = formatDuration(90.9)
    expect(d.totalSeconds).toBe(90)
  })
})

describe('formatElapsedTime', () => {
  it('formats as M:SS for under 1 hour', () => {
    expect(formatElapsedTime(0)).toBe('0:00')
    expect(formatElapsedTime(45)).toBe('0:45')
    expect(formatElapsedTime(90)).toBe('1:30')
    expect(formatElapsedTime(3599)).toBe('59:59')
  })

  it('formats as H:MM:SS for 1+ hours', () => {
    expect(formatElapsedTime(3600)).toBe('1:00:00')
    expect(formatElapsedTime(3665)).toBe('1:01:05')
    expect(formatElapsedTime(7325)).toBe('2:02:05')
  })
})

describe('formatDate', () => {
  it('formats timestamp as long date', () => {
    const ts = new Date(2026, 0, 15).getTime()
    const result = formatDate(ts)
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2026')
  })
})

describe('formatTime', () => {
  it('formats timestamp as 12-hour time', () => {
    const ts = new Date(2026, 0, 1, 14, 30).getTime()
    const result = formatTime(ts)
    expect(result).toMatch(/\d{1,2}:\d{2}/)
  })
})

describe('formatDateISO', () => {
  it('returns YYYY-MM-DD', () => {
    const ts = new Date(2026, 0, 15).getTime()
    expect(formatDateISO(ts)).toBe('2026-01-15')
  })
})

describe('formatTime24', () => {
  it('returns HH:MM in 24-hour format', () => {
    const ts = new Date(2026, 0, 1, 9, 5).getTime()
    expect(formatTime24(ts)).toBe('09:05')
  })

  it('pads with zeros', () => {
    const ts = new Date(2026, 0, 1, 14, 30).getTime()
    expect(formatTime24(ts)).toBe('14:30')
  })
})
