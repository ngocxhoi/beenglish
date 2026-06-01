// server/middleware/auth.ts

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    event.context.user = null

    return
  }

  event.context.user = await verifyToken(token)
})
