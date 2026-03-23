<template>
  <NuxtLink :to="tool.path" class="tool-card flex flex-col gap-2 group">
    <!-- Tool title -->
    <h3 class="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors text-sm">
      {{ tool.title }}
    </h3>

    <!-- Tool description -->
    <p class="text-gray-500 text-xs leading-relaxed line-clamp-2">
      {{ tool.description }}
    </p>

    <!-- "Try it" link affordance -->
    <span class="text-xs font-medium text-primary-500 group-hover:text-primary-600 mt-auto">
      Try it →
    </span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  tool: {
    type: Object,
    required: true,
  },
});
</script>
