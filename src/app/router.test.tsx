import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('router', () => {
  it('renders the home page at /', () => {
    renderWithRouter('/')
    expect(screen.getByRole('heading', { name: /Cyber-Wave/i })).toBeInTheDocument()
  })

  it('renders the OPC project page at /projects/opc', () => {
    renderWithRouter('/projects/opc')
    expect(screen.getByRole('heading', { name: 'OPC' })).toBeInTheDocument()
  })

  it('renders the writing index at /writing', () => {
    renderWithRouter('/writing')
    expect(screen.getByRole('heading', { name: 'Writing' })).toBeInTheDocument()
  })
})
