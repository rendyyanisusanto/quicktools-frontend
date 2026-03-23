<template>
  <section class="mt-12">
    <h2 class="text-xl font-bold text-gray-900 mb-4">Tools PDF Lainnya</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.slug"
        :to="tool.path"
        class="tool-card flex flex-col gap-1 group"
      >
        <span class="font-semibold text-sm text-gray-800 group-hover:text-primary-600 transition-colors">
          {{ tool.title }}
        </span>
        <span class="text-xs text-gray-400 line-clamp-2">{{ tool.shortDescription }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tools: {
    type: Array,
    required: true,
    // [{ slug, title, path, shortDescription }]
  },
});
</script>
