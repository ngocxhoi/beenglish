import type {
  userStats,
  videoProgress
} from '~~/db/schema'

export type DataDashboard = {
  vocabularyCount: number
  userStats: typeof userStats.$inferSelect | null
  ranking: {
    userId: string
    totalPracticeMinutes: number
    longestStreak: number
    userName: string
    avatar: string | null
  }[] | []
  continueLesson: typeof videoProgress.$inferSelect[] | []
  userName: string
  avatar: string | null
}
