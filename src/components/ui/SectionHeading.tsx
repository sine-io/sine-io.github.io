type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-[#A6B4CD]">{description}</p> : null}
    </div>
  )
}
