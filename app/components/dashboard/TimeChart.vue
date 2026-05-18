<script lang="ts" setup>
defineOptions({
  tags: ['areacharts', 'singleline']
})

withDefaults(
  defineProps<{
    showTitle?: boolean
  }>(),
  {
    showTitle: false
  }
)

const categories: Record<string, BulletLegendItemInterface> = {
  revenue: { name: 'Time (minutes)', color: '#22c55e' }
}

interface AreaChartItem {
  date: string
  revenue: number
}

const AreaChartData: AreaChartItem[] = [
  { date: 'Jan 23', revenue: 0 },
  { date: 'Feb 23', revenue: 300 },
  { date: 'Mar 23', revenue: 1000 },
  { date: 'Apr 23', revenue: 1330 },
  { date: 'May 23', revenue: 2000 },
  { date: 'Jun 23', revenue: 2240 },
  { date: 'Jul 23', revenue: 1900 },
  { date: 'Aug 23', revenue: 3700 },
  { date: 'Sep 23', revenue: 3900 },
  { date: 'Oct 23', revenue: 3800 },
  { date: 'Nov 23', revenue: 3300 },
  { date: 'Dec 23', revenue: 2000 }
]

const xFormatter = (tick: number, _i?: number, _ticks?: number[]): string => {
  return `${AreaChartData[tick]?.date ?? ''}`
}

const modes = ['Dictation', 'Shadow', 'Nói', 'Từ']
</script>

<template>
  <div class="col-span-12 lg:col-span-8 row-span-2 p-6 border border-border">
    <div class="flex items-end justify-between mb-1">
      <div>
        <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Hoạt động — 7 ngày
        </span>
        <h3 class="font-display text-2xl font-bold mt-1">
          Phút luyện tập
        </h3>
      </div>
      <div class="flex gap-1">
        <button
          v-for="(mode, i) in modes"
          :key="mode"
          :class="`h-7 px-2.5 text-[11px] font-medium uppercase tracking-wider border transition ${
            i === 0 ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
          }`"
        >
          {{ mode }}
        </button>
      </div>
    </div>
    <div class="h-fit mt-5 -mx-1">
      <AreaChart
        :data="AreaChartData"
        :height="300"
        x-label="Month"
        :categories="categories"
        :y-num-ticks="4"
        :x-num-ticks="7"
        :legend-position="LegendPosition.TopRight"
        :x-formatter="xFormatter"
      />
    </div>
  </div>
</template>
