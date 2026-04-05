import { motion } from 'framer-motion'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/content/profile'
import { sectionRevealMotion } from '@/lib/motion'

const contactNodes = [
  { cx: 12, cy: 26, r: 1.1 },
  { cx: 28, cy: 14, r: 1.3 },
  { cx: 48, cy: 30, r: 1.1 },
  { cx: 68, cy: 18, r: 1.2 },
  { cx: 86, cy: 28, r: 1.3 }
]

const contactPaths = [{ d: 'M12 26L28 14L48 30L68 18L86 28' }]

export function ContactPage() {
  return (
    <Container>
      <section className="space-y-8 py-16 md:py-24">
        <motion.div {...sectionRevealMotion}>
          <SectionHeading eyebrow="Contact" title="Contact" description={profile.contactIntro} level={1} />
        </motion.div>
        <motion.div {...sectionRevealMotion}>
          <div data-testid="contact-signal-panel">
            <GlassPanel
              variant="hero"
              className="relative isolate overflow-hidden rounded-[2rem] border-[#A6DEFC]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(7,16,38,0.9))] px-6 py-6 md:px-8 md:py-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(166,222,252,0.14),rgba(166,222,252,0))]" />
              <div className="pointer-events-none absolute right-[-10%] top-[-28%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(117,179,225,0.14),rgba(117,179,225,0))]" />
              <ConstellationField
                nodes={contactNodes}
                paths={contactPaths}
                className="pointer-events-none absolute right-6 top-6 h-20 w-40 opacity-65"
              />
              <div className="relative z-10 grid gap-4 md:grid-cols-3">
                <div className="space-y-2 border-b border-white/10 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Signal Summary</p>
                  <p className="text-sm leading-7 text-[#D7E3F4]">代码仓库与动态入口集中在下方，便于直接跳转和后续更新。</p>
                </div>
                <div className="space-y-2 border-b border-white/10 pb-4 md:border-b-0 md:border-r md:pb-0 md:px-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Channels</p>
                  <p className="text-2xl font-semibold text-white">{profile.links.length}</p>
                </div>
                <div className="space-y-2 md:pl-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Routing</p>
                  <p className="text-sm leading-7 text-[#D7E3F4]">公开链接优先，保持简单直接，方便持续更新。</p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          {profile.links.map((link) => (
            <motion.div key={link.href} {...sectionRevealMotion}>
              <GlassPanel
                variant="dense"
                className="relative overflow-hidden rounded-[1.75rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(6,13,30,0.82))] px-6 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_64px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(166,222,252,0),rgba(166,222,252,0.36),rgba(166,222,252,0))]" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#75B3E1]">
                    <span>External Link</span>
                    <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(166,222,252,0.22),rgba(166,222,252,0))]" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{link.label}</h2>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-[#75B3E1] transition hover:text-white"
                  >
                    {link.href}
                  </a>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>
    </Container>
  )
}
