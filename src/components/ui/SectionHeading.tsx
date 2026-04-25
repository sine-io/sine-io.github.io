type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  tone?: 'default' | 'hero'
}

export function SectionHeading({ eyebrow, title, description, level = 2, tone = 'default' }: SectionHeadingProps) {
  const HeadingTag = `h${level}` as const
  const eyebrowClassName = tone === 'hero' ? 'text-[#A6DEFC]' : 'text-[#75B3E1]'
  const titleClassName = tone === 'hero' ? 'text-[#F4FAFF]' : 'text-white'
  const descriptionClassName = tone === 'hero' ? 'text-[#D7E3F4]' : 'text-[#A6B4CD]'

  return (
    <div className="space-y-3">
      <p className={`text-xs uppercase tracking-[0.35em] ${eyebrowClassName}`}>{eyebrow}</p>
      <HeadingTag className={`text-3xl font-semibold tracking-[-0.03em] ${titleClassName}`}>{title}</HeadingTag>
      {description ? <p className={`max-w-2xl text-sm leading-7 ${descriptionClassName}`}>{description}</p> : null}
    </div>
  )
}
