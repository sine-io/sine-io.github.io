import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { projects } from '@/content/projects'

export function ProjectsPage() {
  return (
    <Container>
      <section className="py-24">
        <h1 className="text-4xl font-semibold text-white">Projects</h1>
        <ul className="mt-8 space-y-6">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link to={`/projects/${project.slug}`} className="text-xl text-white hover:text-cyan-300">
                {project.title}
              </Link>
              <p className="mt-2 text-[#A6B4CD]">{project.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
