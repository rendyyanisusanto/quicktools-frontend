<template>
  <ToolPageLayout
    title="PDF ke Word Online Gratis"
    description="Ubah file PDF menjadi dokumen Word (DOCX) yang bisa diedit secara online, gratis, dan tanpa perlu menginstal aplikasi."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>

      <!-- Upload Zone (idle state) -->
      <FileUploadZone
        v-if="state === 'idle'"
        hint="Hanya file PDF • Maks 20MB"
        @files-selected="onFileSelected"
      />

      <!-- File selected preview -->
      <div v-if="file && state !== 'success'" class="mt-4">
        <h2 class="text-sm font-semibold text-gray-700 mb-2">File yang dipilih</h2>
        <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-red-500 shrink-0">📄</span>
            <span class="truncate text-gray-700">{{ file.name }}</span>
            <span class="text-gray-400 shrink-0">({{ formatSize(file.size) }})</span>
          </div>
          <button
            class="text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0"
            title="Hapus file"
            @click="reset"
          >
            ✕
          </button>
        </div>

        <!-- Inline validation error -->
        <p v-if="validationError" class="mt-2 text-red-500 text-sm">⚠️ {{ validationError }}</p>

        <!-- Convert button -->
        <div class="mt-4">
          <button
            class="btn-primary flex items-center gap-2"
            :disabled="!file || state === 'loading'"
            @click="convertToWord"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Mengkonversi...' : 'Konversi ke Word' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="state === 'loading'" class="mt-4 text-center py-4">
        <p class="text-gray-500 text-sm">Sedang mengkonversi PDF ke Word, harap tunggu...</p>
        <p class="text-gray-400 text-xs mt-1">Proses mungkin memakan beberapa detik tergantung ukuran file.</p>
      </div>

      <!-- Success state -->
      <div
        v-if="state === 'success'"
        class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
      >
        <p class="text-green-700 font-semibold mb-1">✅ Konversi berhasil!</p>
        <p class="text-green-600 text-sm mb-1">File Word siap untuk diunduh.</p>
        <p class="text-green-500 text-xs mb-4">
          Catatan: Tata letak hasil konversi mungkin sedikit berbeda dari PDF asli, terutama untuk dokumen dengan layout kompleks.
        </p>
        <a
          :href="downloadUrl"
          :download="downloadFileName"
          target="_blank"
          rel="noopener"
          class="inline-block btn-primary"
        >
          ⬇️ Unduh File Word (.docx)
        </a>
        <button
          class="block mx-auto mt-3 text-sm text-gray-400 hover:text-gray-600 underline"
          @click="reset"
        >
          Konversi file lain
        </button>
      </div>

      <!-- Error state -->
      <div
        v-if="state === 'error'"
        class="mt-5 bg-red-50 border border-red-200 rounded-xl p-5 text-center"
      >
        <p class="text-red-600 font-semibold mb-1">❌ Konversi gagal</p>
        <p class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
        <button class="btn-outline-primary text-sm" @click="reset">Coba Lagi</button>
      </div>

    </ToolActionCard>

    <!-- ==================== INTRO CONTENT ==================== -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Apa itu PDF ke Word?</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        PDF ke Word (DOCX) adalah fitur konversi yang memungkinkan kamu mengubah dokumen PDF menjadi
        file Word yang bisa diedit langsung. Ini sangat berguna saat kamu perlu memodifikasi isi
        dokumen, menyalin teks, atau mengubah format tanpa harus mengetik ulang dari awal.
        Dengan QuickTools, proses ini bisa dilakukan langsung di browser tanpa perlu menginstal
        software tambahan.
      </p>
      <p class="text-gray-500 text-sm leading-relaxed mt-2">
        <strong>Perlu diperhatikan:</strong> hasil konversi dapat berbeda tergantung kompleksitas
        layout PDF asli. PDF yang dibuat dari scan atau gambar mungkin menghasilkan teks yang kurang
        akurat tanpa OCR.
      </p>
    </section>

    <!-- ==================== USE CASES ==================== -->
    <section class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Kapan Menggunakan Fitur Ini?</h2>
      <ul class="space-y-2 text-sm text-gray-600">
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengedit dokumen kontrak atau perjanjian dalam format PDF</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengubah laporan atau proposal PDF agar bisa dimodifikasi</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengekstrak dan mengedit isi dokumen akademik atau jurnal</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengubah format CV/resume dari PDF ke Word untuk diedit ulang</li>
      </ul>
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
import { ref } from 'vue';
import { getPdfTool, getRelatedPdfTools } from '~/data/pdfTools.js';

// ── Tool metadata ──────────────────────────────────────────────
const toolData = getPdfTool('pdf-to-word');
const relatedTools = getRelatedPdfTools(toolData.relatedTools);

// ── SEO ───────────────────────────────────────────────────────
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

// FAQ JSON-LD schema
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
const state = ref('idle'); // idle | loading | success | error
const file = ref(null);
const downloadUrl = ref('');
const downloadFileName = ref('');
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

function validateFile(f) {
  if (f.type !== 'application/pdf') return 'File harus berformat PDF.';
  if (f.size > 20 * 1024 * 1024) return `File melebihi batas ukuran 20MB.`;
  return '';
}

// ── File selection ─────────────────────────────────────────────
function onFileSelected(selected) {
  // FileUploadZone emits an array; we only care about the first file
  const picked = Array.isArray(selected) ? selected[0] : selected;
  if (!picked) return;

  const error = validateFile(picked);
  if (error) {
    validationError.value = error;
    file.value = null;
    return;
  }

  validationError.value = '';
  file.value = picked;
  state.value = 'idle';
}

function reset() {
  file.value = null;
  state.value = 'idle';
  downloadUrl.value = '';
  downloadFileName.value = '';
  errorMessage.value = '';
  validationError.value = '';
}

// ── Conversion action ─────────────────────────────────────────
async function convertToWord() {
  if (!file.value) {
    validationError.value = 'Pilih file PDF terlebih dahulu.';
    return;
  }

  state.value = 'loading';
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('files', file.value);

  try {
    const response = await fetch(`${API_BASE}/pdf/to-word`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal mengkonversi PDF ke Word.');
    }

    downloadUrl.value = json.data.downloadUrl;
    downloadFileName.value = json.data.fileName;
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
