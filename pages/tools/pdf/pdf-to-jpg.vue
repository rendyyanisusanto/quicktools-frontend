<template>
  <ToolPageLayout
    title="PDF ke JPG Online Gratis"
    description="Ubah halaman PDF menjadi file JPG secara online dan gratis. Cocok untuk preview dokumen, presentasi, dan berbagi halaman tertentu sebagai gambar."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Upload Zone -->
      <FileUploadZone
        v-if="state === 'idle' || state === 'file-selected'"
        hint="Pilih 1 file PDF maksimal 20MB"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- File Control -->
      <div v-if="file" class="mt-5">
        <h2 class="text-sm font-semibold text-gray-700 mb-3">File yang dipilih</h2>
        <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-red-500 shrink-0">📄</span>
            <span class="truncate text-gray-700">{{ file.name }}</span>
            <span class="text-gray-400 shrink-0">({{ formatSize(file.size) }})</span>
          </div>
          <button
            class="text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0"
            title="Ganti file"
            @click="reset"
          >
            ✕
          </button>
        </div>

        <p v-if="validationError" class="mt-3 text-red-500 text-sm">
          ⚠️ {{ validationError }}
        </p>

        <!-- Action button -->
        <div class="mt-5 flex justify-end">
          <button
            class="btn-primary flex items-center gap-2"
            :disabled="!isReadyToProcess || state === 'loading'"
            @click="processPdf"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Memproses...' : 'Ubah ke JPG' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="state === 'loading'" class="mt-5 text-center py-6">
        <p class="text-gray-500 text-sm">Sedang mengonversi PDF menjadi JPG...</p>
      </div>

      <!-- Success State -->
      <div
        v-if="state === 'success'"
        class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
      >
        <p class="text-green-700 font-semibold mb-1">✅ PDF berhasil diubah ke JPG!</p>
        <p class="text-green-600 text-sm mb-5">
          Berikut adalah gambar-gambar yang dihasilkan dari dokumen Anda.
        </p>

        <!-- Download Links -->
        <div class="space-y-2 max-h-60 overflow-y-auto pr-2 mb-4">
          <a
            v-for="(out, i) in outputFiles"
            :key="i"
            :href="out.downloadUrl"
            target="_blank"
            rel="noopener"
            class="flex items-center justify-between text-left bg-white border border-green-200 rounded-lg px-4 py-3 hover:border-green-400 transition-colors"
          >
            <div class="flex items-center gap-2 truncate">
              <span class="text-primary-500 font-medium shrink-0">{{ i + 1 }}.</span>
              <span class="text-sm font-medium text-gray-800 truncate">{{ out.fileName }}</span>
            </div>
            <span class="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full shrink-0">Unduh ↓</span>
          </a>
        </div>

        <button
          class="block mx-auto mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
          @click="reset"
        >
          Konversi PDF Lainnya
        </button>
      </div>

      <!-- Error State -->
      <div
        v-if="state === 'error'"
        class="mt-5 bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-inner"
      >
        <p class="text-red-600 font-semibold mb-1">❌ Terjadi kesalahan</p>
        <p class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
        <button class="btn-outline-primary text-sm bg-white" @click="reset">Coba Lagi</button>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Rubah Lembar PDF Menjadi Foto</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Saat Anda membagikan dokumen PDF melalui WhatsApp atau Instagram, Anda seringkali hanya membutuhkan gambar agar konten dari PDF Anda dapat dipratinjau langsung di obrolan. Jangan lelah Screenshot PDF secara manual lembar demi lembar, karena alat PDF to JPG kami dirancang mengatasi ini dengan satu kali klik.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Mengubah PDF ke JPG</h2>
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
      <NuxtLink to="/tools/pdf" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua PDF Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getPdfTool, getRelatedPdfTools } from '~/data/pdfTools.js';

// Metadata
const toolData = getPdfTool('pdf-to-jpg');
const relatedTools = getRelatedPdfTools(toolData.relatedTools);

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
const file = ref(null);
const outputFiles = ref([]);
const errorMessage = ref('');
const validationError = ref('');

const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

// Helpers
function formatSize(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const isReadyToProcess = computed(() => {
  return !!file.value;
});

// Actions
function onFileSelected(selectedFiles) {
  if (selectedFiles.length === 0) return;
  const f = selectedFiles[0];
  
  if (f.type !== 'application/pdf') {
    validationError.value = 'File harus berformat PDF.';
    return;
  }
  if (f.size > 20 * 1024 * 1024) {
    validationError.value = 'Ukuran file melebihi batas 20MB.';
    return;
  }

  validationError.value = '';
  file.value = f;
  state.value = 'file-selected';
}

function reset() {
  file.value = null;
  state.value = 'idle';
  outputFiles.value = [];
  errorMessage.value = '';
  validationError.value = '';
}

async function processPdf() {
  validationError.value = '';
  state.value = 'loading';
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('files', file.value);

  try {
    const response = await fetch(`${API_BASE}/pdf/pdf-to-jpg`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal memproses konversi.');
    }

    const backendBase = API_BASE.replace(/\/api\/?$/, '');
    outputFiles.value = json.data.files.map((out) => ({
      fileName: out.fileName,
      downloadUrl: backendBase + out.downloadUrl,
    }));

    state.value = 'success';
  } catch (err) {
    errorMessage.value = err.message || 'Terjadi kesalahan pada server. Silakan coba lagi.';
    state.value = 'error';
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-outline-primary {
  @apply border border-primary-600 text-primary-600 font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-primary-50 transition-colors;
}
</style>
