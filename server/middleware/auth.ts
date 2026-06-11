// server/middleware/auth.ts

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (user) return

  const token = getCookie(event, 'token')

  if (!token) {
    event.context.user = null

    return
  }

  const userParsed = await verifyToken(token)
  event.context.user = userParsed as unknown as UserType
})
