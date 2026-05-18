<script setup lang="ts">
const today = new Date().toLocaleDateString('vi-VN', {
  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
})
</script>

<template>
  <div class="fixed inset-0 flex flex-1">
    <PageSidebar />
    <main class="flex-1 min-w-0 relative">
      <header class="sticky top-0 left-0 right-0 bg-transparent backdrop-blur-2xl h-20 px-6 lg:px-10 flex items-center justify-between border-b border-border">
        <div class="flex items-center gap-4">
          <p class="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {{ today }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button class="hidden sm:inline-flex items-center gap-2 h-9 px-3 border border-border hover:border-foreground text-xs font-medium uppercase tracking-wider transition">
            <Icon
              name="i-lucide-video"
              class="w-3.5 h-3.5"
            /> Video
          </button>
          <button class="hidden sm:inline-flex items-center gap-2 h-9 px-3 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:opacity-90 transition">
            <Icon
              name="i-lucide-message-square-plus"
              class="w-3.5 h-3.5"
            /> Góp ý
          </button>
          <ColorMode />
        </div>
      </header>

      <div class="relative w-full h-[calc(100vh-5rem)] overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
