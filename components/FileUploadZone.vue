<template>
  <!-- Drop zone -->
  <div
    class="relative border-2 border-dashed rounded-xl p-8 text-center transition-colors"
    :class="isDragging ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-primary-300 bg-gray-50'"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <input
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      @change="onInputChange"
    />

    <div class="pointer-events-none">
      <span class="text-4xl block mb-3">📁</span>
      <p class="font-semibold text-gray-700 mb-1">
        Seret file ke sini, atau <span class="text-primary-600">klik untuk memilih</span>
      </p>
      <p class="text-sm text-gray-400">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  accept: { type: String, default: '.pdf,application/pdf' },
  multiple: { type: Boolean, default: true },
  hint: { type: String, default: 'Hanya file PDF, maks 20MB per file' },
});

const emit = defineEmits(['files-selected']);

const isDragging = ref(false);
const inputRef = ref(null);

function onInputChange(event) {
  const files = Array.from(event.target.files || []);
  emit('files-selected', files);
  // Reset input so same file can be picked again
  event.target.value = '';
}

function onDrop(event) {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files || []).filter(
    (f) => f.type === 'application/pdf'
  );
  emit('files-selected', files);
}
</script>
