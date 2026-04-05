import { Container } from '@/components/ui/Container'
import { homeHero, siteMeta } from '@/content/site'

export function HomePage() {
  return (
    <Container>
      <section className="py-24">
        <div>{siteMeta.name}</div>
        <h1 className="mt-4 text-4xl font-semibold text-white">{homeHero.heading}</h1>
        <p className="mt-4 max-w-2xl text-[#A6B4CD]">{homeHero.summary}</p>
      </section>
    </Container>
  )
}
