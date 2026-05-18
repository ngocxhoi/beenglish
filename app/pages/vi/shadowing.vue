<template>
  <NuxtLayout name="custom">
    <PracticeListing
      mode="shadowing"
      tagline="№.002 — Practice / Shadowing"
      description="Lặp lại theo người bản xứ ngay khi họ nói — bài tập mạnh nhất để cải thiện phát âm, ngữ điệu và sự tự nhiên."
      :topics="TOPICS"
      :videos="makeVideos(2, 28)"
    >
      <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
        Nói theo.<br><span className="text-muted-foreground">Bắt chước bản xứ.</span>
      </h1>
    </PracticeListing>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { TOPICS, makeVideos } from '#shared/data'

useSeoMeta({
  title: 'Shadowing'
})
</script>
