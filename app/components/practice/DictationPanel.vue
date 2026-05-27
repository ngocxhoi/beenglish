<template>
  <div class="px-6 lg:px-10 pb-10 space-y-5">
    <div class="flex items-baseline justify-between border-b border-border pb-2">
      <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Chép chính tả
      </span>
      <button
        class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        @click="reveal = !reveal"
      >
        <Icon
          v-if="reveal"
          name="lucide:eye"
          class="w-3 h-3"
        />
        <Icon
          v-else
          name="lucide:eye-off"
          class="w-3 h-3"
        />
        {{ reveal ? "Ẩn đáp án" : "Hiện đáp án" }}
      </button>
    </div>

    <textarea
      ref="inputRef"
      v-model="value"
      placeholder="Gõ những gì bạn nghe được..."
      :rows="3"
      class="w-full p-4 bg-background border border-border focus:border-foreground outline-none text-lg leading-relaxed font-display resize-none transition-colors"
      @input="checked = false"
      @keydown="e => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCheck();
      }"
    />

    <div v-if="value.trim()">
      <div class="border border-border p-4 bg-card">
        <div class="flex items-baseline justify-between mb-2">
          <p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {{ correct
              ? "✓ Chính xác"
              : `${diff.correctCount}/${diff.totalWords} từ đúng` }}
          </p>
          <p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {{ Math.round((diff.correctCount / diff.totalWords) * 100) }}%
          </p>
        </div>
        <p class="text-base leading-relaxed font-display flex flex-wrap gap-x-1.5 gap-y-1">
          <span
            v-for="(p, i) in diff.parts"
            :key="i"
            :class="[
              'transition-colors',
              p?.typed === ''
                ? 'text-muted-foreground/60'
                : p.ok
                  ? 'text-success'
                  : 'text-destructive underline decoration-wavy underline-offset-4'
            ]"
          >
            {{ p?.typed === '' ? '•'.repeat(Math.max(2, p.word.length)) : p?.typed }}
          </span>
        </p>
      </div>

      <div
        v-if="reveal"
        class="border border-dashed border-border p-4 text-base leading-relaxed font-display text-muted-foreground"
      >
        {{ sentence.text }}
      </div>

      <div class="flex items-center justify-between gap-3 pt-2 border-t border-border">
        <button
          :disabled="!hasPrev"
          class="h-10 px-3 border border-border hover:border-foreground transition flex items-center gap-2 text-xs font-mono uppercase tracking-wider disabled:opacity-40"
          @click="onPrev"
        >
          <Icon
            name="lucide:chevron-left"
            class="w-4 h-4"
          /> Câu trước
        </button>
        <div class="flex items-center gap-2">
          <button
            class="h-10 px-5 bg-foreground text-background hover:bg-foreground/90 transition flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
            @click="handleCheck"
          >
            <Icon
              name="lucide:check"
              class="w-4 h-4"
            /> Kiểm tra
          </button>
          <button
            :disabled="!hasNext"
            class="h-10 px-3 border border-border hover:border-foreground transition flex items-center gap-2 text-xs font-mono uppercase tracking-wider disabled:opacity-40"
            @click="onNext"
          >
            Câu sau <Icon
              name="lucide:chevron-right"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sentence: Sentence
  onCorrect: () => void
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}>()

const value = ref('')
const checked = ref(false)
const reveal = ref(false)
const inputRef = ref<HTMLTextAreaElement | null>(null)

const handleCheck = () => {
  checked.value = true
  if (value.value.trim() === props.sentence.text.trim()) {
    props.onCorrect()
  }
}

const diff = computed(() => {
  return compare(value.value, props.sentence.text)
})

onMounted(() => {
  inputRef.value?.focus()
})
</script>
