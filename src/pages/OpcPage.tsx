import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { opcContent, type OpcCaseSlug, type OpcLinkTarget } from '@/content/opc'
import { writingEntries } from '@/content/writing'
import { useHashScroll } from '@/hooks/useHashScroll'
import { sectionRevealMotion } from '@/lib/motion'

const opcConstellationNodes = [
  { cx: 12, cy: 24, r: 1.2 },
  { cx: 24, cy: 16, r: 1.3 },
  { cx: 40, cy: 28, r: 1.1 },
  { cx: 58, cy: 18, r: 1.2 },
  { cx: 78, cy: 30, r: 1.3 },
  { cx: 90, cy: 22, r: 1.1 }
]

const opcConstellationPaths = [
  { d: 'M12 24L24 16L40 28L58 18' },
  { d: 'M58 18L78 30L90 22' }
]

function buildOpcTargetHref(target: OpcLinkTarget) {
  if (target.kind === 'topic') {
    return `#topic-${target.id}`
  }

  if (target.kind === 'term') {
    return `#term-${target.id}`
  }

  return `#case-${target.slug}`
}

function buildCaseHref(slug: OpcCaseSlug) {
  const entry = writingEntries.find((candidate) => candidate.slug === slug)

  if (!entry) {
    return null
  }

  if (entry.kind === 'external') {
    return { kind: 'external' as const, href: entry.externalUrl }
  }

  return { kind: 'internal' as const, href: `/writing/${entry.slug}` }
}

