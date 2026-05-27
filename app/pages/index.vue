<template>
  <div class="min-h-screen bg-background text-foreground font-body">
    <nav class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="font-display font-extrabold text-2xl tracking-tighter">Senglish</span>
          <span class="font-mono text-[10px] opacity-40 uppercase tracking-widest">v1.0.4</span>
        </div>
        <div class="hidden md:flex gap-8 font-mono text-[11px] uppercase tracking-wider">
          <a
            href="#features"
            class="hover:opacity-60 transition-opacity"
          >Luyện tập</a>
          <a
            href="#progress"
            class="hover:opacity-60 transition-opacity"
          >Tiến độ</a>
          <a
            href="#cta"
            class="hover:opacity-60 transition-opacity"
          >Cộng đồng</a>
        </div>
        <NuxtLink
          type="button"
          to="/vi/trang-chu"
          class="bg-foreground text-background px-5 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-foreground/90 transition-colors"
        >
          Bắt đầu học
        </NuxtLink>
      </div>
    </nav>

    <main>
      <section class="max-w-7xl mx-auto px-6 pt-24 pb-32 border-x border-border min-h-[80vh] flex flex-col justify-end">
        <div class="font-mono text-[12px] mb-8 animate-reveal">
          01 &mdash; TỔNG QUAN
        </div>
        <h1 class="font-display font-extrabold text-7xl md:text-9xl tracking-tight leading-[0.9] text-balance mb-12 animate-reveal [animation-delay:100ms]">
          Chinh phục tiếng Anh<br>
          <span class="text-muted-foreground">qua từng bản tin.</span>
        </h1>
        <div class="flex flex-col md:flex-row gap-12 items-end animate-reveal [animation-delay:200ms]">
          <p class="max-w-[42ch] text-lg text-pretty leading-relaxed opacity-80">
            Hệ thống luyện Dictation và Shadowing thông minh giúp bạn làm chủ khả năng nghe nói tự nhiên, không chỉ là học thuộc lòng.
          </p>
          <div class="flex-1 flex justify-end w-full">
            <div class="w-full max-w-sm aspect-square bg-foreground/5 p-1 border border-border group overflow-hidden">
              <img
                :src="heroAbstract"
                alt="Senglish — abstract"
                width="{800}"
                height="{800}"
                class="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              >
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        class="border-y border-border"
      >
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div
            v-for="(f, i) in features"
            :key="f.n"
            :class="[`flex-1 p-12 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`]"
          >
            <span class="font-mono text-[11px] opacity-40 block mb-12 uppercase tracking-tighter">Feature {{ f.n }}</span>
            <h3 class="font-display font-semibold text-3xl mb-6">
              {{ f.title }}
            </h3>
            <p class="opacity-70 text-sm leading-relaxed mb-8">
              {{ f.desc }}
            </p>
            <div :class="[`h-0.5 w-12 ${f.active ? 'bg-foreground' : 'bg-foreground/20'}`]" />
          </div>
        </div>
      </section>

      <section
        id="progress"
        class="max-w-7xl mx-auto px-6 py-32 border-x border-border"
      >
        <div class="font-mono text-[12px] mb-16">
          02 &mdash; TIẾN ĐỘ
        </div>
        <div class="grid md:grid-cols-2 gap-24">
          <div>
            <h2 class="font-display font-extrabold text-5xl tracking-tighter mb-8 leading-tight">
              Mỗi ngày một<br>chút, không ngừng.
            </h2>
            <p class="opacity-70 mb-12">
              Hệ thống Streaks và XP được thiết kế để duy trì thói quen học tập bền bỉ. Theo dõi sự tiến bộ qua các biểu đồ chi tiết.
            </p>
            <div class="flex gap-4">
              <div
                v-for="t in list"
                :key="t"
                class="size-12 border border-foreground/10 grid place-items-center font-mono text-sm"
              >
                {{ t }}
              </div>
            </div>
          </div>
          <div class="bg-foreground text-background p-10 flex flex-col justify-between aspect-video">
            <div class="flex justify-between items-start">
              <span class="font-mono text-[10px] uppercase opacity-50 tracking-widest">User Dashboard</span>
              <span class="font-mono text-[10px]">WEEK_24</span>
            </div>
            <div class="space-y-4">
              <div class="h-12 border-b border-background/20 flex items-center justify-between">
                <span class="font-mono text-xs opacity-60">Streaks hiện tại</span>
                <span class="font-display font-semibold text-2xl">24 Ngày</span>
              </div>
              <div class="h-12 border-b border-background/20 flex items-center justify-between">
                <span class="font-mono text-xs opacity-60">Thứ hạng tuần</span>
                <span class="font-display font-semibold text-2xl">#04</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="cta"
        class="bg-foreground text-background py-32"
      >
        <div class="max-w-7xl mx-auto px-6 text-center">
          <h2 class="font-display font-extrabold text-6xl md:text-8xl tracking-tighter mb-12">
            Sẵn sàng bắt đầu?
          </h2>
          <button class="border border-background/20 px-12 py-5 font-mono text-sm uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-all duration-300">
            Nâng cấp Premium
          </button>
        </div>
      </section>
    </main>

    <footer class="max-w-7xl mx-auto px-6 py-12 border-x border-border flex flex-col md:flex-row justify-between items-end gap-8">
      <div class="font-mono text-[10px] opacity-40 uppercase leading-relaxed">
        © 2024 Senglish Studio.<br>
        Made for the dedicated learner.
      </div>
      <div class="flex gap-12 font-mono text-[10px] uppercase tracking-widest">
        <a
          href="#"
          class="opacity-40 hover:opacity-100 transition-opacity"
        >Facebook</a>
        <a
          href="#"
          class="opacity-40 hover:opacity-100 transition-opacity"
        >Youtube</a>
        <a
          href="#"
          class="opacity-40 hover:opacity-100 transition-opacity"
        >Email</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import heroAbstract from '~/assets/video-3.jpg'

const features = [
  { n: '01', title: 'Dictation', desc: 'Ghi chép chính tả từ kho video thực tế. Sửa lỗi tức thì và nâng cấp vốn từ vựng chuyên sâu.', active: true },
  { n: '02', title: 'Shadowing', desc: 'Kỹ thuật lặp lại giúp tinh chỉnh ngữ điệu và trọng âm chuẩn xác như người bản xứ.' },
  { n: '03', title: 'AI Dictionary', desc: 'Tra từ nhanh chóng trong ngữ cảnh video với sự hỗ trợ của trí tuệ nhân tạo.' }
]

const list = ['XP', '🔥', 'LV']
</script>
