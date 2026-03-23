<template>
  <ToolPageLayout
    title="Link WhatsApp Generator Gratis"
    description="Buat link WhatsApp otomatis (wa.me) dengan pesan khusus untuk keperluan promosi, bio Instagram, atau Customer Service. 100% Gratis."
    category-path="/tools/wa"
    category-label="WhatsApp Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Input Form -->
      <form @submit.prevent="generateLink" class="space-y-4">
        
        <WhatsAppPhoneInput v-model="phoneNumber" />

        <div class="mb-5">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Pesan Otomatis (Opsional)
          </label>
          <textarea
            v-model="messageBody"
            rows="4"
            class="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y"
            placeholder="Contoh: Halo Kak, saya mau pesan produk ini..."
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Buat Link WA
          </button>
        </div>
      </form>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 border border-red-100">
        <span class="mt-0.5">⚠️</span> {{ errorMsg }}
      </div>

      <!-- Result Panel -->
      <Transition name="fade">
        <WhatsAppResultPanel v-if="generatedLink" :link="generatedLink" />
      </Transition>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Bisnis: Link Tautan WA Otomatis</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Bagi Anda yang mengelola bisnis online, memiliki Link WhatsApp (WA.me) yang bersih sangatlah penting. Anda bisa menempelkan (copy-paste) tautan ini pada Bio Instagram, Deskripsi YouTube, Katalog TikTok, hingga tombol "Chat Kami" pada formulir pemesanan website. Fitur ini beroperasi di perangkat Anda sendiri, menjamin kerahasiaan nomor Anda sepenuhnya.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memasang Link WhatsApp</h2>
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
const toolData = getWaTool('wa-link-generator');
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
const messageBody = ref('');
const errorMsg = ref('');
const generatedLink = ref('');

// Actions
function generateLink() {
  errorMsg.value = '';
  generatedLink.value = '';
  
  if (!phoneNumber.value) {
    errorMsg.value = 'Mohon masukkan nomor WhatsApp tujuan.';
    return;
  }
  
  if (!validatePhoneNumber(phoneNumber.value)) {
    errorMsg.value = 'Format nomor WhatsApp tidak valid. Pastikan nomor benar (minimal 8 digit).';
    return;
  }
  
  // Create link
  generatedLink.value = generateWhatsAppLink(phoneNumber.value, messageBody.value);
}

function reset() {
  phoneNumber.value = '';
  messageBody.value = '';
  errorMsg.value = '';
  generatedLink.value = '';
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
