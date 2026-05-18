export const groups: SidebarGroups = [
  {
    label: '01 — Tổng quan',
    items: [{ to: '/', icon: 'lucide:home', label: 'Trang chủ', active: true }]
  },
  {
    label: '02 — Luyện tập',
    items: [
      { to: '/vi/dictation', icon: 'lucide:headphones', label: 'Dictation' },
      { to: '/vi/shadowing', icon: 'lucide:mic', label: 'Shadowing' },
      { to: '/', icon: 'lucide:message-square', label: 'Luyện nói' },
      { to: '/', icon: 'lucide:book-open', label: 'Luyện từ vựng' }
    ]
  },
  {
    label: '03 — Thư viện',
    items: [
      { to: '/', icon: 'lucide:video', label: 'Video của tôi' },
      { to: '/', icon: 'lucide:list-checks', label: 'Danh sách từ', badge: '0' },
      { to: '/', icon: 'lucide:sparkles', label: 'Từ điển AI' }
    ]
  },
  {
    label: '04 — Tiến độ',
    items: [
      { to: '/', icon: 'lucide:trophy', label: 'Xếp hạng' },
      { to: '/', icon: 'lucide:bar-chart-3', label: 'Thống kê' }
    ]
  }
]

export const TOPICS = [
  'Daily Life', 'Travel', 'Business', 'Food', 'Technology',
  'Science', 'Culture', 'Sports', 'Health', 'News'
]

const titles = [
  'The future of food',
  'Daily small talk at the office',
  'Travel essentials for backpackers',
  'Job interview tips that work',
  'How AI is changing the world',
  'Healthy morning routines',
  'World news in 6 minutes',
  'Climate change explained',
  'Coffee culture around the globe',
  'The art of negotiation',
  'Sleep science basics',
  'Marathon training for beginners',
  'Street food in Tokyo',
  'Remote work productivity',
  'Space exploration today',
  'Mindfulness for busy people',
  'History of the internet',
  'Public speaking confidence',
  'Cooking on a budget',
  'Sustainable fashion guide'
]

export function makeVideos(seed: number, count = 24): Video[] {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'] as const
  return Array.from({ length: count }, (_, i) => {
    const k = (i + seed) * 7
    return {
      id: `v-${seed}-${i}`,
      title: titles[(i + seed) % titles.length],
      level: levels[(k) % levels.length],
      topic: TOPICS[(k * 3) % TOPICS.length],
      minutes: 3 + ((k * 5) % 12),
      progress: i < 4 ? [3, 0, 12, 0][i] : 0
    } as Video
  })
}
