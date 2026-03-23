<template>
  <div class="container-main py-10">
    <!-- Breadcrumb Menu -->
    <nav class="text-sm text-gray-400 mb-6">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">WhatsApp Tools</span>
    </nav>

    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">WhatsApp Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Kumpulan alat gratis untuk membantu optimasi sistem chat WhatsApp Anda. Buka chat WA tanpa simpan nomor, buat link wa.me otomatis, dan hasilkan barcode (QR Code).
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
    <div class="mt-16 bg-green-50 border border-green-100 rounded-xl p-6 sm:p-8">
      <h2 class="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
        <span class="text-xl">💬</span> Aman dan Cepat Tanpa Menyimpan Data
      </h2>
      <p class="text-green-800 text-sm leading-relaxed mb-4">
        Platform QuickTools menghargai privasi dan rutinitas Anda saat berselancar...
      </p>
      <ul class="list-disc pl-5 space-y-2 text-sm text-green-800">
        <li><strong>Keamanan Privasi:</strong> Setiap nomor telepon dan isi pesan yang diketik sama sekali tidak pernah dikirim atau direkam oleh database kami. Server berjalan murni secara lokal di piranti Anda.</li>
        <li><strong>Standar Resmi:</strong> Setiap Link mengikuti skema API resmi `wa.me` dan `api.whatsapp.com`.</li>
        <li><strong>Kompatibilitas Penuh:</strong> Mendukung diakses melalui PC, Mac, Android, maupun iOS/iPhone secara langsung (terpaut dengan aplikasi terpasang).</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { WA_TOOLS } from '~/data/waTools.js';

// SEO Meta Data
useSeoMeta({
  title: 'WhatsApp Tools Gratis (WA Link, Barcode, No Save) | QuickTools',
  description:
    'Tool gratis untuk chat WhatsApp langsung tanpa simpan nomor HP, membuat QR Code (barcode), dan tautan wa.me otomatis secara instan, gratis, & aman.',
  ogTitle: 'WhatsApp Tools Gratis | QuickTools',
  ogDescription:
    'Tool instant & aman untuk buka chat WA langsung tanpa save nomor, generate wa.me link, dan Whatsapp QR Barcode.',
});

// Load standard list of WA tools
const tools = WA_TOOLS;
</script>

<style scoped>
.tool-card {
  @apply bg-white border border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all cursor-pointer;
}
</style>
