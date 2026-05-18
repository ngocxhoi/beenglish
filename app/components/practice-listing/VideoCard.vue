<template>
  <article class="group border border-border hover:border-foreground transition cursor-pointer">
    <div class="aspect-video bg-muted relative border-b border-border overflow-hidden">
      <div
        class="absolute inset-0 opacity-50"
        :style="{
          backgroundImage: `repeating-linear-gradient(45deg, transparent 0 8px, currentColor 8px 9px)`,
          color: 'var(--color-border)'
        }"
      />
      <div class="absolute inset-0 grid place-items-center">
        <div class="w-12 h-12 border border-foreground bg-background grid place-items-center group-hover:bg-foreground group-hover:text-background transition">
          <Icon
            name="lucide:play"
            class="w-4 h-4 fill-current"
          />
        </div>
      </div>
      <span class="absolute top-2 left-2 font-mono text-[10px] font-bold px-1.5 py-0.5 bg-foreground text-background">
        {{ v.level }}
      </span>
      <span class="absolute bottom-2 right-2 font-mono text-[10px] px-1.5 py-0.5 bg-background border border-border flex items-center gap-1">
        <Icon
          name="lucide:clock"
          class="w-3 h-3"
        /> {{ v.minutes }}m
      </span>
    </div>
    <div class="p-3">
      <p class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {{ v.topic }}
      </p>
      <p class="font-display text-sm font-bold line-clamp-2 leading-snug mt-1">
        {{ v.title }}
      </p>
      <div class="mt-3 flex items-center justify-between">
        <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {{ v.progress ?? 0 }}% hoàn thành
        </span>
        <ArrowUpRight class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
      </div>
      <div class="mt-2 h-px bg-border relative">
        <div
          class="absolute inset-y-0 left-0 bg-foreground"
          :style="{ width: `${v.progress ?? 0}%` }"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  v: Video
}>()
</script>
