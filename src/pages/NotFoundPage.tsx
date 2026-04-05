import { Container } from '@/components/ui/Container'

export function NotFoundPage() {
  return (
    <Container>
      <section className="py-24">
        <h1 className="text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-[#A6B4CD]">The requested route is not available in this migration skeleton.</p>
      </section>
    </Container>
  )
}
