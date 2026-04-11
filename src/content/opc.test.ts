import { projects } from '@/content/projects'
import { opcContent, opcProjectMeta } from '@/content/opc'
import { writingEntries } from '@/content/writing'

describe('opc content', () => {
  it('exports teaser metadata that projects surfaces can reuse', () => {
    expect(projects).toContainEqual(opcProjectMeta)
    expect(opcProjectMeta.slug).toBe('opc')
    expect(opcProjectMeta.tags).toHaveLength(3)
  })

  it('keeps the first release content within the planned ranges', () => {
    expect(opcContent.stages).toHaveLength(4)
    expect(opcContent.topics).toHaveLength(5)
    expect(opcContent.cases).toHaveLength(3)

    opcContent.stages.forEach((stage) => {
      expect(stage.signals.length).toBeGreaterThanOrEqual(1)
      expect(stage.signals.length).toBeLessThanOrEqual(3)
    })
  })

  it('uses unique identifiers for stages, signals, and anchored items', () => {
    const stageIds = opcContent.stages.map((stage) => stage.id)
    const signalIds = opcContent.stages.flatMap((stage) => stage.signals.map((signal) => signal.id))
    const topicIds = opcContent.topics.map((topic) => topic.id)
    const termIds = opcContent.terms.map((term) => term.id)
    const caseSlugs = opcContent.cases.map((entry) => entry.slug)

    expect(new Set(stageIds).size).toBe(stageIds.length)
    expect(new Set(signalIds).size).toBe(signalIds.length)
    expect(new Set(topicIds).size).toBe(topicIds.length)
    expect(new Set(termIds).size).toBe(termIds.length)
    expect(new Set(caseSlugs).size).toBe(caseSlugs.length)
  })

  it('only targets topics, terms, and cases that actually exist', () => {
    const topicIds = new Set(opcContent.topics.map((topic) => topic.id))
    const termIds = new Set(opcContent.terms.map((term) => term.id))
    const caseSlugs = new Set(opcContent.cases.map((entry) => entry.slug))
    const writingSlugs = new Set(writingEntries.map((entry) => entry.slug))

    opcContent.stages.flatMap((stage) => stage.signals).forEach((signal) => {
      if (signal.target.kind === 'topic') {
        expect(topicIds.has(signal.target.id)).toBe(true)
      }

      if (signal.target.kind === 'term') {
        expect(termIds.has(signal.target.id)).toBe(true)
      }

      if (signal.target.kind === 'case') {
        expect(caseSlugs.has(signal.target.slug)).toBe(true)
      }
    })

    opcContent.cases.forEach((entry) => {
      expect(writingSlugs.has(entry.slug)).toBe(true)
    })
  })
})
