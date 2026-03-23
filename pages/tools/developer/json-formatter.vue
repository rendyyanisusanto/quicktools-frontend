<template>
  <ToolPageLayout
    title="JSON Formatter & Validator Gratis"
    description="Rapikan JSON yang berantakan menjadi cantik (Beautifier) atau temukan letak kode error syntax API. Data aman sepenuhnya di browser."
    category-path="/tools/developer"
    category-label="Developer Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Split View for Original and Cleaned (Desktop) or stacked (Mobile) -->
      <div v-if="state === 'idle'" class="mb-5 relative">
         <div class="flex justify-between items-center mb-2">
             <label class="block text-sm font-semibold text-gray-700">Payload Teks JSON Mentah (Raw)</label>
             <button v-if="inputText.length > 0" @click="reset" class="text-xs text-red-500 hover:text-red-700 font-medium">Reset form</button>
         </div>
         <textarea
            v-model="inputText"
            rows="12"
            class="w-full p-4 bg-slate-800 text-slate-100 font-mono text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y shadow-inner"
            placeholder='Contoh: {"app":"QuickTools","status":200,"items":[{"id":1,"name":"JSON"}]}'
         ></textarea>
      </div>

      <!-- Action Area for Processing -->
      <div v-if="state === 'idle'" class="pt-2 flex flex-col sm:flex-row gap-4 mb-4">
         <button
            @click="runFormat"
            :disabled="inputText.trim().length === 0"
            class="bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors px-6 py-3 w-full sm:flex-1 justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Format & Beautify (Rapi)
         </button>
         <button
            @click="runMinify"
            :disabled="inputText.trim().length === 0"
            class="bg-slate-100 text-slate-700 border border-slate-300 font-semibold rounded-lg hover:bg-slate-200 transition-colors px-6 py-3 w-full sm:flex-1 justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Minify (Satu Baris)
         </button>
      </div>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2 border border-red-200 font-mono">
        <span class="mt-0.5">⚠️</span> 
        <div class="flex-1 overflow-x-auto break-all">
           <strong>Validasi Gagal!</strong><br/> {{ errorMsg }}
        </div>
      </div>

      <!-- Result State -->
      <Transition name="fade">
         <div v-if="state === 'success'" class="mt-6 border-t border-gray-100 pt-6">
            
            <div class="flex items-center justify-between mb-4">
               <h3 class="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  Valid ({{ resultType === 'indent' ? 'Tampilan Indentasi Rapi' : 'Versi Minified Ringan' }})
               </h3>
               <button @click="state = 'idle'" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium bg-indigo-50 px-2 py-1 rounded">← Edit Lagi</button>
            </div>

            <div class="relative group">
               <textarea
                  readonly
                  :value="outputText"
                  rows="14"
                  class="w-full p-4 bg-slate-900 text-green-400 font-mono text-xs rounded-lg focus:outline-none resize-y shadow-inner border border-slate-700"
               ></textarea>
               
               <button
                  v-if="outputText"
                  @click="copyResult"
                  class="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur px-3 py-1.5 rounded flex items-center gap-1 text-xs font-semibold transition-colors"
               >
                  <span v-if="!copied">Ter-Salin!</span>
                  <span v-else>Salin Teks</span>
                  <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
               </button>
            </div>
         </div>
      </Transition>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Penunjang Debugging Software</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Object Notation seperti JSON merupakan tulang punggung komunikasi front-end ke back-end (REST API GraphQL). Walaupun cepat dicerna mesin server, bentuknya secara asal sangatlah sulit dibaca mata manusia. Jika Anda gagal menarik endpoint dikarenakan 'Unexpected Token', tool ini adalah pemecah validasi syntax tersebut. Tentu, tidak melanggar kepatuhan perlindungan data apa pun karena dijalankan di PC anda sendiri (Browser Edge Routing Engine).
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Instruksi Memformat Output JSON</h2>
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
import { ref } from 'vue';
import { getDeveloperTool, getRelatedDeveloperTools } from '~/data/developerTools.js';
import { formatJson, minifyJson } from '~/utils/developerTools.js';

// Metadata
const toolData = getDeveloperTool('json-formatter');
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
const state = ref('idle'); // idle | success
const resultType = ref('indent'); // indent | minify
const inputText = ref('');
const outputText = ref('');
const errorMsg = ref('');
const copied = ref(false);

// Actions
function runFormat() {
   errorMsg.value = '';
   if (!inputText.value.trim()) return;
   
   const res = formatJson(inputText.value, 4); // 4 spaces beauty
   if (res.success) {
      outputText.value = res.result;
      resultType.value = 'indent';
      state.value = 'success';
   } else {
      errorMsg.value = res.error;
   }
}

function runMinify() {
   errorMsg.value = '';
   if (!inputText.value.trim()) return;
   
   const res = minifyJson(inputText.value);
   if (res.success) {
      outputText.value = res.result;
      resultType.value = 'minify';
      state.value = 'success';
   } else {
      errorMsg.value = res.error;
   }
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
  errorMsg.value = '';
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
