import bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'

import { db } from '~~/db'
import { accounts, users } from '~~/db/schema'
import { signToken } from '#server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email))

    const account
      = await db.query.accounts.findFirst({
        where: and(
          eq(accounts.userId, user?.id || ''),
          eq(accounts.provider, 'credentials')
        )
      })

    const valid = await bcrypt.compare(
      body.password,
      account?.passwordHash || ''
    )

    if (!user || !account || !valid) {
      throw createError({
        statusCode: 401,
        message: 'Tài khoản hoặc mật khẩu của bạn là không đúng!'
      })
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.displayName,
      profile: user.avatarUrl
    })

    setCookie(event, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return {
      id: user.id,
      email: user.email,
      name: user.displayName,
      profile: user.avatarUrl,
      exp: Date.now() + 60 * 60 * 24 * 7 // 7 days
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: (error as Error).message || 'Tài khoản của bạn không tồn tại!'
    })
  }
})
