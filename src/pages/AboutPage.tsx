import { Container } from '@/components/ui/Container'
import { profile } from '@/content/profile'

export function AboutPage() {
  return (
    <Container>
      <section className="py-24">
        <h1 className="text-4xl font-semibold text-white">About</h1>
        <div className="mt-6 space-y-4 text-[#A6B4CD]">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </Container>
  )
}
