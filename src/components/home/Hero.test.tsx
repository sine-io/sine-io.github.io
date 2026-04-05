import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the landing title, subtitle, actions, and decorative artwork', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: "Hi, I'm sine-io." })).toBeInTheDocument()
    expect(screen.getByText('Input / Output the Future.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read Tutorials' })).toHaveAttribute('href', '/writing#guides')
    expect(screen.getByRole('link', { name: 'GitHub Profile' })).toHaveAttribute(
      'href',
      'https://github.com/sine-io'
    )
    expect(screen.getByTestId('hero-art')).toHaveAttribute('alt', '')
    expect(screen.getByTestId('hero-art')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByTestId('hero-constellation')).toBeInTheDocument()
  })
})
