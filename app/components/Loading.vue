<template>
  <!-- components/dashboard/HomeLoading.vue -->
  <div class="animate-pulse">
    <!-- Header -->
    <div class="border-b border-neutral-200 pb-8">
      <div class="h-3 w-40 bg-neutral-200 mb-6" />

      <div class="space-y-3">
        <div class="h-20 w-[520px] max-w-full bg-neutral-200" />
        <div class="h-16 w-[420px] max-w-full bg-neutral-100" />
      </div>
    </div>

    <!-- Suggest card -->
    <div
      class="mt-8 border border-neutral-200 p-5 flex items-center justify-between"
    >
      <div class="flex items-center gap-4">
        <div class="size-14 border border-neutral-300 bg-neutral-100" />

        <div class="space-y-3">
          <div class="h-3 w-28 bg-neutral-200" />
          <div class="h-6 w-64 bg-neutral-300" />
          <div class="h-4 w-80 bg-neutral-100" />
        </div>
      </div>

      <div class="size-5 bg-neutral-200" />
    </div>

    <!-- Text -->
    <div class="mt-6 space-y-3">
      <div class="h-4 w-[520px] max-w-full bg-neutral-100" />
      <div class="h-4 w-[420px] max-w-full bg-neutral-100" />
    </div>

    <!-- Stats grid -->
    <div class="mt-10 grid grid-cols-12 gap-3">
      <!-- Left big card -->
      <div
        class="col-span-12 xl:col-span-4 bg-black text-white border border-neutral-800 p-5 min-h-[340px]"
      >
        <div class="h-3 w-24 bg-neutral-700 mb-6" />

        <div class="h-24 w-20 bg-neutral-700 mb-8" />

        <div class="grid grid-cols-6 gap-2 mb-8">
          <div
            v-for="i in 6"
            :key="i"
            class="aspect-square border border-neutral-700 bg-neutral-800"
          />
        </div>

        <div class="h-10 w-full border border-neutral-700 bg-neutral-800" />
      </div>

      <!-- Right cards -->
      <div class="col-span-12 xl:col-span-8 grid grid-cols-2 gap-3">
        <div
          v-for="i in 4"
          :key="i"
          class="border border-neutral-200 p-5 min-h-[140px]"
        >
          <div class="h-3 w-24 bg-neutral-200 mb-4" />
          <div class="h-10 w-28 bg-neutral-300 mb-3" />
          <div class="h-3 w-20 bg-neutral-100" />
        </div>
      </div>
    </div>
  </div>
</template>
