<template>
  <ToolPageLayout
    title="WhatsApp Tanpa Simpan Nomor"
    description="Kirim pesan atau hubungi nomor WhatsApp langsung tanpa perlu menyimpan kontak mereka terlebih dahulu di buku alamat telepon Anda."
    category-path="/tools/wa"
    category-label="WhatsApp Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Input Form -->
      <form @submit.prevent="generateLink" class="space-y-4">
        
        <WhatsAppPhoneInput v-model="phoneNumber" />

        <!-- Info / Subtitle -->
        <p class="text-xs text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 font-medium">
          ✅ Sistem secara otomatis menghapus tanda baca `-` dan spasi agar valid.
        </p>

        <!-- Action button -->
        <div class="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            class="bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] transition-colors px-8 py-3 w-full justify-center flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
            1-Klik Buka WhatsApp
          </button>
        </div>
      </form>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 border border-red-100">
        <span class="mt-0.5">⚠️</span> {{ errorMsg }}
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Tidak Perlu Lagi Simpan Nomor</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Fitur ini diciptakan khusus bagi kurir pengiriman (Grab/Gojek/Paxel), admin jualan, atau Anda yang sering harus bertukar chat dengan orang baru melalui media sosial tanpa mau memenuhi daftar nomor telepon (Contact Book) dengan memori orang yang belum Anda kenal.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memulai Chat Baru</h2>
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
import { validatePhoneNumber, generateWhatsAppLink } from '~/utils/waTools.js';

// Metadata
const toolData = getWaTool('wa-without-save-number');
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
const phoneNumber = ref('');
const errorMsg = ref('');

// Actions
function generateLink() {
  errorMsg.value = '';
  
  if (!phoneNumber.value) {
    errorMsg.value = 'Tolong isi kolom nomor telepon.';
    return;
  }
  
  if (!validatePhoneNumber(phoneNumber.value)) {
    errorMsg.value = 'Format telepon kurang panjang/mendekati tidak sah. Pastikan isi minimal 8 angka.';
    return;
  }
  
  // Directly open the window logic
  const link = generateWhatsAppLink(phoneNumber.value, '');
  
  // Redirect immediately mimicking native deep-linking behavior
  window.open(link, '_blank', 'noopener,noreferrer');
}
</script>
