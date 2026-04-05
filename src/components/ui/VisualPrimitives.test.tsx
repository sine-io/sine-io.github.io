import { render, screen } from '@testing-library/react'
import { ConstellationField } from './ConstellationField'
import { GlassPanel } from './GlassPanel'
import { SectionHeading } from './SectionHeading'

describe('ConstellationField', () => {
  it('renders the provided paths and node circles as a decorative aria-hidden svg', () => {
    const nodes = [
      { cx: 12, cy: 18, r: 1.4 },
      { cx: 36, cy: 28 },
      { cx: 62, cy: 14, r: 1.1 }
    ]
    const paths = [
      { d: 'M12 18L36 28' },
      { d: 'M36 28L62 14' }
    ]

    render(<ConstellationField testId="constellation" nodes={nodes} paths={paths} />)

    const svg = screen.getByTestId('constellation')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg.querySelectorAll('path')).toHaveLength(paths.length)
    expect(svg.querySelectorAll('circle')).toHaveLength(nodes.length * 2)
  })
})

describe('GlassPanel', () => {
  it('applies distinct classes for default, hero, and dense variants', () => {
    render(
      <>
        <GlassPanel>default panel</GlassPanel>
        <GlassPanel variant="hero">hero panel</GlassPanel>
        <GlassPanel variant="dense">dense panel</GlassPanel>
      </>
    )

    expect(screen.getByText('default panel')).toHaveClass('border-white/10')
    expect(screen.getByText('default panel')).toHaveClass(
      'bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.58))]'
    )
    expect(screen.getByText('hero panel')).toHaveClass('border-[#A6DEFC]/20')
    expect(screen.getByText('hero panel')).toHaveClass(
      'shadow-[0_0_0_1px_rgba(166,222,252,0.08),0_28px_100px_rgba(0,0,0,0.4),0_0_48px_rgba(93,227,233,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]'
    )
    expect(screen.getByText('dense panel')).toHaveClass('border-white/8')
    expect(screen.getByText('dense panel')).toHaveClass(
      'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(8,17,40,0.72))]'
    )
  })
})

describe('SectionHeading', () => {
  it('uses brighter hero tone classes than the default tone', () => {
    render(
      <>
        <SectionHeading eyebrow="Default" title="Default title" description="Default description" />
        <SectionHeading
          eyebrow="Hero"
          title="Hero title"
          description="Hero description"
          tone="hero"
        />
      </>
    )

    expect(screen.getByText('Default')).toHaveClass('text-[#75B3E1]')
    expect(screen.getByText('Hero')).toHaveClass('text-[#A6DEFC]')
    expect(screen.getByRole('heading', { name: 'Default title', level: 2 })).toHaveClass('text-white')
    expect(screen.getByRole('heading', { name: 'Hero title', level: 2 })).toHaveClass('text-[#F4FAFF]')
    expect(screen.getByText('Default description')).toHaveClass('text-[#A6B4CD]')
    expect(screen.getByText('Hero description')).toHaveClass('text-[#D7E3F4]')
  })
})
