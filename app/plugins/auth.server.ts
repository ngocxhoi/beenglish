// plugins/auth.server.ts

export default defineNuxtPlugin(async () => {
  const { setAuth } = useGlobalStore()

  const event = useRequestEvent()

  const userFromContext = event?.context.user
  if (userFromContext) {
    setAuth(userFromContext)
  } else {
    setAuth(null)
  }
})
