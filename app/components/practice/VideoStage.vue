<template>
  <div class="p-6 lg:p-10">
    <div class="relative xl:w-2/3 2xl:w-1/2 mx-auto aspect-video bg-foreground/95 text-background overflow-hidden border border-border">
      <iframe
        src="https://www.youtube.com/watch?v=Gct6PU-D5qw"
        class="w-full h-full"
        frameborder="0"
      />
      <span class="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest opacity-80">
        Câu {{ String(index + 1).padStart(2, "0") }} / {{ String(total).padStart(2, "0") }}
      </span>
      <span class="absolute top-3 right-3 font-mono text-[10px] opacity-80">
        {{ fmt(t) }} / {{ fmt(dur) }}
      </span>
    </div>

    <div class="mt-4 flex items-center gap-2">
      <button
        class="h-9 px-3 border border-border hover:border-foreground transition flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
        @click="() => { t=0; playing=true; }"
      >
        <Icon
          name="lucide:rotate-cw"
          class="w-3.5 h-3.5"
        /> Nghe lại
      </button>
      <button
        class="h-9 px-3 border border-border hover:border-foreground transition flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
        @click="() => { playing = !playing }"
      >
        <Icon
          :name="playing ? 'lucide:pause' : 'lucide:play'"
          class="w-3.5 h-3.5"
        />
        {{ playing ? "Tạm dừng" : "Phát" }}
      </button>
      <div class="flex-1 h-1 bg-border relative">
        <div
          class="absolute inset-y-0 left-0 bg-foreground"
          :style="{ width: `${(t / dur) * 100}%` }"
        />
      </div>
      <Icon
        name="lucide:volume-2"
        class="w-4 h-4 text-muted-foreground"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sentence: Sentence
  index: number
  total: number
}>()

const { sentence } = toRefs(props)

const playing = ref(false)
const t = ref(0)
const dur = computed(() => (sentence.value?.end || 0) - (sentence.value?.start || 0))

watch(sentence, () => {
  playing.value = false
  t.value = 0
})

watch([playing, dur], () => {
  // TODO: implement video playback
  if (!playing.value) return
  const id = setInterval(() => {
    if (t.value > dur.value) {
      playing.value = false

      return t.value = dur.value
    }
    return t.value + 0.1
  }, 100)
  return () => clearInterval(id)
})
</script>
