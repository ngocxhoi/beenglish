export const TOPICS = [
  'Daily Life', 'Travel', 'Business', 'Food', 'Technology',
  'Science', 'Culture', 'Sports', 'Health', 'News'
]

const titles = [
  'The future of food',
  'Daily small talk at the office',
  'Travel essentials for backpackers',
  'Job interview tips that work',
  'How AI is changing the world',
  'Healthy morning routines',
  'World news in 6 minutes',
  'Climate change explained',
  'Coffee culture around the globe',
  'The art of negotiation',
  'Sleep science basics',
  'Marathon training for beginners',
  'Street food in Tokyo',
  'Remote work productivity',
  'Space exploration today',
  'Mindfulness for busy people',
  'History of the internet',
  'Public speaking confidence',
  'Cooking on a budget',
  'Sustainable fashion guide'
]

export function makeVideos(seed: number, count = 24): Video[] {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'] as const
  return Array.from({ length: count }, (_, i) => {
    const k = (i + seed) * 7
    return {
      id: `v-${seed}-${i}`,
      title: titles[(i + seed) % titles.length],
      level: levels[(k) % levels.length],
      topic: TOPICS[(k * 3) % TOPICS.length],
      minutes: 3 + ((k * 5) % 12),
      progress: i < 4 ? [3, 0, 12, 0][i] : 0
    } as Video
  })
}

export function getVideo(mode: 'dictation' | 'shadowing', id: string): Video | undefined {
  const seed = mode === 'dictation' ? 1 : 2
  return makeVideos(seed, 28).find(v => v.id === id)
}

const SAMPLE_SENTENCES = [
  'Good morning everyone, and welcome back to the show.',
  'Today we are going to talk about a topic that affects all of us.',
  'It might sound simple, but the details really matter.',
  'Let me give you a quick example from my own experience.',
  'A few years ago, I was working on a very challenging project.',
  'I realized that small habits make a huge difference over time.',
  'Consistency is more important than intensity in most cases.',
  'If you stay curious, you keep learning every single day.',
  'Thanks for listening, and I will see you in the next episode.',
  'Don\'t forget to share this with a friend who might enjoy it.'
]

export function makeSentences(videoId: string, count = 10): Sentence[] {
  let h = 0
  for (let i = 0; i < videoId.length; i++) h = (h * 31 + videoId.charCodeAt(i)) | 0
  return Array.from({ length: count }, (_, i) => {
    const start = i * 6 + (Math.abs(h + i) % 3)
    return {
      index: i,
      start,
      end: start + 5,
      text: SAMPLE_SENTENCES[(i + Math.abs(h)) % SAMPLE_SENTENCES.length]
    } as Sentence
  })
}

export function parseSrt(content: string): Sentence[] {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)

  return blocks.map((block, index) => {
    const lines = block.trim().split('\n')

    if (!lines[0]) {
      return {
        index,
        start: '',
        end: '',
        text: ''
      } as Sentence
    }

    const start = lines[0].trim()
    const text = lines.slice(1).join(' ').trim()

    return {
      index,
      start,
      end: blocks[index + 1]
        // @ts-expect-error - blocks[index + 1] might be undefined
        ? blocks[index + 1].trim().split('\n')[0].trim()
        : start,
      text
    } as Sentence
  })
}
