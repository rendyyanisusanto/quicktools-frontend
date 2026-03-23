<template>
  <div class="container-main py-10">
    <nav class="text-sm text-gray-400 mb-6">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">PDF Tools</span>
    </nav>

    <h1 class="text-3xl font-bold text-gray-900 mb-2">PDF Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Kumpulan tools PDF gratis untuk menggabungkan, memisahkan, mengompres, dan mengonversi file PDF secara online.
    </p>

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
  </div>
</template>

<script setup>
import { PDF_TOOLS } from '~/data/pdfTools.js';

useSeoMeta({
  title: 'PDF Tools Online Gratis | QuickTools',
  description:
    'Kumpulan tools PDF gratis: merge, split, compress, JPG ke PDF, dan PDF ke JPG. Tanpa instal, langsung di browser.',
});

const tools = PDF_TOOLS;
</script>
