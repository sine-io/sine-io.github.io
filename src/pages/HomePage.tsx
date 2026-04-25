import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Hero } from '@/components/home/Hero'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { opcContent } from '@/content/opc'
import { projects } from '@/content/projects'
import { homeContent } from '@/content/site'
import { writingEntries } from '@/content/writing'
import { sectionRevealMotion } from '@/lib/motion'

function pickItemsBySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => item !== undefined)
}

const homeBrowseConstellationNodes = [
  { cx: 16, cy: 28, r: 1.1 },
  { cx: 30, cy: 16, r: 1.3 },
  { cx: 48, cy: 24, r: 1.1 },
  { cx: 68, cy: 18, r: 1.2 },
  { cx: 84, cy: 32, r: 1.1 }
]

const homeBrowseConstellationPaths = [
  { d: 'M16 28L30 16L48 24L68 18' },
  { d: 'M48 24L84 32' }
]

const homePanelStyles = {
  overview:
    'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(8,17,40,0.78))] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_64px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.05)]',
  project:
    'rounded-[1.65rem] border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(10,18,38,0.82))] shadow-[0_0_0_1px_rgba(166,222,252,0.05),0_18px_72px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)]',
  writing:
    'rounded-[1.5rem] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(6,13,30,0.84))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_72px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.05)]',
  opc:
    'relative isolate overflow-hidden border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(7,15,34,0.88))] shadow-[0_0_0_1px_rgba(166,222,252,0.05),0_28px_100px_rgba(0,0,0,0.38),0_0_60px_rgba(93,227,233,0.1)]',
  photo: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.64))]',
  contact:
    'relative isolate overflow-hidden border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(8,17,40,0.78))]',
  browse: 'relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/10 p-5'
} as const

