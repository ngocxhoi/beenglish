<script setup lang="ts">
const route = useRoute()
const auth = useAuth()
const token = route.query.token

// Gọi API verify khi component mount
onMounted(async () => {
  if (!token) {
    // Không có token → redirect hoặc báo lỗi
    throw createError({ statusCode: 400, message: 'Token không hợp lệ' })
  }

  try {
    const result = await $fetch('/api/auth/verify', {
      method: 'POST',
      body: { token }
    })
    auth.value = result
    // Verify thành công → redirect
    await navigateTo('/vi/trang-chu')
  } catch (error) {
    console.error('Verify thất bại', error)
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div>Verifying your email...</div>
  </div>
</template>
