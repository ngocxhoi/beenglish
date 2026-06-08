<template>
  <div>
    <UFileUpload
      v-model="file"
      color="neutral"
      highlight
      label="Drop your image here"
      description="SVG, PNG, JPG or GIF (max. 2MB)"
      class="w-96 min-h-48"
      accept="image/*"
    />

    <UProgress
      v-if="progress > 0"
      v-model="progress"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError
} from '@imagekit/vue'

const file = ref<File | null>(null)
const progress = ref(0)

const toast = useToast()
const { setProfile } = useGlobalStore()
const aborter = new AbortController()

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
  if (!file.value) return

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

    await $fetch('/api/user/profile', {
      method: 'POST',
      body: {
        url: resp.filePath
      }
    })

    setProfile(resp.filePath || null)

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

defineExpose({
  file,
  handleSave
})
</script>
