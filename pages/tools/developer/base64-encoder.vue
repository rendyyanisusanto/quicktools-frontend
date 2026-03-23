<template>
  <ToolPageLayout
    title="Base64 Encoder / Decoder Gratis"
    description="Encode teks rahasia ke Base64 (UTF-8 Safe) atau Decode kembali menjadi teks biasa secara aman langsung di Browser tanpa server."
    category-path="/tools/developer"
    category-label="Developer Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Input Textarea -->
      <div class="mb-5 relative">
         <div class="flex justify-between items-center mb-2">
             <label class="block text-sm font-semibold text-gray-700">Teks / Base64 String Asal</label>
             <button v-if="inputText.length > 0" @click="reset" class="text-xs text-red-500 hover:text-red-700 font-medium">Reset form</button>
         </div>
         <textarea
            v-model="inputText"
            rows="6"
            class="w-full p-4 bg-white border border-gray-300 text-gray-800 font-mono text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-y"
            placeholder="Ketik teks biasa ATAU tempel susunan karakter rahasia Base64 di sini..."
         ></textarea>
      </div>

      <!-- Action Area for Processing -->
      <div class="flex flex-col sm:flex-row gap-4 mb-4">
         <button
            @click="runEncode"
            :disabled="inputText.trim().length === 0"
            class="bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors px-6 py-3 w-full sm:flex-1 justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Encode (Teks → Base64)
         </button>
         
         <button
            @click="runDecode"
            :disabled="inputText.trim().length === 0"
            class="bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors px-6 py-3 w-full sm:flex-1 justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Decode (Base64 → Teks)
         </button>
      </div>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2 border border-red-200 font-mono">
        <span class="mt-0.5">⚠️</span> 
        <div class="flex-1 overflow-x-auto break-all">
           <strong>Gagal Memproses:</strong><br/> {{ errorMsg }}
        </div>
      </div>

      <!-- Result State -->
      <Transition name="fade">
         <div v-if="state === 'success'" class="mt-6 border-t border-gray-100 pt-6">
            
            <div class="flex items-center justify-between mb-4">
               <h3 class="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" :class="lastAction === 'encode' ? 'bg-indigo-500' : 'bg-emerald-500'"></span>
                  Hasil {{ lastAction === 'encode' ? 'Encode (Terkunci)' : 'Decode (Terbuka)' }}:
               </h3>
            </div>

            <div class="relative group">
               <textarea
                  readonly
                  :value="outputText"
                  rows="6"
                  class="w-full p-4 bg-gray-50 border border-gray-200 text-gray-800 font-mono text-sm rounded-lg focus:outline-none resize-y"
               ></textarea>
               
               <button
                  v-if="outputText"
                  @click="copyResult"
                  class="absolute top-3 right-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded flex items-center gap-1 text-xs font-semibold transition-colors shadow-sm"
               >
                  <span v-if="!copied">Ter-Salin!</span>
                  <span v-else>Salin Teks</span>
                  <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
               </button>
            </div>
         </div>
      </Transition>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Aman Enkripsi Data Text Transfer</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Protokol Base64 berguna mendokumentasikan serangkaian teks format kompleks (dengan spasi dan tanda baca) agar berubah menjadi urutan huruf utuh panjang yang kompatibel untuk dikirim ke jalur jaringan (seperti HTTP Authorization headers). Tool ini menggunakan library bawaan JavaScript standar agar UTF-8 khusus seperti emoji tetap terselamatkan dari cacat format.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Membaca / Menulis Base64</h2>
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
import { encodeBase64, decodeBase64 } from '~/utils/developerTools.js';

// Metadata
const toolData = getDeveloperTool('base64-encoder');
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
const lastAction = ref(''); // encode | decode
const inputText = ref('');
const outputText = ref('');
const errorMsg = ref('');
const copied = ref(false);

// Actions
function runEncode() {
   errorMsg.value = '';
   if (!inputText.value.trim()) return;
   
   const res = encodeBase64(inputText.value);
   if (res.success) {
      outputText.value = res.result;
      lastAction.value = 'encode';
      state.value = 'success';
   } else {
      errorMsg.value = res.error;
   }
}

function runDecode() {
   errorMsg.value = '';
   if (!inputText.value.trim()) return;
   
   const res = decodeBase64(inputText.value.trim());
   if (res.success) {
      outputText.value = res.result;
      lastAction.value = 'decode';
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
