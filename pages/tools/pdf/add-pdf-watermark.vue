<template>
  <ToolPageLayout
    title="Tambah Watermark PDF Online Gratis"
    description="Berikan tanda air (watermark) teks ke file PDF secara online dan gratis. Lindungi dokumen, laporan, dan invoice Anda tanpa instal aplikasi tambahan."
    category-path="/tools/pdf"
    category-label="PDF Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>
      
      <!-- Upload Zone (idle state) -->
      <FileUploadZone
        v-if="state === 'idle'"
        hint="File PDF • Maks 20MB"
        accept="application/pdf"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- File selected & Settings Form -->
      <div v-if="state !== 'idle' && state !== 'success'" class="mt-4">
        <h2 class="text-sm font-semibold text-gray-700 mb-2">File yang dipilih</h2>
        <div class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-sm mb-6">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-red-500 shrink-0">📄</span>
            <span class="truncate text-gray-700">{{ file?.name }}</span>
            <span class="text-gray-400 shrink-0">({{ formatSize(file?.size || 0) }})</span>
          </div>
          <button
            class="text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0"
            title="Hapus file"
            @click="reset"
            :disabled="state === 'loading'"
          >
            ✕
          </button>
        </div>

        <h2 class="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Pengaturan Watermark</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          
          <!-- Text -->
          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-gray-600 mb-1">Teks Watermark <span class="text-red-500">*</span></label>
            <input 
              v-model="settings.text" 
              type="text" 
              placeholder="Contoh: RAHASIA, DRAFT, atau Nama Anda" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              :disabled="state === 'loading'"
            />
          </div>

          <!-- Position -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Posisi</label>
            <select v-model="settings.position" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" :disabled="state === 'loading'">
              <option value="center">Tengah (Center)</option>
              <option value="top-left">Kiri Atas</option>
              <option value="top-right">Kanan Atas</option>
              <option value="bottom-left">Kiri Bawah</option>
              <option value="bottom-right">Kanan Bawah</option>
            </select>
          </div>

          <!-- Color -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Warna</label>
            <div class="flex items-center gap-2">
              <input v-model="settings.colorHex" type="color" class="h-9 w-12 cursor-pointer border-0 p-0 rounded-lg overflow-hidden" :disabled="state === 'loading'"/>
              <span class="text-sm text-gray-600">{{ settings.colorHex.toUpperCase() }}</span>
            </div>
          </div>

          <!-- Opacity -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Transparansi: {{ Math.round(settings.opacity * 100) }}%</label>
            <input v-model="settings.opacity" type="range" min="0.1" max="1.0" step="0.1" class="w-full mt-2" :disabled="state === 'loading'"/>
          </div>

          <!-- Rotation -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Rotasi</label>
            <select v-model="settings.rotation" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" :disabled="state === 'loading'">
              <option :value="0">Lurus (0°)</option>
              <option :value="45">Miring Kanan (45°)</option>
              <option :value="-45">Miring Kiri (-45°)</option>
            </select>
          </div>

          <!-- Font Size -->
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Ukuran Font</label>
            <select v-model="settings.fontSize" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" :disabled="state === 'loading'">
              <option :value="24">Kecil (24px)</option>
              <option :value="48">Sedang (48px)</option>
              <option :value="72">Besar (72px)</option>
              <option :value="96">Sangat Besar (96px)</option>
            </select>
          </div>
        </div>

        <!-- Inline validation error -->
        <p v-if="validationError" class="mb-4 text-red-500 text-sm">⚠️ {{ validationError }}</p>

        <!-- Submit Button -->
        <div>
          <button
            class="btn-primary flex items-center gap-2 justify-center w-full md:w-auto px-6"
            :disabled="!file || !settings.text || state === 'loading'"
            @click="addWatermark"
          >
            <span v-if="state === 'loading'" class="animate-spin inline-block">⏳</span>
            <span>{{ state === 'loading' ? 'Memproses...' : 'Terapkan Watermark' }}</span>
          </button>
        </div>
      </div>

      <!-- Loading state description -->
      <div v-if="state === 'loading'" class="mt-4 text-center py-4">
        <p class="text-gray-500 text-sm">Sedang membubuhkan watermark ke semua halaman PDF...</p>
      </div>

      <!-- Success state -->
      <div v-if="state === 'success'" class="mt-5 bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <p class="text-green-700 font-semibold mb-1">✅ Watermark berhasil ditambahkan!</p>
        <p class="text-green-600 text-sm mb-4">File PDF baru Anda sudah siap.</p>
        <a
          :href="downloadUrl"
          :download="downloadFileName"
          target="_blank"
          rel="noopener"
          class="inline-block btn-primary"
        >
          ⬇️ Unduh PDF Hasil
        </a>
        <button
          class="block mx-auto mt-3 text-sm text-gray-400 hover:text-gray-600 underline"
          @click="reset"
        >
          Proses file lain
        </button>
      </div>

      <!-- Error state -->
      <div v-if="state === 'error'" class="mt-5 bg-red-50 border border-red-200 rounded-xl p-5 text-center">
        <p class="text-red-600 font-semibold mb-1">❌ Gagal memproses file</p>
        <p class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
        <button class="btn-outline-primary text-sm" @click="state = 'settings'">Kembali Edit</button>
      </div>

    </ToolActionCard>

    <!-- ==================== INTRO CONTENT ==================== -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Solusi Aman Tambah Tanda Air ke PDF</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Beri perlindungan lebih pada dokumen penting Anda dengan menambahkan teks watermark ke setiap halaman. 
        Anda dapat mengatur warna, posisi, transparansi, serta rotasi teks agar menyesuaikan dengan tata letak dokumen.
      </p>
      <p class="text-gray-500 text-sm leading-relaxed mt-2">
        Berbeda dengan aplikasi konversi lainnya, kami mengutamakan privasi Anda. Proses manipulasi halaman terjadi secara aman 
        di cloud dan semua file yang telah diolah akan segera dihapus selamanya dari server setelah konversi selesai.
      </p>
    </section>

    <!-- ==================== USE CASES ==================== -->
    <section class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Kenapa Saya Perlu Fitur Ini?</h2>
      <ul class="space-y-2 text-sm text-gray-600">
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Membubuhkan kata "RAHASIA" (Confidential) pada dokumen perusahaan.</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Memberikan status "DRAFT" pada dokumen kontrak atau tugas kuliah yang belum final.</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Mencegah penjiplakan modul ajar dengan memberi nama tutor sebagai background.</li>
        <li class="flex items-start gap-2"><span class="text-primary-500 shrink-0 mt-0.5">✓</span> Memberikan tanda status "PAID" pada invoice/invoice untuk arsip.</li>
      </ul>
    </section>

    <!-- ==================== HOW TO USE ==================== -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menggunakan</h2>
      <ol class="space-y-3">
        <li v-for="(step, i) in toolData.howToSteps" :key="i" class="flex items-start gap-3">
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
const toolData = getPdfTool('add-pdf-watermark') || {
  howToSteps: [],
  faq: [],
  seoTitle: 'Tambah Watermark PDF Online',
  seoDescription: 'Beri Tanda pada File PDF Anda',
  relatedTools: []
};
const relatedTools = getRelatedPdfTools(toolData.relatedTools);

