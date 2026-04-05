import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('content pages', () => {
  it('lists OPC on the projects page', () => {
    renderWithRouter('/projects')
    expect(screen.getByText('OPC')).toBeInTheDocument()
  })

  it('groups writing entries from guides, notes, and updates', () => {
    renderWithRouter('/writing')
    expect(screen.getByText('简明 COSBench 教程')).toBeInTheDocument()
    expect(screen.getByText('简明 Vdbench 教程')).toBeInTheDocument()
  })

  it('renders the about and contact pages', () => {
    renderWithRouter('/about')
    expect(screen.getByText(/SineCelia/)).toBeInTheDocument()
    renderWithRouter('/contact')
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
  })
})
