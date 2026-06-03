import bcrypt from 'bcrypt'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

import { db } from '~~/db'
import { users } from '~~/db/schema'

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

    await db.insert(users).values({
      email: data.email,
      name: data.email.split('@')[0],
      passwordHash: hashedPassword
    })

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