export function HomePage() {
  const featuredProjects = pickItemsBySlug(projects, homeContent.featuredProjectSlugs)
  const featuredWriting = pickItemsBySlug(writingEntries, homeContent.featuredWritingSlugs)

  return (
    <>
      <Hero />

      <Container>
        <div className="space-y-16 pb-16 md:space-y-24 md:pb-24">
          <motion.section {...sectionRevealMotion}>
            <GlassPanel variant="default" className={homePanelStyles.overview}>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Overview</p>
                {homeContent.overview.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-[#A6B4CD]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </GlassPanel>
          </motion.section>

          <motion.section {...sectionRevealMotion} className="space-y-8">
            <SectionHeading
              eyebrow="Projects"
              title="Featured Projects"
            description="从长期维护的专题入口开始，先看背景、路线和关键术语。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <GlassPanel
                key={project.slug}
                variant="default"
                className={homePanelStyles.project}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#A6DEFC]/16 bg-white/[0.03] px-3 py-1 text-xs text-[#C2D5EB]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-7 text-[#A6B4CD]">{project.summary}</p>
                  <Link to={`/projects/${project.slug}`} className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
                    查看项目
                  </Link>
                </div>
              </GlassPanel>
              ))}
            </div>
          </motion.section>

          <motion.section {...sectionRevealMotion} className="space-y-8">
            <SectionHeading
              eyebrow="Writing"
              title="Selected Writing"
            description="保留最常用的教程入口，把对象存储和文件存储测试的经验集中起来。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredWriting.map((entry) => (
              <GlassPanel
                key={entry.slug}
                variant="default"
                className={homePanelStyles.writing}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[#75B3E1]">{entry.category}</p>
                    <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(117,179,225,0.28),rgba(117,179,225,0))]" />
                  </div>
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
                    <Link to={`/writing/${entry.slug}`} className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
                      站内阅读
                    </Link>
                  )}
                </div>
              </GlassPanel>
              ))}
            </div>
          </motion.section>

          <motion.section {...sectionRevealMotion} className="space-y-8">
            <SectionHeading
              eyebrow="OPC Console"
              title="Observation Console Preview"
              description="用一个控制台片段展示“当前阶段 -> 信号 -> 去向”的阅读链路。"
            />
            <GlassPanel variant="hero" className={homePanelStyles.opc}>
              <div className="pointer-events-none absolute right-[-18%] top-[-28%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.16),rgba(93,227,233,0))]" />
              <svg
                aria-hidden="true"
                viewBox="0 0 900 360"
                className="pointer-events-none absolute right-[-5%] top-[-10%] h-[70%] w-[62%] opacity-35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M36 160C128 82 246 70 354 132C468 198 562 196 670 126C756 70 830 70 900 116" stroke="rgba(166, 222, 252, 0.42)" strokeWidth="2" fill="none" />
                <path d="M72 236C198 176 302 176 412 238C522 300 644 292 784 208" stroke="rgba(93, 227, 233, 0.36)" strokeWidth="1.4" strokeDasharray="8 12" fill="none" />
                <circle cx="354" cy="132" r="4" fill="rgba(166, 222, 252, 0.72)" />
                <circle cx="670" cy="126" r="4" fill="rgba(93, 227, 233, 0.72)" />
              </svg>
              <div className="relative z-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#A6DEFC]">{opcContent.eyebrow}</p>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{opcContent.title}</h3>
                    <p className="text-sm leading-7 text-[#C8D9EE]">{opcContent.description}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#A6DEFC]/18 bg-black/10 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#A6DEFC]">Now</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{opcContent.now.stageLabel}</p>
                    <p className="mt-3 text-sm leading-7 text-[#B8C9E0]">{opcContent.now.recentChange}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#75B3E1]">Current judgment</p>
                    <p className="mt-3 text-sm leading-7 text-[#DCEBFB]">{opcContent.now.currentJudgment}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {opcContent.stages.slice(1, 4).map((stage) => (
                      <div key={stage.id} className="rounded-[1.25rem] border border-white/10 bg-[#071226]/58 p-4 transition hover:-translate-y-1 hover:border-[#75B3E1]/50">
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-[#75B3E1]">{stage.eyebrow}</p>
                        <p className="mt-3 text-sm font-semibold text-white">{stage.title}</p>
                        <p className="mt-2 text-xs leading-6 text-[#A6B4CD]">{stage.timeframe}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {['Topics', 'Terms', 'Cases'].map((label) => (
                      <Link
                        key={label}
                        to="/projects/opc"
                        className="rounded-full border border-[#A6DEFC]/16 bg-black/10 px-4 py-3 text-center text-xs uppercase tracking-[0.28em] text-[#A6DEFC] transition hover:border-[#75B3E1] hover:text-white"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.section>

          <motion.section
            {...sectionRevealMotion}
            className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
          >
            <GlassPanel className={homePanelStyles.photo}>
              <figure className="space-y-4">
                <img
                  src="/serein.jpg"
                  alt={homeContent.photo.alt}
                  className="h-72 w-full rounded-2xl object-cover"
                />
                <figcaption className="text-sm text-[#A6B4CD]">{homeContent.photo.caption}</figcaption>
              </figure>
            </GlassPanel>
            <GlassPanel className={homePanelStyles.contact}>
              <div className="pointer-events-none absolute right-[-18%] top-[-16%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.16),rgba(93,227,233,0))]" />
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Contact"
                  title={homeContent.contactCallout.title}
                  description={homeContent.contactCallout.description}
                  tone="hero"
                />
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="rounded-full border border-[#A6DEFC]/20 bg-white/[0.03] px-4 py-2 text-sm text-white transition hover:border-[#75B3E1] hover:text-[#75B3E1]"
                  >
                    联系方式
                  </Link>
                </div>
                <div className={homePanelStyles.browse}>
                  <ConstellationField
                    nodes={homeBrowseConstellationNodes}
                    paths={homeBrowseConstellationPaths}
                    className="pointer-events-none absolute right-[-4%] top-0 h-28 w-56 opacity-60"
                  />
                  <SectionHeading
                    eyebrow="Browse"
                    title={homeContent.browseCallout.title}
                    description={homeContent.browseCallout.description}
                  />
                  <div className="mt-5 grid gap-4">
                    {homeContent.browseLinks.map((link) =>
                      link.external ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition hover:border-[#75B3E1]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium text-white">{link.label}</p>
                            <span className="text-xs uppercase tracking-[0.28em] text-[#75B3E1]">Link</span>
                          </div>
                          <p className="mt-2 text-sm text-[#A6B4CD]">{link.description}</p>
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition hover:border-[#75B3E1]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium text-white">{link.label}</p>
                            <span className="text-xs uppercase tracking-[0.28em] text-[#75B3E1]">Route</span>
                          </div>
                          <p className="mt-2 text-sm text-[#A6B4CD]">{link.description}</p>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.section>
        </div>
      </Container>
    </>
  )
}
