import { decodeGithubPagesSpaPath, restoreGithubPagesSpaPath } from '@/lib/githubPagesSpaFallback'

describe('github pages spa fallback', () => {
  it('returns null when the current search does not contain a fallback redirect', () => {
    expect(decodeGithubPagesSpaPath('', '/', '')).toBeNull()
    expect(decodeGithubPagesSpaPath('?q=search', '/', '')).toBeNull()
  })

  it('decodes a redirected path for a root-hosted app', () => {
    expect(decodeGithubPagesSpaPath('?/projects/opc', '/', '')).toBe('/projects/opc')
    expect(decodeGithubPagesSpaPath('?/projects/opc&stage=2', '/', '#cases')).toBe('/projects/opc?stage=2#cases')
  })

  it('restores the redirected path into browser history', () => {
    const replaceState = vi.fn()
    const restored = restoreGithubPagesSpaPath({
      location: {
        search: '?/projects/opc&stage=2',
        pathname: '/',
        hash: '#cases'
      } as Window['location'],
      history: { replaceState } as Window['history']
    })

    expect(restored).toBe(true)
    expect(replaceState).toHaveBeenCalledWith(null, '', '/projects/opc?stage=2#cases')
  })
})
