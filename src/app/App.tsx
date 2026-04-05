import { MemoryRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

export function App() {
  return (
    <MemoryRouter>
      <Layout>
        <div className="py-24 text-center">sine-io</div>
      </Layout>
    </MemoryRouter>
  )
}
