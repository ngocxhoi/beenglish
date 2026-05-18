<template>
  <div class="flex w-full justify-between items-center">
    <NuxtLink to="/">
      <p class="text-lg font-bold">
        Logo
      </p>
    </NuxtLink>
    <UButton
      icon="i-lucide-panel-left"
      color="neutral"
      variant="ghost"
      aria-label="Toggle sidebar"
      class="cursor-pointer"
      @click="$emit('collapse')"
    />
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'collapse'): void
}>()
</script>
