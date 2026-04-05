import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import sectionArt from '@/assets/visuals/svg2-optimized.svg'
import { ConstellationField } from '@/components/ui/ConstellationField'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/content/projects'
import { sectionRevealMotion } from '@/lib/motion'

const projectsConstellationNodes = [
  { cx: 14, cy: 26, r: 1.1 },
  { cx: 28, cy: 14, r: 1.4 },
  { cx: 44, cy: 30, r: 1.1 },
  { cx: 63, cy: 18, r: 1.2 },
  { cx: 78, cy: 34, r: 1.5 },
  { cx: 90, cy: 20, r: 1.1 }
]

const projectsConstellationPaths = [
  { d: 'M14 26L28 14L44 30L63 18' },
  { d: 'M63 18L78 34L90 20' }
]

export function ProjectsPage() {
  return (
    <Container>
      <section className="relative isolate overflow-hidden space-y-8 py-16 md:py-24">
        <ConstellationField
          testId="projects-constellation"
          nodes={projectsConstellationNodes}
          paths={projectsConstellationPaths}
          className="pointer-events-none absolute left-0 top-0 h-44 w-80 max-w-[72vw] opacity-60"
        />
        <img
          data-testid="projects-art"
          src={sectionArt}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-4rem] top-0 h-56 max-w-none object-contain opacity-50 md:right-0"
        />
        <motion.div {...sectionRevealMotion} className="relative z-10">
          <SectionHeading
            eyebrow="Projects"
            title="Projects"
            description="集中查看长期维护的专题入口、路线图和术语整理。"
            level={1}
            tone="hero"
          />
        </motion.div>
        <motion.div {...sectionRevealMotion} className="relative z-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <GlassPanel key={project.slug} variant="dense">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#A6B4CD]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="text-sm leading-7 text-[#A6B4CD]">{project.summary}</p>
                <Link to={`/projects/${project.slug}`} className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
                  查看详情
                </Link>
              </div>
            </GlassPanel>
          ))}
        </motion.div>
      </section>
    </Container>
  )
}
