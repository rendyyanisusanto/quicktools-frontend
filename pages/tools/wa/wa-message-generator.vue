<template>
  <ToolPageLayout
    title="Generator Pesan WhatsApp Gratis"
    description="Buat teks template profesional dengan Link WhatsApp otomatis yang siap dikirim (cocok untuk admin toko online atau CS)."
    category-path="/tools/wa"
    category-label="WhatsApp Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Input Form -->
      <form @submit.prevent="generateLink" class="space-y-4">
        
        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Pengirim/Penerima (Opsional)
          </label>
          <div class="relative">
            <input
              type="tel"
              v-model="phoneNumber"
              class="w-full pl-4 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              placeholder="Contoh: 08123456789"
            />
          </div>
          <p class="text-xs text-gray-400 mt-1">Kosongkan jika hanya ingin membuat template teks (tanpa nomor spesifik).</p>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Isi Pesan Template <span class="text-red-500">*</span>
          </label>
          <div class="p-3 bg-blue-50 border border-blue-100 rounded-lg mb-3">
             <p class="text-[11px] text-blue-800 font-medium">Tips Pemformatan WhatsApp:</p>
             <p class="text-[11px] text-blue-700 mt-1">Gunakan <strong>*tebal*</strong> untuk Bold, <em>_miring_</em> untuk Italic, atau ~coret~ untuk Strikethrough.</p>
          </div>
          <textarea
            v-model="messageBody"
            rows="6"
            class="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y font-mono"
            placeholder="Ketik pesan panjang Anda di sini..."
            required
          ></textarea>
        </div>

        <!-- Action button -->
        <div class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            @click="reset"
            class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors w-full sm:w-auto text-sm sm:text-base order-2 sm:order-1"
          >
            Reset
          </button>
          
          <button
            type="submit"
            class="bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors px-8 py-3 w-full sm:w-auto justify-center flex items-center gap-2 order-1 sm:order-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Proses Pesan
          </button>
        </div>
      </form>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 border border-red-100">
        <span class="mt-0.5">⚠️</span> {{ errorMsg }}
      </div>

      <!-- Result Panel -->
      <Transition name="fade">
         <div v-if="state === 'generated'" class="mt-8 border-t border-gray-200 pt-6">
            <h3 class="text-sm font-bold text-gray-800 mb-3">📋 Hasil Generator:</h3>
            
            <div class="mb-4">
               <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Teks Mentah (Salin Pesan)</label>
               <div class="relative">
                  <textarea readonly :value="messageBody" rows="4" class="w-full bg-gray-50 border border-gray-200 text-gray-600 rounded-lg p-3 text-sm outline-none resize-none"></textarea>
                  <button @click="copyText(messageBody, 'teks')" class="absolute right-3 top-3 p-1.5 hover:bg-gray-200 rounded text-gray-500" title="Salin Teks">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
               </div>
            </div>

            <WhatsAppResultPanel v-if="generatedLink" :link="generatedLink" />
            
            <p v-if="copiedType" class="text-xs text-green-600 mt-2 font-medium">Berhasil menyalin {{ copiedType }}!</p>
         </div>
      </Transition>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Mengapa Menggunakan Message Generator?</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Saat Anda menyimpan format pemesanan yang panjang (spasi enter, bold teks, dsb), merubah teks mentah itu menjadi Link seringkali menimbulkan karakter rusak/hilang. Aplikasi ini secara ajaib membungkus format teks panjang Anda ke dalam format standar internet tanpa merusak struktur baris, siap untuk disebarluaskan pada calon pelanggan.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Langkah Menulis Pesan Massal WA</h2>
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
      <NuxtLink to="/tools/wa" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua WhatsApp Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref } from 'vue';
import { getWaTool, getRelatedWaTools } from '~/data/waTools.js';
import { generateWhatsAppLink, validatePhoneNumber } from '~/utils/waTools.js';

// Metadata
const toolData = getWaTool('wa-message-generator');
const relatedTools = getRelatedWaTools(toolData.relatedTools);

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
const state = ref('idle');
const phoneNumber = ref('');
const messageBody = ref('');
const errorMsg = ref('');
const generatedLink = ref('');
const copiedType = ref('');

// Actions
function generateLink() {
  errorMsg.value = '';
  generatedLink.value = '';
  copiedType.value = '';
  
  if (!messageBody.value || messageBody.value.trim() === '') {
    errorMsg.value = 'Mohon masukkan isi pesan (Message Body) terlebih dahulu.';
    return;
  }
  
  // Custom API link behavior if no number is supplied:
  // Usually api.whatsapp.com/send?text=... allows picking contact afterward
  if (!phoneNumber.value) {
     const encodedMsg = encodeURIComponent(messageBody.value.trim());
     generatedLink.value = `https://api.whatsapp.com/send?text=${encodedMsg}`;
     state.value = 'generated';
     return;
  }

  // Handle number supplied
  if (!validatePhoneNumber(phoneNumber.value)) {
    errorMsg.value = 'Format nomor tujuan kurang akurat. Pastikan format benar (bisa tidak diisi).';
    return;
  }
  generatedLink.value = generateWhatsAppLink(phoneNumber.value, messageBody.value);
  state.value = 'generated';
}

async function copyText(text, type) {
  try {
    await navigator.clipboard.writeText(text);
    copiedType.value = type;
    setTimeout(() => { copiedType.value = ''; }, 3000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
}

function reset() {
  phoneNumber.value = '';
  messageBody.value = '';
  errorMsg.value = '';
  generatedLink.value = '';
  state.value = 'idle';
  copiedType.value = '';
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
