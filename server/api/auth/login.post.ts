import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

import { db } from '~~/db'
import { users } from '~~/db/schema'
import { signToken } from '#server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email))

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Tài khoản hoặc mật khẩu của bạn là không đúng!'
      })
    }

    const valid = await bcrypt.compare(
      body.password,
      user.passwordHash || ''
    )

    if (!valid) {
      throw createError({
        statusCode: 401,
        message: 'Tài khoản hoặc mật khẩu của bạn là không đúng!'
      })
    }

    const token = await signToken({
      id: user.id,
      email: user.email
    })

    setCookie(event, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1
    })

    return {
      id: user.id,
      email: user.email,
      exp: Date.now() + 60 * 60 * 1
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: (error as Error).message || 'Tài khoản của bạn không tồn tại!'
    })
  }
})
