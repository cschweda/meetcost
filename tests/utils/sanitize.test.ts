import { describe, it, expect } from 'vitest'
import { sanitizeString } from '~/utils/sanitize'

describe('sanitizeString', () => {
  it('returns empty string for non-string input', () => {
    expect(sanitizeString(null as unknown)).toBe('')
    expect(sanitizeString(undefined as unknown)).toBe('')
    expect(sanitizeString(123 as unknown)).toBe('')
    expect(sanitizeString({} as unknown)).toBe('')
  })

  it('passes through safe strings', () => {
    expect(sanitizeString('hello')).toBe('hello')
    expect(sanitizeString('Meeting Stand Up')).toBe('Meeting Stand Up')
  })

  it('strips HTML tags', () => {
    expect(sanitizeString('<script>alert(1)</script>')).toBe('alert(1)')
    expect(sanitizeString('<b>bold</b>')).toBe('bold')
    expect(sanitizeString('a <div>b</div> c')).toBe('a b c')
  })

  it('strips angle brackets', () => {
    expect(sanitizeString('a<b>c')).toBe('ac')
  })

  it('removes javascript: protocol', () => {
    expect(sanitizeString('javascript:alert(1)')).toBe('alert(1)')
  })

  it('removes data: protocol', () => {
    expect(sanitizeString('data:text/html,<script>')).not.toContain('data:')
  })

  it('trims whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello')
  })

  it('respects maxLength', () => {
    const long = 'a'.repeat(1000)
    expect(sanitizeString(long, 50)).toHaveLength(50)
    expect(sanitizeString(long, 10)).toBe('aaaaaaaaaa')
  })

  it('removes control characters', () => {
    expect(sanitizeString('hello\x00world')).toBe('helloworld')
    expect(sanitizeString('a\nb\tc')).not.toContain('\n')
  })

  it('removes zero-width characters', () => {
    expect(sanitizeString('hello\u200Bworld')).toBe('helloworld')
  })
})
