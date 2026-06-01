export default defineNuxtRouteMiddleware(async (to) => {
  const user = useAuth()

  const requiresAuth = to.meta.auth === true
  const guestOnly = to.meta.guest === true

  // Trang cần đăng nhập
  if (requiresAuth && !user.value) {
    return navigateTo({
      path: '/vi/auth/login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  // Trang chỉ dành cho khách
  if (guestOnly && user.value) {
    return navigateTo({
      path: to.query.redirect ? String(to.query.redirect) : '/vi/trang-chu'
    })
  }
})
