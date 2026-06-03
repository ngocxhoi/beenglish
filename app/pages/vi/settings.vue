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
                  src="/image/572271604_17881803291408342_7662276147923267962_n_2SCpy3w4c.jpg"
                  :alt="initials || 'Benjamin Canac'"
                  size="xl"
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
                    class="w-full [&_input]:w-full"
                  />
                </UFormField>
              </div>
              <div class="space-y-2">
                <UFormField label="URL ảnh đại diện">
                  <UFileUpload
                    v-model="file"
                    color="neutral"
                    highlight
                    label="Drop your image here"
                    description="SVG, PNG, JPG or GIF (max. 2MB)"
                    class="w-96 min-h-48"
                    accept="image/*"
                  />
                </UFormField>
                <UProgress
                  v-if="progress > 0"
                  v-model="progress"
                />
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
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError
} from '@imagekit/vue'

definePageMeta({
  middleware: 'auth',
  auth: true
})
const toast = useToast()
const user = useAuth()

const file = ref<File | null>(null)
const displayName = ref('')
const newPassword = ref('')
const pwLoading = ref(false)
const progress = ref(0)

const aborter = new AbortController()
const initials = computed(() => (displayName.value || user.value?.email || 'U').slice(0, 2).toUpperCase())

const signOut = () => {}

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

const authenticate = async () => {
  const res = await $fetch('/api/auth/imagekit')
  return res as {
    signature: string
    expire: number
    token: string
    publicKey: string
  }
}

const handleSave = async () => {
  if (!file.value) return toast.add({
    title: 'ADD A IMAGE',
    color: 'warning',
    icon: 'lucide:triangle-alert'
  })

  let creds
  try {
    creds = await authenticate()
  } catch (error) {
    toast.add({
      title: handleMessageError((error as Error).message) || 'Lỗi khi tải ảnh lên',
      icon: 'lucide:triangle-alert',
      color: 'error'
    })
  }

  if (!creds) return toast.add({
    title: 'Failed to get authentication credentials',
    icon: 'lucide:octagon-x',
    color: 'error'
  })

  try {
    const resp = await upload({
      publicKey: creds.publicKey,
      signature: creds.signature,
      expire: creds.expire,
      token: creds.token,
      file: file.value,
      fileName: file.value.name,
      folder: '/image',
      onProgress: e => (progress.value = e.loaded / e.total * 100),
      abortSignal: aborter.signal
    })

    toast.add({
      title: resp.message || 'Đã hoàn thành upload ảnh!',
      icon: 'lucide:circle-check',
      color: 'success'
    })
  } catch (err) {
    if (err instanceof ImageKitAbortError) console.warn('Aborted')
    else if (err instanceof ImageKitInvalidRequestError) console.error('Bad request')
    else if (err instanceof ImageKitUploadNetworkError) console.error('Network')
    else if (err instanceof ImageKitServerError) console.error('Server side')
    else console.error(err)
  } finally {
    progress.value = 0
    file.value = null
  }
}

onMounted(() => {
  displayName.value = initials.value
})
</script>
