import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('router', () => {
  it('renders the home page at /', () => {
    renderWithRouter('/')
    expect(screen.getByRole('heading', { name: "Hi, I'm sine-io." })).toBeInTheDocument()
  })

  it('renders the OPC project page at /projects/opc', () => {
    renderWithRouter('/projects/opc')
    expect(screen.getByRole('heading', { name: 'OPC 观察控制台' })).toBeInTheDocument()
    expect(screen.getByTestId('opc-now-panel')).toBeInTheDocument()
    expect(screen.queryByText('Project Entry')).not.toBeInTheDocument()
  })

  it('renders the writing index at /writing', () => {
    renderWithRouter('/writing')
    expect(screen.getByRole('heading', { name: 'Writing' })).toBeInTheDocument()
  })

  it('renders the about page at /about', () => {
    renderWithRouter('/about')
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
  })

  it('renders the contact page at /contact', () => {
    renderWithRouter('/contact')
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders not found for unknown routes', () => {
    renderWithRouter('/does-not-exist')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('renders not found for unknown project slugs', () => {
    renderWithRouter('/projects/non-existent')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('renders not found for external writing entries on detail routes', () => {
    renderWithRouter('/writing/cosbench-guide')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('renders an internal writing detail route', () => {
    renderWithRouter('/writing/vitepress-migration-progress')
    expect(screen.getByRole('heading', { name: 'VitePress 迁移进度' })).toBeInTheDocument()
  })
})
