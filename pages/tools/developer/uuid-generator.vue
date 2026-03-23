<template>
  <ToolPageLayout
    title="UUID Generator V4 Aman"
    description="Ciptakan Universal Unique Identifier standar RFC kriptografi secara bersamaan secepat kilat untuk kebutuhan Primary Key Database sistem Anda."
    category-path="/tools/developer"
    category-label="Developer Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <div class="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
         <div>
            <h2 class="text-xl font-bold text-gray-800">Ciptakan V4 UUIDs</h2>
            <p class="text-sm text-gray-500">Mendukung crypto.randomUUID() Native</p>
         </div>

         <!-- Controls -->
         <div class="flex items-center gap-3 w-full md:w-auto">
            <select
               v-model="count"
               class="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 cursor-pointer flex-1 md:flex-none"
            >
               <option :value="1">1 UUID</option>
               <option :value="5">5 UUIDs</option>
               <option :value="10">10 UUIDs</option>
               <option :value="20">20 UUIDs</option>
            </select>
            
            <button
               @click="generate"
               class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none shadow-sm"
            >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
               Generate Baru
            </button>
         </div>
      </div>

      <!-- Results Grid -->
      <div v-if="results.length > 0" class="border-t border-gray-100 pt-6">
         <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
               {{ results.length }} Baris Kode Dihasilkan
            </span>
            <button
               @click="copyAll"
               class="text-sm text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1"
            >
               <span v-if="copiedAll">Tersalin ke Clipboard!</span>
               <span v-else>Salin Semua Kode</span>
               <svg v-if="!copiedAll" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
               <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </button>
         </div>

         <!-- UUID List -->
         <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div
               v-for="(id, idx) in results"
               :key="id"
               class="group bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:border-indigo-300 transition-colors"
            >
               <code class="font-mono text-slate-800 text-sm md:text-base break-all">{{ id }}</code>
               <button
                  @click="copySingle(id, idx)"
                  class="ml-3 p-2 bg-white rounded shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shrink-0 relative"
                  title="Salin UUID ini"
               >
                  <!-- Tooltip -->
                  <span v-if="copiedIndex === idx" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded">Disalin</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
               </button>
            </div>
         </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Keandalan UUID Versi 4</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Pembangkit (Generator) ini memberikan Anda kombinasi karakter unik sebanyak 128-bit yang dirancang menggunakan algoritma pseudo-random murni sesuai regulasi RFC 4122 Standard. Teknologi ini secara otomatis menghilangkan kemungkinan bentrokan data di dalam indeks Database SQL maupun MongoDB aplikasi arsitektur mikroservis Anda. 
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Generate ID Cepat</h2>
      <ol class="space-y-3">
        <li
          v-for="(step, i) in toolData.howToSteps"
          :key="i"
          class="flex items-start gap-3"
        >
          <span class="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold flex items-center justify-center">
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
      <NuxtLink to="/tools/developer" class="text-sm text-indigo-600 hover:underline">
        ← Lihat semua Developer Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDeveloperTool, getRelatedDeveloperTools } from '~/data/developerTools.js';
import { generateMultipleUuids } from '~/utils/developerTools.js';

// Metadata
const toolData = getDeveloperTool('uuid-generator');
const relatedTools = getRelatedDeveloperTools(toolData.relatedTools);

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
const count = ref(5);
const results = ref([]);
const copiedAll = ref(false);
const copiedIndex = ref(-1);

onMounted(() => {
   // Generate initially on load
   generate();
});

// Actions
function generate() {
   results.value = generateMultipleUuids(count.value);
}

async function copyAll() {
   if (results.value.length === 0) return;
   try {
      await navigator.clipboard.writeText(results.value.join('\n'));
      copiedAll.value = true;
      setTimeout(() => copiedAll.value = false, 2500);
   } catch (err) {
      console.error('Failed to copy', err);
   }
}

async function copySingle(text, idx) {
   try {
      await navigator.clipboard.writeText(text);
      copiedIndex.value = idx;
      setTimeout(() => copiedIndex.value = -1, 1500);
   } catch (err) {
      console.error('Failed to copy single id', err);
   }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
