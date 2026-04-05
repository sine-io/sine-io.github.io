export type ProfileLink = {
  label: string
  href: string
}

export const profile = {
  name: 'SineCelia',
  summary: '这个知识站点主要整理性能测试、工具拆解和 OPC 相关内容，尽量写得深入浅出但不回避细节。',
  about: [
    '这个知识站点主要整理性能测试、工具拆解和 OPC 相关内容，尽量写得深入浅出但不回避细节。',
    '当前关注：COSBench、Vdbench、对象与文件存储性能测试、OPC 相关方法论。'
  ],
  focusAreas: ['COSBench', 'Vdbench', '对象与文件存储性能测试', 'OPC 相关方法论'],
  contactIntro: '代码仓库在 GitHub，更多日常动态和碎片想法会同步到 X。',
  links: [
    { label: 'GitHub', href: 'https://github.com/sine-io' },
    { label: 'X', href: 'https://x.com/SineCelia' }
  ] satisfies ProfileLink[]
}
