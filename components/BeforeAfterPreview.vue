<template>
  <div 
    class="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-checkerboard shadow-sm"
    @mousemove="handleDrag"
    @touchmove="handleDrag"
    @mouseup="stopDrag"
    @touchend="stopDrag"
    @mouseleave="stopDrag"
    ref="containerRef"
  >
    <!-- Before Image (Base) -->
    <img 
      :src="beforeImage" 
      class="block w-full h-auto object-contain max-h-[60vh] mx-auto pointer-events-none"
      alt="Before"
    />

    <!-- After Image (Overlay) -->
    <div 
      class="absolute inset-0 overflow-hidden"
      :style="{ width: `${sliderPosition}%` }"
    >
      <img 
        :src="afterImage" 
        class="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        :style="{ width: `${100 / (sliderPosition / 100)}%` }"
        alt="After"
      />
    </div>

    <!-- Slider Handle -->
    <div 
      class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize opacity-80 shadow-md hover:bg-primary-400 hover:w-2 transition-all"
      :style="{ left: `calc(${sliderPosition}% - 2px)` }"
      @mousedown.prevent="startDrag"
      @touchstart.prevent="startDrag"
    >
      <!-- Center Circle -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none border border-gray-200">
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
        </svg>
      </div>
    </div>
    
    <!-- Badges -->
    <div class="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium z-10 pointer-events-none">
      Sesudah
    </div>
    <div class="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium z-10 pointer-events-none">
      Sebelum
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  beforeImage: {
    type: String,
    required: true
  },
  afterImage: {
    type: String,
    required: true
  }
});

const containerRef = ref(null);
const sliderPosition = ref(50);
const isDragging = ref(false);

const startDrag = () => {
  isDragging.value = true;
};

const stopDrag = () => {
  isDragging.value = false;
};

const handleDrag = (event) => {
  if (!isDragging.value || !containerRef.value) return;

  let clientX;
  if (event.type.startsWith('touch')) {
    clientX = event.touches[0].clientX;
  } else {
    clientX = event.clientX;
  }

  const containerRect = containerRef.value.getBoundingClientRect();
  let x = clientX - containerRect.left;
  
  // Constrain to container
  if (x < 0) x = 0;
  if (x > containerRect.width) x = containerRect.width;

  sliderPosition.value = (x / containerRect.width) * 100;
};
</script>

<style scoped>
.bg-checkerboard {
  background-color: #f1f1f1;
  background-image: 
    linear-gradient(45deg, #e5e5e5 25%, transparent 25%, transparent 75%, #e5e5e5 75%, #e5e5e5), 
    linear-gradient(45deg, #e5e5e5 25%, transparent 25%, transparent 75%, #e5e5e5 75%, #e5e5e5);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
</style>
