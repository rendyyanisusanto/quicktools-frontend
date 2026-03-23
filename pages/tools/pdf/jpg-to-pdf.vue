<template>
  <ToolPageLayout
    title="JPG ke PDF Online Gratis"
    description="Ubah satu atau beberapa gambar JPG menjadi file PDF secara online dan gratis. Cocok untuk scan dokumen, tugas, arsip, dan kebutuhan administrasi."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Upload Zone -->
      <FileUploadZone
        v-if="state === 'idle' || state === 'files-selected'"
        hint="Pilih gambar berformat JPG/JPEG (Maks 10 gambar)"
        :multiple="true"
        accept="image/jpeg, image/jpg"
        @files-selected="addFiles"
      />

      <!-- File List -->
      <div v-if="files.length > 0" class="mt-5">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-gray-700">Gambar yang dipilih ({{ files.length }})</h2>
          <button
            v-if="state !== 'loading'"
            class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            @click="reset"
          >
            Hapus Semua
          </button>
        </div>

        <div class="space-y-2 max-h-60 overflow-y-auto pr-2 mb-4">
          <div
            v-for="(f, idx) in files"
            :key="idx"
            class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span class="text-primary-500 font-medium shrink-0 w-5">{{ idx + 1 }}.</span>
              <span class="text-blue-500 shrink-0">🖼️</span>
              <span class="truncate text-gray-700">{{ f.name }}</span>
              <span class="text-gray-400 shrink-0">({{ formatSize(f.size) }})</span>
            </div>
            <button
              v-if="state !== 'loading'"
              class="text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0"
              title="Hapus gambar"
              @click="removeFile(idx)"
            >
              ✕
            </button>
          </div>
        </div>

        <p v-if="validationError" class="mt-3 text-red-500 text-sm">
          ⚠️ {{ validationError }}
        </p>

        <!-- Action button -->
        <div class="mt-5 flex justify-end">
          <button
            class="btn-primary flex items-center gap-2"
            :disabled="!isReadyToProcess || state === 'loading'"
            @click="processImages"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Memproses...' : 'Ubah ke PDF' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="state === 'loading'" class="mt-5 text-center py-6">
        <p class="text-gray-500 text-sm">Sedang menyatukan gambar menjadi PDF...</p>
      </div>

      <!-- Success State -->
      <div
        v-if="state === 'success'"
        class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
      >
        <p class="text-green-700 font-semibold mb-1">✅ Berhasil diubah ke PDF!</p>
        <p class="text-green-600 text-sm mb-5">
          Gambar Anda telah digabungkan menjadi file PDF.
        </p>

        <a :href="resultUrl" target="_blank" rel="noopener" class="btn-primary inline-flex">
          ⬇️ Unduh File PDF
        </a>

        <button
          class="block mx-auto mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
          @click="reset"
        >
          Buat PDF Lainnya
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
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Cepat Ubah Gambar ke PDF</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Sering kali kita diminta mengirim file identitas diri, KTP, laporan, atau portofolio desain dalam format PDF padahal yang kita miliki adalah foto berformat statis dari kamera HP (JPG/JPEG). Gunakan fitur JPG to PDF ini untuk menyatukan puluhan foto kamu menjadi satu buah dokumen PDF yang rapi secara gratis dan instan.
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
const toolData = getPdfTool('jpg-to-pdf');
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
const files = ref([]);
const resultUrl = ref('');
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
  return files.value.length > 0 && files.value.length <= 10;
});

// Actions
function addFiles(selectedFiles) {
  validationError.value = '';
  
  const validFiles = Array.from(selectedFiles).filter((f) => {
    return f.type === 'image/jpeg' || f.type === 'image/jpg';
  });

  if (validFiles.length !== selectedFiles.length) {
    validationError.value = 'Beberapa file diabaikan karena bukan berformat JPG/JPEG.';
  }

  const combined = [...files.value, ...validFiles];
  if (combined.length > 10) {
    validationError.value = 'Maksimal total 10 file gambar yang diperbolehkan.';
    files.value = combined.slice(0, 10);
  } else {
    files.value = combined;
  }

  if (files.value.length > 0) {
    state.value = 'files-selected';
  }
}

function removeFile(index) {
  files.value.splice(index, 1);
  if (files.value.length === 0) {
    state.value = 'idle';
  }
}

function reset() {
  files.value = [];
  state.value = 'idle';
  resultUrl.value = '';
  errorMessage.value = '';
  validationError.value = '';
}

async function processImages() {
  validationError.value = '';
  state.value = 'loading';
  errorMessage.value = '';

  const formData = new FormData();
  files.value.forEach((f) => formData.append('files', f));

  try {
    const response = await fetch(`${API_BASE}/pdf/jpg-to-pdf`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal mengubah gambar ke PDF.');
    }

    const backendBase = API_BASE.replace('/api', '');
    resultUrl.value = backendBase + json.data.downloadUrl;
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
