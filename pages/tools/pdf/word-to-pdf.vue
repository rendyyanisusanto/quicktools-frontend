<template>
  <ToolPageLayout
    title="Word ke PDF Online Gratis"
    description="Ubah file Word (DOCX/DOC) ke PDF secara online dan gratis dengan cepat. Hasil rapi untuk dokumen sekolah, laporan, dan administrasi."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>

      <!-- Upload Zone (idle state) -->
      <FileUploadZone
        v-if="state === 'idle'"
        hint="File Word (.docx, .doc) • Maks 20MB"
        accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- File selected preview -->
      <div v-if="file && state !== 'success'" class="mt-4">
        <h2 class="text-sm font-semibold text-gray-700 mb-2">File yang dipilih</h2>
        <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-blue-500 shrink-0">📝</span>
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
            @click="convertToPdf"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Mengkonversi...' : 'Konversi ke PDF' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="state === 'loading'" class="mt-4 text-center py-4">
        <p class="text-gray-500 text-sm">Sedang mengkonversi Word ke PDF, harap tunggu...</p>
        <p class="text-gray-400 text-xs mt-1">Sistem sedang merender dokumen Anda agar terlihat rapi.</p>
      </div>

      <!-- Success state -->
      <div
        v-if="state === 'success'"
        class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center"
      >
        <p class="text-green-700 font-semibold mb-1">✅ Konversi berhasil!</p>
        <p class="text-green-600 text-sm mb-4">File PDF siap untuk diunduh.</p>
        <a
          :href="downloadUrl"
          :download="downloadFileName"
          target="_blank"
          rel="noopener"
          class="inline-block btn-primary"
        >
          ⬇️ Unduh File PDF (.pdf)
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
      <h2 class="text-xl font-bold text-gray-900 mb-3">Apa itu Word ke PDF?</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Fitur Word ke PDF memungkinkan Anda mengunci dokumen yang dibuat di Microsoft Word (seperti .docx atau .doc)
        menjadi format PDF statis. Ini memastikan bahwa struktur, font, margin, dan gambar di dalam dokumen
        tidak berantakan atau berubah saat dibuka di komputer, HP, atau sistem operasi yang berbeda.
      </p>
      <p class="text-gray-500 text-sm leading-relaxed mt-2">
        Dengan menggunakan mesin konversi kami, Anda tidak perlu lagi repot menginstal software tambahan 
        seperti Microsoft Office atau aplikasi pihak ketiga. Cukup unggah, proses secara otomatis, 
        dan unduh hasilnya sicepat kilat.
      </p>
    </section>

    <!-- ==================== USE CASES ==================== -->
    <section class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Kapan Menggunakan Fitur Ini?</h2>
      <ul class="space-y-2 text-sm text-gray-600">
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengirim lamaran kerja (CV/Resume) agar tata letak tidak rusak</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengunci tugas akhir atau skripsi sebelum dicetak atau disubmit</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mengamankan faktur, tagihan, atau laporan keuangan ke client</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Membagikan dokumen resmi perusahaan tanpa khawatir diretas formatnya</li>
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
const toolData = getPdfTool('word-to-pdf');
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
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];
  if (!allowedTypes.includes(f.type) && !f.name.endsWith('.docx') && !f.name.endsWith('.doc')) {
    return 'Hanya file Word (.docx, .doc) yang diizinkan.';
  }
  if (f.size > 20 * 1024 * 1024) return `File melebihi batas ukuran 20MB.`;
  return '';
}

// ── File selection ─────────────────────────────────────────────
function onFileSelected(selected) {
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
async function convertToPdf() {
  if (!file.value) {
    validationError.value = 'Pilih file Word terlebih dahulu.';
    return;
  }

  state.value = 'loading';
  errorMessage.value = '';

  const formData = new FormData();
  formData.append('files', file.value);

  try {
    const response = await fetch(`${API_BASE}/pdf/word-to-pdf`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal mengkonversi Word ke PDF.');
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
