<template>
  <ToolPageLayout
    title="Kalkulator Nilai Rata-Rata Gratis"
    description="Hitung nilai rata-rata kelas, ujian, atau tugas secara instan. Pisahkan setiap nilai dengan koma atau Enter (Baris Baru) untuk otomatis memperbarui hasil."
    category-path="/tools/edu"
    category-label="Education Tools"
  >
    <ToolActionCard>
      
      <!-- Stats Grid Result Panel (Top) -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
         <!-- Card: Average -->
         <div class="bg-primary-50 border border-primary-100 rounded-xl p-4 text-center">
            <span class="block text-3xl font-bold text-primary-700">{{ stats.average }}</span>
            <span class="text-xs font-semibold uppercase text-primary-600 tracking-wider">Rata-Rata</span>
         </div>
         <!-- Card: Total Accumulated -->
         <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <span class="block text-2xl font-bold text-gray-700">{{ stats.total }}</span>
            <span class="text-xs font-semibold uppercase text-gray-500 tracking-wider">Total Nilai</span>
         </div>
         <!-- Card: Item Count -->
         <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center md:col-span-1 col-span-2">
            <span class="block text-2xl font-bold text-gray-700">{{ stats.count }}</span>
            <span class="text-xs font-semibold uppercase text-gray-500 tracking-wider">Jumlah Siswa/Data</span>
         </div>
      </div>

      <!-- Input Textarea -->
      <div class="mb-5 relative">
         <label class="block text-sm font-semibold text-gray-700 mb-2">Daftar Nilai (Pisahkan dengan koma / enter)</label>
         <textarea
            v-model="inputText"
            @input="handleInput"
            rows="6"
            class="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y shadow-inner"
            placeholder="Contoh:&#10;80.5&#10;90&#10;75&#10;85, 92, 88"
         ></textarea>
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
            Bersihkan Nilai
         </button>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Hitung Rapor yang Praktis</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Pekerjaan wali kelas menjelang pembagian rapor selalu dipenuhi oleh rekap nilai. Daripada harus membuka aplikasi Spreadsheet (Excel) yang berat hanya untuk tugas perhitungan sederhana, Anda bisa menempelkan (Paste) lajur skor ujian anak didik Anda langsung ke kalkulator web QuickTools ini.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menggunakan</h2>
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
      <NuxtLink to="/tools/edu" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua Education Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getEducationTool, getRelatedEducationTools } from '~/data/educationTools.js';
import { parseScores, calculateAverageScore } from '~/utils/educationTools.js';

// Metadata
const toolData = getEducationTool('average-score-calculator');
const relatedTools = getRelatedEducationTools(toolData.relatedTools);

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
   average: 0,
   total: 0,
   count: 0
});

// Actions
function handleInput() {
   const scoresArray = parseScores(inputText.value);
   const result = calculateAverageScore(scoresArray);
   stats.average = result.average;
   stats.total = result.total;
   stats.count = result.count;
}

function reset() {
  inputText.value = '';
  handleInput(); // recalculate back to zero
}
</script>
