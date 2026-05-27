<template>
  <main class="flex-1 min-w-0">
    <header class="h-20 px-6 lg:px-10 flex items-center border-b border-border">
      <nav class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <NuxtLink
          to="/"
          class="hover:text-foreground"
        >Trang chủ</NuxtLink>
        <span>/</span>
        <span class="text-foreground">{{ mode === "dictation" ? "Dictation" : "Shadowing" }}</span>
      </nav>
    </header>

    <div class="px-6 lg:px-10 py-10 space-y-10 w-full">
      <!-- {/* Hero */} -->
      <section class="border-b border-border pb-10">
        <div class="flex items-baseline gap-3 mb-4">
          <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {{ tagline }}
          </span>
          <span class="flex-1 h-px bg-border" />
          <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {{ videos.length }} video
          </span>
        </div>

        <slot />

        <p class="mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {{ description }}
        </p>
      </section>

      <!-- {/* Filters */} -->
      <section class="space-y-4">
        <!-- {/* Search + level */} -->
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
            <Icon
              name="lucide:search"
              class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              v-model="query"
              placeholder="Tìm theo tiêu đề..."
              class="w-full h-11 pl-10 pr-3 bg-background border border-border focus:border-foreground outline-none text-sm transition-colors"
            >
          </div>
          <div class="flex gap-1 border border-border">
            <button
              v-for="l in ['ALL', ...LEVELS]"
              :key="l"
              :class="[
                `h-11 px-3.5 text-xs font-mono font-medium uppercase tracking-widest transition-colors`,
                level === l ? 'bg-foreground text-background' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              ]"
              @click="level = l"
            >
              {{ l === "ALL" ? "Tất cả" : l }}
            </button>
          </div>
        </div>

        <!-- {/* Topics */} -->
        <div class="flex items-start gap-3 flex-wrap">
          <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-1.5">
            Chủ đề →
          </span>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="t in ['ALL', ...topics]"
              :key="t"
              :class="['h-7 px-2.5 text-[11px] font-medium uppercase tracking-wider border transition-colors',
                       topic === t
                         ? 'border-foreground bg-foreground text-background'
                         : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              ]"
              @click="topic = t"
            >
              {{ t === "ALL" ? "Tất cả" : t }}
            </button>
          </div>
        </div>
      </section>

      <!-- {/* Empty state */} -->
      <div
        v-if="filtered.length == 0"
        class="border border-dashed border-border py-20 text-center"
      >
        <p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Không có kết quả
        </p>
        <p class="font-display text-xl font-bold mt-2">
          Thử bộ lọc khác nhé
        </p>
      </div>

      <!-- {/* Sections by level */} -->
      <section
        v-for="([lv, items], idx) in byLevel"
        :key="lv"
      >
        <div class="flex items-baseline justify-between mb-5 pb-3 border-b border-foreground">
          <div class="flex items-baseline gap-3">
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              №.{{ String(idx + 1).padStart(3, "0") }}
            </span>
            <h2 class="font-display text-2xl font-bold">
              Cấp độ {{ lv }}
            </h2>
            <span class="font-mono text-xs text-muted-foreground">— {{ items.length }} video</span>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <PracticeListingVideoCard
            v-for="v in items"
            :key="v.id"
            :v="v"
          />
        </div>
      </section>

      <footer class="pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span class="font-mono uppercase tracking-wider">© {{ new Date().getFullYear() }} Senglish</span>
        <span class="font-mono uppercase tracking-wider">{{ mode === "dictation" ? "Dictation practice" : "Shadowing practice" }}</span>
      </footer>
    </div>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps<{
  mode: 'dictation' | 'shadowing'
  tagline: string
  description: string
  topics: string[]
  videos: Video[]
}>()

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

const level = ref<string>('ALL')
const topic = ref<string>('ALL')
const query = ref<string>('')

const filtered = computed(() => {
  return props.videos.filter(v =>
    (level.value === 'ALL' || v.level === level.value)
    && (topic.value === 'ALL' || v.topic === topic.value)
    && (query.value.trim() === '' || v.title.toLowerCase().includes(query.value.toLowerCase()))
  )
})

const byLevel = computed(() => {
  const map = new Map<string, Video[]>()
  for (const v of filtered.value) {
    if (!map.has(v.level)) map.set(v.level, [])
    map.get(v.level)!.push(v)
  }
  return [...map.entries()].sort(([a], [b]) => LEVELS.indexOf(a) - LEVELS.indexOf(b))
})
</script>
