import { eq, and, desc } from 'drizzle-orm'
import { z } from 'zod'
import { videos, sentences, videoProgress } from './schema'

export const listVideos = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
      topic: z.string().optional()
    }).optional()
  )
  .handler(async ({ data }) => {
    const conditions = []
    if (data?.level) conditions.push(eq(videos.level, data.level))
    if (data?.topic) conditions.push(eq(videos.topic, data.topic))
    const rows = await db
      .select()
      .from(videos)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(videos.createdAt))
      .limit(60)
    return rows
  })

export const getVideoWithSentences = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ videoId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const [video] = await db.select().from(videos).where(eq(videos.id, data.videoId)).limit(1)
    if (!video) return null
    const lines = await db
      .select()
      .from(sentences)
      .where(eq(sentences.videoId, video.id))
      .orderBy(sentences.index)
    return { video, sentences: lines }
  })

export const getUserProgress = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ userId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const rows = await db
      .select()
      .from(videoProgress)
      .where(eq(videoProgress.userId, data.userId))
      .orderBy(desc(videoProgress.lastPracticedAt))
      .limit(20)
    return rows
  })
