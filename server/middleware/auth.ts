// server/middleware/auth.ts

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    event.context.user = null

    return
  }

  const user = await verifyToken(token)
  event.context.user = user as unknown as UserType
})
