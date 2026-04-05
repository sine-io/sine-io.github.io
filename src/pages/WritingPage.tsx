import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import sectionArt from '@/assets/visuals/svg2-optimized.svg'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { writingCategoryMeta, writingCategoryOrder, writingEntries } from '@/content/writing'
import { sectionRevealMotion } from '@/lib/motion'

const writingConstellationNodes = [
  { cx: 12, cy: 24, r: 1.2 },
  { cx: 24, cy: 16, r: 1.4 },
  { cx: 42, cy: 28, r: 1.1 },
  { cx: 58, cy: 18, r: 1.2 },
  { cx: 74, cy: 30, r: 1.4 },
  { cx: 88, cy: 22, r: 1.1 }
]

const writingConstellationPaths = [
  { d: 'M12 24L24 16L42 28L58 18' },
  { d: 'M58 18L74 30L88 22' }
]

const writingBandStyles: Record<
  (typeof writingCategoryOrder)[number],
  {
    bandClassName: string
    lineClassName: string
    arcStroke: string
    accentFill: string
  }
> = {
  guide: {
    bandClassName:
      'border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,18,44,0.76))] shadow-[0_0_0_1px_rgba(166,222,252,0.05),0_18px_72px_rgba(0,0,0,0.32)]',
    lineClassName: 'from-[#A6DEFC]/0 via-[#A6DEFC]/28 to-[#A6DEFC]/0',
    arcStroke: 'rgba(166, 222, 252, 0.22)',
    accentFill: 'rgba(166, 222, 252, 0.42)'
  },
  note: {
    bandClassName:
      'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(9,16,36,0.82))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_72px_rgba(0,0,0,0.34)]',
    lineClassName: 'from-white/0 via-white/20 to-white/0',
    arcStroke: 'rgba(215, 243, 255, 0.18)',
    accentFill: 'rgba(255, 255, 255, 0.34)'
  },
  update: {
    bandClassName:
      'border-[#75B3E1]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.84))] shadow-[0_0_0_1px_rgba(117,179,225,0.04),0_18px_72px_rgba(0,0,0,0.34)]',
    lineClassName: 'from-[#75B3E1]/0 via-[#75B3E1]/24 to-[#75B3E1]/0',
    arcStroke: 'rgba(117, 179, 225, 0.2)',
    accentFill: 'rgba(117, 179, 225, 0.38)'
  }
}

