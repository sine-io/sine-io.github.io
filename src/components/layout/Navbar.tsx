import { NavLink } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { siteNav } from '@/content/site'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <Container>
        <nav className="py-3 md:py-0">
          <div className="flex h-10 items-center justify-between md:h-16">
            <NavLink to="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
              sine-io
            </NavLink>
            <div className="hidden gap-6 text-sm md:flex">
              {siteNav.map((item) => (
                <NavLink key={item.to} to={item.to} className="text-[#A6B4CD] transition hover:text-white">
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm md:hidden">
            {siteNav.map((item) => (
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
