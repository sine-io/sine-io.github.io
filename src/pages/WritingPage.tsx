import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import sectionArt from '@/assets/visuals/svg2-optimized.svg'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { writingCategoryMeta, writingCategoryOrder, writingEntries } from '@/content/writing'

export function WritingPage() {
  const location = useLocation()
  const categoryAnchors: Record<(typeof writingCategoryOrder)[number], string> = {
    guide: 'guides',
    note: 'notes',
    update: 'updates'
  }

  useEffect(() => {
    if (!location.hash) {
      return
    }

    const target = document.getElementById(location.hash.slice(1))

    if (target) {
      target.scrollIntoView()
    }
  }, [location.hash])

  return (
    <Container>
      <div className="relative isolate space-y-12 overflow-hidden py-16 md:space-y-16 md:py-24">
        <img
          data-testid="writing-art"
          src={sectionArt}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8rem] top-0 h-48 max-w-none object-contain opacity-35 md:right-[-2rem]"
        />
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Writing"
            title="Writing"
            description="把教程、短笔记和阶段更新按类型聚合到同一处，方便集中浏览。"
            level={1}
          />
        </div>
        {writingCategoryOrder.map((category) => {
          const entries = writingEntries.filter((entry) => entry.category === category)
          const meta = writingCategoryMeta[category]

          return (
            <section key={category} id={categoryAnchors[category]} className="space-y-6 scroll-mt-24">
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
