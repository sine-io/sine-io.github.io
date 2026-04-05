// @ts-expect-error app tsconfig does not include Node types, but vitest runs in Node.
import { readFileSync } from 'node:fs'

describe('globals.css', () => {
  it('keeps the shared astronomical field tokens', () => {
    const globalsCss = readFileSync('src/styles/globals.css', 'utf8')

    expect(globalsCss).toContain('body::before')
    expect(globalsCss).toContain('radial-gradient(circle at 18% 14%')
    expect(globalsCss).toContain('#0A1128')
  })
})