export function OpcPage() {
  useHashScroll()

  return (
    <Container>
      <article className="space-y-10 py-16 md:space-y-12 md:py-24">
        <motion.section
          {...sectionRevealMotion}
          className="relative isolate overflow-hidden rounded-[2rem] border border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(7,15,34,0.9))] px-6 py-8 shadow-[0_0_0_1px_rgba(166,222,252,0.04),0_32px_120px_rgba(0,0,0,0.42),0_0_72px_rgba(93,227,233,0.12)] md:px-8 md:py-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(166,222,252,0.12),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute left-[-12%] top-[-24%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.18),rgba(93,227,233,0))]" />
          <div className="pointer-events-none absolute right-[-16%] top-[-18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(117,179,225,0.16),rgba(117,179,225,0))]" />
          <ConstellationField
            testId="opc-constellation"
            nodes={opcConstellationNodes}
            paths={opcConstellationPaths}
            className="pointer-events-none absolute right-[-2%] top-[10%] h-40 w-80 max-w-[72vw] opacity-75"
          />
          <div className="relative z-10 space-y-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#A6DEFC]">{opcContent.eyebrow}</p>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold text-[#F4FAFF] md:text-5xl">{opcContent.title}</h1>
                <p className="max-w-3xl text-sm leading-7 text-[#D7E3F4] md:text-base">{opcContent.description}</p>
              </div>
            </div>

            <GlassPanel
              data-testid="opc-now-panel"
              variant="hero"
              className="grid gap-6 rounded-[1.8rem] border-[#A6DEFC]/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(12,24,52,0.74))] md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#A6DEFC]">Now</p>
                <p className="text-2xl font-semibold text-white">{opcContent.now.stageLabel}</p>
                <p className="text-sm leading-7 text-[#C8D9EE]">{opcContent.now.recentChange}</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#A6DEFC]">Current judgment</p>
                <p className="text-sm leading-7 text-[#DCEBFB]">{opcContent.now.currentJudgment}</p>
              </div>
            </GlassPanel>

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-[#A6DEFC]">
              <Link
                to="#topics"
                className="rounded-full border border-white/10 bg-black/10 px-4 py-3 transition hover:border-[#75B3E1] hover:text-white"
              >
                Topics
              </Link>
              <Link
                to="#terms"
                className="rounded-full border border-white/10 bg-black/10 px-4 py-3 transition hover:border-[#75B3E1] hover:text-white"
              >
                Terms
              </Link>
              <Link
                to="#cases"
                className="rounded-full border border-white/10 bg-black/10 px-4 py-3 transition hover:border-[#75B3E1] hover:text-white"
              >
                Cases
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionRevealMotion} className="space-y-8">
          <SectionHeading
            eyebrow="Timeline"
            title="Stage timeline"
            description="先定位当前阶段，再从代表性信号继续跳到更值得继续读的地方。"
          />
          <div data-testid="opc-stage-timeline" className="grid gap-6">
            {opcContent.stages.map((stage) => (
              <GlassPanel
                key={stage.id}
                variant="dense"
                className="rounded-[1.8rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(7,16,36,0.84))]"
              >
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#75B3E1]">{stage.eyebrow}</p>
                      <h2 className="text-2xl font-semibold text-white">{stage.title}</h2>
                    </div>
                    <span className="rounded-full border border-[#A6DEFC]/16 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#D7F3FF]">
                      {stage.timeframe}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-[#B8C9E0]">{stage.summary}</p>
                  {stage.judgment ? (
                    <div className="rounded-[1.4rem] border border-[#A6DEFC]/16 bg-black/10 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-[#A6DEFC]">Local judgment</p>
                      <p className="mt-3 text-sm leading-7 text-[#DCEBFB]">{stage.judgment}</p>
                    </div>
                  ) : null}
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {stage.signals.map((signal) => (
                      <div
                        key={signal.id}
                        className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-5 py-4"
                      >
                        <p className="text-sm leading-7 text-white">{signal.change}</p>
                        <p className="mt-3 text-sm leading-7 text-[#B8C9E0]">{signal.meaning}</p>
                        <Link
                          to={buildOpcTargetHref(signal.target)}
                          className="mt-4 inline-flex text-sm font-medium text-[#75B3E1] transition hover:text-white"
                        >
                          {signal.nextLabel}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionRevealMotion} id="topics" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow="Topics"
            title="Primary reading paths"
            description="Topics 是第一版最完整的扇出层，负责告诉你下一步最值得继续钻哪里。"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {opcContent.topics.map((topic) => (
              <GlassPanel
                key={topic.id}
                id={`topic-${topic.id}`}
                variant="default"
                className="rounded-[1.7rem] border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.82))]"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">{topic.title}</h2>
                  <p className="text-sm leading-7 text-[#B8C9E0]">{topic.summary}</p>
                  <ul className="space-y-2 text-sm leading-7 text-[#DCEBFB]">
                    {topic.questions.map((question) => (
                      <li key={question}>- {question}</li>
                    ))}
                  </ul>
                </div>
              </GlassPanel>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionRevealMotion} id="terms" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow="Terms"
            title="Shared language"
            description="Terms 负责统一语境，帮助信号和判断保持同一种说法。"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {opcContent.terms.map((term) => (
              <GlassPanel key={term.id} id={`term-${term.id}`} variant="dense" className="rounded-[1.5rem]">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">{term.term}</h2>
                  <p className="text-sm leading-7 text-[#B8C9E0]">{term.definition}</p>
                  <p className="text-sm leading-7 text-[#DCEBFB]">{term.whyNow}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionRevealMotion} id="cases" className="scroll-mt-24 space-y-8">
          <SectionHeading
            eyebrow="Cases"
            title="Evidence layer"
            description="Cases 先复用现有写作条目，证明页面里的判断和信号背后有可回看的材料。"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {opcContent.cases.map((entry) => {
              const caseTarget = buildCaseHref(entry.slug)
              const writingEntry = writingEntries.find((candidate) => candidate.slug === entry.slug)

              if (!caseTarget || !writingEntry) {
                return null
              }

              return (
                <GlassPanel
                  key={entry.slug}
                  id={`case-${entry.slug}`}
                  variant="default"
                  className="rounded-[1.65rem] border-white/10"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">{writingEntry.title}</h2>
                    <p className="text-sm leading-7 text-[#B8C9E0]">{entry.context}</p>
                    <p className="text-sm leading-7 text-[#DCEBFB]">{entry.whyItMatters}</p>
                    <p className="text-sm leading-7 text-[#A6B4CD]">{writingEntry.summary}</p>
                    {caseTarget.kind === 'internal' ? (
                      <Link
                        to={caseTarget.href}
                        className="inline-flex text-sm font-medium text-[#75B3E1] transition hover:text-white"
                      >
                        打开案例
                      </Link>
                    ) : (
                      <a
                        href={caseTarget.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-sm font-medium text-[#75B3E1] transition hover:text-white"
                      >
                        打开案例
                      </a>
                    )}
                  </div>
                </GlassPanel>
              )
            })}
          </div>
        </motion.section>
      </article>
    </Container>
  )
}
