<template>
  <ToolPageLayout
    title="Kalkulator Umur Gratis"
    description="Tahukah Anda berapa persis usia Anda dalam Hari dan Bulan? Masukkan tanggal lahir Anda dan biarkan kalkulator akurat ini merincinya secara spesifik."
    category-path="/tools/calculator"
    category-label="Calculator Tools"
  >
    <ToolActionCard>
      
      <!-- Split Form and Output -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
         
         <!-- Left: Input Form -->
         <div class="flex flex-col space-y-5 border border-gray-100 p-5 rounded-xl bg-gray-50">
            <div>
               <label class="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kelahiran</label>
               <input v-model="dobStr" type="date" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium text-gray-800" />
            </div>
            
            <div class="pt-2">
               <label class="block text-sm font-semibold text-gray-700 mb-2">Bandingkan Dengan Tanggal</label>
               <input v-model="compareDateStr" type="date" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium text-gray-800" />
               <p class="text-xs text-gray-400 mt-2 italic">*Secara otomatis di-set ke hari ini.</p>
            </div>
            
            <button @click="reset" class="text-xs text-red-500 hover:text-red-700 font-medium self-start">
               ↻ Reset Tanggal
            </button>
         </div>

         <!-- Right: Result Area -->
         <div class="flex flex-col h-full justify-center">
            
            <div v-if="result.error" class="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
               ⚠️ {{ result.error }}
            </div>
            
            <div v-else-if="result.valid" class="grid grid-cols-3 gap-3">
               
               <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center col-span-3">
                  <span class="block text-5xl font-black text-blue-700 mb-1">{{ result.years }}</span>
                  <span class="text-sm font-bold uppercase text-blue-600 tracking-wider">Tahun Kelahiran</span>
               </div>
               
               <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center col-span-3 sm:col-span-1">
                  <span class="block text-3xl font-black text-indigo-700 mb-1">{{ result.months }}</span>
                  <span class="text-xs font-bold uppercase text-indigo-600 tracking-wider">Bulan</span>
               </div>
               
               <div class="bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-center col-span-3 sm:col-span-2 flex flex-col justify-center">
                  <span class="block text-3xl font-black text-cyan-700 mb-1">{{ result.days }}</span>
                  <span class="text-xs font-bold uppercase text-cyan-600 tracking-wider">Sisa Hari Tepatnya</span>
               </div>
               
               <div class="col-span-3 mt-4 text-center">
                  <p class="text-sm font-medium text-gray-600">
                     Jadi usia spesifik tersebut adalah <strong class="text-gray-900">{{ result.years }} Tahun, {{ result.months }} Bulan, & {{ result.days }} Hari.</strong>
                  </p>
               </div>
            </div>
            
            <div v-else class="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
               <span class="text-sm text-gray-400 font-medium text-center">Silakan pilih tanggal lahir Anda di kalender kiri.</span>
            </div>

         </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Kegunaan Real-Life Kalkulasi Ini</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Saat mengisi formulir maskapai penerbangan untuk harga tiket bayi (infant) vs balita, atau pendaftaran Calon Pegawai Negeri (CPNS) yang sering meminta batasan "Usia Maksimal 35 Tahun 0 Bulan 0 Hari"--perhitungan teliti soal tahun kabisat dan fluktuasi hari adalah mutlak. Alat Age Calculator ini memastikan akurasi data presisi tersebut.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memulai Pengukuran Umur</h2>
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
      <NuxtLink to="/tools/calculator" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua Calculator Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCalculatorTool, getRelatedCalculatorTools } from '~/data/calculatorTools.js';
import { calculateAge } from '~/utils/calculatorTools.js';

// Metadata
const toolData = getCalculatorTool('age-calculator');
const relatedTools = getRelatedCalculatorTools(toolData.relatedTools);

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

// Calculate Timezone safe 'today' format YYYY-MM-DD
const dateNow = new Date();
const todayFormatted = new Date(dateNow.getTime() - (dateNow.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

// State
const dobStr = ref('');
const compareDateStr = ref(todayFormatted);

// Computations
const result = computed(() => {
   return calculateAge(dobStr.value, compareDateStr.value);
});

function reset() {
  dobStr.value = '';
  compareDateStr.value = todayFormatted;
}
</script>
