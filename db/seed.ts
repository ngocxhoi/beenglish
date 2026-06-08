// seed.ts

import { faker } from '@faker-js/faker'
import 'dotenv/config'
import { db } from '../db'

import {
  users,
  accounts,
  videos,
  sentences,
  userStats,
  sentenceProgress,
  sentenceAttempts,
  videoProgress,
  vocabulary
} from './schema'
import { sql } from 'drizzle-orm'

faker.seed(2026)

const sentenceBank = [
  'Hello and welcome to our lesson.',
  'How are you doing today?',
  'I usually wake up at six o clock.',
  'She likes drinking coffee in the morning.',
  'We are going to the supermarket.',
  'Can you help me with this task?',
  'I would like to order a sandwich.',
  'The weather is very nice today.',
  'Thank you for your time.',
  'I will see you tomorrow.',
  'This project is almost finished.',
  'We need to discuss the budget.',
  'The meeting starts at nine.',
  'Could you repeat that please?',
  'I am learning English every day.',
  'Practice makes perfect.',
  'Consistency is the key to success.',
  'Lets review what we learned.',
  'That sounds like a great idea.',
  'Have a wonderful day.'
]

const vocabularyPool = [
  ['routine', 'thói quen'],
  ['coffee', 'cà phê'],
  ['meeting', 'cuộc họp'],
  ['budget', 'ngân sách'],
  ['project', 'dự án'],
  ['weather', 'thời tiết'],
  ['travel', 'du lịch'],
  ['airport', 'sân bay'],
  ['practice', 'luyện tập'],
  ['success', 'thành công'],
  ['family', 'gia đình'],
  ['career', 'sự nghiệp'],
  ['business', 'kinh doanh'],
  ['hotel', 'khách sạn'],
  ['doctor', 'bác sĩ'],
  ['schedule', 'lịch trình'],
  ['customer', 'khách hàng'],
  ['manager', 'quản lý'],
  ['language', 'ngôn ngữ'],
  ['conversation', 'hội thoại']
]

const videoTemplates = [
  {
    slug: 'daily-routine-a1',
    title: 'Daily Routine',
    topic: 'daily-life',
    level: 'A1' as const
  },
  {
    slug: 'at-the-cafe-a1',
    title: 'At The Cafe',
    topic: 'food',
    level: 'A1' as const
  },
  {
    slug: 'shopping-a1',
    title: 'Shopping Conversation',
    topic: 'shopping',
    level: 'A1' as const
  },
  {
    slug: 'introducing-yourself-a1',
    title: 'Introducing Yourself',
    topic: 'self-introduction',
    level: 'A1' as const
  },
  {
    slug: 'family-talk-a1',
    title: 'Talking About Family',
    topic: 'family',
    level: 'A1' as const
  },
  {
    slug: 'travel-english-a2',
    title: 'Travel English',
    topic: 'travel',
    level: 'A2' as const
  },
  {
    slug: 'hotel-checkin-a2',
    title: 'Hotel Check In',
    topic: 'travel',
    level: 'A2' as const
  },
  {
    slug: 'doctor-visit-a2',
    title: 'Doctor Visit',
    topic: 'health',
    level: 'A2' as const
  },
  {
    slug: 'job-interview-b1',
    title: 'Job Interview',
    topic: 'career',
    level: 'B1' as const
  },
  {
    slug: 'business-meeting-b1',
    title: 'Business Meeting',
    topic: 'business',
    level: 'B1' as const
  }
]

await db.execute(sql`
  TRUNCATE TABLE
    sentence_attempts,
    sentence_progress,
    video_progress,
    vocabulary,
    user_stats,
    sentences,
    videos,
    verification_tokens,
    accounts,
    users
  CASCADE
`)

function createWrongTranscript(text: string) {
  const words = text.split(' ')

  if (words.length < 4) {
    return text
  }

  const index = faker.number.int({
    min: 0,
    max: words.length - 1
  })

  words.splice(index, 1)

  return words.join(' ')
}

