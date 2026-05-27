import { pgTable, text, integer, timestamp, uuid, boolean, pgEnum, uniqueIndex, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const practiceModeEnum = pgEnum('practice_mode', ['dictation', 'shadowing'])
export const levelEnum = pgEnum('cefr_level', ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])

// ---------- Users & Profiles ----------
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})

export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url'),
  nativeLanguage: text('native_language').default('vi'),
  targetLevel: levelEnum('target_level').default('B1'),
  dailyGoalMinutes: integer('daily_goal_minutes').default(20).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
})

// ---------- Videos & Sentences ----------
export const videos = pgTable('videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  youtubeId: text('youtube_id'),
  thumbnailUrl: text('thumbnail_url'),
  level: levelEnum('level').notNull(),
  topic: text('topic').notNull(),
  durationSeconds: integer('duration_seconds').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, t => ({
  byLevel: index('videos_level_idx').on(t.level),
  byTopic: index('videos_topic_idx').on(t.topic)
}))

export const sentences = pgTable('sentences', {
  id: uuid('id').primaryKey().defaultRandom(),
  videoId: uuid('video_id').notNull().references(() => videos.id, { onDelete: 'cascade' }),
  index: integer('index').notNull(),
  startMs: integer('start_ms').notNull(),
  endMs: integer('end_ms').notNull(),
  text: text('text').notNull(),
  translation: text('translation')
}, t => ({
  byVideo: index('sentences_video_idx').on(t.videoId),
  uniqPerVideo: uniqueIndex('sentences_video_index_uniq').on(t.videoId, t.index)
}))

// ---------- Progress ----------
export const videoProgress = pgTable('video_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  videoId: uuid('video_id').notNull().references(() => videos.id, { onDelete: 'cascade' }),
  mode: practiceModeEnum('mode').notNull(),
  completedSentences: integer('completed_sentences').default(0).notNull(),
  totalSentences: integer('total_sentences').default(0).notNull(),
  accuracyPct: integer('accuracy_pct').default(0).notNull(),
  lastPracticedAt: timestamp('last_practiced_at', { withTimezone: true }).defaultNow().notNull()
}, t => ({
  uniq: uniqueIndex('progress_user_video_mode_uniq').on(t.userId, t.videoId, t.mode),
  byUser: index('progress_user_idx').on(t.userId)
}))

export const sentenceAttempts = pgTable('sentence_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sentenceId: uuid('sentence_id').notNull().references(() => sentences.id, { onDelete: 'cascade' }),
  mode: practiceModeEnum('mode').notNull(),
  transcript: text('transcript').notNull(),
  accuracyPct: integer('accuracy_pct').notNull(),
  isCorrect: boolean('is_correct').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, t => ({
  byUser: index('attempts_user_idx').on(t.userId),
  bySentence: index('attempts_sentence_idx').on(t.sentenceId)
}))

// ---------- Vocabulary & Notes ----------
export const vocabulary = pgTable('vocabulary', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  word: text('word').notNull(),
  meaning: text('meaning'),
  example: text('example'),
  sourceVideoId: uuid('source_video_id').references(() => videos.id, { onDelete: 'set null' }),
  mastered: boolean('mastered').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, t => ({
  uniqWord: uniqueIndex('vocab_user_word_uniq').on(t.userId, t.word),
  byUser: index('vocab_user_idx').on(t.userId)
}))

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  videoId: uuid('video_id').references(() => videos.id, { onDelete: 'cascade' }),
  sentenceId: uuid('sentence_id').references(() => sentences.id, { onDelete: 'set null' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, t => ({
  byUser: index('notes_user_idx').on(t.userId)
}))

// ---------- Relations ----------
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  progress: many(videoProgress),
  attempts: many(sentenceAttempts),
  vocabulary: many(vocabulary),
  notes: many(notes)
}))

export const videosRelations = relations(videos, ({ many }) => ({
  sentences: many(sentences),
  progress: many(videoProgress)
}))

export const sentencesRelations = relations(sentences, ({ one, many }) => ({
  video: one(videos, { fields: [sentences.videoId], references: [videos.id] }),
  attempts: many(sentenceAttempts)
}))
