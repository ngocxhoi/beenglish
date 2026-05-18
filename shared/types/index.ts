export interface SidebarItem {
  to: string
  icon: string
  label: string
  active?: boolean
  badge?: string
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

export type SidebarGroups = SidebarGroup[]

export type LeaderboardEntry = {
  rank: number
  name: string
  time: string
  streak?: number
  you?: boolean
}
