export default defineEventHandler(async (event) => {
  deleteCookie(event, 'token')

  return {
    logout_success: true
  }
})
