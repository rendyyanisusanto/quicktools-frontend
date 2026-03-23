<template>
  <div class="container-main py-10">
    <!-- Breadcrumb Menu -->
    <nav class="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">Calculator Tools</span>
    </nav>

    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Calculator Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Perangkat digital praktis untuk menghitung diskon harga promosi, analisis data persentase untung rugi, perhitungan umur instan sehari-hari.
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
        <span class="text-xl">🧮</span> Kalkulasi Praktis di Genggaman Anda
      </h2>
      <p class="text-blue-800 text-sm leading-relaxed mb-4">
        Saat Anda butuh alat bantu yang dirancang lebih spesifik ketimbang kalkulator bawaan handphone, Calculator Tools hadir memberikan kerangka visual yang disesuaikan dengan logika penggunaan sebenarnya.
      </p>
      <ul class="list-disc pl-5 space-y-2 text-sm text-blue-800">
        <li><strong>Discount Calculator:</strong> Mengetahui secara pasti harga net setelah pajak maupun harga promo yang dipasang di etalase mall.</li>
        <li><strong>Percentage Calculator:</strong> Mengevaluasi performa bisnis atau membandingkan perbedaan margin dengan tool siap pakai.</li>
        <li><strong>Age Calculator:</strong> Keperluan formulir validasi yang mensyaratkan hitungan detail hari, bulan, tahun umur Anda dan anak-anak.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { CALCULATOR_TOOLS } from '~/data/calculatorTools.js';

// SEO Meta Data
useSeoMeta({
  title: 'Calculator Tools | Kalkulator Persen, Diskon & Umur Gratis | QuickTools',
  description:
    'Kumpulan kalkulator spesifik online: Hitung diskon belanja, cari persentase data, bandingkan usia akurat dengan mudah.',
  ogTitle: 'Calculator Tools Gratis | QuickTools',
  ogDescription:
    'Aplikasi kalkulasi hitungan persentase dan selisih angka instan aman di browser.',
});

// Load standard list of tools
const tools = CALCULATOR_TOOLS;
</script>

<style scoped>
.tool-card {
  @apply bg-white border border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all cursor-pointer;
}
</style>
