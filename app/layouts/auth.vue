<template>
  <div class="min-h-screen grid lg:grid-cols-2 bg-background">
    <div class="hidden lg:flex flex-col justify-between p-12 bg-foreground text-background">
      <NuxtLink
        to="/"
        class="font-display font-bold text-2xl"
      >Senglish</NuxtLink>
      <div>
        <p class="font-display text-5xl leading-tight tracking-tight">
          Nghe.<br>Nói.<br>Thấm.
        </p>
        <p class="font-mono text-[10px] uppercase tracking-widest mt-6 opacity-60">
          v1.0 — luyện tiếng Anh mỗi ngày
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <p class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Senglish
        </p>
        <slot name="title" />

        <slot />
      </div>
    </div>
  </div>
</template>
