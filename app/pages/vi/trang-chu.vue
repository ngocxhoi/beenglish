<template>
  <NuxtLayout name="custom">
    <div class="px-6 lg:px-10 py-10 space-y-10 w-full">
      <!-- {/* Hero — editorial */} -->
      <section class="border-b border-border pb-10">
        <div class="flex items-baseline gap-3 mb-4">
          <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            №.001 — Welcome
          </span>
          <span class="flex-1 h-px bg-border" />
        </div>
        <div class="w-full">
          <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
            Chào, {{ auth?.name || formatUserEmail(auth!.email) }}.
            <br>
            <span class="text-muted-foreground">Hôm nay học gì?</span>
          </h1>

          <div class="mt-5 border border-border p-6 flex items-center gap-5 group hover:border-foreground transition cursor-pointer">
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
        </div>
        <p class="mt-5 max-w-xl text-base text-muted-foreground leading-relaxed">
          Cố gắng lên nhé bạn ơi — mình tin bạn sẽ ngày càng tiến bộ.
          Mỗi 10 phút luyện tập đều có ý nghĩa.
        </p>
      </section>

      <DashboardBentoGrid :data="data" />

      <DashboardLearningLesson />

      <footer class="pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span class="font-mono uppercase tracking-wider">© {{ new Date().getFullYear() }} Senglish</span>
        <span class="font-mono uppercase tracking-wider">Học tiếng Anh mỗi ngày</span>
      </footer>
    </div>
  </NuxtLayout>
</template>

<script setup lang='ts'>
definePageMeta({
  middleware: ['auth'],
  auth: true
})

const { auth } = useGlobalStore()

const { data } = useFetch<DataDashboard>('/api/drizzle/dashboard')
</script>
