import type { WritingEntry } from '@/content/writing'

export type OpcProjectMeta = {
  slug: 'opc'
  title: string
  summary: string
  tags: string[]
}

export const opcTopicIds = [
  'problem-frame',
  'stage-map',
  'signal-rules',
  'evidence-loop',
  'reading-rhythm'
] as const

export type OpcTopicId = (typeof opcTopicIds)[number]

export const opcTermIds = ['stage', 'signal', 'judgment', 'case'] as const

export type OpcTermId = (typeof opcTermIds)[number]

export type OpcCaseSlug = WritingEntry['slug']

export type OpcLinkTarget =
  | { kind: 'topic'; id: OpcTopicId }
  | { kind: 'term'; id: OpcTermId }
  | { kind: 'case'; slug: OpcCaseSlug }

export type OpcSignal = {
  id: string
  change: string
  meaning: string
  nextLabel: string
  target: OpcLinkTarget
}

export type OpcStage = {
  id: string
  eyebrow: string
  title: string
  timeframe: string
  summary: string
  judgment?: string
  signals: OpcSignal[]
}

export type OpcTopic = {
  id: OpcTopicId
  title: string
  summary: string
  questions: string[]
}

export type OpcTerm = {
  id: OpcTermId
  term: string
  definition: string
  whyNow: string
}

export type OpcCase = {
  slug: OpcCaseSlug
  context: string
  whyItMatters: string
}

export type OpcContent = {
  eyebrow: string
  title: string
  description: string
  now: {
    stageLabel: string
    currentJudgment: string
    recentChange: string
  }
  stages: OpcStage[]
  topics: OpcTopic[]
  terms: OpcTerm[]
  cases: OpcCase[]
}

export const opcProjectMeta: OpcProjectMeta = {
  slug: 'opc',
  title: 'OPC',
  summary: '一个按阶段组织的 OPC 观察控制台，先看现在在哪，再沿信号跳进专题、术语和证据。',
  tags: ['观察控制台', '阶段时间线', '专题入口']
}

