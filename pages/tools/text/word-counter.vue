<template>
  <ToolPageLayout
    title="Word Counter Online Gratis"
    description="Hitung total kata, karakter, paragraf, dan kalimat pada teks esai atau artikel Anda secara otomatis dan real-time tanpa batas limit."
    category-path="/tools/text"
    category-label="Text Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Stats Grid Result Panel (Top) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
         <!-- Card: Words -->
         <div class="bg-primary-50 border border-primary-100 rounded-xl p-4 text-center">
            <span class="block text-2xl font-bold text-primary-700" :key="'w'+stats.words">{{ stats.words }}</span>
            <span class="text-xs font-semibold uppercase text-primary-600 tracking-wider">Total Kata</span>
         </div>
         <!-- Card: Chars -->
         <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <span class="block text-2xl font-bold text-gray-700" :key="'c'+stats.chars">{{ stats.chars }}</span>
            <span class="text-xs font-semibold uppercase text-gray-500 tracking-wider">Karakter</span>
         </div>
         <!-- Card: Chars (No Spaces) -->
         <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <span class="block text-2xl font-bold text-gray-700" :key="'cs'+stats.charsNoSpace">{{ stats.charsNoSpace }}</span>
            <span class="text-xs font-semibold uppercase text-gray-500 tracking-wider">Tanpa Spasi</span>
         </div>
         <!-- Card: Paragraphs -->
         <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <span class="block text-2xl font-bold text-gray-700" :key="'p'+stats.paragraphs">{{ stats.paragraphs }}</span>
            <span class="text-xs font-semibold uppercase text-gray-500 tracking-wider">Paragraf</span>
         </div>
      </div>

      <!-- Input Textarea -->
      <div class="mb-5 relative">
         <textarea
            v-model="inputText"
            @input="handleInput"
            rows="12"
            class="w-full p-5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y"
            placeholder="Ketik atau tempel (Paste) teks Anda ke sini untuk mulai menghitung..."
         ></textarea>
         
         <!-- Sentence count subtles -->
         <div class="absolute bottom-4 right-5 text-xs font-medium text-gray-400 pointer-events-none">
            Total Kalimat: {{ stats.sentences }}
         </div>
      </div>

      <!-- Action button -->
      <div class="pt-2 flex justify-start">
         <button
            v-if="inputText.length > 0"
            @click="reset"
            class="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Bersihkan Teks
         </button>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Kecepatan & Akurasi Real-time</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Bagi kebanyakan mahasiswa, asisten peneliti, SEO Specialist, hingga pekerja content media sosial (X/Twitter, LinkedIn, dsb)—mematuhi kuota limit karakter minimum maupun maksimum adalah kewajiban yang krusial. Alat ini memberikan respon interaktif sedetik demi sedetik tanpa jeda muat ulang halaman.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menghitung Kata (Word Count)</h2>
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
import { countWords, countCharacters, countSentences, countParagraphs } from '~/utils/textTools.js';

// Metadata
const toolData = getTextTool('word-counter');
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
const stats = reactive({
   words: 0,
   chars: 0,
   charsNoSpace: 0,
   sentences: 0,
   paragraphs: 0
});

// Actions
function handleInput() {
   stats.words = countWords(inputText.value);
   stats.chars = countCharacters(inputText.value, false);
   stats.charsNoSpace = countCharacters(inputText.value, true);
   stats.sentences = countSentences(inputText.value);
   stats.paragraphs = countParagraphs(inputText.value);
}

function reset() {
  inputText.value = '';
  handleInput(); // recalculate back to zero
}
</script>
