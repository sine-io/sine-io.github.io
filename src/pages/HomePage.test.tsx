import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('HomePage', () => {
  it('shows the hero copy, featured projects, and selected writing sections', () => {
    renderWithRouter('/')
    expect(screen.getByText(/性能测试、工具拆解与 OPC 知识沉淀/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Selected Writing/i })).toBeInTheDocument()
  })
})
