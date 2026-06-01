// plugins/auth.server.ts

export default defineNuxtPlugin(async () => {
  const user = useAuth()

  const event = useRequestEvent()

  const userFromContext = event?.context.user
  if (userFromContext) {
    user.value = userFromContext
  } else {
    user.value = null
  }
})
