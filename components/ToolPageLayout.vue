<template>
  <div class="min-h-screen bg-white">
    <div class="container-main py-10">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <NuxtLink to="/" class="hover:text-primary-500">Beranda</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink :to="categoryPath" class="hover:text-primary-500">{{ categoryLabel }}</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-600">{{ title }}</span>
      </nav>

      <!-- Page heading -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h1>
        <p class="text-gray-500 max-w-2xl">{{ description }}</p>
      </div>

      <!-- Tool slot -->
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  categoryPath: { type: String, default: '/' },
  categoryLabel: { type: String, default: 'Tools' },
});
</script>
