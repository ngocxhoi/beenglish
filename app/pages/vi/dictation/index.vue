<template>
  <NuxtLayout name="custom">
    <PracticeListing
      mode="dictation"
      tagline="№.001 — Practice / Dictation"
      description="Luyện nghe chép chính tả từng câu — cải thiện kỹ năng nghe chi tiết, chính tả và phản xạ với tiếng Anh tự nhiên."
      :topics="TOPICS"
      :videos="makeVideos(1, 28)"
    >
      <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
        Nghe và chép.<br><span className="text-muted-foreground">Từng câu một.</span>
      </h1>
    </PracticeListing>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { TOPICS, makeVideos } from '#shared/data'

definePageMeta({
  middleware: ['auth'],
  auth: true
})
useSeoMeta({
  title: 'Dictation'
})
</script>
