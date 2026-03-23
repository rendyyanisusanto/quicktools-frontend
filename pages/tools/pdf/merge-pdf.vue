<template>
  <ToolPageLayout
    title="Merge PDF Online Gratis"
    description="Gabungkan beberapa file PDF menjadi satu dokumen secara online. Gratis, cepat, dan tanpa perlu menginstal aplikasi."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>

      <!-- Upload Zone -->
      <FileUploadZone
        v-if="state === 'idle' || state === 'files-selected'"
        hint="Hanya file PDF • Maks 20MB per file • Maks 10 file"
        @files-selected="onFilesSelected"
      />

      <!-- File List -->
      <div v-if="files.length > 0" class="mt-5">
        <h2 class="text-sm font-semibold text-gray-700 mb-3">
          File yang dipilih ({{ files.length }})
        </h2>
        <ul class="space-y-2">
          <li
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-red-500 shrink-0">📄</span>
              <span class="truncate text-gray-700">{{ file.name }}</span>
              <span class="text-gray-400 shrink-0">({{ formatSize(file.size) }})</span>
            </div>
            <button
              class="text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0"
              title="Hapus file"
              @click="removeFile(index)"
            >
              ✕
            </button>
          </li>
        </ul>

        <!-- Error message -->
        <p v-if="validationError" class="mt-3 text-red-500 text-sm">
          ⚠️ {{ validationError }}
        </p>

        <!-- Action buttons -->
        <div class="mt-5 flex flex-wrap gap-3">
          <!-- Add more files -->
          <label class="cursor-pointer">
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              class="hidden"
              @change="onMoreFiles"
            />
            <span class="inline-block border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-sm hover:border-primary-300 hover:text-primary-600 transition-colors">
              + Tambah File
            </span>
          </label>

          <!-- Merge button -->
          <button
            class="btn-primary flex items-center gap-2"
            :disabled="files.length < 2 || state === 'loading'"
            @click="mergePdf"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Menggabungkan...' : 'Gabungkan PDF' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="state === 'loading'" class="mt-5 text-center py-4">
        <p class="text-gray-500 text-sm">Sedang menggabungkan file, harap tunggu...</p>
      </div>

      <!-- Success State -->
      <div
        v-if="state === 'success'"
        class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
      >
        <p class="text-green-700 font-semibold mb-1">✅ PDF berhasil digabung!</p>
        <p class="text-green-600 text-sm mb-4">File siap untuk diunduh.</p>
        <a
          :href="downloadUrl"
          target="_blank"
          rel="noopener"
          class="inline-block btn-primary"
        >
          ⬇️ Unduh PDF
        </a>
        <button
          class="block mx-auto mt-3 text-sm text-gray-400 hover:text-gray-600 underline"
          @click="reset"
        >
          Gabungkan file lain
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

    <!-- ==================== INTRO CONTENT ==================== -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Apa itu Merge PDF?</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Merge PDF adalah fitur yang memungkinkan kamu menggabungkan dua atau lebih file PDF menjadi
        satu dokumen tunggal. Ini sangat berguna ketika kamu perlu mengirimkan beberapa dokumen
        sekaligus, misalnya CV beserta portofolio, atau laporan yang tersebar di beberapa file.
        Dengan QuickTools, proses ini bisa dilakukan langsung di browser tanpa perlu menginstal
        aplikasi tambahan.
      </p>
    </section>

    <!-- ==================== HOW TO USE ==================== -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menggunakan</h2>
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

    <!-- ==================== FAQ ==================== -->
    <FAQSection :items="toolData.faq" />

    <!-- ==================== RELATED TOOLS ==================== -->
    <RelatedToolsSection :tools="relatedTools" />

    <!-- Back link -->
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

// ── Tool metadata ──────────────────────────────────────────────
const toolData = getPdfTool('merge-pdf');
const relatedTools = getRelatedPdfTools(toolData.relatedTools);

// ── SEO ───────────────────────────────────────────────────────
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

// FAQ JSON-LD schema for SEO
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

// ── State ─────────────────────────────────────────────────────
const state = ref('idle'); // idle | files-selected | loading | success | error
const files = ref([]);
const downloadUrl = ref('');
const errorMessage = ref('');
const validationError = ref('');

// ── Runtime config ────────────────────────────────────────────
const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

// ── Helpers ───────────────────────────────────────────────────
function formatSize(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function validateFiles(newFiles) {
  for (const f of newFiles) {
    if (f.type !== 'application/pdf') {
      return 'Semua file harus berformat PDF.';
    }
    if (f.size > 20 * 1024 * 1024) {
      return `File "${f.name}" melebihi batas ukuran 20MB.`;
    }
  }
  return '';
}

// ── Events ────────────────────────────────────────────────────
function onFilesSelected(selected) {
  const error = validateFiles(selected);
  if (error) {
    validationError.value = error;
    return;
  }
  validationError.value = '';
  files.value = [...files.value, ...selected];
  state.value = 'files-selected';
}

function onMoreFiles(event) {
  const selected = Array.from(event.target.files || []);
  onFilesSelected(selected);
  event.target.value = '';
}

function removeFile(index) {
  files.value.splice(index, 1);
  if (files.value.length === 0) state.value = 'idle';
  validationError.value = '';
}

function reset() {
  files.value = [];
  state.value = 'idle';
  downloadUrl.value = '';
  errorMessage.value = '';
  validationError.value = '';
}

// ── Merge action ──────────────────────────────────────────────
async function mergePdf() {
  if (files.value.length < 2) {
    validationError.value = 'Pilih minimal 2 file PDF untuk digabungkan.';
    return;
  }

  state.value = 'loading';
  errorMessage.value = '';

  const formData = new FormData();
  for (const file of files.value) {
    formData.append('files', file);
  }

  try {
    const response = await fetch(`${API_BASE}/pdf/merge`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal menggabungkan PDF.');
    }

    // Build full download URL using backend base
    const backendBase = API_BASE.replace('/api', '');
    downloadUrl.value = backendBase + json.data.downloadUrl;
    state.value = 'success';
  } catch (err) {
    errorMessage.value = err.message || 'Terjadi kesalahan. Silakan coba lagi.';
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
