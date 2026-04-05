import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('HomePage', () => {
  it('shows the hero copy, featured projects, selected writing, and continue browsing sections', () => {
    renderWithRouter('/')
    expect(screen.getByText(/性能测试、工具拆解与 OPC 知识沉淀/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Selected Writing/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /继续浏览/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /关于作者/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub 与动态/i })).toBeInTheDocument()
  })
})
