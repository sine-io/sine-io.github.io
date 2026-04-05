export type ProfileLink = {
  label: string
  href: string
}

export const profile = {
  about: [
    '这里先保留站点主人的简短背景说明，用于承接后续更完整的 About 内容迁移。',
    '当前阶段聚焦性能测试、工具整理和长期技术项目的索引骨架。'
  ],
  contactIntro: '如果你想交流性能测试、自动化工具或长期维护中的经验，可以通过下面这些入口联系。',
  links: [
    { label: 'GitHub', href: 'https://github.com/sine-io' },
    { label: 'Email', href: 'mailto:hello@sine-io.dev' }
  ] satisfies ProfileLink[]
}
