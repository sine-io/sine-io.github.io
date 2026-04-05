export const siteMeta = {
  name: 'sine-io',
  title: 'Cyber-Wave Portfolio',
  description: 'Performance testing, tooling notes, and long-running technical projects.'
}

export const siteNav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
] as const

export const homeHero = {
  heading: 'Cyber-Wave',
  summary: siteMeta.description
}
