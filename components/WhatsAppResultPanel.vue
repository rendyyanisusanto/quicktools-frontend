<template>
  <div class="mt-6 border-t border-gray-100 pt-6">
    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hasil Tautan (Link)</label>
    
    <div class="flex flex-col sm:flex-row gap-3 items-center">
      <!-- Input Copy -->
      <div class="relative w-full">
        <input 
          type="text" 
          :value="link" 
          readonly
          class="w-full bg-gray-50 border border-gray-200 text-gray-600 rounded-lg pl-4 pr-12 py-3 text-sm outline-none focus:ring-2 ring-primary-500 transition-shadow transition-colors"
        />
        <button 
          @click="copyText(link)" 
          class="absolute right-2 top-1.5 p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-800 transition-colors"
          title="Copy Link"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      <!-- Action Button -->
      <a 
        :href="link" 
        target="_blank" 
        rel="noopener noreferrer"
        class="w-full sm:w-auto shrink-0 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        Buka Chat
      </a>
    </div>

    <!-- Small Toast Note -->
    <Transition name="fade">
      <p v-if="copied" class="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Tautan berhasil disalin ke clipboard!
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  link: {
    type: String,
    required: true
  }
});

const copied = ref(false);

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 3000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
