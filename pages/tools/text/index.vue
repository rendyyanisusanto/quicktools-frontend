<template>
  <div class="container-main py-10">
    <!-- Breadcrumb Menu -->
    <nav class="text-sm text-gray-400 mb-6">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">Text Tools</span>
    </nav>

    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Text Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Perangkat pengolah kata online untuk memanipulasi, memformat, dan membersihkan teks massal secara instan dari browser tanpa upload data.
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
        <span class="text-xl">✍️</span> Menulis dan Memformat Lebih Cepat
      </h2>
      <p class="text-blue-800 text-sm leading-relaxed mb-4">
        Modul QuickTools ini diciptakan khusus bagi para penulis, jurnalis, mahasiswa (keperluan Skripsi/Makalah), admin data, dan programmer.
      </p>
      <ul class="list-disc pl-5 space-y-2 text-sm text-blue-800">
        <li><strong>Word Counter:</strong> Hindari penolakan pendaftaran institusi yang mensyaratkan "Max 500 Kata" atau Limit Karakter media sosial (seperti Twitter/X).</li>
        <li><strong>Case Converter:</strong> Jangan mengetik ulang artikel panjang yang secara tak sengaja di-ketik dalam mode CAPSLOCK!</li>
        <li><strong>Duplicate Text:</strong> Solusi rahasia para digital marketer dalam membersihkan beribu-ribu daftar Data/Kontak (Scraping) menjadi daftar yang bersih dalam sedetik.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { TEXT_TOOLS } from '~/data/textTools.js';

// SEO Meta Data
useSeoMeta({
  title: 'Text Tools & Word Counter Gratis | QuickTools',
  description:
    'Tool pengolahan teks online: Hitung kata, karakter, kapitalisasi huruf (case converter), dan pembersih teks duplikat (remove duplicate) dengan satu klik gratis.',
  ogTitle: 'Text Tools & Word Counter Gratis | QuickTools',
  ogDescription:
    'Kumpulan aplikasi pemroses barisan teks berukuran massal instan aman di browser.',
});

// Load standard list of Text tools
const tools = TEXT_TOOLS;
</script>

<style scoped>
.tool-card {
  @apply bg-white border border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all cursor-pointer;
}
</style>
