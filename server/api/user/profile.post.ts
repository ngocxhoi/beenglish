import { eq } from 'drizzle-orm'
import { db } from '~~/db'
import { users } from '~~/db/schema'

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  await db.update(users)
    .set({
      avatarUrl: url
    })
    .where(eq(users.id, user.id))

  return {
    success: true
  }
})
