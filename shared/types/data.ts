import type {
  userStats,
  videoProgress,
  videos
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
  continueLesson: {
    video_progress: typeof videoProgress.$inferSelect
    videos: typeof videos.$inferSelect
  }[] | []
  userName: string
  avatar: string | null
}
