type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function SectionHeading({ eyebrow, title, description, level = 2 }: SectionHeadingProps) {
  const HeadingTag = `h${level}` as const

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">{eyebrow}</p>
      <HeadingTag className="text-3xl font-semibold text-white">{title}</HeadingTag>
      {description ? <p className="max-w-2xl text-sm text-[#A6B4CD]">{description}</p> : null}
    </div>
  )
}
