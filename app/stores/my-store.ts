export const useGlobalStore = defineStore('global', () => {
  const auth = ref<UserType | null>(null)

  function setAuth(user: UserType | null) {
    auth.value = user
  }

  function setName(name: string | null) {
    if (auth.value) {
      auth.value.name = name
    }
  }

  function setProfile(profile: string | null) {
    if (auth.value) {
      auth.value.profile = profile
    }
  }

  function reset() {
    auth.value = null
  }

  return { auth, setAuth, setName, setProfile, reset }
})
