import { createGithubPagesFallbackHtml, createGithubPagesRedirectScript } from '../scripts/spa-fallback-utils.mjs'

describe('spa fallback utils', () => {
  it('builds the redirect script with the root-path configuration', () => {
    const script = createGithubPagesRedirectScript()

    expect(script).toContain("l.replace(nextUrl)")
    expect(script).toContain("slice(0, 1 + 0)")
  })

  it('injects the redirect script before the closing body tag', () => {
    const html = createGithubPagesFallbackHtml('<html><body><div id="root"></div></body></html>')

    expect(html).toContain('<div id="root"></div>')
    expect(html).toContain("l.replace(nextUrl)")
    expect(html).toContain('</script></body>')
  })
})
