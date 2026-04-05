import { Link, useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { writingEntries } from '@/content/writing'
import { NotFoundPage } from './NotFoundPage'

export function WritingDetailPage() {
  const { slug } = useParams()
  const entry = writingEntries.find((candidate) => candidate.slug === slug)

  if (!entry || entry.kind !== 'internal') {
    return <NotFoundPage />
  }

  return (
    <Container>
      <article className="space-y-8 py-16 md:py-24">
        <div className="space-y-4">
          <Link to="/writing" className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
            返回 Writing
          </Link>
          <h1 className="text-4xl font-semibold text-white">{entry.title}</h1>
          <p className="max-w-3xl text-[#A6B4CD]">{entry.summary}</p>
        </div>
        <GlassPanel>
          <div className="space-y-3 text-[#A6B4CD]">
            {entry.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </GlassPanel>
      </article>
    </Container>
  )
}
