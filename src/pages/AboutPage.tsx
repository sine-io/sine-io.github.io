import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/content/profile'

export function AboutPage() {
  return (
    <Container>
      <section className="space-y-8 py-16 md:py-24">
        <SectionHeading eyebrow="Profile" title="About" description={profile.summary} />
        <GlassPanel>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Author</p>
              <p className="text-2xl font-semibold text-white">{profile.name}</p>
            </div>
            <div className="space-y-4 text-[#A6B4CD]">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">当前关注</h3>
              <ul className="flex flex-wrap gap-3">
                {profile.focusAreas.map((area) => (
                  <li key={area} className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#A6B4CD]">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassPanel>
      </section>
    </Container>
  )
}
