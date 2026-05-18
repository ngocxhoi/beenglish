export const groups: SidebarGroups = [
  {
    label: '01 — Tổng quan',
    items: [{ to: '/', icon: 'lucide:home', label: 'Trang chủ', active: true }]
  },
  {
    label: '02 — Luyện tập',
    items: [
      { to: '/', icon: 'lucide:headphones', label: 'Dictation' },
      { to: '/', icon: 'lucide:mic', label: 'Shadowing' },
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
