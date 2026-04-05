import { readFileSync } from 'node:fs'
import path from 'node:path'

describe('globals.css', () => {
  it('sets the body background to the exact Task 2 color', () => {
    const css = readFileSync(path.resolve(process.cwd(), 'src/styles/globals.css'), 'utf8')
    const bodyRule = css.match(/body\s*{([\s\S]*?)}/)?.[1]

    expect(bodyRule).toBeDefined()
    expect(bodyRule).toContain('background: #0A1128;')
    expect(bodyRule).not.toContain('radial-gradient')
  })
})
