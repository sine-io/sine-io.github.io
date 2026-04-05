import { motion } from 'framer-motion'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/content/profile'
import { sectionRevealMotion } from '@/lib/motion'

const aboutNodes = [
  { cx: 10, cy: 24, r: 1.1 },
  { cx: 24, cy: 14, r: 1.3 },
  { cx: 42, cy: 28, r: 1.1 },
  { cx: 62, cy: 18, r: 1.2 },
  { cx: 82, cy: 30, r: 1.3 }
]

const aboutPaths = [{ d: 'M10 24L24 14L42 28L62 18L82 30' }]

export function AboutPage() {
  return (
    <Container>
      <section className="space-y-8 py-16 md:py-24">
        <motion.div {...sectionRevealMotion}>
          <SectionHeading eyebrow="Profile" title="About" description={profile.summary} level={1} />
        </motion.div>
        <motion.div {...sectionRevealMotion}>
          <div data-testid="about-observatory-panel">
            <GlassPanel
              variant="hero"
              className="relative isolate overflow-hidden rounded-[2rem] border-[#A6DEFC]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(7,16,38,0.9))] px-6 py-6 md:px-8 md:py-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(166,222,252,0.14),rgba(166,222,252,0))]" />
              <div className="pointer-events-none absolute left-[-8%] top-[-28%] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.12),rgba(93,227,233,0))]" />
              <ConstellationField
                nodes={aboutNodes}
                paths={aboutPaths}
                className="pointer-events-none absolute right-6 top-6 h-20 w-40 opacity-65"
              />
              <div className="relative z-10 space-y-6">
                <div className="grid gap-4 border-b border-white/10 pb-5 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Author</p>
                    <p className="text-2xl font-semibold text-white">{profile.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Focus Lanes</p>
                    <p className="text-sm text-[#D7E3F4]">{profile.focusAreas.length} active tracks</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Scope</p>
                    <p className="text-sm text-[#D7E3F4]">Performance testing, tooling, and OPC notes</p>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
                  <div className="space-y-4 text-[15px] leading-8 text-[#C2D0E5]">
                    {profile.about.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(7,13,30,0.76))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#75B3E1]">
                      <span>当前关注</span>
                      <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(166,222,252,0.22),rgba(166,222,252,0))]" />
                    </div>
                    <ul className="mt-4 space-y-3">
                      {profile.focusAreas.map((area, index) => (
                        <li
                          key={area}
                          className="flex items-start justify-between gap-4 border-b border-white/6 pb-3 text-sm text-[#D7E3F4] last:border-b-0 last:pb-0"
                        >
                          <span>{area}</span>
                          <span className="text-[11px] uppercase tracking-[0.28em] text-[#75B3E1]">{String(index + 1).padStart(2, '0')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </motion.div>
      </section>
    </Container>
  )
}
