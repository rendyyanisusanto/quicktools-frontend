<template>
  <ToolPageLayout
    title="Case Converter Online Gratis"
    description="Ubah teks massal menjadi HURUF BESAR, huruf kecil, Title Case, atau Sentence case dengan 1 klik secara instan."
    category-path="/tools/text"
    category-label="Text Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Input Textarea -->
      <div class="mb-5 relative">
         <textarea
            v-model="inputText"
            rows="10"
            class="w-full p-5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y"
            placeholder="Tempel (Paste) teks Anda yang format kapitalisasinya berantakan ke area ini..."
         ></textarea>
      </div>

      <!-- Conversion Actions -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
         <button
            @click="applyCase('upper')"
            class="flex-1 min-w-[120px] px-4 py-3 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 font-semibold rounded-lg text-sm transition-colors border border-gray-200 hover:border-primary-300"
         >
            UPPERCASE
         </button>
         <button
            @click="applyCase('lower')"
            class="flex-1 min-w-[120px] px-4 py-3 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 font-semibold rounded-lg text-sm transition-colors border border-gray-200 hover:border-primary-300"
         >
            lowercase
         </button>
         <button
            @click="applyCase('title')"
            class="flex-1 min-w-[120px] px-4 py-3 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 font-semibold rounded-lg text-sm transition-colors border border-gray-200 hover:border-primary-300"
         >
            Title Case
         </button>
         <button
            @click="applyCase('sentence')"
            class="flex-1 min-w-[120px] px-4 py-3 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 font-semibold rounded-lg text-sm transition-colors border border-gray-200 hover:border-primary-300"
         >
            Sentence case
         </button>
      </div>

      <!-- Action Footer -->
      <div class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
         
         <!-- Reset Button -->
         <button
            v-if="inputText.length > 0"
            @click="reset"
            class="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Bersihkan Teks
         </button>
         <div v-else class="hidden sm:block"></div>

         <!-- Copy Button & Toast -->
         <div class="flex items-center gap-3 w-full sm:w-auto">
            <Transition name="fade">
               <span v-if="copied" class="text-xs text-green-600 font-medium">Berhasil Disalin!</span>
            </Transition>
            <button
               @click="copyResult"
               :disabled="inputText.length === 0"
               class="bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors px-6 py-3 w-full sm:w-auto justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
               Salin Hasil
            </button>
         </div>

      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Memperbaiki Karakter Kapitalisasi Berantakan</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Seringkali kita menemui teks dari internet yang ditulis sepenuhnya menggunakan tombol CAPSLOCK. Atau sekadar ingin merapikan format tulisan menjadi Huruf Kapital Setiap Awal Kata (Title Case) demi kepentingan judul cover laporan akademis. Tanpa repot mengulang ketikan satu per satu, tool ini menyelaraskan susunan teks Anda secepat kilat.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Kerja Formatter Huruf</h2>
      <ol class="space-y-3">
        <li
          v-for="(step, i) in toolData.howToSteps"
          :key="i"
          class="flex items-start gap-3"
        >
          <span class="shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-600 text-sm font-bold flex items-center justify-center">
            {{ i + 1 }}
          </span>
          <span class="text-gray-600 text-sm pt-1">{{ step }}</span>
        </li>
      </ol>
    </section>

    <!-- FAQ -->
    <FAQSection :items="toolData.faq" />

    <!-- RELATED TOOLS -->
    <RelatedToolsSection :tools="relatedTools" />

    <!-- BACK -->
    <div class="mt-10">
      <NuxtLink to="/tools/text" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua Text Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref } from 'vue';
import { getTextTool, getRelatedTextTools } from '~/data/textTools.js';
import { convertToUpperCase, convertToLowerCase, convertToTitleCase, convertToSentenceCase } from '~/utils/textTools.js';

// Metadata
const toolData = getTextTool('case-converter');
const relatedTools = getRelatedTextTools(toolData.relatedTools);

// SEO
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: toolData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    },
  ],
});

// State
const inputText = ref('');
const copied = ref(false);

// Actions
function applyCase(type) {
   if (!inputText.value) return;
   
   switch(type) {
      case 'upper':
         inputText.value = convertToUpperCase(inputText.value);
         break;
      case 'lower':
         inputText.value = convertToLowerCase(inputText.value);
         break;
      case 'title':
         inputText.value = convertToTitleCase(inputText.value);
         break;
      case 'sentence':
         inputText.value = convertToSentenceCase(inputText.value);
         break;
   }
}

async function copyResult() {
   if (!inputText.value) return;
   try {
      await navigator.clipboard.writeText(inputText.value);
      copied.value = true;
      setTimeout(() => copied.value = false, 3000);
   } catch (err) {
      console.error('Failed to copy', err);
   }
}

function reset() {
  inputText.value = '';
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
