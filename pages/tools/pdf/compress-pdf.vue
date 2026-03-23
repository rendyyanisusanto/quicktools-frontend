<template>
  <ToolPageLayout
    title="Compress PDF Online Gratis"
    description="Kecilkan ukuran file PDF secara online dan gratis agar lebih mudah dikirim, diupload, dan disimpan. Praktis tanpa instal aplikasi di QuickTools."
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

        <div class="mt-5 border border-blue-100 bg-blue-50 rounded-lg p-4">
          <div class="flex gap-3">
            <span class="text-blue-600 text-lg shrink-0">ℹ️</span>
            <div>
              <h3 class="text-sm font-bold text-blue-900 mb-1">Catatan Optimasi Dasar</h3>
              <p class="text-xs text-blue-700 leading-relaxed">
                Fitur kompresi lanjutan untuk mereduksi kualitas gambar PDF sedang dikembangkan. Saat ini, sistem kami akan menerapkan kompresi struktur dan pembersihan metadata dasar. Hasil penurunan ukuran file mungkin bervariasi tergantung pada struktur file asal.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-5 flex justify-end">
          <button
            class="btn-primary flex items-center gap-2"
            :disabled="!isReadyToProcess || state === 'loading'"
            @click="processPdf"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Memproses...' : 'Compress PDF' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="state === 'loading'" class="mt-5 text-center py-6">
        <p class="text-gray-500 text-sm">Sedang mengoptimasi file PDF Anda...</p>
      </div>

      <!-- Success State -->
      <div
        v-if="state === 'success'"
        class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
      >
        <p class="text-green-700 font-semibold mb-1">✅ PDF berhasil dioptimasi!</p>
        
        <div class="flex justify-center items-center gap-4 my-4">
          <div class="bg-white p-3 rounded-lg border border-gray-100 text-center">
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Ukuran Awal</p>
            <p class="text-lg font-bold text-gray-800">{{ formatSize(resultData.originalSize) }}</p>
          </div>
          <div class="text-gray-400">→</div>
          <div class="bg-white p-3 rounded-lg border border-green-200 text-center">
            <p class="text-xs text-green-600 uppercase tracking-wider mb-1">Ukuran Baru</p>
            <p class="text-lg font-bold text-green-700">{{ formatSize(resultData.newSize) }}</p>
          </div>
        </div>

        <p class="text-green-600 text-sm mb-5">
          {{ Math.round((resultData.originalSize - resultData.newSize) / resultData.originalSize * 100) }}% lebih kecil!
        </p>

        <a :href="resultData.downloadUrl" target="_blank" rel="noopener" class="btn-primary inline-flex">
          ⬇️ Unduh File PDF
        </a>

        <button
          class="block mx-auto mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
          @click="reset"
        >
          Compress PDF Lainnya
        </button>
      </div>

      <!-- Error State -->
      <div
        v-if="state === 'error'"
        class="mt-5 bg-red-50 border border-red-200 rounded-xl p-5 text-center"
      >
        <p class="text-red-600 font-semibold mb-1">❌ Terjadi kesalahan</p>
        <p class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
        <button class="btn-outline-primary text-sm" @click="reset">Coba Lagi</button>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Mudah Kecilkan File PDF</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        File PDF yang terlalu besar seringkali menjadi masalah saat harus dikirim melalui email, WhatsApp, maupun diunggah untuk keperluan formulir pendaftaran kerja, CPNS, dan tugas kampus. Gunakan fitur Compress PDF ini untuk mengurangi ukuran dokumen Anda tanpa proses instalasi yang rumit. 
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Memperkecil Ukuran PDF</h2>
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
const toolData = getPdfTool('compress-pdf');
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
const resultData = ref(null);
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
  resultData.value = null;
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
    const response = await fetch(`${API_BASE}/pdf/compress`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal memproses file PDF.');
    }

    const backendBase = API_BASE.replace(/\/api\/?$/, '');
    resultData.value = {
      downloadUrl: backendBase + json.data.downloadUrl,
      fileName: json.data.fileName,
      originalSize: json.data.originalSize,
      newSize: json.data.newSize
    };
    
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
