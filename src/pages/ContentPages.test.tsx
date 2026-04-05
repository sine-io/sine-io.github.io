import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('content pages', () => {
  it('lists OPC on the projects page', () => {
    renderWithRouter('/projects')
    expect(screen.getByText('OPC')).toBeInTheDocument()
  })

  it('renders migrated OPC detail content from overview, roadmap, and glossary', () => {
    renderWithRouter('/projects/opc')
    expect(screen.getByText('当前内容：OPC 总览导航。')).toBeInTheDocument()
    expect(screen.getByText('这页用来跟踪 OPC 方向上的阶段目标，把要做的事拆开，避免概念和计划混在一起。')).toBeInTheDocument()
    expect(screen.getByText('计划术语：核心对象与角色。')).toBeInTheDocument()
  })

  it('groups writing entries from guides, notes, and updates', () => {
    renderWithRouter('/writing')
    expect(screen.getByText('简明 COSBench 教程')).toBeInTheDocument()
    expect(screen.getByText('参数速查')).toBeInTheDocument()
    expect(screen.getByText('VitePress 迁移进度')).toBeInTheDocument()
    expect(screen.getByText('这一部分保留教程索引入口。完整教程仍发布在独立站点，这里只提供稳定链接与简短说明，方便集中查找。')).toBeInTheDocument()
    expect(screen.getByText('这一部分放较短的技术笔记，用来收纳实验观察、参数对比、排障片段和暂时不扩成长文的碎片知识。')).toBeInTheDocument()
    expect(screen.getByText('这里记录站点和专题内容的推进情况，方便快速查看最近新增、调整和阶段性结论。')).toBeInTheDocument()
  })

  it('renders migrated internal writing detail content', () => {
    renderWithRouter('/writing/portfolio-migration-note')
    expect(screen.getByRole('heading', { name: 'Portfolio migration note' })).toBeInTheDocument()
    expect(screen.getByText('这里记录站点和专题内容的推进情况，方便快速查看最近新增、调整和阶段性结论。')).toBeInTheDocument()
    expect(screen.getByText('当前计划：VitePress 迁移进度。')).toBeInTheDocument()
  })

  it('renders the about and contact pages', () => {
    renderWithRouter('/about')
    expect(screen.getByText(/SineCelia/)).toBeInTheDocument()
    renderWithRouter('/contact')
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
  })
})
