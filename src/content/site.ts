export const siteMeta = {
  name: 'sine-io',
  title: 'SineCelia | Cyber-Wave Portfolio',
  description: '性能测试、工具拆解与 OPC 知识沉淀'
}

export const siteNav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
] as const

export const homeContent = {
  eyebrow: 'Cyber-Wave',
  title: '性能测试、工具拆解与 OPC 知识沉淀',
  intro: '欢迎来到我的博客，我非常高兴你停留在这里！',
  overview: [
    '这里先聚焦性能测试工具、使用教程和 OPC 相关记录，把分散的经验整理成更容易检索的入口。',
    '工作中，我用到了 COSBench 和 Vdbench 这两款工具，分别测试对象存储、文件存储的性能。通过研究官方手册和源码，结合使用心得，我编写了简明 COSBench 教程和简明 Vdbench 教程，希望可以给其他使用者一些参考，少走一些弯路。'
  ],
  featuredWritingSlugs: ['cosbench-guide', 'vdbench-guide'],
  featuredProjectSlugs: ['opc'],
  photo: {
    alt: '雨后初晴-成研所',
    caption: '照片由 SineCelia 拍摄于成研所。'
  },
  browseLinks: [
    {
      label: 'OPC 专题',
      description: '集中放置项目背景、关键概念、路线图和术语整理。',
      href: '/projects/opc'
    },
    {
      label: '关于作者',
      description: '查看 SineCelia 的关注方向、写作范围和站点定位。',
      href: '/about'
    },
    {
      label: '实验与短笔记',
      description: '记录参数差异、踩坑复盘和不值得单独写成长文的观察。',
      href: '/writing'
    },
    {
      label: '最近更新',
      description: '按阶段记录站点迁移进度、专题推进和内容补充情况。',
      href: '/writing'
    },
    {
      label: 'GitHub 与动态',
      description: '代码仓库在 GitHub，更多日常动态和碎片想法会同步到 X。',
      href: 'https://github.com/sine-io',
      external: true
    }
  ],
  contactCallout: {
    title: 'Contact',
    description: '如果你想交流性能测试、自动化工具或长期维护中的经验，可以通过下面这些入口联系。'
  },
  browseCallout: {
    title: '继续浏览',
    description: '代码仓库在 GitHub，更多日常动态和碎片想法会同步到 X。'
  }
}
