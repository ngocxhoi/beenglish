import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  boolean,
  pgEnum,
  uniqueIndex,
  index
} from 'drizzle-orm/pg-core'

export const practiceModeEnum = pgEnum('practice_mode', [
  'dictation',
  'shadowing'
])
export const levelEnum = pgEnum('cefr_level', [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2'
])
export const userRoleEnum = pgEnum('user_role', ['user', 'admin'])

// ---------- Users & Profiles ----------
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  email: text('email').notNull().unique(),

  emailVerified: boolean('email_verified').default(false).notNull(),

  role: userRoleEnum('role').default('user').notNull(),

  displayName: text('display_name'),

  avatarUrl: text('avatar_url'),

  nativeLanguage: text('native_language').default('vi').notNull(),

  targetLevel: levelEnum('target_level').default('B1'),

  dailyGoalMinutes: integer('daily_goal_minutes').default(20).notNull(),

  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
})

export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    provider: text('provider').notNull(),

    providerAccountId: text('provider_account_id').notNull(),

    passwordHash: text('password_hash'),

    createdAt: timestamp('created_at', {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  table => ({
    providerUnique: uniqueIndex('accounts_provider_account_unique').on(
      table.provider,
      table.providerAccountId
    ),

    userProviderUnique: uniqueIndex('accounts_user_provider_unique').on(
      table.userId,
      table.provider
    )
  })
)

export const tokenTypeEnum = pgEnum('token_type', [
  'verify_email',
  'reset_password',
  'change_email'
])

export const verificationTokens = pgTable('verification_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),

  email: text('email').notNull(),

  token: text('token').notNull(),

  type: tokenTypeEnum('type').notNull(),

  expiresAt: timestamp('expires_at', {
    withTimezone: true
  }).notNull(),

  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
})

// ---------- Videos & Sentences ----------
export const videos = pgTable(
  'videos',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    slug: text('slug').notNull().unique(),

    title: text('title').notNull(),

    description: text('description'),

    youtubeId: text('youtube_id'),

    thumbnailUrl: text('thumbnail_url'),

    topic: text('topic').notNull(),

    level: levelEnum('level').notNull(),

    durationSeconds: integer('duration_seconds').notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  table => ({
    levelIdx: index('videos_level_idx').on(table.level),

    topicIdx: index('videos_topic_idx').on(table.topic)
  })
)

export const sentences = pgTable(
  'sentences',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    videoId: uuid('video_id')
      .references(() => videos.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    sequence: integer('sequence').notNull(),

    startMs: integer('start_ms').notNull(),

    endMs: integer('end_ms').notNull(),

    text: text('text').notNull(),

    translation: text('translation')
  },
  table => ({
    videoIdx: index('sentences_video_idx').on(table.videoId),

    uniqueSequence: uniqueIndex('sentences_video_sequence_unique').on(
      table.videoId,
      table.sequence
    )
  })
)

// ---------- Progress ----------
export const sentenceProgress = pgTable(
  'sentence_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    sentenceId: uuid('sentence_id')
      .references(() => sentences.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    mode: practiceModeEnum('mode').notNull(),

    completed: boolean('completed').default(false).notNull(),

    bestAccuracy: integer('best_accuracy').default(0).notNull(),

    totalAttempts: integer('total_attempts').default(0).notNull(),

    lastPracticedAt: timestamp('last_practiced_at', {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  table => ({
    uniqueProgress: uniqueIndex('sentence_progress_unique').on(
      table.userId,
      table.sentenceId,
      table.mode
    )
  })
)

export const videoProgress = pgTable(
  'video_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    videoId: uuid('video_id')
      .references(() => videos.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    mode: practiceModeEnum('mode').notNull(),

    completedSentences: integer('completed_sentences').default(0).notNull(),

    totalSentences: integer('total_sentences').default(0).notNull(),

    accuracyPct: integer('accuracy_pct').default(0).notNull(),

    isCompleted: boolean('is_completed').default(false).notNull(),

    lastPracticedAt: timestamp('last_practiced_at', {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  table => ({
    uniqueProgress: uniqueIndex('video_progress_unique').on(
      table.userId,
      table.videoId,
      table.mode
    )
  })
)

export const sentenceAttempts = pgTable(
  'sentence_attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    sentenceId: uuid('sentence_id')
      .references(() => sentences.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    mode: practiceModeEnum('mode').notNull(),

    transcript: text('transcript').notNull(),

    accuracyPct: integer('accuracy_pct').notNull(),

    isCorrect: boolean('is_correct').default(false).notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  table => ({
    userCreatedIdx: index('attempts_user_created_idx').on(
      table.userId,
      table.createdAt
    ),

    sentenceCreatedIdx: index('attempts_sentence_created_idx').on(
      table.sentenceId,
      table.createdAt
    )
  })
)

export const userStats = pgTable('user_stats', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, {
      onDelete: 'cascade'
    }),

  totalPracticeMinutes: integer('total_practice_minutes').default(0).notNull(),

  totalSentencesCompleted: integer('total_sentences_completed')
    .default(0)
    .notNull(),

  currentStreak: integer('current_streak').default(0).notNull(),

  longestStreak: integer('longest_streak').default(0).notNull(),

  lastPracticeDate: timestamp('last_practice_date', {
    withTimezone: true
  })
})

// ---------- Vocabulary & Notes ----------
export const vocabulary = pgTable(
  'vocabulary',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade'
      })
      .notNull(),

    word: text('word').notNull(),

    wordNormalized: text('word_normalized').notNull(),

    meaning: text('meaning'),

    example: text('example'),

    sourceVideoId: uuid('source_video_id').references(() => videos.id, {
      onDelete: 'set null'
    }),

    mastered: boolean('mastered').default(false).notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true
    })
      .defaultNow()
      .notNull()
  },
  table => ({
    uniqueWord: uniqueIndex('vocab_user_word_unique').on(
      table.userId,
      table.wordNormalized
    )
  })
)
