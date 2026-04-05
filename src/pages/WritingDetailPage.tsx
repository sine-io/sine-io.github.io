import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { writingCategoryMeta, writingEntries } from '@/content/writing'
import { sectionRevealMotion } from '@/lib/motion'
import { NotFoundPage } from './NotFoundPage'

const writingDetailNodes = [
  { cx: 14, cy: 28, r: 1.1 },
  { cx: 30, cy: 16, r: 1.3 },
  { cx: 48, cy: 32, r: 1.1 },
  { cx: 68, cy: 18, r: 1.2 },
  { cx: 88, cy: 26, r: 1.3 }
]

const writingDetailPaths = [{ d: 'M14 28L30 16L48 32L68 18L88 26' }]

export function WritingDetailPage() {
  const { slug } = useParams()
  const entry = writingEntries.find((candidate) => candidate.slug === slug)

  if (!entry || entry.kind !== 'internal') {
    return <NotFoundPage />
  }

  const categoryMeta = writingCategoryMeta[entry.category]

  return (
    <Container>
      <article className="space-y-8 py-16 md:py-24">
        <motion.header
          {...sectionRevealMotion}
          data-testid="writing-detail-frame"
          className="relative isolate overflow-hidden rounded-[2rem] border border-[#A6DEFC]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(7,16,38,0.88))] px-6 py-8 shadow-[0_0_0_1px_rgba(166,222,252,0.04),0_28px_96px_rgba(0,0,0,0.38),0_0_64px_rgba(93,227,233,0.08)] md:px-8 md:py-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(166,222,252,0.14),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute left-6 right-6 top-[4.7rem] h-px bg-[linear-gradient(90deg,rgba(166,222,252,0),rgba(166,222,252,0.28),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute right-[-12%] top-[-30%] h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(117,179,225,0.14),rgba(117,179,225,0))]" />
          <ConstellationField
            nodes={writingDetailNodes}
            paths={writingDetailPaths}
            className="pointer-events-none absolute right-6 top-6 h-20 w-40 opacity-70"
          />
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#75B3E1]">
              <span>{categoryMeta.eyebrow}</span>
              <span className="h-px w-12 bg-[linear-gradient(90deg,rgba(166,222,252,0),rgba(166,222,252,0.45),rgba(166,222,252,0))]" />
              <span>Internal Entry</span>
            </div>
            <Link to="/writing" className="inline-flex text-sm font-medium text-[#75B3E1] transition hover:text-white">
              返回 Writing
            </Link>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-[#F4FAFF]">{entry.title}</h1>
              <p className="max-w-3xl text-sm leading-7 text-[#C2D0E5] md:text-base">{entry.summary}</p>
            </div>
          </div>
        </motion.header>
        <motion.div {...sectionRevealMotion}>
          <GlassPanel
            variant="dense"
            className="rounded-[1.75rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(6,13,30,0.82))] px-6 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_64px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div className="space-y-4 text-[15px] leading-8 text-[#B5C2D8]">
              {entry.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </article>
    </Container>
  )
}
