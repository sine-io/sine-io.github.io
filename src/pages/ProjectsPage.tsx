import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/content/projects'

export function ProjectsPage() {
  return (
    <Container>
      <section className="space-y-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Projects"
          title="Projects"
          description="集中查看长期维护的专题入口、路线图和术语整理。"
          level={1}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <GlassPanel key={project.slug}>
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
        </div>
      </section>
    </Container>
  )
}
