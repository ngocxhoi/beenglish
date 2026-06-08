import { eq } from 'drizzle-orm'
import { db } from '~~/db'
import { vocabulary } from '~~/db/schema'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const count = await db.select().from(vocabulary).where(eq(vocabulary.userId, user.id))
    return count.length
  } catch (error) {
    console.error('Error counting vocabulary:', error)
  }
})
