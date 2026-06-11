import { count, desc, eq } from 'drizzle-orm'
import { db } from '~~/db'
import { users, vocabulary, userStats, videoProgress } from '~~/db/schema'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized dashboard'
    })
  }

  try {
    const [[vocabCount], [userStatsData], ranking, continueLessonData] = await Promise.all([
      db
        .select({
          count: count()
        })
        .from(vocabulary)
        .where(eq(vocabulary.userId, user.id)),

      db
        .select()
        .from(userStats)
        .where(eq(userStats.userId, user.id)),

      db
        .select({
          userId: userStats.userId,
          totalPracticeMinutes: userStats.totalPracticeMinutes,
          longestStreak: userStats.longestStreak,
          userName: users.displayName,
          avatar: users.avatarUrl
        })
        .from(userStats)
        .orderBy(desc(userStats.totalPracticeMinutes))
        .innerJoin(users, eq(userStats.userId, users.id))
        .limit(5),

      db
        .select()
        .from(videoProgress)
        .where(eq(videoProgress.userId, user.id))
    ])

    return {
      vocabularyCount: vocabCount?.count || 0,
      userStats: userStatsData ?? null,
      ranking: ranking,
      continueLesson: continueLessonData
    }
  } catch (error) {
    console.error('Error:', error)
  }
})
