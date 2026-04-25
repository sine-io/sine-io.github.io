import { NavLink } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { siteNav } from '@/content/site'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#A6DEFC]/10 bg-[#050A18]/70 backdrop-blur-xl">
      <Container>
        <nav className="py-3 md:py-0">
          <div className="flex h-10 items-center justify-between md:h-16">
            <NavLink
              to="/"
              className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold uppercase tracking-[0.35em] text-white"
            >
              <span className="h-2 w-2 rounded-full bg-[#5DE3E9] shadow-[0_0_18px_rgba(93,227,233,0.9)] transition group-hover:scale-125" />
              <span>sine-io</span>
            </NavLink>
            <div className="hidden gap-6 text-sm md:flex">
              {siteNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'rounded-full px-3 py-2 transition hover:bg-white/[0.04] hover:text-white',
                      isActive ? 'text-[#A6DEFC]' : 'text-[#A6B4CD]'
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm md:hidden">
            {siteNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-2 py-1 transition hover:bg-white/[0.04] hover:text-white',
                    isActive ? 'text-[#A6DEFC]' : 'text-[#A6B4CD]'
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  )
}
