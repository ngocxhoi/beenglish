<template>
  <NuxtLayout name="auth">
    <template #title>
      <h1 class="font-display text-4xl tracking-tight mt-2">
        Đăng nhập
      </h1>
      <p class="text-sm text-muted-foreground mt-2 mb-8">
        Tiếp tục hành trình của bạn
      </p>
    </template>

    <UForm
      :schema="schemaLogin"
      :state="credential"
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <UFormField
        label="Email"
        name="email"
        required
      >
        <input
          id="email"
          v-model="credential.email"
          type="email"
          class="w-full h-10 ring-1 rounded-none border-x-0 border-t-0 border-b-foreground/20 focus-visible:border-foreground focus-visible:ring-0 px-2"
        >
      </UFormField>
      <UFormField
        label="Password"
        name="password"
        required
      >
        <input
          id="password"
          v-model="credential.password"
          type="password"
          class="w-full h-10 ring-1 rounded-none border-x-0 border-t-0 border-b-foreground/20 focus-visible:border-foreground focus-visible:ring-0 px-2"
        >
      </UFormField>
      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50"
      >
        {{ loading ? "Đang xử lý…" : "Đăng nhập" }}
      </button>
    </UForm>

    <div class="flex items-center gap-3 my-6">
      <div class="flex-1 h-px bg-border" />
      <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">hoặc</span>
      <div class="flex-1 h-px bg-border" />
    </div>

    <button
      :disabled="loading"
      class="w-full py-3 border border-foreground/20 hover:border-foreground transition flex items-center justify-center gap-2 disabled:opacity-50"
      @click="handleGoogle"
    >
      <Icon name="mdi:google" />
      <span class="text-sm">Tiếp tục với Google</span>
    </button>

    <p class="mt-8 text-sm text-muted-foreground text-center">
      Chưa có tài khoản?{{ " " }}
      <NuxtLink
        to="/vi/auth/signup"
        class="text-foreground underline underline-offset-4"
      >Đăng ký</NuxtLink>
    </p>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import { schemaLogin, type SchemaLogin } from '#shared/utils/zod'
import { handleMessageError } from '~~/shared/utils/format'

definePageMeta({
  middleware: ['auth'],
  guest: true
})

const credential = reactive<Partial<SchemaLogin>>({
  email: undefined,
  password: undefined
})
const loading = ref(false)

const toast = useToast()
const { setAuth } = useGlobalStore()
const route = useRoute()

const handleSubmit = async (event: FormSubmitEvent<SchemaLogin>) => {
  try {
    loading.value = true
    // TODO: implement login logic
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data
    })

    setAuth(response)

    toast.add({
      title: 'Đăng nhập thành công',
      description: 'Bạn đã đăng nhập thành công',
      icon: 'lucide:circle-check',
      color: 'success'
    })

    await navigateTo({
      path: route.query.redirect as string || '/vi/trang-chu'
    })
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Đăng nhập thất bại',
      description: handleMessageError((error as Error).message),
      icon: 'lucide:octagon-x',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const handleGoogle = async () => {
  loading.value = true

  // TODO: implement google login logic
  loading.value = false
  toast.add({
    title: 'Đăng nhập thành công',
    description: 'Bạn đã đăng nhập thành công',
    icon: 'lucide:circle-check',
    color: 'success'
  })
  navigateTo('/vi/trang-chu')
}
</script>