// ── SEO ───────────────────────────────────────────────────────
useSeoMeta({
  title: toolData.seoTitle,
  description: toolData.seoDescription,
  ogTitle: toolData.seoTitle,
  ogDescription: toolData.seoDescription,
});

if (toolData.faq.length > 0) {
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
}

// ── State ─────────────────────────────────────────────────────
const state = ref('idle'); // idle | settings | loading | success | error
const file = ref(null);
const downloadUrl = ref('');
const downloadFileName = ref('');
const errorMessage = ref('');
const validationError = ref('');

const settings = ref({
  text: '',
  position: 'center',
  opacity: 0.5,
  fontSize: 48,
  rotation: 45,
  colorHex: '#000000'
});

// ── Runtime config ────────────────────────────────────────────
const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

// ── Helpers ───────────────────────────────────────────────────
function formatSize(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function validateFile(f) {
  if (f.type !== 'application/pdf') return 'Hanya file PDF yang diizinkan.';
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
  state.value = 'settings';
}

function reset() {
  file.value = null;
  state.value = 'idle';
  downloadUrl.value = '';
  downloadFileName.value = '';
  errorMessage.value = '';
  validationError.value = '';
  settings.value.text = '';
}

// ── API Submission ────────────────────────────────────────────
async function addWatermark() {
  if (!file.value) {
    validationError.value = 'Pilih file PDF terlebih dahulu.';
    return;
  }
  if (!settings.value.text.trim()) {
    validationError.value = 'Teks watermark wajib diisi.';
    return;
  }

  state.value = 'loading';
  errorMessage.value = '';
  validationError.value = '';

  const formData = new FormData();
  formData.append('files', file.value);
  formData.append('text', settings.value.text.trim());
  formData.append('position', settings.value.position);
  formData.append('opacity', settings.value.opacity);
  formData.append('fontSize', settings.value.fontSize);
  formData.append('rotation', settings.value.rotation);
  formData.append('colorHex', settings.value.colorHex);

  try {
    const response = await fetch(`${API_BASE}/pdf/add-watermark`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal menyisipkan watermark.');
    }

    // Build full download URL using backend base (stripping /api)
    const backendBase = API_BASE.replace(/\/api\/?$/, '');
    downloadUrl.value = backendBase + json.data.downloadUrl;
    downloadFileName.value = json.data.fileName;
    state.value = 'success';
  } catch (err) {
    errorMessage.value = err.message || 'Terjadi kesalahan sistem. Silakan coba lagi.';
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
