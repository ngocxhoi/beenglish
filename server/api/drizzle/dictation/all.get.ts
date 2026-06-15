import { db } from '~~/db'
import { videoProgress, videos } from '~~/db/schema'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized dashboard'
    })
  }

  try {
    const rows = await db
      .select({
        id: videos.id,
        title: videos.title,
        level: videos.level,
        topic: videos.topic,
        durationSeconds: videos.durationSeconds,

        completedSentences: videoProgress.completedSentences,
        totalSentences: videoProgress.totalSentences,
        isCompleted: videoProgress.isCompleted,
        videoUrl: videos.thumbnailUrl
      })
      .from(videos)
      .leftJoin(
        videoProgress,
        and(
          eq(videoProgress.videoId, videos.id),
          eq(videoProgress.userId, user.id)
        )
      )

    return {
      videos: rows
    }
  } catch (error) {
    console.error('Error:', error)
  }
})