export function WritingPage() {
  const location = useLocation()
  const categoryAnchors: Record<(typeof writingCategoryOrder)[number], string> = {
    guide: 'guides',
    note: 'notes',
    update: 'updates'
  }

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const target = document.getElementById(location.hash.slice(1))

    if (target) {
      target.scrollIntoView()
    }
  }, [location.hash])

  return (
    <Container>
      <div className="relative isolate space-y-12 overflow-hidden py-16 md:space-y-16 md:py-24">
        <section className="relative isolate overflow-hidden rounded-[2rem] border border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(7,15,34,0.9))] px-6 py-8 shadow-[0_0_0_1px_rgba(166,222,252,0.04),0_32px_120px_rgba(0,0,0,0.4),0_0_64px_rgba(93,227,233,0.1)] md:px-8 md:py-10 lg:px-10 lg:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(166,222,252,0.12),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute left-[-12%] top-[-26%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.14),rgba(93,227,233,0))]" />
          <div className="pointer-events-none absolute right-[-16%] top-[-18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(117,179,225,0.16),rgba(117,179,225,0))]" />
          <svg
            aria-hidden="true"
            viewBox="0 0 720 380"
            className="pointer-events-none absolute right-[-12%] top-[-8%] h-[115%] w-[60%] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M252 92C310 54 384 42 452 52C520 62 580 102 624 156" stroke="rgba(166, 222, 252, 0.2)" strokeWidth="1.2" />
            <path d="M214 192H610" stroke="rgba(166, 222, 252, 0.12)" strokeWidth="1" strokeDasharray="6 10" />
            <path d="M282 292C336 326 390 338 446 336C508 334 568 304 622 248" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" />
            <circle cx="338" cy="122" r="4" fill="rgba(166, 222, 252, 0.42)" />
            <circle cx="534" cy="246" r="4" fill="rgba(255, 255, 255, 0.38)" />
          </svg>
          <ConstellationField
            testId="writing-constellation"
            nodes={writingConstellationNodes}
            paths={writingConstellationPaths}
            className="pointer-events-none absolute left-[-1%] top-[12%] h-40 w-80 max-w-[72vw] opacity-75"
          />
          <img
            data-testid="writing-art"
            src={sectionArt}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-14%] right-[-4rem] h-[72%] max-w-none object-contain opacity-65 md:right-[-1rem] lg:right-[2%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(6,12,27,0),rgba(6,12,27,0.74))]" />
          <motion.div {...sectionRevealMotion} className="relative z-10 max-w-2xl pr-6 md:pr-60">
            <SectionHeading
              eyebrow="Writing"
              title="Writing"
              description="把教程、短笔记和阶段更新按类型聚合到同一处，方便集中浏览。"
              level={1}
              tone="hero"
            />
          </motion.div>
          <motion.div {...sectionRevealMotion} className="relative z-10 mt-8 grid gap-3 text-xs uppercase tracking-[0.28em] text-[#A6DEFC] md:grid-cols-3">
            {writingCategoryOrder.map((category) => {
              const meta = writingCategoryMeta[category]

              return (
                <a
                  key={category}
                  href={`#${categoryAnchors[category]}`}
                  className="rounded-full border border-white/10 bg-black/10 px-4 py-3 text-center transition hover:border-[#75B3E1] hover:text-white"
                >
                  {meta.title}
                </a>
              )
            })}
          </motion.div>
        </section>
        {writingCategoryOrder.map((category) => {
          const entries = writingEntries.filter((entry) => entry.category === category)
          const meta = writingCategoryMeta[category]
          const bandStyle = writingBandStyles[category]

          return (
            <motion.section
              key={category}
              {...sectionRevealMotion}
              id={categoryAnchors[category]}
              className={[
                'relative isolate scroll-mt-24 space-y-6 overflow-hidden rounded-[1.9rem] border p-6 md:p-8',
                bandStyle.bandClassName
              ].join(' ')}
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${bandStyle.lineClassName}`} />
              <div className={`pointer-events-none absolute inset-x-8 top-[4.75rem] h-px bg-gradient-to-r ${bandStyle.lineClassName}`} />
              <div className={`pointer-events-none absolute left-8 top-0 h-full w-px bg-gradient-to-b ${bandStyle.lineClassName}`} />
              <svg
                aria-hidden="true"
                viewBox="0 0 560 260"
                className="pointer-events-none absolute right-[-6%] top-[-14%] h-[138%] w-[42%] opacity-45"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M76 72C148 46 228 42 298 70C362 96 420 142 492 160" stroke={bandStyle.arcStroke} strokeWidth="1.2" />
                <path d="M110 194C182 216 256 218 322 196C390 174 446 136 504 92" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.1" />
                <circle cx="204" cy="82" r="4" fill={bandStyle.accentFill} />
                <circle cx="388" cy="170" r="4" fill="rgba(255, 255, 255, 0.32)" />
              </svg>
              <div className="relative z-10 space-y-6">
                <SectionHeading eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />
              </div>
              <div className="relative z-10 grid gap-6 md:grid-cols-2">
                {entries.map((entry) => (
                  <GlassPanel
                    key={entry.slug}
                    className="rounded-[1.5rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(6,13,30,0.84))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_16px_56px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white">{entry.title}</h3>
                      <p className="text-sm leading-7 text-[#A6B4CD]">{entry.summary}</p>
                      {entry.kind === 'external' ? (
                        <a
                          href={entry.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-[#75B3E1] transition hover:text-white"
                        >
                          前往阅读
                        </a>
                      ) : (
                        <Link
                          to={`/writing/${entry.slug}`}
                          className="text-sm font-medium text-[#75B3E1] transition hover:text-white"
                        >
                          站内阅读
                        </Link>
                      )}
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>
    </Container>
  )
}
