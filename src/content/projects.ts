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
    summary: '这里作为 OPC 相关内容的入口，先建立统一语境，再逐步补上路线图、术语和专题拆解。',
    tags: ['总览导航', '路线图草案', '术语整理'],
    sections: [
      {
        title: 'OPC 总览',
        body: [
          '这里作为 OPC 相关内容的入口，先建立统一语境，再逐步补上路线图、术语和专题拆解。',
          '当前内容：OPC 总览导航。',
          '当前内容：路线图草案。',
          '计划内容：专题设计记录与实现笔记。'
        ]
      },
      {
        title: 'OPC 路线图',
        body: [
          '近期：明确问题域和目标边界。',
          '中期：补齐核心专题与案例。',
          '后续：沉淀可复用的方法、术语和参考资料。'
        ]
      },
      {
        title: 'OPC 术语表',
        body: [
          '这页收集 OPC 相关术语的工作定义，先求统一理解，后续再逐步补充背景和示例。',
          '计划术语：核心对象与角色。',
          '计划术语：关键流程与状态。',
          '计划术语：常见缩写与上下文约定。'
        ]
      }
    ]
  }
]
