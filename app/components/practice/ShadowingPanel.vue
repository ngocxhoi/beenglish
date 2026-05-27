<template>
  <div />
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

const { sentence } = toRefs(props)

const transcript = ref('')
const interim = ref('')
const listening = ref(false)
const error = ref<string | null>(null)
const recordRef = ref<never>(null)

const SpeechRecognition
  = typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window).webkitSpeechRecognition
    : null

const supported = computed(() => !!SpeechRecognition)

const diff = computed(() => {
  return compare(transcript.value, props.sentence.text)
})

const allCorrect = computed(() => diff.value.every(d => d.type === 'equal'))

const targetWords = computed(() => sentence.value.text.split(/\s+/))

function stopRec() {
  try { recordRef.value?.stop() } catch { /* noop */ }
  recordRef.value = null
  listening.value = false
  interim.value = ''
}

const start = () => {
  if (!supported.value) {
    setError('Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome/Edge.')
    return
  }
  try {
    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.continuous = true
    rec.interimResults = true
    rec.onresult = (e: any) => {
      let finalT = ''
      let interimT = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) finalT += r[0].transcript + ' '
        else interimT += r[0].transcript
      }
      if (finalT) setTranscript(prev => (prev + ' ' + finalT).trim())
      setInterim(interimT)
    }
    rec.onerror = (e: any) => {
      setError(
        e.error === 'not-allowed'
          ? 'Không truy cập được microphone. Vui lòng cấp quyền.'
          : `Lỗi nhận diện: ${e.error}`
      )
      setListening(false)
    }
    rec.onend = () => {
      setListening(false)
      setInterim('')
    }
    rec.start()
    recogRef.current = rec
    setListening(true)
    setError(null)
  } catch (err: any) {
    setError(err?.message || 'Không khởi động được micro.')
  }
}

const reset = () => {
  stopRec()
  setTranscript('')
  setInterim('')
}

watch(sentence, () => {
  transcript.value = ''
  interim.value = ''
  error.value = null
  stopRec()
})
</script>
