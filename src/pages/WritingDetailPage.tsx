import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
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
      <article className="py-24">
        <h1 className="text-4xl font-semibold text-white">{entry.title}</h1>
        <p className="mt-4 text-[#A6B4CD]">{entry.summary}</p>
        <div className="mt-8 space-y-3 text-[#A6B4CD]">
          {entry.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </Container>
  )
}
