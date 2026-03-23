<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
    <p v-if="description" class="mt-1 text-gray-500 text-sm">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
