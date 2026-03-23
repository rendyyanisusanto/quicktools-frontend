<template>
  <ToolPageLayout
    title="Remove Duplicate Text Gratis"
    description="Hapus baris teks, angka, maupun urutan nama yang terduplikat dan berulang. Solusi cepat mengolah raw data menjadi unik."
    category-path="/tools/text"
    category-label="Text Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Split View for Original and Cleaned (or Single depending on state) -->
      <div v-if="state === 'idle'" class="mb-5 relative">
         <label class="block text-sm font-semibold text-gray-700 mb-2">Daftar Mentah (Pisahkan setiap item dengan baris baru / Enter)</label>
         <textarea
            v-model="inputText"
            rows="10"
            class="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y"
            placeholder="Ketik baris data Anda di sini:&#10;Nanas&#10;Apel&#10;Nanas&#10;Mangga&#10;&#10;(Nanas akan dihapus dari daftar karena sudah ada di atas)"
         ></textarea>
      </div>

      <!-- Action Area for Idle State -->
      <div v-if="state === 'idle'" class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
         <button
            @click="reset"
            class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-semibold transition-colors flex items-center w-full sm:w-auto text-center justify-center gap-2"
         >
            Reset
         </button>
         
         <button
            @click="removeDuplicates"
            :disabled="inputText.length === 0"
            class="bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors px-6 py-3 w-full sm:w-auto justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Bersihkan Duplikat
         </button>
      </div>

      <!-- Result State -->
      <Transition name="fade">
         <div v-if="state === 'success'" class="mt-2">
            
            <div class="flex items-center justify-between mb-4">
               <h3 class="text-sm font-bold text-gray-800">📋 Hasil Daftar Unik:</h3>
               <button @click="backToInput" class="text-xs text-primary-600 hover:text-primary-800 font-medium">← Kembali Edit Mentah</button>
            </div>

            <!-- Stats Boxes -->
            <div class="grid grid-cols-3 gap-3 mb-4">
               <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                  <span class="block text-xl font-bold text-gray-700">{{ resultStats.original }}</span>
                  <span class="text-[10px] font-semibold uppercase text-gray-500">Baris Awal</span>
               </div>
               <div class="bg-red-50 border border-red-100 rounded-lg p-3 text-center relative overflow-hidden">
                  <span class="block text-xl font-bold text-red-600">-{{ resultStats.removed }}</span>
                  <span class="text-[10px] font-semibold uppercase text-red-500">Duplikat Terhapus</span>
               </div>
               <div class="bg-green-50 border border-green-100 rounded-lg p-3 text-center">
                  <span class="block text-xl font-bold text-green-700">{{ resultStats.final }}</span>
                  <span class="text-[10px] font-semibold uppercase text-green-600">Baris Unik</span>
               </div>
            </div>

            <textarea
               readonly
               :value="outputText"
               rows="10"
               class="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none resize-y"
            ></textarea>

            <div class="mt-4 flex flex-col sm:flex-row justify-end items-center gap-4">
               <Transition name="fade">
                  <span v-if="copied" class="text-xs text-green-600 font-medium">Berhasil Disalin!</span>
               </Transition>
               <button
                  @click="copyResult"
                  class="bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors px-6 py-3 w-full sm:w-auto justify-center flex items-center gap-2"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Salin Hasil
               </button>
            </div>

         </div>
      </Transition>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Sortir Ulang dan Mengamankan Database</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Pernahkah Anda menarik puluhan baris data pelanggan ke Excel namun tak sengaja menyertakan daftar yang sama secara dua atau tiga kali ganda? Tool "Remove Duplicates" akan secara logis menahan nilai paling atas dan membuang semua kembarannya yang terdapat di bagian bawahnya. Sehingga menghasilkan daftar absolut unik tanpa merusak urutan asli.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menghapus Duplikasi Teks Massal</h2>
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
import { ref, reactive } from 'vue';
import { getTextTool, getRelatedTextTools } from '~/data/textTools.js';
import { removeDuplicateLines } from '~/utils/textTools.js';

// Metadata
const toolData = getTextTool('remove-duplicate-text');
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
const state = ref('idle'); // idle | success
const inputText = ref('');
const outputText = ref('');
const copied = ref(false);

const resultStats = reactive({
   original: 0,
   removed: 0,
   final: 0
});

// Actions
function removeDuplicates() {
   if (!inputText.value.trim()) return;
   
   const extracted = removeDuplicateLines(inputText.value);
   
   outputText.value = extracted.result;
   resultStats.original = extracted.originalLines;
   resultStats.removed = extracted.removedLines;
   resultStats.final = extracted.finalLines;
   
   state.value = 'success';
}

function backToInput() {
   state.value = 'idle';
   outputText.value = '';
}

async function copyResult() {
   if (!outputText.value) return;
   try {
      await navigator.clipboard.writeText(outputText.value);
      copied.value = true;
      setTimeout(() => copied.value = false, 3000);
   } catch (err) {
      console.error('Failed to copy', err);
   }
}

function reset() {
  inputText.value = '';
  outputText.value = '';
  state.value = 'idle';
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
