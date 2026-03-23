<template>
  <div class="container-main py-10">
    <!-- Breadcrumb Menu -->
    <nav class="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">Education Tools</span>
    </nav>

    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Education Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Perangkat digital spesifik pendidikan untuk memudahkan guru, wali kelas, dan siswa dalam melakukan perhitungan nilai dan administrasi sekolah.
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
        <span class="text-xl">🎓</span> Mudahkan Tugas Mengajar & Belajar
      </h2>
      <p class="text-blue-800 text-sm leading-relaxed mb-4">
        Sebagai pendidik, merekap nilai adalah tugas rutin harian. Mengatur puluhan ranking siswa manual dapat memakan waktu. Modul Education di QuickTools didesain gratis tanpa batasan penggunaan.
      </p>
      <ul class="list-disc pl-5 space-y-2 text-sm text-blue-800">
        <li><strong>Average Score Calculator:</strong> Otomatisasi perhitungan rata-rata nilai UTS, UAS, dan harian untuk rapor secara bersih dan cepat.</li>
        <li><strong>Ranking Calculator:</strong> Urutkan puluhan baris data siswa dan raih hasil pemeringkatan dengan perlindungan nilai validasi aman di perangkat.</li>
        <li><strong>Permission Letter Generator:</strong> Orang tua dapat menghasilkan salinan format izin yang formal, baku, dan pantas tanpa menekan tombol print.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { EDUCATION_TOOLS } from '~/data/educationTools.js';

// SEO Meta Data
useSeoMeta({
  title: 'Education Tools | Kalkulator Nilai & Ranking Gratis | QuickTools',
  description:
    'Tool pengolahan pendidikan online: Hitung rata-rata nilai, urutkan ranking siswa, dan generate surat izin sekolah gratis.',
  ogTitle: 'Education Tools Gratis | QuickTools',
  ogDescription:
    'Kumpulan aplikasi digital membantu kinerja rekapitulasi nilai oleh guru dan siswa seketika aman di browser.',
});

// Load standard list of tools
const tools = EDUCATION_TOOLS;
</script>

<style scoped>
.tool-card {
  @apply bg-white border border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all cursor-pointer;
}
</style>
