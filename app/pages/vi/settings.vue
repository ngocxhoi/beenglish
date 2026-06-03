<template>
  <NuxtLayout name="custom">
    <main class="flex-1 min-h-screen">
      <div class="mx-auto px-6 lg:px-10 py-10 space-y-10">
        <header class="space-y-2">
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Tài khoản / Cài đặt
          </p>
          <h1 class="font-display text-4xl tracking-tight">
            Cài đặt người dùng
          </h1>
          <p class="text-muted-foreground text-sm">
            Quản lý thông tin hồ sơ, bảo mật và phiên đăng nhập.
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- {/* Profile */} -->
          <section class="border border-border p-6 space-y-6">
            <div class="flex items-center gap-2">
              <Icon
                name="lucide:user"
                class="w-4 h-4"
              />
              <h2 class="font-medium">
                Hồ sơ
              </h2>
            </div>

            <div class="flex items-center gap-4">
              <UTooltip text="Benjamin Canac">
                <UAvatar
                  provider="imagekit"
                  :src="user?.profile"
                  :alt="user?.name || formatUserEmail(user!.email)?.slice(0, 2)"
                  size="3xl"
                  loading="lazy"
                />
              </UTooltip>
              <div class="text-sm text-muted-foreground">
                <p class="font-mono text-[10px] uppercase tracking-wider">
                  Email
                </p>
                <p class="text-foreground">
                  {{ user?.email }}
                </p>
              </div>
            </div>

            <div class="grid gap-4">
              <div class="space-y-2">
                <UFormField
                  label="Tên hiển thị"
                >
                  <UInput
                    id="display_name"
                    v-model="displayName"
                    :maxlength="80"
                    class="w-full [&_input]:w-full capitalize"
                  />
                </UFormField>
              </div>
              <div class="space-y-2">
                <UFormField label="URL ảnh đại diện">
                  <SettingProfileUpload ref="profileUploadRef" />
                </UFormField>
              </div>
            </div>

            <section class="border border-border p-6 space-y-6">
              <div class="flex items-center gap-2">
                <Icon
                  name="lucide:key-round"
                  class="w-4 h-4"
                />
                <h2 class="font-medium">
                  Đổi mật khẩu
                </h2>
              </div>
              <div class="space-y-2">
                <UFormField label="Mật khẩu mới">
                  <UInput
                    id="new_password"
                    v-model="newPassword"
                    type="password"
                    placeholder="Tối thiểu 6 ký tự"
                    class="w-full [&_input]:w-full"
                  />
                </UFormField>
              </div>
              <div class="flex justify-end">
                <UButton
                  variant="outline"
                  :disabled="pwLoading || !newPassword"
                  @click="handlePassword"
                >
                  {{ pwLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu" }}
                </UButton>
              </div>
            </section>

            <div class="flex justify-end">
              <UButton
                label="Lưu thay đổi"
                icon="lucide:save"
                @click="handleSave()"
              />
            </div>
          </section>

          <!-- {/* Session */} -->
          <section class="border border-border p-6 space-y-4 h-fit">
            <div class="flex items-center gap-2">
              <Icon
                name="lucide:log-out"
                class="w-4 h-4"
              />
              <h2 class="font-medium">
                Phiên đăng nhập
              </h2>
            </div>
            <p class="text-sm text-muted-foreground">
              Đăng xuất khỏi thiết bị hiện tại.
            </p>
            <div class="flex justify-end">
              <UButton
                variant="ghost"
                color="error"
                @click="signOut()"
              >
                <Icon
                  name="lucide:log-out"
                  class="w-4 h-4"
                /> Đăng xuất
              </UButton>
            </div>
          </section>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  auth: true
})

const toast = useToast()
const user = useAuth()

const displayName = ref('')
const newPassword = ref('')
const pwLoading = ref(false)
const profileUploadRef = ref<{
  file: File | null
  handleSave: () => Promise<void>
} | null>(null)

const signOut = () => {}

const handleSave = async () => {
  try {
    const promises = []
    if (displayName.value.trim() !== user.value?.name) {
      const promise = $fetch('/api/user/name', {
        method: 'POST',
        body: {
          newName: displayName.value
        }
      })
      promises.push(promise)
    }

    if (profileUploadRef.value?.file) {
      const promise = profileUploadRef.value.handleSave()
      promises.push(promise)
    }

    await Promise.all(promises)

    user.value!.name = displayName.value
  } catch (error) {
    console.error('Error saving profile:', error)
    toast.add({
      title: error instanceof Error ? error.message : 'Có lỗi xảy ra',
      icon: 'lucide:octagon-alert',
      color: 'error'
    })
  }
}

const handlePassword = async () => {
  if (newPassword.value.length < 6) {
    toast.add({
      title: 'Mật khẩu tối thiểu 6 ký tự',
      icon: 'lucide:triangle-alert',
      color: 'error'
    })
    return
  }
  pwLoading.value = true

  // UPdate User password
  const error = {
    message: 'error'
  }

  pwLoading.value = false
  if (error) {
    toast.add({
      title: error.message,
      icon: 'lucide:triangle-alert',
      color: 'error'
    })
  } else {
    toast.add({
      title: 'Đã đổi mật khẩu',
      icon: 'lucide:circle-check',
      color: 'success'
    })
    newPassword.value = ''
  }
}

onMounted(() => {
  displayName.value = user.value?.name || formatUserEmail(user.value!.email) || ''
})
</script>
