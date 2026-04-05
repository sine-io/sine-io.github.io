import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the cyber-wave app shell', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /sine-io/i })).toBeInTheDocument()
    expect(screen.getByTestId('sine-wave-bg')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Hi, I'm sine-io." })).toBeInTheDocument()
  })
})
