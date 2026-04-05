import { Link, useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { projects } from '@/content/projects'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <Container>
      <article className="space-y-8 py-16 md:py-24">
        <div className="space-y-4">
          <Link to="/projects" className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
            返回 Projects
          </Link>
          <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
          <p className="max-w-3xl text-[#A6B4CD]">{project.summary}</p>
        </div>
        <div className="grid gap-6">
          {project.sections.map((section) => (
            <GlassPanel key={section.title}>
              <section>
                <h2 className="text-2xl font-medium text-white">{section.title}</h2>
                <div className="mt-4 space-y-3 text-[#A6B4CD]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </GlassPanel>
          ))}
        </div>
      </article>
    </Container>
  )
}
