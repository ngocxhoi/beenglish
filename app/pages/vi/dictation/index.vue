<template>
  <NuxtLayout name="custom">
    <PracticeListing
      mode="dictation"
      tagline="№.001 — Practice / Dictation"
      description="Luyện nghe chép chính tả từng câu — cải thiện kỹ năng nghe chi tiết, chính tả và phản xạ với tiếng Anh tự nhiên."
      :videos="videos"
    >
      <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
        Nghe và chép.<br><span className="text-muted-foreground">Từng câu một.</span>
      </h1>
    </PracticeListing>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
  auth: true
})
useSeoMeta({
  title: 'Dictation'
})

const { data } = await useFetch<{ videos: VideoResult[] }>('/api/drizzle/dictation/all')

const videos = computed(() => {
  return data.value?.videos.reduce((acc, video) => {
    acc.push({
      id: video.id,
      title: video.title,
      level: video.level,
      topic: video.topic,
      minutes: Math.ceil(video.durationSeconds / 60),
      progress: video.completedSentences && video.totalSentences ? (video.completedSentences / video.totalSentences) * 100 : 0,
      isCompleted: video.isCompleted ?? false,
      videoUrl: video.videoUrl ?? ''
    })
    return acc
  }, [] as Video[])
})
</script>
