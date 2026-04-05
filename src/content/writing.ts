type WritingEntryBase = {
  slug: string
  title: string
  category: 'guide' | 'note' | 'update'
  summary: string
}

export type WritingCategory = WritingEntryBase['category']

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

export const writingCategoryOrder: WritingCategory[] = ['guide', 'note', 'update']

export const writingCategoryMeta: Record<
  WritingCategory,
  { eyebrow: string; title: string; description: string }
> = {
  guide: {
    eyebrow: 'Guide',
    title: 'Guides',
    description: '这一部分保留教程索引入口。完整教程仍发布在独立站点，这里只提供稳定链接与简短说明，方便集中查找。'
  },
  note: {
    eyebrow: 'Note',
    title: 'Notes',
    description: '这一部分放较短的技术笔记，用来收纳实验观察、参数对比、排障片段和暂时不扩成长文的碎片知识。'
  },
  update: {
    eyebrow: 'Update',
    title: 'Updates',
    description: '这里记录站点和专题内容的推进情况，方便快速查看最近新增、调整和阶段性结论。'
  }
}

export const writingEntries: WritingEntry[] = [
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
  },
  {
    kind: 'internal',
    slug: 'performance-test-environment-and-results',
    title: '性能测试环境准备与结果判读',
    category: 'guide',
    summary: '预留主题，计划整理测试环境准备、结果判读与常见误区。',
    body: [
      '这一主题仍在整理中，后续会补上更完整的结构化教程。',
      '计划覆盖：性能测试环境准备。',
      '计划覆盖：结果判读的基本方法。'
    ]
  },
  {
    kind: 'internal',
    slug: 'parameter-quick-reference',
    title: '参数速查',
    category: 'note',
    summary: '收纳性能测试里常用参数的速查信息，方便快速比对。',
    body: [
      '这一部分放较短的技术笔记，用来收纳实验观察、参数对比、排障片段和暂时不扩成长文的碎片知识。',
      '计划内容：参数速查。'
    ]
  },
  {
    kind: 'internal',
    slug: 'experiment-log-snippets',
    title: '实验记录摘记',
    category: 'note',
    summary: '记录实验观察和关键差异，保留后续扩展成长文的入口。',
    body: [
      '这一部分放较短的技术笔记，用来收纳实验观察、参数对比、排障片段和暂时不扩成长文的碎片知识。',
      '计划内容：实验记录摘记。'
    ]
  },
  {
    kind: 'internal',
    slug: 'troubleshooting-and-pitfalls',
    title: '排障与踩坑清单',
    category: 'note',
    summary: '沉淀排障片段和踩坑复盘，减少重复试错。',
    body: [
      '这一部分放较短的技术笔记，用来收纳实验观察、参数对比、排障片段和暂时不扩成长文的碎片知识。',
      '计划内容：排障与踩坑清单。'
    ]
  },
  {
    kind: 'internal',
    slug: 'vitepress-migration-progress',
    title: 'VitePress 迁移进度',
    category: 'update',
    summary: '记录站点迁移过程中的阶段进展与当前结论。',
    body: [
      '这里记录站点和专题内容的推进情况，方便快速查看最近新增、调整和阶段性结论。',
      '当前计划：VitePress 迁移进度。'
    ]
  },
  {
    kind: 'internal',
    slug: 'opc-milestone-updates',
    title: 'OPC 里程碑更新',
    category: 'update',
    summary: '跟踪 OPC 专题的推进节奏和阶段性里程碑。',
    body: [
      '这里记录站点和专题内容的推进情况，方便快速查看最近新增、调整和阶段性结论。',
      '计划内容：OPC 里程碑更新。'
    ]
  },
  {
    kind: 'internal',
    slug: 'tutorial-revision-log',
    title: '教程补档与修订记录',
    category: 'update',
    summary: '同步教程补档、修订和结构调整的索引。',
    body: [
      '这里记录站点和专题内容的推进情况，方便快速查看最近新增、调整和阶段性结论。',
      '计划内容：教程补档与修订记录。'
    ]
  }
]
