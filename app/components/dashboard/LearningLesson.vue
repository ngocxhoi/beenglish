<template>
  <section>
    <div class="flex items-baseline justify-between mb-5 pb-3 border-b border-foreground">
      <div class="flex items-baseline gap-3">
        <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">№.002</span>
        <h2 class="font-display text-2xl font-bold">
          Tiếp tục học Dictation
        </h2>
      </div>
      <button class="font-mono text-[10px] uppercase tracking-wider hover:underline">
        Xem tất cả →
      </button>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <article
        v-for="c in lessons.dictationLesson"
        :key="c.t"
        class="group border border-border hover:border-foreground transition cursor-pointer"
      >
        <div class="aspect-video bg-muted relative border-b border-border overflow-hidden">
          <div class="absolute inset-0 grid place-items-center">
            <div class="w-12 h-12 border border-foreground bg-background grid place-items-center group-hover:bg-foreground group-hover:text-background transition">
              <Icon
                name="lucide:play"
                class="w-4 h-4 fill-current"
              />
            </div>
          </div>
          <span class="absolute top-2 left-2 font-mono text-[10px] font-bold px-1.5 py-0.5 bg-foreground text-background">
            {{ c.lvl }}
          </span>
          <span class="absolute bottom-2 right-2 font-mono text-[10px] px-1.5 py-0.5 bg-background border border-border">
            {{ c.min }} phút
          </span>
        </div>
        <div class="p-3">
          <p class="font-display text-sm font-bold line-clamp-2 leading-snug">
            {{ c.t }}
          </p>
          <div class="mt-3 flex items-center justify-between">
            <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {{ c.p }}% hoàn thành
            </span>
            <Icon
              name="lucide:arrow-up-right"
              class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100"
            />
          </div>
          <div class="mt-2 h-px bg-border relative">
            <div
              class="absolute inset-y-0 left-0 bg-foreground"
              :style="{ width: `${c.p}%` }"
            />
          </div>
        </div>
      </article>
    </div>
  </section>

  <section>
    <div class="flex items-baseline justify-between mb-5 pb-3 border-b border-foreground">
      <div class="flex items-baseline gap-3">
        <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">№.003</span>
        <h2 class="font-display text-2xl font-bold">
          Tiếp tục học Shadowing
        </h2>
      </div>
      <button class="font-mono text-[10px] uppercase tracking-wider hover:underline">
        Xem tất cả →
      </button>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <article
        v-for="c in lessons.shadowLesson"
        :key="c.t"
        class="group border border-border hover:border-foreground transition cursor-pointer"
      >
        <div class="aspect-video bg-muted relative border-b border-border overflow-hidden">
          <div class="absolute inset-0 grid place-items-center">
            <div class="w-12 h-12 border border-foreground bg-background grid place-items-center group-hover:bg-foreground group-hover:text-background transition">
              <Icon
                name="lucide:play"
                class="w-4 h-4 fill-current"
              />
            </div>
          </div>
          <span class="absolute top-2 left-2 font-mono text-[10px] font-bold px-1.5 py-0.5 bg-foreground text-background">
            {{ c.lvl }}
          </span>
          <span class="absolute bottom-2 right-2 font-mono text-[10px] px-1.5 py-0.5 bg-background border border-border">
            {{ c.min }} phút
          </span>
        </div>
        <div class="p-3">
          <p class="font-display text-sm font-bold line-clamp-2 leading-snug">
            {{ c.t }}
          </p>
          <div class="mt-3 flex items-center justify-between">
            <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {{ c.p }}% hoàn thành
            </span>
            <Icon
              name="lucide:arrow-up-right"
              class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100"
            />
          </div>
          <div class="mt-2 h-px bg-border relative">
            <div
              class="absolute inset-y-0 left-0 bg-foreground"
              :style="{ width: `${c.p}%` }"
            />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: DataDashboard | undefined
}>()

export type Lesson = {
  t: string
  lvl: string
  min: number
  p: number
}

const lessons = computed(() => {
  return (
    props.data?.continueLesson.reduce(
      (acc, lesson) => {
        const item: Lesson = {
          t: lesson.videos.title,
          lvl: lesson.videos.level,
          min: lesson.videos.durationSeconds,
          p: lesson.video_progress.accuracyPct
        }

        if (lesson.video_progress.mode === 'dictation') {
          acc.dictationLesson.push(item)
        }

        if (lesson.video_progress.mode === 'shadowing') {
          acc.shadowLesson.push(item)
        }

        return acc
      },
      {
        dictationLesson: [] as Lesson[],
        shadowLesson: [] as Lesson[]
      }
    ) ?? {
      dictationLesson: [],
      shadowLesson: []
    }
  )
})
</script>
