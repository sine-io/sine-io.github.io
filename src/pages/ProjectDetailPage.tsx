import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { projects } from '@/content/projects'
import { sectionRevealMotion } from '@/lib/motion'
import { NotFoundPage } from './NotFoundPage'

const projectDetailNodes = [
  { cx: 12, cy: 26, r: 1.1 },
  { cx: 28, cy: 14, r: 1.3 },
  { cx: 46, cy: 30, r: 1.1 },
  { cx: 66, cy: 18, r: 1.2 },
  { cx: 86, cy: 28, r: 1.3 }
]

const projectDetailPaths = [{ d: 'M12 26L28 14L46 30L66 18L86 28' }]

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <Container>
      <article className="space-y-8 py-16 md:py-24">
        <motion.header
          {...sectionRevealMotion}
          data-testid="project-detail-frame"
          className="relative isolate overflow-hidden rounded-[2rem] border border-[#A6DEFC]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(7,16,38,0.9))] px-6 py-8 shadow-[0_0_0_1px_rgba(166,222,252,0.04),0_28px_96px_rgba(0,0,0,0.38),0_0_64px_rgba(93,227,233,0.08)] md:px-8 md:py-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(166,222,252,0.14),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute right-[12%] top-0 h-full w-px bg-[linear-gradient(180deg,rgba(166,222,252,0),rgba(166,222,252,0.18),rgba(166,222,252,0))]" />
          <div className="pointer-events-none absolute left-[-10%] top-[-34%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.14),rgba(93,227,233,0))]" />
          <ConstellationField
            nodes={projectDetailNodes}
            paths={projectDetailPaths}
            className="pointer-events-none absolute right-6 top-6 h-20 w-40 opacity-70"
          />
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#75B3E1]">
              <span>Project Entry</span>
              <span className="h-px w-12 bg-[linear-gradient(90deg,rgba(166,222,252,0),rgba(166,222,252,0.45),rgba(166,222,252,0))]" />
              <span>{project.sections.length} Sections</span>
            </div>
            <Link to="/projects" className="inline-flex text-sm font-medium text-[#75B3E1] transition hover:text-white">
              返回 Projects
            </Link>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-[#F4FAFF]">{project.title}</h1>
              <p className="max-w-3xl text-sm leading-7 text-[#C2D0E5] md:text-base">{project.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#A6DEFC]/14 bg-white/[0.03] px-4 py-2 text-xs tracking-[0.2em] text-[#D7F3FF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.header>
        <div className="grid gap-6">
          {project.sections.map((section) => (
            <motion.div key={section.title} {...sectionRevealMotion}>
              <GlassPanel
                variant="dense"
                className="rounded-[1.75rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(6,13,30,0.82))] px-6 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_64px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <section>
                  <h2 className="text-2xl font-medium text-white">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-8 text-[#B5C2D8]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </article>
    </Container>
  )
}
