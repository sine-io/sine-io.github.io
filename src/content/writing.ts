export type WritingEntry = {
  slug: string
  title: string
  category: 'guide' | 'note' | 'update'
  summary: string
  externalUrl?: string
  body?: string[]
}

export const writingEntries: WritingEntry[] = [
  {
    slug: 'cosbench-guide',
    title: '简明 COSBench 教程',
    category: 'guide',
    summary: '外部教程站点，聚焦对象存储性能测试的部署、配置与结果理解。',
    externalUrl: 'https://sine-io.github.io/byte-of-cosbench/'
  },
  {
    slug: 'vdbench-guide',
    title: '简明 Vdbench 教程',
    category: 'guide',
    summary: '外部教程站点，整理文件存储性能测试中常用参数、模型和排查路径。',
    externalUrl: 'https://sine-io.github.io/byte-of-vdbench/'
  }
]
