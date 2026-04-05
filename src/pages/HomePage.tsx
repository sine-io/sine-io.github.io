import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/content/projects'
import { homeContent, siteMeta } from '@/content/site'
import { writingEntries } from '@/content/writing'
import serenePhoto from '../../docs/public/serein.jpg'

function pickItemsBySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => item !== undefined)
}

export function HomePage() {
  const featuredProjects = pickItemsBySlug(projects, homeContent.featuredProjectSlugs)
  const featuredWriting = pickItemsBySlug(writingEntries, homeContent.featuredWritingSlugs)

  return (
    <Container>
      <div className="space-y-16 py-16 md:space-y-24 md:py-24">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <GlassPanel>
            <h2 className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">{homeContent.eyebrow}</h2>
            <div className="mt-4 text-sm text-[#A6B4CD]">{siteMeta.name}</div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-white md:text-6xl">{homeContent.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-[#D7E3F4]">{homeContent.intro}</p>
          </GlassPanel>
          <GlassPanel>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-[#75B3E1]">Overview</p>
              {homeContent.overview.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[#A6B4CD]">
                  {paragraph}
                </p>
              ))}
            </div>
          </GlassPanel>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Projects"
            title="Featured Projects"
            description="从长期维护的专题入口开始，先看背景、路线和关键术语。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <GlassPanel key={project.slug}>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#A6B4CD]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-7 text-[#A6B4CD]">{project.summary}</p>
                  <Link to={`/projects/${project.slug}`} className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
                    查看项目
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Writing"
            title="Selected Writing"
            description="保留最常用的教程入口，把对象存储和文件存储测试的经验集中起来。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredWriting.map((entry) => (
              <GlassPanel key={entry.slug}>
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#75B3E1]">{entry.category}</p>
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
                    <Link to={`/writing/${entry.slug}`} className="text-sm font-medium text-[#75B3E1] transition hover:text-white">
                      站内阅读
                    </Link>
                  )}
                </div>
              </GlassPanel>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <GlassPanel>
            <figure className="space-y-4">
              <img
                src={serenePhoto}
                alt={homeContent.photo.alt}
                className="h-72 w-full rounded-2xl object-cover"
              />
              <figcaption className="text-sm text-[#A6B4CD]">{homeContent.photo.caption}</figcaption>
            </figure>
          </GlassPanel>
          <GlassPanel>
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Browse"
                title={homeContent.browseCallout.title}
                description={homeContent.browseCallout.description}
              />
              <div className="grid gap-4">
                {homeContent.browseLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 px-4 py-4 transition hover:border-[#75B3E1]"
                    >
                      <p className="text-sm font-medium text-white">{link.label}</p>
                      <p className="mt-2 text-sm text-[#A6B4CD]">{link.description}</p>
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="rounded-2xl border border-white/10 px-4 py-4 transition hover:border-[#75B3E1]"
                    >
                      <p className="text-sm font-medium text-white">{link.label}</p>
                      <p className="mt-2 text-sm text-[#A6B4CD]">{link.description}</p>
                    </Link>
                  )
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-[#75B3E1] hover:text-[#75B3E1]"
                >
                  联系方式
                </Link>
              </div>
            </div>
          </GlassPanel>
        </section>
      </div>
    </Container>
  )
}
