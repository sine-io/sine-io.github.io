import type { HTMLAttributes, PropsWithChildren } from 'react'

type GlassPanelProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
  className?: string
  variant?: 'default' | 'hero' | 'dense'
}>

const panelVariantClassNames: Record<NonNullable<GlassPanelProps['variant']>, string> = {
  default:
    'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,17,40,0.58))] shadow-[0_0_0_1px_rgba(166,222,252,0.04),0_20px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]',
  hero:
    'border-[#A6DEFC]/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(12,26,56,0.66))] shadow-[0_0_0_1px_rgba(166,222,252,0.08),0_28px_100px_rgba(0,0,0,0.4),0_0_48px_rgba(93,227,233,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]',
  dense:
    'border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(8,17,40,0.72))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_16px_56px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.04)]'
}

export function GlassPanel({ children, className, variant = 'default', ...props }: GlassPanelProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-3xl border p-6 backdrop-blur-md',
        panelVariantClassNames[variant],
        className
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
