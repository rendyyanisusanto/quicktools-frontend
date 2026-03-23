<template>
  <div
    class="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors relative"
    :class="[
      isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100',
    ]"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <!-- Hidden File Input -->
    <input
      type="file"
      ref="fileInput"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
    />

    <!-- Icon -->
    <div class="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-2xl">
      🖼️
    </div>

    <!-- Text -->
    <p class="text-sm font-semibold text-gray-700 text-center mb-1">
      <span class="text-primary-600">Klik untuk upload</span> atau seret file gambar ke sini
    </p>
    <p class="text-xs text-gray-400 text-center max-w-xs mx-auto">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  accept: {
    type: String,
    default: 'image/jpeg, image/png, image/webp'
  },
  hint: {
    type: String,
    default: 'Mendukung JPG, PNG, WEBP (Max 20MB)'
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['files-selected']);

const fileInput = ref(null);
const isDragging = ref(false);

function onDragOver() {
  isDragging.value = true;
}

function onDragLeave() {
  isDragging.value = false;
}

function onDrop(e) {
  isDragging.value = false;
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    emitFiles(files);
  }
}

function onFileChange(e) {
  const files = e.target.files;
  if (files && files.length > 0) {
    emitFiles(files);
  }
  // Reset input so the same file can be selected again if needed
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function emitFiles(fileList) {
  emit('files-selected', fileList);
}
</script>
