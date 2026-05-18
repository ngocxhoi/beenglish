<template>
  <aside class="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border">
    <div class="px-6 h-20 flex items-center border-b border-sidebar-border">
      <NuxtLink
        to="/"
        class="flex items-baseline gap-2"
      >
        <span class="font-display font-bold text-2xl tracking-tight text-foreground">
          Senglish
        </span>
        <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          v1.0
        </span>
      </NuxtLink>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-6">
      <div
        v-for="group in groups"
        :key="group.label"
      >
        <p class="px-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
          {{ group.label }}
        </p>
        <ul class="space-y-0.5">
          <li
            v-for="item in group.items"
            :key="item.label"
          >
            <NuxtLink
              :to="item.to"
              :class="[
                'group flex items-center gap-3 px-3 py-2 text-sm transition-colors border-l-2',
                route.path === item.to
                  ? 'border-foreground text-foreground font-medium bg-muted'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60'
              ]"
            >
              <Icon
                :name="item.icon"
                class="w-4 h-4 stroke-[1.5]"
              />
              <span class="flex-1">{{ item.label }}</span>
              <span
                v-if="item?.badge"
                class="font-mono text-[10px] px-1.5 py-0.5 border border-border text-muted-foreground"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="p-3 border-t border-sidebar-border space-y-3">
      <button class="w-full text-left px-3 py-3 border border-border hover:border-foreground transition group">
        <p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
          ↗ Premium
        </p>
        <p class="text-sm font-medium mt-0.5">
          Mở khoá toàn bộ
        </p>
      </button>
      <div class="flex items-center gap-3 px-2">
        <div class="w-9 h-9 rounded-full bg-foreground text-background grid place-items-center text-xs font-bold">
          HN
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">
            Hội Ngọc
          </p>
          <p class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Free tier
          </p>
        </div>
        <ColorMode />
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { groups } from '#shared/data'

const route = useRoute()
</script>
