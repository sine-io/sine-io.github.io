import { Container } from '@/components/ui/Container'
import { profile } from '@/content/profile'

export function ContactPage() {
  return (
    <Container>
      <section className="py-24">
        <h1 className="text-4xl font-semibold text-white">Contact</h1>
        <p className="mt-4 text-[#A6B4CD]">{profile.contactIntro}</p>
        <ul className="mt-8 space-y-3">
          {profile.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-white hover:text-cyan-300">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
