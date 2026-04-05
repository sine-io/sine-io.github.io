import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('HomePage', () => {
  it('shows the hero copy, featured projects, selected writing, and a contact callout with browse links', () => {
    renderWithRouter('/')
    expect(screen.getByText(/性能测试、工具拆解与 OPC 知识沉淀/)).toBeInTheDocument()
    expect(screen.getByText('这里先聚焦性能测试工具、使用教程和 OPC 相关记录，把分散的经验整理成更容易检索的入口。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Selected Writing/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /联系方式/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /继续浏览/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /关于作者/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /GitHub 与动态/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /实验与短笔记/i })).toHaveAttribute('href', '/writing#notes')
    expect(screen.getByRole('link', { name: /最近更新/i })).toHaveAttribute('href', '/writing#updates')
    expect(screen.getByText('照片由 SineCelia 拍摄于成研所。')).toBeInTheDocument()
    expect(screen.getByTestId('hero-art')).toHaveAttribute('alt', '')
    expect(screen.getByTestId('hero-art')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByTestId('home-constellation')).toBeInTheDocument()
  })
})
