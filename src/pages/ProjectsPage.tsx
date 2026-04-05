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

const projectCardClassName =
  'rounded-[1.6rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.82))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_72px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)]'

export function ProjectsPage() {
  return (
    <Container>
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-[#A6DEFC]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(7,15,34,0.92))] px-6 py-8 shadow-[0_0_0_1px_rgba(166,222,252,0.04),0_32px_120px_rgba(0,0,0,0.42),0_0_72px_rgba(93,227,233,0.12)] md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(166,222,252,0.12),rgba(166,222,252,0))]" />
        <div className="pointer-events-none absolute left-[-12%] top-[-28%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,227,233,0.16),rgba(93,227,233,0))]" />
        <div className="pointer-events-none absolute right-[-18%] top-[-20%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(117,179,225,0.16),rgba(117,179,225,0))]" />
        <div className="pointer-events-none absolute inset-y-8 right-[14%] w-px bg-[linear-gradient(180deg,rgba(166,222,252,0),rgba(166,222,252,0.2),rgba(166,222,252,0))]" />
        <svg
          aria-hidden="true"
          viewBox="0 0 720 420"
          className="pointer-events-none absolute right-[-14%] top-[-10%] h-[118%] w-[62%] opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="406" cy="186" r="138" stroke="rgba(166, 222, 252, 0.2)" strokeWidth="1.2" />
          <circle cx="406" cy="186" r="98" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1" strokeDasharray="7 11" />
          <path d="M214 186H594" stroke="rgba(166, 222, 252, 0.12)" strokeWidth="1" strokeDasharray="6 10" />
          <path d="M248 104C286 68 344 50 408 50C476 50 540 82 582 136" stroke="rgba(166, 222, 252, 0.22)" strokeWidth="1.2" />
          <path d="M282 298C324 334 370 352 424 352C478 352 534 330 578 284" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" />
          <circle cx="324" cy="122" r="4" fill="rgba(166, 222, 252, 0.44)" />
          <circle cx="516" cy="268" r="4" fill="rgba(255, 255, 255, 0.4)" />
        </svg>
        <ConstellationField
          testId="projects-constellation"
          nodes={projectsConstellationNodes}
          paths={projectsConstellationPaths}
          className="pointer-events-none absolute left-[-2%] top-[10%] h-44 w-80 max-w-[72vw] opacity-75"
        />
        <img
          data-testid="projects-art"
          src={sectionArt}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-12%] right-[-5rem] h-[74%] max-w-none object-contain opacity-70 md:right-[-2rem] lg:right-[2%]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(6,12,27,0),rgba(6,12,27,0.76))]" />
        <motion.div {...sectionRevealMotion} className="relative z-10 max-w-2xl pr-6 md:pr-64">
          <SectionHeading
            eyebrow="Projects"
            title="Projects"
            description="集中查看长期维护的专题入口、路线图和术语整理。"
            level={1}
            tone="hero"
          />
        </motion.div>
        <motion.div {...sectionRevealMotion} className="relative z-10 mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <GlassPanel key={project.slug} variant="dense" className={projectCardClassName}>
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
