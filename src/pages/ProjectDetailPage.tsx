import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
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
      <article className="py-24">
        <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
        <p className="mt-4 text-[#A6B4CD]">{project.summary}</p>
        <div className="mt-10 space-y-8">
          {project.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-medium text-white">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[#A6B4CD]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  )
}
