<template>
  <NuxtLayout name="custom">
    <main
      v-if="video"
      class="flex flex-col h-screen max-h-screen"
    >
      <header class="h-20 px-6 lg:px-10 flex items-center justify-between border-b border-border">
        <nav class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <NuxtLink
            to="/"
            class="hover:text-foreground"
          >Trang chủ</NuxtLink>
          <span>/</span>
          <NuxtLink
            :to="mode === 'dictation' ? '/vi/dictation' : '/vi/shadowing'"
            class="hover:text-foreground"
          >
            {{ mode === "dictation" ? "Dictation" : "Shadowing" }}
          </NuxtLink>
          <span>/</span>
          <NuxtLink
            to="#"
            class="hover:text-foreground"
          >{{ video?.title }}</NuxtLink>
          <span>/</span>
        </nav>
      </header>

      <div class="px-6 lg:px-10 py-6 border-b border-border flex items-start justify-between gap-6">
        <div
          v-if="video"
          class="min-w-0"
        >
          <div class="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <NuxtLink
              :to="mode === 'dictation' ? '/vi/dictation' : '/vi/shadowing'"
              class="flex items-center gap-1 hover:text-foreground"
            >
              <Icon
                name="lucide:arrow-left"
                class="w-3 h-3"
              /> Quay lại
            </NuxtLink>
            <span>·</span>
            <span>{{ video.level }}</span>
            <span>·</span>
            <span>{{ video.topic }}</span>
            <span>·</span>
            <span>{{ video.minutes }} phút</span>
          </div>
          <h1 class="font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            {{ video.title }}
          </h1>
        </div>
        <div class="hidden md:flex flex-col items-end shrink-0">
          <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Tiến độ
          </span>
          <span class="font-display text-2xl font-bold">
            {{ completed.size }}<span class="text-muted-foreground">/{{ sentences.length }}</span>
          </span>
        </div>
      </div>

      <div class="flex-1 grid lg:grid-cols-[1fr_340px] min-h-0">
        <div class="border-b lg:border-b-0 lg:border-r border-border">
          <PracticeVideoStage
            :sentence="(sentence as Sentence)"
            :index="current"
            :total="sentences.length"
          />

          <template v-if="mode === 'dictation'">
            <PracticeDictationPanel
              :key="`d-${current}`"
              :sentence="(sentence as Sentence)"
              :on-correct="() => {}"
              :on-next="() => {}"
              :on-prev="() => {}"
              :has-next="false"
              :has-prev="false"
            />
          </template>

          <template v-else>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde iure doloremque maiores! Excepturi mollitia, id qui voluptatem laboriosam delectus dolorem accusamus animi? Quibusdam doloremque earum recusandae error et rem harum.
            <!-- <PracticeShadowingPanel
              :key="`s-${current}`"
              :sentence="sentence"
              :on-done="markDone"
              :on-next="next"
              :on-prev="prev"
              :has-next="current < sentences.length - 1"
              :has-prev="current > 0"
            /> -->
          </template>
        </div>

        <aside class="bg-card overflow-y-scroll min-h-0">
          <div class="px-5 py-4 border-b border-border flex items-baseline justify-between">
            <h2 class="font-display font-bold">
              Câu
            </h2>
            <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {{ sentences.length }} câu
            </span>
          </div>
          <ul class="divide-y divide-border">
            <li
              v-for="s in sentences"
              :key="s.index"
            >
              <button
                :class="[
                  'w-full text-left px-5 py-3 flex gap-3 items-start transition-colors border-l-2',
                  s.index === current
                    ? 'border-foreground bg-muted'
                    : 'border-transparent hover:bg-muted/60'
                ]"
                @click="current = s.index"
              >
                <span
                  :class="[
                    'font-mono text-[10px] mt-0.5 w-6 shrink-0',
                    completed.has(s.index) ? 'text-foreground' : 'text-muted-foreground'
                  ]"
                >
                  <Icon
                    v-if="completed.has(s.index)"
                    name="lucide:check"
                    class="w-3 h-3"
                  />
                  <span v-else>{{ String(s.index + 1).padStart(2, "0") }}</span>
                </span>
                <div class="min-w-0 flex-1">
                  <p
                    class="[
                            'text-sm leading-snug line-clamp-2',
                            s.index === current ? 'font-medium' : 'text-muted-foreground',
                          ]"
                  >
                    {{ completed.has(s.index) || s.index === current ? s.text : "•••••• •••••• ••••••" }}
                  </p>
                  <p class="font-mono text-[10px] mt-1 text-muted-foreground">
                    {{ s.start }} → {{ s.end }}
                  </p>
                </div>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </main>

    <div
      v-else
      class="min-h-screen grid place-items-center p-10 text-center"
    >
      <div>
        <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 class="font-display text-3xl font-bold mt-2">
          Không tìm thấy video
        </h1>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getVideo, parseSrt } from '#shared/data/video-data'
import { textSub } from '#shared/data//static/sentences'

const sentences = ref<Sentence[]>([])

const current = ref(0)
const completed = ref<Set<number>>(new Set())
const sentence = ref(sentences.value[0])

const video = ref<Video | undefined>(undefined)
const mode = ref<'dictation' | 'shadowing'>('dictation')

onMounted(() => {
  video.value = getVideo(mode.value, 'v-1-1')
  sentences.value = parseSrt(textSub)
  console.log(sentences.value)
})
</script>
