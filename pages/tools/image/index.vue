<template>
  <div class="container-main py-10">
    <!-- Breadcrumb Menu -->
    <nav class="text-sm text-gray-400 mb-6">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">Image Tools</span>
    </nav>

    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Image Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Kumpulan tools manipulasi gambar gratis untuk mengecilkan ukuran gambar (compress), merubah ukuran (resize), memotong (crop), dan merubah format file secara instan.
    </p>

    <!-- Tool Cards Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.slug"
        :to="tool.path"
        class="tool-card flex flex-col gap-2 group"
      >
        <span class="font-semibold text-sm text-gray-800 group-hover:text-primary-600 transition-colors">
          {{ tool.title }}
        </span>
        <span class="text-xs text-gray-400 line-clamp-2">{{ tool.shortDescription }}</span>
        <span class="text-xs font-medium text-primary-500 group-hover:text-primary-600 mt-auto">
          Buka →
        </span>
      </NuxtLink>
    </div>

    <!-- Info Section block below grid -->
    <div class="mt-16 bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
      <h2 class="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
        <span class="text-xl">🚀</span> Eksekusi Cepat, Keamanan Tinggi
      </h2>
      <p class="text-blue-800 text-sm leading-relaxed mb-4">
        Seluruh Image Tools pada platform QuickTools diproses <strong>sepenuhnya di dalam browser perangkat Anda (Client-Side)</strong> menggunakan teknologi HTML5. Artinya...
      </p>
      <ul class="list-disc pl-5 space-y-2 text-sm text-blue-800">
        <li><strong>Nol Kuota Upload:</strong> Menghemat pulsa dan bandwith karena gambar tidak perlu dikirim ke server jarak jauh.</li>
        <li><strong>Keamanan Privasi 100%:</strong> File pribadi seperti KTP, pas foto, dan dokumen rahasia Anda tidak dapat dilihat oleh siapapun kecuali Anda.</li>
        <li><strong>Instan:</strong> Proses kompresi, crop, dan resize selesai dalam milidetik (jauh lebih cepat dibandingkan tools konvensional).</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { IMAGE_TOOLS } from '~/data/imageTools.js';

// SEO Meta Data
useSeoMeta({
  title: 'Image Tools Online Gratis | QuickTools',
  description:
    'Kumpulan Image tools gratis, cepat, dan 100% aman karena diproses di dalam browser. Resize, Compress, Crop, PNG ke JPG, JPG ke PNG.',
  ogTitle: 'Image Tools Online Gratis | QuickTools',
  ogDescription:
    'Kumpulan Image tools gratis, cepat, dan 100% aman karena diproses di dalam browser. Resize, Compress, Crop, PNG ke JPG, JPG ke PNG.',
});

// Load standard list of image tools
const tools = IMAGE_TOOLS;
</script>

<style scoped>
.tool-card {
  @apply bg-white border border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all cursor-pointer;
}
</style>
