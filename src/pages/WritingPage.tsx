import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { writingEntries } from '@/content/writing'

const categoryMeta = {
  guide: {
    eyebrow: 'Guide',
    title: 'Guides',
    description: '教程索引保留稳定链接，也为后续补充的站内教程预留位置。'
  },
  note: {
    eyebrow: 'Note',
    title: 'Notes',
    description: '较短的技术笔记，用来收纳实验观察、参数对比和排障片段。'
  },
  update: {
    eyebrow: 'Update',
    title: 'Updates',
    description: '记录站点和专题内容的推进情况，方便快速查看阶段性进展。'
  }
} as const

const categoryOrder = ['guide', 'note', 'update'] as const

export function WritingPage() {
  return (
    <Container>
      <div className="space-y-12 py-16 md:space-y-16 md:py-24">
        <SectionHeading
          eyebrow="Writing"
          title="Writing"
          description="把教程、短笔记和阶段更新按类型聚合到同一处，方便集中浏览。"
        />
        {categoryOrder.map((category) => {
          const entries = writingEntries.filter((entry) => entry.category === category)
          const meta = categoryMeta[category]

          return (
            <section key={category} className="space-y-6">
              <SectionHeading eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />
              <div className="grid gap-6 md:grid-cols-2">
                {entries.map((entry) => (
                  <GlassPanel key={entry.slug}>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white">{entry.title}</h3>
                      <p className="text-sm leading-7 text-[#A6B4CD]">{entry.summary}</p>
                      {entry.kind === 'external' ? (
                        <a
                          href={entry.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-[#75B3E1] transition hover:text-white"
                        >
                          前往阅读
                        </a>
                      ) : (
                        <Link
                          to={`/writing/${entry.slug}`}
                          className="text-sm font-medium text-[#75B3E1] transition hover:text-white"
                        >
                          站内阅读
                        </Link>
                      )}
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </Container>
  )
}
