export function createGithubPagesRedirectScript(pathSegmentsToKeep = 0) {
  return `<script>
(function() {
  var l = window.location;
  var nextUrl =
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + ${pathSegmentsToKeep}).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(${pathSegmentsToKeep}).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash;
  l.replace(nextUrl);
})();
</script>`
}

export function createGithubPagesFallbackHtml(indexHtml, pathSegmentsToKeep = 0) {
  const redirectScript = createGithubPagesRedirectScript(pathSegmentsToKeep)

  if (indexHtml.includes('</body>')) {
    return indexHtml.replace('</body>', `${redirectScript}</body>`)
  }

  return `${indexHtml}${redirectScript}`
}
