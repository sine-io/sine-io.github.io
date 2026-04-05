import { NavLink } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <NavLink to="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
            sine-io
          </NavLink>
          <div className="hidden gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="text-[#A6B4CD] transition hover:text-white">
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  )
}
