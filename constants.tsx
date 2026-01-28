
import { Project, Experience, Language, Education } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    nav: { about: 'ABOUT', projects: 'PROJECTS', contact: 'CONTACT' },
    hero: { 
      greeting: 'Digital Designer & System Architect', 
      titlePrefix: 'PORTFOLIO',
      titleSuffix: 'KRISTA WANG',
      subtitle: '连接人类直觉与复杂数据的界面设计。专注于实用性、美学与卓越性能。', 
      cta: 'EXPLORE PROJECTS' 
    },
    about: { 
      title: 'ABOUT',
      titleMe: 'ME',
      educationLabel: 'EDUCATION EXPERIENCE',
      experienceLabel: 'WORK EXPERIENCE'
    },
    projects: { title: 'FEATURED WORKS', viewDetails: 'VIEW DETAILS' },
    contact: { title: 'START A PROJECT', name: 'Name', email: 'Email', message: 'Message', send: 'SEND MESSAGE' },
    modal: { challenge: 'THE CHALLENGE', solution: 'THE SOLUTION', results: 'KEY RESULTS' }
  },
  cn: {
    nav: { about: 'ABOUT', projects: 'PROJECTS', contact: 'CONTACT' },
    hero: { 
      greeting: 'Digital Designer & System Architect', 
      titlePrefix: 'PORTFOLIO',
      titleSuffix: 'KRISTA WANG',
      subtitle: '连接人类直觉与复杂数据的界面设计。专注于实用性、美学与卓越性能。', 
      cta: 'EXPLORE PROJECTS' 
    },
    about: { 
      title: 'ABOUT',
      titleMe: 'ME',
      educationLabel: 'EDUCATION EXPERIENCE',
      experienceLabel: 'WORK EXPERIENCE'
    },
    projects: { title: 'FEATURED WORKS', viewDetails: 'VIEW DETAILS' },
    contact: { title: 'START A PROJECT', name: 'NAME', email: 'EMAIL', message: 'MESSAGE', send: 'SEND MESSAGE' },
    modal: { challenge: 'THE CHALLENGE', solution: 'THE SOLUTION', results: 'KEY RESULTS' }
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'comchat',
    title: 'Comchat',
    category: 'Enterprise AR/OS',
    brandColor: '#165DFF',
    year: '2025',
    description: 'Comchat is a smart enterprise collaboration system paired with AR glasses, combining messaging, remote support, and cloud-based tools.',
    challenge: '设计一个在 2D 移动端和 3D AR 空间中都感觉自然跨设备生态系统。',
    solution: '创建了统一的设计 language，专注于效率、清晰度和低认知负荷。',
    metrics: ['Reduced Training Cost', 'Cross-platform Sync', 'Zero Latency Feel'],
    imageUrl: '/comchat.png',
    longImages: ['/comchat.png']
  },
  {
    id: 'boomplay',
    title: 'Boomplay Music',
    category: 'Music Streaming App',
    brandColor: '#00EFFF',
    year: '2022',
    description: 'African music is an indispensable part of the African people, a kind of spiritual sustenance of the original people.',
    challenge: 'Building a better African music ecosystem and bringing unique sounds to more people in a complex economic landscape.',
    solution: 'Established regional independent homepage distribution and segmented users by key operating countries and high-potential areas.',
    metrics: ['88M+ Monthly Active Users', '100M+ Total Users', '+17.3% MAU Growth', '120+ Visual Localizations'],
    imageUrl: '/boomplay.png',
    longImages: ['/boomplay.png']
  },
  {
    id: 'afrotunes',
    title: 'Afrotunes',
    category: 'Digital Distribution',
    brandColor: '#CF2698',
    year: '2022',
    description: 'Afrotunes provides digital distribution for independent artists and labels, simplifying complex royalties workflows.',
    challenge: '简化个人创作者复杂的版税 and 分发流程。',
    solution: '大胆、充满活力的界面，通过清晰的数据分析 and 工具包为艺术家赋能。',
    metrics: ['100% Royalties Tracking', 'Multi-platform Push', 'Artist Growth +40%'],
    imageUrl: '/afrotunes.png',
    longImages: ['/afrotunes.png']
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: '香港新科实业有限公司',
    role: 'UX & 产品经理',
    period: '2022.05- 2025.06',
    description: [
      '负责企业协同产品 Comchat 会议场景的产品规划与体验设计，覆盖会前 / 会中 / 会后全流程及 Web、iPad、Mobile 多端；聚焦会议创建、入会、会议控制与会后沉淀等核心流程，推动会议效率提升约 20%。',
      '负责 Comchat 即时通讯、智能日历与提醒等核心协同功能设计，梳理高频协作场景下的关键任务与路径，优化信息结构与跨模块联动体验，降低操作复杂度，用户满意度提升约 17%。',
      '参与 ERP 系统核心模块的产品与交互设计，梳理生产计划、工单与库存管理流程，优化信息架构与表单布局，推动多轮原型评审与迭代，关键操作流程合规性显著提升。'
    ]
  },
  {
    id: 'exp-2',
    company: '传易互联有限公司 (传音控股子公司)',
    role: 'UI设计师',
    period: '2021.04-2022.05',
    description: [
      '负责 Boomplay Music 首页、音乐库及 Buzz 社区等核心模块的界面设计，优化视觉一致性与信息布局；改版后月活用户由 7,500 万 增长至 8,800 万，同比提升约 17.3%。',
      '独立完成联名品牌功能手机的界面设计，面向低硬件环境优化基础音乐体验；通过轻量化设计、大点击区域及离线能力，保障新兴市场用户的顺畅使用。',
      '主导 2021 年年终艺人回顾活动的视觉与交互设计，基于平台数据生成个性化年度报告；结合可视化与互动组件，活动参与度同比提升约 16%。',
      '设计南亚专辑与歌单封面 120+，进行视觉本地化；通过优化视觉与信息呈现，提升内容浏览量与用户互动频次。'
    ]
  },
  {
    id: 'exp-3',
    company: 'TCL 集团股份有限公司',
    role: 'UI 设计实习生',
    period: '2020.09-2021.01',
    description: [
      '负责电视端引导页及智能语音交互（VUI）界面设计，涵盖 AI 客服、天气预警与 IoT 设备卡片；推动组件库规范化与设计专利落地，提升操作便捷性与界面一致性。',
      '配合团队优化智慧家居生态中的核心管家界面，覆盖集成灶、冰箱等设备的 Dashboard 视觉与交互设计，确保多设备体验统一，并通过标准化设计体系提升整体体验与迭代效率。'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'edu-1',
    school: '格罗宁根大学',
    degree: '语音技术(硕士)',
    period: '2025.08-2026.07'
  },
  {
    id: 'edu-2',
    school: '东莞理工学院',
    degree: '多媒体设计(本科)',
    period: '2017.09-2021.06'
  },
  {
    id: 'edu-3',
    school: '台湾朝阳科技大学',
    degree: '视觉传达设计(交换生)',
    period: '2019.09-2020.01'
  }
];