export const opcContent: OpcContent = {
  eyebrow: 'Observation Console',
  title: 'OPC 观察控制台',
  description: '先回答现在处于哪个阶段，再沿信号进入更值得继续读的专题、术语和案例。',
  now: {
    stageLabel: 'Stage 2 / 信号定型',
    currentJudgment: '现在最值得做的不是继续堆总览，而是把阶段判断、代表性信号和后续入口钉成一个稳定的阅读面板。',
    recentChange: '页面重心从“资料占位”转向“阶段 -> 信号 -> 去向”的观察链路，Topics 成为第一版的主要深读入口。'
  },
  stages: [
    {
      id: 'framing',
      eyebrow: 'Stage 1',
      title: '问题边界对齐',
      timeframe: '起点',
      summary: '先收束 OPC 到底在观察什么，避免总览、术语和路线图各说各话。',
      judgment: '如果边界不先收紧，后面的每条信号都会变成看起来合理、实际没法继续追的碎片。',
      signals: [
        {
          id: 'framing-scope',
          change: '当前页面从“总览 + 路线图 + 术语表”转向“观察控制台”框架。',
          meaning: 'OPC 的第一职责已经不是解释背景，而是帮助用户恢复阶段上下文。',
          nextLabel: '去看问题边界专题',
          target: { kind: 'topic', id: 'problem-frame' }
        },
        {
          id: 'framing-language',
          change: '阶段、信号、判断、案例被明确区分为不同对象。',
          meaning: '页面后续的信息密度可以增长，但表达方式不能再混成一团。',
          nextLabel: '先统一这些术语',
          target: { kind: 'term', id: 'signal' }
        }
      ]
    },
    {
      id: 'stage-map',
      eyebrow: 'Stage 2',
      title: '阶段骨架成形',
      timeframe: '当前焦点',
      summary: '把观察内容先收束到 3 到 5 个阶段，让用户一眼知道现在在哪。',
      judgment: '阶段是第一版最值钱的压缩层，它决定这个页面更像控制台还是更像更新流。',
      signals: [
        {
          id: 'stage-map-timeline',
          change: '时间线被定义成阶段优先，而不是离散事件优先。',
          meaning: '第一版会先优化“判断当前位置”，再考虑更细粒度的事件展开。',
          nextLabel: '查看阶段地图专题',
          target: { kind: 'topic', id: 'stage-map' }
        },
        {
          id: 'stage-map-now',
          change: 'Now 区块被单独拿出来，不再只是 hero 文案的一部分。',
          meaning: '回访用户可以先接上当前阶段，再决定要不要继续读下去。',
          nextLabel: '回到当前判断定义',
          target: { kind: 'term', id: 'judgment' }
        }
      ]
    },
    {
      id: 'signal-rhythm',
      eyebrow: 'Stage 3',
      title: '信号规则固定',
      timeframe: '近期变化',
      summary: '每条信号都必须告诉你发生了什么、这意味着什么、接下来去哪里。',
      signals: [
        {
          id: 'signal-rhythm-format',
          change: '信号格式不再是单句观察，而是“变化 + 含义 + 去向”的最小单元。',
          meaning: '这让时间线本身具备行动性，不会停留在漂亮但无用的描述上。',
          nextLabel: '看信号规则专题',
          target: { kind: 'topic', id: 'signal-rules' }
        },
        {
          id: 'signal-rhythm-case',
          change: 'Cases 被定位成证据支持层，不单独发明第二套内容体系。',
          meaning: '控制台可以借现有写作内容建立证据链，而不是先开一条新编辑流水线。',
          nextLabel: '先看已有证据链',
          target: { kind: 'case', slug: 'opc-milestone-updates' }
        }
      ]
    },
    {
      id: 'evidence',
      eyebrow: 'Stage 4',
      title: '证据与术语挂接',
      timeframe: '下一步',
      summary: '让 Topics 负责深读，Terms 负责统一语境，Cases 负责证明判断不是空话。',
      signals: [
        {
          id: 'evidence-topics',
          change: 'Topics 被明确设成第一版最完整的扇出层。',
          meaning: '继续阅读的主路径已经确定，页面不会平均发力到三块都半成品。',
          nextLabel: '去看 Topics 主轴',
          target: { kind: 'topic', id: 'reading-rhythm' }
        },
        {
          id: 'evidence-cases',
          change: 'Cases 先复用现有写作条目，作为观察判断的证据侧门。',
          meaning: '用户可以先确认结论，再按需钻进已有笔记和里程碑记录。',
          nextLabel: '查看一条案例证据',
          target: { kind: 'case', slug: 'experiment-log-snippets' }
        }
      ]
    }
  ],
  topics: [
    {
      id: 'problem-frame',
      title: '问题边界',
      summary: '先界定 OPC 页面到底在观察什么，避免把背景介绍、专题入口和过程更新混为一页。',
      questions: ['哪些信息属于“现在怎么看”？', '哪些信息其实应该下沉到专题页？']
    },
    {
      id: 'stage-map',
      title: '阶段地图',
      summary: '把 OPC 的观察对象收束成有限阶段，优先建立“当前位于哪里”的判断骨架。',
      questions: ['阶段怎么分才稳定？', '哪些变化足以推动阶段切换？']
    },
    {
      id: 'signal-rules',
      title: '信号写法',
      summary: '统一每条信号的表达方式，让时间线既能看，又能继续带路。',
      questions: ['什么能算代表性信号？', '信号和判断如何分层，不互相抢戏？']
    },
    {
      id: 'evidence-loop',
      title: '证据链',
      summary: '梳理哪些现有记录可以作为 Cases 支撑，让页面判断背后总有可回看的材料。',
      questions: ['哪类写作最适合挂成证据？', '证据不足时先补专题还是先补案例？']
    },
    {
      id: 'reading-rhythm',
      title: '继续阅读路径',
      summary: '让 Topics 成为最自然的深读入口，Terms 和 Cases 分别承担语境与证据的支持角色。',
      questions: ['什么顺序最适合第一次访问？', '回访用户需要先读什么，才能最快恢复上下文？']
    }
  ],
  terms: [
    {
      id: 'stage',
      term: '阶段',
      definition: '一段时间内相对稳定的观察位置，用来回答“现在在哪”。',
      whyNow: '第一版必须先建立阶段骨架，页面才能不是更新流。'
    },
    {
      id: 'signal',
      term: '信号',
      definition: '能体现阶段变化的代表性观察，必须同时说明变化、含义和去向。',
      whyNow: '信号是时间线真正带路的单位，不是装饰性的 bullet point。'
    },
    {
      id: 'judgment',
      term: '判断',
      definition: '对当前状态或某个阶段的解释性结论，用来说明为什么这个变化重要。',
      whyNow: '没有判断，控制台就只剩下漂亮的排列，没有观察价值。'
    },
    {
      id: 'case',
      term: '案例',
      definition: '能为阶段判断或信号提供证据的已有记录、笔记或里程碑条目。',
      whyNow: 'Cases 让页面里的判断可以被追溯，而不是只停在观点层。'
    }
  ],
  cases: [
    {
      slug: 'opc-milestone-updates',
      context: '用里程碑更新作为阶段推进的证据锚点。',
      whyItMatters: '这是最直接的 OPC 进度记录，适合承接“最近变了什么”。'
    },
    {
      slug: 'experiment-log-snippets',
      context: '把实验摘记挂成局部证据，看具体观察是如何支撑判断的。',
      whyItMatters: '适合承接阶段中的局部变化，而不是只看高层结论。'
    },
    {
      slug: 'parameter-quick-reference',
      context: '用速查条目承接术语和读法，证明 Cases 不一定是长文。',
      whyItMatters: '它能说明证据层可以很轻，但仍然服务判断和继续阅读。'
    }
  ]
}
