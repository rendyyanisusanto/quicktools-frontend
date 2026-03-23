<template>
  <ToolPageLayout
    title="QR Code WhatsApp Gratis"
    description="Buat gambar QR Code statis permanen ke kontak WhatsApp Anda untuk stiker promosi, kartu nama, atau etalase toko tanpa biaya sepeserpun."
    category-path="/tools/wa"
    category-label="WhatsApp Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Input Form -->
      <form v-if="state === 'idle'" @submit.prevent="generateQr" class="space-y-4">
        
        <WhatsAppPhoneInput v-model="phoneNumber" />

        <div class="mb-5">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Pesan Pembuka (Opsional)
          </label>
          <textarea
            v-model="messageBody"
            rows="2"
            class="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y"
            placeholder="Contoh: Halo Kak, saya berminat membuat website pendaftaran..."
          ></textarea>
        </div>

        <!-- Action button -->
        <div class="pt-2 flex justify-end">
          <button
            type="submit"
            class="bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors px-8 py-3 w-full justify-center flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Buat Barcode QR
          </button>
        </div>
      </form>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 border border-red-100">
        <span class="mt-0.5">⚠️</span> {{ errorMsg }}
      </div>

      <!-- Result Panel -->
      <Transition name="fade">
        <div v-show="state === 'generated'" class="flex flex-col items-center">
            
            <div class="flex items-center justify-between w-full mb-6">
              <h2 class="text-sm font-semibold text-gray-700">Hasil Pembuatan Barcode</h2>
              <button
                class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                @click="reset"
              >
                Ganti Info QR
              </button>
            </div>

            <!-- Canvas Rendered by QRious -->
            <div class="bg-gray-100 p-6 rounded-2xl shadow-inner border border-gray-200 mb-6 flex justify-center w-full max-w-sm">
               <canvas ref="qrCanvas" class="bg-white p-2 rounded-xl shadow-sm drop-shadow rotate-0" style="max-width: 250px; width: 100%; height: auto;"></canvas>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 w-full">
               <button
                  type="button"
                  @click="downloadQr"
                  class="bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors px-6 py-3 w-full justify-center flex items-center gap-2"
               >
                  <span>⬇️ Unduh Barcode (.PNG)</span>
               </button>
               
               <button
                  type="button"
                  @click="testScan"
                  class="bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors px-6 py-3 w-full justify-center flex items-center gap-2"
               >
                  <span>Minta Di-test</span>
               </button>
            </div>

            <div class="w-full mt-6">
               <WhatsAppResultPanel v-if="generatedLink" :link="generatedLink" />
            </div>
        </div>
      </Transition>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Masa Depan Pemasaran O2O (Offline to Online)</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Saat Anda mengikuti pameran buku, menempel poster menu di kedai, atau membagikan brosur, Anda tentu ingin mempermudah calon pelanggan. Dengan mencetak QR Code khusus yang otomatis mengarahkan kamera pengguna ke chat WhatsApp Anda, omset pendaftaran seringkali meroket tajam karena berkurangnya rintangan manual (harus ngetik manual di HP). 
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Membaca Label / Barcode WA</h2>
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
import { ref, onMounted, nextTick } from 'vue';
import { getWaTool, getRelatedWaTools } from '~/data/waTools.js';
import { generateWhatsAppLink, validatePhoneNumber } from '~/utils/waTools.js';

// Metadata
const toolData = getWaTool('wa-qr-code');
const relatedTools = getRelatedWaTools(toolData.relatedTools);

// SEO & CDN
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

useHead({
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js', defer: true },
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

// Refs
const qrCanvas = ref(null);
let qrObject = null;

// Actions
function generateQr() {
  errorMsg.value = '';
  
  if (!phoneNumber.value) {
    errorMsg.value = 'Mohon masukkan nomor WhatsApp untuk membuat barcode.';
    return;
  }
  
  if (!validatePhoneNumber(phoneNumber.value)) {
    errorMsg.value = 'Format nomor salah (Minimal 8 opsi). Hindari pengetikan salah seperti 08.';
    return;
  }
  
  const link = generateWhatsAppLink(phoneNumber.value, messageBody.value);
  generatedLink.value = link;

  state.value = 'generated';
  
  // Render QR Canvas
  nextTick(() => {
    drawQrCode(link);
  });
}

function drawQrCode(url) {
  if (typeof window !== 'undefined' && window.QRious && qrCanvas.value) {
    qrObject = new window.QRious({
      element: qrCanvas.value,
      value: url,
      size: 500, // Make graphic very high-res internally
      padding: 10,
      level: 'H' // High Error correction
    });
  } else {
    // Retry if CDN still loading
    setTimeout(() => drawQrCode(url), 200);
  }
}

function downloadQr() {
  if (!qrCanvas.value) return;
  
  const imgData = qrCanvas.value.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = imgData;
  a.download = `wa-qr-${phoneNumber.value}.png`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function testScan() {
  // Opening the WA link directly acting as a logical "Test this barcode action"
  if (generatedLink.value) {
     window.open(generatedLink.value, '_blank', 'noopener,noreferrer');
  }
}

function reset() {
  phoneNumber.value = '';
  messageBody.value = '';
  errorMsg.value = '';
  generatedLink.value = '';
  state.value = 'idle';
  qrObject = null;
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
