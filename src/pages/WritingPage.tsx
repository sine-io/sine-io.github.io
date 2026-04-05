import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { writingEntries } from '@/content/writing'

export function WritingPage() {
  return (
    <Container>
      <section className="py-24">
        <h1 className="text-4xl font-semibold text-white">Writing</h1>
        <ul className="mt-8 space-y-6">
          {writingEntries.map((entry) => (
            <li key={entry.slug}>
              {entry.externalUrl ? (
                <a href={entry.externalUrl} className="text-xl text-white hover:text-cyan-300">
                  {entry.title}
                </a>
              ) : (
                <Link to={`/writing/${entry.slug}`} className="text-xl text-white hover:text-cyan-300">
                  {entry.title}
                </Link>
              )}
              <p className="mt-2 text-[#A6B4CD]">{entry.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
