export function decodeGithubPagesSpaPath(search: string, pathname: string, hash: string) {
  if (!search.startsWith('?/')) {
    return null
  }

  const decoded = search
    .slice(1)
    .split('&')
    .map((segment) => segment.replace(/~and~/g, '&'))
    .join('?')

  const basePath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  return `${basePath}${decoded}${hash}`
}

export function restoreGithubPagesSpaPath(windowObject: Pick<Window, 'location' | 'history'>) {
  const nextPath = decodeGithubPagesSpaPath(
    windowObject.location.search,
    windowObject.location.pathname,
    windowObject.location.hash
  )

  if (!nextPath) {
    return false
  }

  windowObject.history.replaceState(null, '', nextPath)

  return true
}
