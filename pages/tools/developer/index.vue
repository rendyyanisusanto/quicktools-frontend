<template>
  <div class="container-main py-10">
    <!-- Breadcrumb Menu -->
    <nav class="text-sm text-gray-400 mb-6">
      <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-600">Developer Tools</span>
    </nav>

    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Developer Tools</h1>
    <p class="text-gray-500 mb-10 max-w-2xl">
      Perkakas (Toolkit) ringan, aman, dan tanpa pelacakan online untuk Software Engineer yang perlu melakukan encoding keamanan dan parsifikasi raw payload API.
    </p>

    <!-- Tool Cards Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.slug"
        :to="tool.path"
        class="tool-card flex flex-col gap-2 group"
      >
        <div class="flex items-center gap-2 mb-1">
           <svg v-if="tool.slug === 'json-formatter'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
           <svg v-else-if="tool.slug === 'base64-encoder'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
           <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
           <span class="font-semibold text-sm text-gray-800 group-hover:text-primary-600 transition-colors">
             {{ tool.title }}
           </span>
        </div>
        <span class="text-xs text-gray-400 line-clamp-2">{{ tool.shortDescription }}</span>
        <span class="text-xs font-medium text-primary-500 group-hover:text-primary-600 mt-auto">
          Coba Tool →
        </span>
      </NuxtLink>
    </div>

    <!-- Info Section block below grid -->
    <div class="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
      <h2 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
        <span class="text-xl">🛠️</span> Native & Aman untuk Data Sensitif (Zero-backend)
      </h2>
      <p class="text-slate-700 text-sm leading-relaxed mb-4">
        Jika Anda mencoba melakukan decode JWT JSON, mendecrypt Header Authorization Base64, atau mencetak identifier untuk Primary Key Database rahasia perusahaan Anda—menempelkan data pelanggan asli pada tool online bisa mengakibatkan risiko bocornya data rahasia.
      </p>
      <p class="text-slate-600 text-sm leading-relaxed font-semibold">
         Modul Developer Tools milik QuickTools menggaransi hal di atas dengan cara menggeser (Shifting) beban pemrosesan enkripsi kriptografis dan parsifikasi JSON kembali kepada memori V8 Browser lokal komputer Anda!
      </p>
    </div>
  </div>
</template>

<script setup>
import { DEVELOPER_TOOLS } from '~/data/developerTools.js';

// SEO Meta Data
useSeoMeta({
  title: 'Developer Tools Gratis (JSON, Base64, UUID) | QuickTools',
  description:
    'Tool developer offline-first gratis: JSON Formatter/Validator, Encode/Decode Base64 UTF-8, dan v4 UUID generator instan.',
  ogTitle: 'Developer Tools Online & Gratis | QuickTools',
  ogDescription:
    'Format JSON dan konversi Base-64 secara cepat, aman, dan nyaman tanpa backend.',
});

// Load standard list of Dev tools
const tools = DEVELOPER_TOOLS;
</script>

<style scoped>
.tool-card {
  @apply bg-white border border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all cursor-pointer;
}
</style>
