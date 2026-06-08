import { count, eq } from 'drizzle-orm'
import { db } from '~~/db'
import { vocabulary, userStats } from '~~/db/schema'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const [[vocabCount], [userStatsData]] = await Promise.all([
      db
        .select({
          count: count()
        })
        .from(vocabulary)
        .where(eq(vocabulary.userId, user.id)),

      db
        .select()
        .from(userStats)
        .where(eq(userStats.userId, user.id))
    ])

    return {
      vocabularyCount: vocabCount?.count || 0,
      userStats: userStatsData
    }
  } catch (error) {
    console.error('Error:', error)
    return { vocabularyCount: 0 }
  }
})
