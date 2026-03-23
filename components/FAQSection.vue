<template>
  <section class="mt-12">
    <h2 class="text-xl font-bold text-gray-900 mb-4">Pertanyaan Umum</h2>
    <div class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="border border-gray-100 rounded-xl overflow-hidden"
      >
        <button
          class="w-full text-left flex items-center justify-between px-5 py-4 font-medium text-gray-800 hover:bg-gray-50 transition-colors"
          @click="toggle(index)"
          :aria-expanded="openIndex === index"
        >
          <span>{{ item.question }}</span>
          <span class="text-gray-400 ml-4 shrink-0">{{ openIndex === index ? '▲' : '▼' }}</span>
        </button>
        <div v-show="openIndex === index" class="px-5 pb-4 text-gray-500 text-sm leading-relaxed">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  items: {
    type: Array,
    required: true,
    // [{ question: String, answer: String }]
  },
});

const openIndex = ref(0);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>
