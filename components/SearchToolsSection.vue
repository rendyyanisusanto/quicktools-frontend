<template>
  <section class="py-8 bg-gray-50 border-y border-gray-100">
    <div class="container-main">
      <div class="max-w-xl mx-auto">
        <label for="tool-search" class="sr-only">Search tools</label>
        <div class="relative">
          <!-- Search icon -->
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" aria-hidden="true">🔍</span>
          <input
            id="tool-search"
            type="search"
            :value="modelValue"
            placeholder="Search tools… e.g. merge pdf, word counter"
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>
