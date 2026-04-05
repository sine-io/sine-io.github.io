export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  sections: Array<{ title: string; body: string[] }>
}

export const projects: Project[] = [
  {
    slug: 'opc',
    title: 'OPC',
    summary: 'A long-running topic hub for glossary, roadmap, and design notes.',
    tags: ['Research', 'Roadmap', 'Glossary'],
    sections: [
      {
        title: 'Overview',
        body: ['这里作为 OPC 相关内容的入口，先建立统一语境，再逐步补上路线图、术语和专题拆解。']
      },
      {
        title: 'Roadmap',
        body: [
          '近期：明确问题域和目标边界。',
          '中期：补齐核心专题与案例。',
          '后续：沉淀可复用的方法、术语和参考资料。'
        ]
      },
      {
        title: 'Glossary',
        body: ['这页收集 OPC 相关术语的工作定义，先求统一理解，后续再逐步补充背景和示例。']
      }
    ]
  }
]
