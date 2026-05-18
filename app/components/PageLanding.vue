<template>
  <div>
    <nav class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            S
          </div>
          <h1 class="text-2xl font-bold">
            ShadowSpeak
          </h1>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <a
            href="#"
            class="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >Phương pháp</a>
          <a
            href="#"
            class="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >Khóa học</a>
          <a
            href="#"
            class="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >Video</a>
          <a
            href="#"
            class="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >Blog</a>
        </div>

        <div class="flex items-center gap-4">
          <button
            onclick="toggleDarkMode()"
            class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <i
              id="theme-icon"
              class="fas fa-moon text-xl"
            />
          </button>

          <button
            onclick="document.getElementById('demo').scrollIntoView({behavior: 'smooth'})"
            class="px-6 py-2.5 text-blue-600 dark:text-blue-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
          >
            Thử miễn phí
          </button>
          <button
            onclick="window.location.href='#signup'"
            class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-bg text-white py-24">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Học tiếng Anh <span class="text-yellow-400">như người bản xứ</span>
          </h2>
          <p class="text-xl md:text-2xl text-gray-200 mb-10">
            Xem video • Shadowing • Typing theo lời thoại<br>
            <span class="text-blue-300">Cải thiện nghe - nói - viết chỉ trong 30 ngày</span>
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onclick="document.getElementById('demo').scrollIntoView({behavior: 'smooth'})"
              class="px-10 py-4 bg-white text-blue-600 text-xl font-semibold rounded-2xl hover:bg-yellow-300 hover:text-yellow-800 transition-all flex items-center gap-3"
            >
              <i class="fas fa-play" />
              Xem demo ngay
            </button>
            <button
              onclick="window.location.href='#signup'"
              class="px-10 py-4 border-2 border-white hover:bg-white/10 text-white text-xl font-semibold rounded-2xl"
            >
              Bắt đầu miễn phí
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-4">
          Phương pháp 3 bước hiệu quả
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Kết hợp xem video + shadowing + typing giúp bạn tiến bộ nhanh chóng
        </p>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 card-hover">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl mb-6">
              <i class="fas fa-play-circle" />
            </div>
            <h3 class="text-2xl font-semibold mb-3">
              1. Xem Video
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Hàng nghìn video chất lượng từ BBC, TED, Netflix, Phim...
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 card-hover">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-3xl mb-6">
              <i class="fas fa-microphone" />
            </div>
            <h3 class="text-2xl font-semibold mb-3">
              2. Shadowing
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Lặp lại theo người bản xứ với AI chấm điểm phát âm.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 card-hover">
            <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center text-3xl mb-6">
              <i class="fas fa-keyboard" />
            </div>
            <h3 class="text-2xl font-semibold mb-3">
              3. Typing
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Gõ theo lời thoại, cải thiện spelling & trí nhớ từ vựng.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section
      id="demo"
      class="py-20 bg-gray-900 text-white"
    >
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold mb-6">
              Thử ngay một video mẫu
            </h2>
            <button
              onclick="alert('Đang mở video demo...')"
              class="mt-6 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold flex items-center gap-3"
            >
              <i class="fas fa-play" />
              BẮT ĐẦU DEMO
            </button>
          </div>

          <div class="bg-gray-800 rounded-3xl p-8 border border-gray-700">
            <div class="aspect-video bg-black rounded-2xl flex items-center justify-center mb-6">
              <i class="fas fa-play-circle text-7xl text-white/60" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      id="signup"
      class="bg-linear-to-r from-blue-600 to-indigo-600 py-20 text-white"
    >
      <div class="max-w-4xl mx-auto text-center px-6">
        <h2 class="text-5xl font-bold mb-6">
          Sẵn sàng nâng cao tiếng Anh?
        </h2>
        <p class="text-xl mb-10">
          14 ngày thử miễn phí - Không cần thẻ tín dụng
        </p>

        <div class="max-w-md mx-auto">
          <div class="flex gap-3">
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              class="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none"
            >
            <button
              onclick="submitForm()"
              class="px-10 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-yellow-300 hover:text-yellow-800"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-16">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p>© 2026 ShadowSpeak. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.hero-bg {
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://picsum.photos/id/1015/1920/1080') center/cover;
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
</style>
