import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from './Layout'

describe('Layout', () => {
  it('renders the sticky brand nav, background layer, and child content', () => {
    const { container } = render(
      <MemoryRouter>
        <Layout>
          <p>child content</p>
        </Layout>
      </MemoryRouter>
    )

    expect(container.firstChild).toHaveClass('isolate')
    expect(screen.getByRole('link', { name: /sine-io/i })).toBeInTheDocument()
    expect(screen.getByTestId('sine-wave-bg')).toHaveClass('z-[-1]')
    expect(screen.getByText('child content')).toBeInTheDocument()
  })
})
