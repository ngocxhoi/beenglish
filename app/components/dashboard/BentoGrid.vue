<template>
  <section class="grid grid-cols-12 gap-3 auto-rows-[minmax(140px,auto)]">
    <!-- {/* Streak — big black tile */} -->
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 row-span-2 bg-foreground text-background border-foreground p-6 flex flex-col justify-between">
      <div class="flex items-start justify-between">
        <span class="font-mono text-[10px] uppercase tracking-widest opacity-60">
          Chuỗi hiện tại
        </span>
        <Icon
          name="lucide:flame"
          class="w-5 h-5"
        />
      </div>
      <div>
        <p class="font-display text-7xl font-bold tracking-tighter leading-none">
          0
        </p>
        <p class="mt-2 font-mono text-xs uppercase tracking-wider opacity-60">
          ngày liên tiếp
        </p>
      </div>

      <div class="flex flex-col">
        <div class="grid grid-cols-7 gap-1.5 mt-5">
          <div
            v-for="day in weekDays"
            :key="day.l"
            class="flex flex-col items-center gap-2"
          >
            <div
              :class="[
                'w-full aspect-square border grid place-items-center text-xl font-mono font-medium',
                day.today ? 'border-foreground bg-foreground text-background'
                : day.done ? 'border-foreground bg-muted text-foreground'
                  : 'border-border text-muted-foreground'
              ]"
            >
              {{ day.done ? '✓' : day.l }}
            </div>
          </div>
        </div>
        <p class="mt-4 text-xs text-muted-foreground leading-relaxed">
          Hoàn thành ít nhất <span class="font-medium text-foreground">5 phút</span> để được tính.
        </p>
      </div>
      <button class="mt-4 inline-flex items-center justify-between w-full border border-background/30 hover:border-background px-3 py-2 text-xs font-medium uppercase tracking-wider transition">
        <span class="flex items-center gap-2"><Icon
          name="lucide:flame"
          class="w-3.5 h-3.5"
        /> Điểm danh</span>
        <Icon
          name="lucide:arrow-right"
          class="w-3.5 h-3.5"
        />
      </button>
    </div>

    <div class="col-span-6 lg:col-span-4 p-5 border border-border">
      <div class="flex items-start justify-between">
        <span class="font-mono text-[10px] uppercase tracking-widest opacity-60">
          Thời gian luyện tập
        </span>
        <Icon
          name="lucide:clock"
          class="w-5 h-5"
        />
      </div>
      <div>
        <p class="font-display text-3xl font-bold tracking-tighter leading-none">
          {{ data?.userStats?.totalPracticeMinutes }}
        </p>
        <p class="mt-2 font-mono text-xs uppercase tracking-wider opacity-60">
          tuần này
        </p>
      </div>
    </div>

    <div class="col-span-6 lg:col-span-4 p-5 border border-border">
      <div class="flex items-start justify-between">
        <span class="font-mono text-[10px] uppercase tracking-widest opacity-60">
          Từ đã lưu
        </span>
        <Icon
          name="lucide:bookmark"
          class="w-5 h-5"
        />
      </div>
      <div>
        <p class="font-display text-3xl font-bold tracking-tighter leading-none">
          {{ data?.vocabularyCount }}
        </p>
        <p class="mt-2 font-mono text-xs uppercase tracking-wider opacity-60">
          từ vựng
        </p>
      </div>
    </div>

    <div class="col-span-6 lg:col-span-4 p-5 border border-border">
      <div class="flex items-start justify-between">
        <span class="font-mono text-[10px] uppercase tracking-widest opacity-60">
          XP - Level 1
        </span>
        <Icon
          name="lucide:trophy"
          class="w-5 h-5"
        />
      </div>
      <div>
        <p class="font-display text-3xl font-bold tracking-tighter leading-none">
          0 / 100
        </p>
        <p class="mt-2 font-mono text-xs uppercase tracking-wider opacity-60">
          Newcomer
        </p>
        <div class="mt-3 h-1 bg-border">
          <div
            class="h-full bg-foreground"
            :style="'width: 2%'"
          />
        </div>
      </div>
    </div>

    <div class="col-span-6 lg:col-span-4 row-span-2 border border-border p-6">
      <div class="flex items-baseline justify-between mb-4">
        <div>
          <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Top tuần
          </span>
          <h3 class="font-display text-xl font-bold mt-0.5">
            Bảng xếp hạng
          </h3>
        </div>
        <button class="font-mono text-[10px] uppercase tracking-wider hover:underline">
          Xem tất cả →
        </button>
      </div>
      <ul class="divide-y divide-border">
        <li
          v-for="u in leaderboard"
          :key="u.name"
          :class="`flex items-center gap-3 py-3 ${u.you ? '' : ''}`"
        >
          <span class="w-10 font-mono text-xs text-muted-foreground">
            #{{ String(u.rank).padStart(4, "0") }}
          </span>
          <div
            :class="`w-8 h-8 border grid place-items-center text-xs font-bold ${
              u?.you ? 'border-foreground bg-foreground text-background' : 'border-border'
            }`"
          >
            {{ u?.name.slice(0, 1) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">
              {{ u?.name }} <span
                v-if="u.you"
                class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground ml-1"
              >— bạn</span>
            </p>
            <p
              v-if="u?.streak"
              class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"
            >
              <Icon
                name="lucide:flame"
                class="w-3 h-3"
              /> {{ u?.streak }}d streak
            </p>
          </div>
          <span class="font-mono text-xs">{{ u.time }}</span>
        </li>
      </ul>
    </div>

    <DashboardTimeChart />

    <div class="col-span-12 lg:col-span-4 border border-border p-6 flex items-center gap-5 group hover:border-foreground transition cursor-pointer">
      <div class="w-14 h-14 border border-foreground grid place-items-center shrink-0">
        <Icon
          name="lucide:graduation-cap"
          class="w-6 h-6"
        />
      </div>
      <div class="flex-1 min-w-0">
        <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Gợi ý hôm nay
        </span>
        <p class="font-display text-xl font-bold mt-0.5">
          Vào học từ mới bạn ơi!
        </p>
        <p class="text-sm text-muted-foreground mt-0.5">
          Khám phá bộ từ và mở rộng vốn từ vựng của bạn.
        </p>
      </div>
      <Icon
        name="lucide:arrow-up-right"
        class="w-6 h-6 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const weekDays = [
  { l: 'T2', done: true }, { l: 'T3', done: true }, { l: 'T4', done: false },
  { l: 'T5', done: false }, { l: 'T6', done: false }, { l: 'T7', done: false },
  { l: 'CN', today: true }
]

const leaderboard: LeaderboardEntry[] = [
  { rank: 1160, name: 'Bạn', time: '7m', you: true },
  { rank: 2, name: 'Bảo Gia', streak: 14, time: '12h 38m' },
  { rank: 3, name: 'le phung', streak: 1, time: '11h 51m' },
  { rank: 4, name: 'Đạt Vũ', streak: 1, time: '11h 47m' }
]

const { data } = await useFetch('/api/drizzle/dashboard')
</script>