async function seed() {
  console.log('🌱 Start seeding...')

  // USERS

  const createdUsers = await db
    .insert(users)
    .values(
      Array.from({ length: 4 }).map((_, index) => ({
        email:
          index === 0
            ? 'admin@example.com'
            : faker.internet.email().toLowerCase(),

        emailVerified: true,

        role: index === 0 ? 'admin' : 'user',

        displayName: faker.person.fullName(),

        avatarUrl: faker.image.avatar(),

        nativeLanguage: 'vi',

        targetLevel: faker.helpers.arrayElement([
          'A1',
          'A2',
          'B1',
          'B2'
        ]),

        dailyGoalMinutes: faker.number.int({
          min: 10,
          max: 60
        })
      } as typeof users.$inferInsert))
    )
    .returning()

  console.log(`✅ Users: ${createdUsers.length}`)

  // ACCOUNTS

  await db.insert(accounts).values(
    createdUsers.map(user => ({
      userId: user.id,
      provider: 'credentials',
      providerAccountId: user.email,
      passwordHash:
        '$2b$10$i5ntP8WSRYvsaNHPEjHwXeBP8BxAVuUnIQlC53DrFqIl6awJrLK9e'
    }))
  )

  // VIDEOS

  const createdVideos = await db
    .insert(videos)
    .values(
      videoTemplates.map(video => ({
        ...video,

        description: faker.lorem.paragraph(),

        youtubeId: faker.string.alphanumeric(11),

        thumbnailUrl: faker.image.urlPicsumPhotos(),

        durationSeconds: faker.number.int({
          min: 90,
          max: 240
        })
      }))
    )
    .returning()

  console.log(`✅ Videos: ${createdVideos.length}`)

  // SENTENCES

  const sentenceRows: typeof sentences.$inferInsert[] = []

  for (const video of createdVideos) {
    sentenceBank.forEach((text, index) => {
      sentenceRows.push({
        videoId: video.id,

        sequence: index + 1,

        startMs: index * 5000,

        endMs: index * 5000 + 4500,

        text,

        translation: faker.lorem.sentence()
      })
    })
  }

  const createdSentences = await db
    .insert(sentences)
    .values(sentenceRows)
    .returning()

  console.log(`✅ Sentences: ${createdSentences.length}`)

  // USER STATS

  await db.insert(userStats).values(
    createdUsers.map(user => ({
      userId: user.id,

      totalPracticeMinutes: faker.number.int({
        min: 0,
        max: 5000
      }),

      totalSentencesCompleted: faker.number.int({
        min: 0,
        max: 2000
      }),

      currentStreak: faker.number.int({
        min: 0,
        max: 120
      }),

      longestStreak: faker.number.int({
        min: 0,
        max: 365
      }),

      lastPracticeDate: faker.date.recent({
        days: 30
      })
    }))
  )

  // VIDEO PROGRESS

  const videoProgressRows = []

  for (const user of createdUsers) {
    for (const video of createdVideos) {
      videoProgressRows.push({
        userId: user.id,

        videoId: video.id,

        mode: faker.helpers.arrayElement([
          'dictation',
          'shadowing'
        ]),

        completedSentences: faker.number.int({
          min: 0,
          max: 20
        }),

        totalSentences: 20,

        accuracyPct: faker.number.int({
          min: 50,
          max: 100
        }),

        isCompleted: faker.datatype.boolean()
      })
    }
  }

  await db.insert(videoProgress).values(videoProgressRows)

  console.log(`✅ Video Progress: ${videoProgressRows.length}`)

  // SENTENCE PROGRESS

  const sentenceProgressRows: typeof sentenceProgress.$inferInsert[] = []

  for (const user of createdUsers) {
    const randomSentences = faker.helpers.arrayElements(
      createdSentences,
      50
    )

    for (const sentence of randomSentences) {
      sentenceProgressRows.push({
        userId: user.id,

        sentenceId: sentence.id,

        mode: 'dictation',

        completed: faker.datatype.boolean(),

        bestAccuracy: faker.number.int({
          min: 50,
          max: 100
        }),

        totalAttempts: faker.number.int({
          min: 1,
          max: 10
        })
      })
    }
  }

  await db.insert(sentenceProgress).values(
    sentenceProgressRows
  )

  console.log(
    `✅ Sentence Progress: ${sentenceProgressRows.length}`
  )

  // ATTEMPTS

  const attemptRows: typeof sentenceAttempts.$inferInsert[] = []

  for (const user of createdUsers.slice(0, 10)) {
    for (const sentence of createdSentences) {
      const accuracy = faker.number.int({
        min: 60,
        max: 100
      })

      attemptRows.push({
        userId: user.id,

        sentenceId: sentence.id,

        mode: 'dictation',

        transcript:
          accuracy >= 90
            ? sentence.text
            : createWrongTranscript(sentence.text),

        accuracyPct: accuracy,

        isCorrect: accuracy >= 90,

        createdAt: faker.date.recent({
          days: 60
        })
      })
    }
  }

  await db.insert(sentenceAttempts).values(attemptRows)

  console.log(`✅ Attempts: ${attemptRows.length}`)

  // VOCABULARY

  const vocabularyRows = []

  for (const user of createdUsers) {
    const randomWords = faker.helpers.arrayElements(
      vocabularyPool,
      10
    )

    for (const [word, meaning] of randomWords) {
      vocabularyRows.push({
        userId: user.id,

        word,

        wordNormalized: word.toLowerCase(),

        meaning,

        example: faker.lorem.sentence(),

        sourceVideoId:
          faker.helpers.arrayElement(createdVideos).id,

        mastered: faker.datatype.boolean()
      })
    }
  }

  await db.insert(vocabulary).values(vocabularyRows)

  console.log(`✅ Vocabulary: ${vocabularyRows.length}`)

  console.log('🎉 Seed completed!')
}

seed()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error)
    process.exit(1)
  })
