<template>
  <ToolPageLayout
    title="Kalkulator Diskon Gratis"
    description="Hitung besaran potongan harga belanja secara otomatis. Masukkan harga awal dan persentase diskon untuk mengetahui total akhir."
    category-path="/tools/calculator"
    category-label="Calculator Tools"
  >
    <ToolActionCard>
      
      <!-- Split Form and Output -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         <!-- Left: Input Form -->
         <div class="flex flex-col space-y-5">
            <div>
               <label class="block text-sm font-semibold text-gray-700 mb-2">Harga Asli (Rp)</label>
               <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">Rp</span>
                  <input v-model.number="price" type="number" min="0" placeholder="Contoh: 150000" class="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-gray-800" />
               </div>
            </div>
            
            <div>
               <label class="block text-sm font-semibold text-gray-700 mb-2">Diskon (%)</label>
               <div class="relative">
                  <input v-model.number="percentage" type="number" min="0" max="100" placeholder="Contoh: 15" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-gray-800" />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
               </div>
            </div>
            
            <button @click="reset" class="mt-2 text-sm text-gray-500 hover:text-red-500 font-medium self-start">
               ↻ Reset Hitungan
            </button>
         </div>

         <!-- Right: Result Area -->
         <div class="flex flex-col border-t md:border-t-0 md:border-l border-gray-100 md:pl-8 pt-6 md:pt-0">
            <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Potongan Diskon</h3>
            <div class="text-3xl font-extrabold text-green-600 mb-6 flex items-center gap-2">
               <span class="text-xl font-semibold -mt-1 text-green-500">Rp</span> 
               <span>{{ formatCurrency(result.discountAmount) }}</span>
            </div>
            
            <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Harga Akhir Dibayar</h3>
            <div class="text-4xl font-black text-gray-900 mb-2 flex items-center gap-2">
               <span class="text-2xl font-bold -mt-2 text-gray-500">Rp</span> 
               <span>{{ formatCurrency(result.finalPrice) }}</span>
            </div>
            
            <p v-if="result.valid && result.discountAmount > 0" class="text-xs text-gray-500 mt-2 font-medium bg-green-50 px-3 py-2 rounded inline-block">
               Anda menghemat Rp {{ formatCurrency(result.discountAmount) }} dari harga normal.
            </p>
         </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Hitungan Belanja Cepat</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Saat Anda berjalan-jalan di Mall dan menjumpai tulisan "Diskon 60% All Items!", tentu akan merepotkan bila harus menekan rentetan <code>Harga Awal * 0,6</code> lalu melakukan pengurangan di kalkulator bawaan handphone. Kalkulator spesifik ini memungkinkan Anda cukup memasukkan harga di label, dan persentase yang tertera, semuanya dihitung secara otomatis.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memotong Harga Diskon</h2>
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
import { calculateDiscount } from '~/utils/calculatorTools.js';

// Metadata
const toolData = getCalculatorTool('discount-calculator');
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
const price = ref(null);
const percentage = ref(null);

// Computations
const result = computed(() => {
   return calculateDiscount(price.value || 0, percentage.value || 0);
});

// Helpers
function formatCurrency(val) {
   if (isNaN(val)) return '0';
   return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(val);
}

function reset() {
  price.value = null;
  percentage.value = null;
}
</script>
