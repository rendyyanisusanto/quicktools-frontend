<template>
  <ToolPageLayout
    title="Kalkulator Persentase Gratis"
    description="Hitung nilai persentase secara komprehensif lewat 3 metode: Mencari Persen, Persentase Angka, hingga Selisih Kenaiak/Penurunan margin bisnis Anda."
    category-path="/tools/calculator"
    category-label="Calculator Tools"
  >
    <ToolActionCard>
      
      <!-- Mode Selection -->
      <div class="flex flex-wrap gap-2 mb-8 bg-gray-50 p-2 rounded-lg border border-gray-200">
         <button @click="mode = 1" :class="mode === 1 ? 'bg-white shadow text-primary-700 font-bold border-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-transparent'" class="flex-1 py-2 px-3 text-sm rounded-md border transition-all text-center">
            Pecahan 1
         </button>
         <button @click="mode = 2" :class="mode === 2 ? 'bg-white shadow text-primary-700 font-bold border-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-transparent'" class="flex-1 py-2 px-3 text-sm rounded-md border transition-all text-center">
            Proporsi 2
         </button>
         <button @click="mode = 3" :class="mode === 3 ? 'bg-white shadow text-primary-700 font-bold border-gray-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-transparent'" class="flex-1 py-2 px-3 text-sm rounded-md border transition-all text-center">
            Kenaikan/Turun 3
         </button>
      </div>

      <!-- Logic Container -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100">
         
         <!-- Inputs based on mode -->
         <div class="flex flex-col space-y-4">
            
            <!-- MODE 1 -->
            <template v-if="mode === 1">
               <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-700 whitespace-nowrap">Berapa</span>
                  <input v-model.number="m1.percent" type="number" class="w-24 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center" placeholder="10">
                  <span class="font-bold text-gray-700">%</span>
               </div>
               <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-700 whitespace-nowrap">Dari Angka</span>
                  <input v-model.number="m1.value" type="number" class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center" placeholder="50000">
               </div>
            </template>

            <!-- MODE 2 -->
            <template v-if="mode === 2">
               <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-700 whitespace-nowrap">Angka</span>
                  <input v-model.number="m2.valX" type="number" class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center" placeholder="50">
               </div>
               <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-700 whitespace-nowrap text-sm">Itu berapa % dari Angka</span>
               </div>
               <div class="flex items-center gap-3">
                  <input v-model.number="m2.valY" type="number" class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center" placeholder="200">
                  <span class="font-bold text-gray-700">?</span>
               </div>
            </template>

            <!-- MODE 3 -->
            <template v-if="mode === 3">
               <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-700 whitespace-nowrap">Dari Angka Awal</span>
                  <input v-model.number="m3.oldValue" type="number" class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center" placeholder="1000">
               </div>
               <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-700 whitespace-nowrap">Jadi Angka Akhir</span>
                  <input v-model.number="m3.newValue" type="number" class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center" placeholder="1250">
               </div>
            </template>
            
            <button @click="reset" class="text-xs text-red-500 hover:text-red-700 font-medium self-start mt-2">Reset</button>
         </div>
         
         <!-- Output based on mode -->
         <div class="flex flex-col items-center md:items-start md:border-l border-gray-200 md:pl-8 h-full justify-center">
            <span class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Hasil Perhitungan</span>
            
            <div class="text-4xl lg:text-5xl font-black text-primary-600 mt-2">
               <template v-if="mode === 1">
                  {{ formatNumber(resM1.result) }}
               </template>
               
               <template v-if="mode === 2">
                  <span v-if="resM2.valid">{{ formatNumber(resM2.result) }}%</span>
                  <span v-else class="text-gray-300">0%</span>
               </template>
               
               <template v-if="mode === 3">
                  <div class="flex items-center gap-2" v-if="resM3.valid">
                     <span :class="resM3.isIncrease ? 'text-green-500' : 'text-red-500'" class="text-3xl">
                        {{ resM3.isIncrease ? '▲' : '▼' }}
                     </span>
                     <span>{{ formatNumber(resM3.result) }}%</span>
                  </div>
                  <span v-else class="text-gray-300">0%</span>
               </template>
            </div>
            
            <p v-if="mode === 3 && resM3.valid" class="text-sm mt-3 font-semibold" :class="resM3.isIncrease ? 'text-green-600' : 'text-red-600'">
               (Terjadi {{ resM3.isIncrease ? 'kesejahteraan / peningkatan' : 'penurunan / penyusutan' }})
            </p>
         </div>

      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Hitungan Finansial Lengkap</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Masalah umum menggunakan kalkulator HP biasa adalah Anda harus merumuskan sendiri perkalian <code>Total / Bobot * 100%</code>. Dengan kalkulator pintar ini, semua skenario probabilitas pecahaan dipetakan menjadi 3 modus khusus: Menemukan kuantitas uang (Pecahan), Mencari proporsi data statistik, dan Menghitung tren penurunan/kenaikan omzet penjualan.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Membedakan Modus Persen</h2>
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
import { ref, reactive, computed } from 'vue';
import { getCalculatorTool, getRelatedCalculatorTools } from '~/data/calculatorTools.js';
import { calculatePercentageOfValue, calculateWhatPercent, calculatePercentageChange } from '~/utils/calculatorTools.js';

// Metadata
const toolData = getCalculatorTool('percentage-calculator');
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

// State
const mode = ref(1); // 1 = % of, 2 = is what %, 3 = % change

const m1 = reactive({ percent: null, value: null });
const m2 = reactive({ valX: null, valY: null });
const m3 = reactive({ oldValue: null, newValue: null });

// Computations
const resM1 = computed(() => calculatePercentageOfValue(m1.percent || 0, m1.value || 0));
const resM2 = computed(() => calculateWhatPercent(m2.valX || 0, m2.valY || 0));
const resM3 = computed(() => calculatePercentageChange(m3.oldValue || 0, m3.newValue || 0));

// Helpers
function formatNumber(val) {
   if (isNaN(val)) return '0';
   // format using maximum 4 fraction digits
   return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 4 }).format(val);
}

function reset() {
  if (mode.value === 1) { m1.percent = null; m1.value = null; }
  else if (mode.value === 2) { m2.valX = null; m2.valY = null; }
  else if (mode.value === 3) { m3.oldValue = null; m3.newValue = null; }
}
</script>
