import { eq } from 'drizzle-orm'
import { db } from '~~/db'
import { users, verificationTokens } from '~~/db/schema'

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)

  const [existingToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))

  if (!existingToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid token'
    })
  }

  const tokenExpires = new Date(existingToken.expiresAt)

  if (tokenExpires < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token expired'
    })
  }

  await db
    .update(users)
    .set({
      emailVerified: true
    })
    .where(eq(users.email, existingToken.email))

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, existingToken.email))

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found'
    })
  }

  const jwtToken = await signToken({
    id: user.id,
    email: user.email,
    name: user.displayName,
    profile: user.avatarUrl
  })

  setCookie(event, 'token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found'
    })
  }

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token))

  return {
    id: user.id,
    email: user.email,
    name: user.displayName,
    profile: user.avatarUrl,
    exp: Date.now() + 60 * 60 * 24 * 7 // 7 days
  }
})
