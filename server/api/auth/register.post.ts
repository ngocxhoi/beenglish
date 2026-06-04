import bcrypt from 'bcrypt'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

import { db } from '~~/db'
import { users, accounts, verificationTokens } from '~~/db/schema'

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const data = bodySchema.parse(body)

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))

    if (existing.length) {
      throw createError({
        statusCode: 400,
        message: 'Email already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    )

    const [user] = await db.insert(users).values({
      email: data.email
    }).returning()

    if (!user) {
      throw createError({
        statusCode: 500,
        message: 'Failed to create user'
      })
    }

    await db.insert(accounts).values({
      userId: user.id,
      provider: 'credentials',
      providerAccountId: data.email,
      passwordHash: hashedPassword
    })

    const token = crypto.randomUUID()

    await db.insert(verificationTokens).values({
      email: data.email,
      token,
      type: 'verify_email',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    })

    await sendEmailVerify(data.email, token)

    return {
      success: true
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 400,
      message: error instanceof Error ? error.message : 'Registration failed'
    })
  }
})
