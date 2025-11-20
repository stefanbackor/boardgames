import { describe, it, expect } from 'vitest'
import { sanitizeHtml } from './sanitizeHtml'

describe('sanitizeHtml', () => {
  it('should allow safe tags: br, i, b, strong', () => {
    const input = 'This is <b>bold</b> and <i>italic</i> and <strong>strong</strong>.<br>New line.'
    const expected = 'This is <b>bold</b> and <i>italic</i> and <strong>strong</strong>.<br>New line.'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should remove dangerous script tags', () => {
    const input = 'Hello <script>alert("xss")</script> world'
    const expected = 'Hello  world'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should remove onclick and other event handlers', () => {
    const input = '<b onclick="alert(\'xss\')">Click me</b>'
    const expected = '<b>Click me</b>'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should remove disallowed tags but keep their content', () => {
    const input = '<div>Hello <span>world</span></div>'
    const expected = 'Hello world'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should handle nested allowed tags', () => {
    const input = '<b>Bold <i>and italic</i> text</b>'
    const expected = '<b>Bold <i>and italic</i> text</b>'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should handle self-closing br tags', () => {
    const input = 'Line 1<br/>Line 2<br>Line 3'
    const expected = 'Line 1<br>Line 2<br>Line 3'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should remove style tags', () => {
    const input = '<style>body { color: red; }</style>Text'
    const expected = 'Text'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should remove link tags', () => {
    const input = '<a href="http://evil.com">Click here</a>'
    const expected = 'Click here'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should handle plain text', () => {
    const input = 'Just plain text'
    const expected = 'Just plain text'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should handle empty string', () => {
    const input = ''
    const expected = ''
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should handle mixed safe and unsafe tags', () => {
    const input = '<div><b>Safe</b> <script>unsafe()</script> <i>text</i></div>'
    const expected = '<b>Safe</b>  <i>text</i>'
    expect(sanitizeHtml(input)).toBe(expected)
  })

  it('should remove img tags', () => {
    const input = 'Text <img src="x" onerror="alert(1)"> more text'
    const expected = 'Text  more text'
    expect(sanitizeHtml(input)).toBe(expected)
  })
})

