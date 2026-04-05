import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('HomePage', () => {
  it('shows the recomposed homepage hero without losing featured content and browse links', () => {
    renderWithRouter('/')
    const heroPanel = screen.getByTestId('hero-art').parentElement?.parentElement
    const overviewPanel = screen.getByText('Overview').parentElement?.parentElement

    expect(screen.getByText(/性能测试、工具拆解与 OPC 知识沉淀/)).toBeInTheDocument()
    expect(screen.getByText('这里先聚焦性能测试工具、使用教程和 OPC 相关记录，把分散的经验整理成更容易检索的入口。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument()
    expect(screen.getByText('OPC')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Selected Writing/i })).toBeInTheDocument()
    expect(screen.getByText('简明 COSBench 教程')).toBeInTheDocument()
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
    expect(screen.getByTestId('home-orbit-map')).toBeInTheDocument()
    expect(heroPanel).toHaveClass('border-[#A6DEFC]/20')
    expect(heroPanel).toHaveClass('shadow-[0_0_0_1px_rgba(166,222,252,0.08),0_28px_100px_rgba(0,0,0,0.4),0_0_48px_rgba(93,227,233,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]')
    expect(overviewPanel).toHaveClass('border-white/8')
    expect(overviewPanel).toHaveClass('bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(8,17,40,0.72))]')
  })
})
