import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroArt from '@/assets/visuals/svg1-optimized.svg'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/content/projects'
import { homeContent, siteMeta } from '@/content/site'
import { writingEntries } from '@/content/writing'
import { sectionRevealMotion } from '@/lib/motion'

function pickItemsBySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => item !== undefined)
}

const homeConstellationNodes = [
  { cx: 12, cy: 20, r: 1.4 },
  { cx: 24, cy: 34, r: 1.1 },
  { cx: 42, cy: 18, r: 1.5 },
  { cx: 56, cy: 28, r: 1.2 },
  { cx: 71, cy: 16, r: 1.1 },
  { cx: 84, cy: 32, r: 1.3 }
]

const homeConstellationPaths = [
  { d: 'M12 20L24 34L42 18L56 28' },
  { d: 'M42 18L71 16L84 32' }
]

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
  hero:
    'overflow-hidden border-[#A6DEFC]/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(10,20,44,0.78))] shadow-[0_0_0_1px_rgba(166,222,252,0.12),0_36px_120px_rgba(0,0,0,0.46),0_0_64px_rgba(93,227,233,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]',
  overview:
    'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(8,17,40,0.78))] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_64px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.05)]',
  project:
    'rounded-[1.65rem] border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(10,18,38,0.82))] shadow-[0_0_0_1px_rgba(166,222,252,0.05),0_18px_72px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)]',
  writing:
    'rounded-[1.5rem] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(6,13,30,0.84))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_72px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.05)]',
  photo: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.64))]',
  contact:
    'relative isolate overflow-hidden border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(8,17,40,0.78))]',
  browse: 'relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/10 p-5'
} as const

export function HomePage() {
  const featuredProjects = pickItemsBySlug(projects, homeContent.featuredProjectSlugs)
  const featuredWriting = pickItemsBySlug(writingEntries, homeContent.featuredWritingSlugs)

  return (
    <Container>
      <div className="space-y-16 py-16 md:space-y-24 md:py-24">
        <motion.section
          {...sectionRevealMotion}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]"
        >
          <GlassPanel
            variant="default"
            className={homePanelStyles.hero}
          >
            <div className="relative isolate overflow-hidden rounded-[1.75rem]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(166,222,252,0.12),rgba(166,222,252,0))]" />
              <div className="pointer-events-none absolute left-[-12%] top-[-24%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.18),rgba(93,227,233,0))]" />
              <div className="pointer-events-none absolute right-[-16%] top-[-18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(117,179,225,0.18),rgba(117,179,225,0))]" />
              <div className="pointer-events-none absolute inset-y-8 right-[10%] w-px bg-[linear-gradient(180deg,rgba(166,222,252,0),rgba(166,222,252,0.18),rgba(166,222,252,0))]" />
              <svg
                data-testid="home-orbit-map"
                aria-hidden="true"
                viewBox="0 0 640 440"
                className="pointer-events-none absolute right-[-12%] top-[-12%] h-[122%] w-[68%] opacity-55"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="homeOrbitStroke" x1="88" y1="40" x2="552" y2="376" gradientUnits="userSpaceOnUse">
                    <stop stopColor="rgba(166, 222, 252, 0.42)" />
                    <stop offset="1" stopColor="rgba(255, 255, 255, 0.1)" />
                  </linearGradient>
                </defs>
                <circle cx="428" cy="214" r="152" stroke="url(#homeOrbitStroke)" strokeWidth="1.2" />
                <circle cx="428" cy="214" r="110" stroke="rgba(166, 222, 252, 0.18)" strokeWidth="1" strokeDasharray="8 12" />
                <path d="M248 214C280 124 360 72 428 72C502 72 572 126 608 214" stroke="rgba(166, 222, 252, 0.18)" strokeWidth="1.2" />
                <path d="M298 308C336 342 384 360 430 360C484 360 534 336 572 292" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1.2" />
                <path d="M176 214H598" stroke="rgba(166, 222, 252, 0.12)" strokeWidth="1" strokeDasharray="6 10" />
                <circle cx="308" cy="146" r="4" fill="rgba(166, 222, 252, 0.48)" />
                <circle cx="542" cy="256" r="4" fill="rgba(255, 255, 255, 0.42)" />
              </svg>
              <ConstellationField
                testId="home-constellation"
                nodes={homeConstellationNodes}
                paths={homeConstellationPaths}
                className="pointer-events-none absolute right-[10%] top-[14%] h-[48%] w-[42%] opacity-75"
              />
              <img
                data-testid="hero-art"
                src={heroArt}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-10%] right-[-8%] h-[88%] max-w-[36rem] object-contain opacity-80"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(6,12,27,0),rgba(6,12,27,0.72))]" />
              <div className="relative z-10 min-h-[22rem] max-w-3xl pr-8 pt-2 sm:pr-44 lg:min-h-[26rem] lg:pr-[21rem]">
                <h2 className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">{homeContent.eyebrow}</h2>
                <div className="mt-4 text-sm text-[#A6B4CD]">{siteMeta.name}</div>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white md:text-6xl">{homeContent.title}</h1>
                <p className="mt-6 max-w-2xl text-lg text-[#D7E3F4]">{homeContent.intro}</p>
                <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-[#A6DEFC]">
                  <span className="rounded-full border border-[#A6DEFC]/20 bg-white/5 px-4 py-2">Object Storage</span>
                  <span className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-[#D7E3F4]">File Storage</span>
                  <span className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-[#D7E3F4]">OPC Notes</span>
                </div>
              </div>
            </div>
          </GlassPanel>
          <GlassPanel
            variant="default"
            className={homePanelStyles.overview}
          >
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
  )
}
