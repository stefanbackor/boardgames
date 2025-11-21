/**
 * Sanitizes HTML to only allow safe tags: br, i, b, strong
 * Removes all other tags and potentially malicious content
 */
export function sanitizeHtml(html: string): string {
  // Return unsanitized HTML during SSR (will be sanitized on client)
  if (typeof document === 'undefined') {
    return html
  }

  // Create a temporary DOM element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = html

  // Allowed tags
  const allowedTags = ['br', 'i', 'b', 'strong']

  // Tags that should be completely removed including their content
  const dangerousTags = ['script', 'style', 'iframe', 'object', 'embed']

  // Recursively clean the DOM tree
  const cleanNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Return text content as-is (it's automatically escaped)
      return node.textContent || ''
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()

      // If tag is dangerous, remove it entirely (including its content)
      if (dangerousTags.includes(tagName)) {
        return ''
      }

      // If tag is allowed, reconstruct it with cleaned children
      if (allowedTags.includes(tagName)) {
        const children = Array.from(element.childNodes).map(cleanNode).join('')

        // BR tags are self-closing, no children
        if (tagName === 'br') {
          return '<br>'
        }

        return `<${tagName}>${children}</${tagName}>`
      }

      // If tag is not allowed, just return its children's content
      return Array.from(element.childNodes).map(cleanNode).join('')
    }

    return ''
  }

  return Array.from(temp.childNodes).map(cleanNode).join('')
}
