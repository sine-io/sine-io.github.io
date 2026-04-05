type WritingEntryBase = {
  slug: string
  title: string
  category: 'guide' | 'note' | 'update'
  summary: string
}

export type ExternalWritingEntry = WritingEntryBase & {
  kind: 'external'
  externalUrl: string
  body?: never
}

export type InternalWritingEntry = WritingEntryBase & {
  kind: 'internal'
  body: string[]
  externalUrl?: never
}

export type WritingEntry = ExternalWritingEntry | InternalWritingEntry

export const writingEntries: WritingEntry[] = [
  {
    kind: 'internal',
    slug: 'portfolio-migration-note',
    title: 'Portfolio migration note',
    category: 'update',
    summary: '占位用的站内文章条目，用来验证 /writing/:slug 的正向路由。',
    body: ['这是一条最小的站内占位内容。']
  },
  {
    kind: 'external',
    slug: 'cosbench-guide',
    title: '简明 COSBench 教程',
    category: 'guide',
    summary: '外部教程站点，聚焦对象存储性能测试的部署、配置与结果理解。',
    externalUrl: 'https://sine-io.github.io/byte-of-cosbench/'
  },
  {
    kind: 'external',
    slug: 'vdbench-guide',
    title: '简明 Vdbench 教程',
    category: 'guide',
    summary: '外部教程站点，整理文件存储性能测试中常用参数、模型和排查路径。',
    externalUrl: 'https://sine-io.github.io/byte-of-vdbench/'
  }
]
