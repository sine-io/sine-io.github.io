import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/content/profile'

export function ContactPage() {
  return (
    <Container>
      <section className="space-y-8 py-16 md:py-24">
        <SectionHeading eyebrow="Contact" title="Contact" description={profile.contactIntro} />
        <div className="grid gap-6 md:grid-cols-2">
          {profile.links.map((link) => (
            <GlassPanel key={link.href}>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">{link.label}</h2>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[#75B3E1] transition hover:text-white"
                >
                  {link.href}
                </a>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>
    </Container>
  )
}
