import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'SineIO',
  description: '重要的东西用眼睛是看不见的，只有用心才能看得清楚。',
  cleanUrls: true,
  lastUpdated: true,
  // Keep internal planning/spec docs under docs/superpowers/** out of the published site.
  srcExclude: ['superpowers/**'],
  sitemap: {
    hostname: 'https://sineio.top'
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guides/' },
      { text: '笔记', link: '/notes/' },
      { text: 'OPC', link: '/opc/' },
      { text: '更新', link: '/updates/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/guides/': [
        {
          text: '教程',
          items: [{ text: '教程索引', link: '/guides/' }]
        }
      ],
      '/notes/': [
        {
          text: '笔记',
          items: [{ text: '笔记索引', link: '/notes/' }]
        }
      ],
      '/opc/': [
        {
          text: 'OPC',
          items: [
            { text: '总览', link: '/opc/' },
            { text: '路线图', link: '/opc/roadmap/' },
            { text: '术语表', link: '/opc/glossary/' }
          ]
        }
      ],
      '/updates/': [
        {
          text: '更新',
          items: [{ text: '更新索引', link: '/updates/' }]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sine-io' },
      { icon: 'x', link: 'https://x.com/SineCelia' }
    ],
    footer: {
      message: '天行健，君子以自强不息。',
      copyright: 'Copyright © 2026 SineCelia'
    }
  }
})
