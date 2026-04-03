<template>
  <ToolPageLayout
    title="Pas Foto Online Gratis (2x3, 3x4, 4x6)"
    description="Ubah foto biasa menjadi pas foto standar Indonesia ukuran 2x3, 3x4, atau 4x6 cm dengan background merah atau biru. Hasilnya siap cetak!"
    category-path="/tools/image"
    category-label="Image Tools"
  >
    <!-- ==================== TOOL CARD ==================== -->
    <ToolActionCard>

      <!-- Upload Zone -->
      <ImageUploadZone
        v-if="state === 'idle'"
        hint="Pilih 1 file JPG/PNG/WEBP maksimal 20MB"
        accept="image/jpeg, image/png, image/webp"
        :multiple="false"
        @files-selected="onFileSelected"
      />

      <!-- Editor & Results -->
      <div v-if="state !== 'idle'" class="mt-5">

        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-gray-700">
            {{ state === 'idle' ? '' : state === 'success' ? 'Hasil Pas Foto' : 'Pengaturan Pas Foto' }}
          </h2>
          <button
            class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            @click="reset"
          >
            Ganti Gambar
          </button>
        </div>

        <!-- Controls + Before Preview -->
        <div v-if="state === 'loaded'" class="bg-gray-50 border border-gray-100 rounded-lg p-5">

          <!-- Original Preview -->
          <div class="mb-5 pb-5 border-b border-gray-200">
            <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Preview Foto Asli</p>
            <div class="flex items-center justify-center bg-white border border-gray-200 rounded-lg overflow-hidden" style="max-height: 240px;">
              <img
                :src="originalPreviewSrc"
                alt="Preview foto asli"
                class="max-w-full max-h-60 object-contain"
              />
            </div>
            <p class="text-xs text-gray-500 mt-2 text-center">{{ originalFile?.name }}</p>
          </div>

          <!-- Options -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <!-- Size -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Ukuran Pas Foto</label>
              <div class="flex flex-col gap-2">
                <label
                  v-for="sz in sizeOptions"
                  :key="sz.value"
                  class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
                  :class="selectedSize === sz.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white hover:border-gray-300'"
                >
                  <input
                    type="radio"
                    :value="sz.value"
                    v-model="selectedSize"
                    class="accent-primary-600"
                  />
                  <span class="text-sm font-medium">{{ sz.label }}</span>
                  <span class="text-xs text-gray-400 ml-auto">{{ sz.px }}</span>
                </label>
              </div>
            </div>

            <!-- Background Color -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Warna Background</label>
              <div class="flex flex-col gap-2">
                <label
                  v-for="bg in bgOptions"
                  :key="bg.value"
                  class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
                  :class="selectedBg === bg.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white hover:border-gray-300'"
                >
                  <input
                    type="radio"
                    :value="bg.value"
                    v-model="selectedBg"
                    class="accent-primary-600"
                  />
                  <span
                    class="w-5 h-5 rounded-full border border-gray-200 shrink-0"
                    :style="{ backgroundColor: bg.hex }"
                  ></span>
                  <span class="text-sm font-medium">{{ bg.label }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Generate Button -->
          <button
            class="btn-primary w-full py-3 flex items-center justify-center gap-2"
            :disabled="!selectedSize || !selectedBg"
            @click="generatePasPhoto"
          >
            <span>🖼️ Generate Pas Foto</span>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="state === 'loading'" class="bg-gray-50 border border-gray-100 rounded-lg p-10 flex flex-col items-center justify-center gap-4">
          <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p class="text-sm text-gray-500 font-medium">Sedang memproses pas foto Anda...</p>
          <p class="text-xs text-gray-400">Ini mungkin membutuhkan beberapa detik</p>
        </div>

        <!-- Error State -->
        <div v-if="state === 'error'" class="bg-red-50 border border-red-100 rounded-lg p-6 text-center">
          <p class="text-sm font-semibold text-red-700 mb-1">Terjadi kesalahan</p>
          <p class="text-xs text-red-500 mb-4">{{ errorMessage }}</p>
          <button
            class="text-xs text-primary-600 hover:underline font-medium"
            @click="backToEdit"
          >
            Coba lagi
          </button>
        </div>

        <!-- Success: Before/After Comparison -->
        <div v-if="state === 'success'" class="bg-gray-50 border border-gray-100 rounded-lg p-5">

          <!-- Side-by-side -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <!-- Before -->
            <div class="flex flex-col items-center">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sebelum</p>
              <div class="w-full bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center" style="min-height: 180px;">
                <img
                  :src="originalPreviewSrc"
                  alt="Foto asli"
                  class="max-w-full max-h-56 object-contain"
                />
              </div>
            </div>

            <!-- After -->
            <div class="flex flex-col items-center">
              <p class="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">Sesudah</p>
              <div
                class="w-full border-2 border-primary-200 rounded-lg overflow-hidden flex items-center justify-center shadow-sm"
                style="min-height: 180px;"
                :style="{ backgroundColor: selectedBgHex }"
              >
                <img
                  :src="resultPreviewSrc"
                  alt="Hasil pas foto"
                  class="max-w-full max-h-56 object-contain drop-shadow-md"
                />
              </div>
              <p class="text-xs text-gray-500 mt-2">Ukuran: {{ selectedSizeLabel }}</p>
            </div>
          </div>

          <!-- Info badges -->
          <div class="flex flex-wrap gap-2 justify-center mb-5">
            <span class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">✅ Background {{ selectedBgLabel }}</span>
            <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">📐 {{ selectedSizeLabel }}</span>
            <span class="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">🖨️ Siap Cetak</span>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm"
              @click="backToEdit"
            >
              ← Ubah Pengaturan
            </button>
            <a
              :href="resultDownloadUrl"
              :download="resultFileName"
              class="btn-primary flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm"
            >
              ⬇️ Unduh Pas Foto
            </a>
          </div>
        </div>

      </div>
    </ToolActionCard>

    <!-- INTRO -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Buat Pas Foto Online Tanpa Repot</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Pas foto standar dibutuhkan dalam banyak keperluan resmi di Indonesia — mulai dari pendaftaran CPNS dan lamaran kerja, hingga pendaftaran sekolah, kuliah, dan pembuatan KTP/SIM. Alat ini membantu Anda mengubah foto biasa menjadi pas foto dengan ukuran yang tepat, background berwarna, dan kualitas siap cetak — semua secara online dan gratis.
      </p>
      <p class="text-gray-500 text-sm leading-relaxed mt-2">
        Proses menggunakan AI untuk mendeteksi dan memisahkan subjek dari latar belakang, kemudian menempatkannya di atas background merah atau biru sesuai ukuran yang dipilih.
      </p>
    </section>

    <!-- USE CASES -->
    <section class="mt-8">
      <h2 class="text-lg font-bold text-gray-900 mb-3">Untuk Keperluan Apa?</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <li
          v-for="useCase in useCases"
          :key="useCase"
          class="flex items-center gap-2 text-sm text-gray-600"
        >
          <span class="text-primary-500 font-bold">✓</span>
          {{ useCase }}
        </li>
      </ul>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Membuat Pas Foto Online</h2>
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
      <NuxtLink to="/tools/image" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua Image Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getImageTool, getRelatedImageTools } from '~/data/imageTools.js';

// Metadata
const toolData = getImageTool('pas-foto-generator');
const relatedTools = getRelatedImageTools(toolData.relatedTools);

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

// --- Options ---
const sizeOptions = [
  { value: '2x3', label: '2 × 3 cm', px: '236 × 354 px' },
  { value: '3x4', label: '3 × 4 cm', px: '354 × 472 px' },
  { value: '4x6', label: '4 × 6 cm', px: '472 × 709 px' },
];

const bgOptions = [
  { value: 'red',  label: 'Merah', hex: '#CE1126' },
  { value: 'blue', label: 'Biru',  hex: '#004690' },
];

const useCases = [
  'Pendaftaran CPNS / ASN',
  'Lamaran kerja',
  'Pendaftaran sekolah & kuliah',
  'Pembuatan KTP, SIM, & Paspor',
  'Ijazah dan transkrip nilai',
  'Pendaftaran program beasiswa',
];

// --- State ---
const state = ref('idle'); // idle | loaded | loading | success | error
const originalFile = ref(null);
const originalPreviewSrc = ref('');
const selectedSize = ref('3x4');
const selectedBg = ref('blue');
const resultPreviewSrc = ref('');
const resultDownloadUrl = ref('');
const resultFileName = ref('');
const errorMessage = ref('');

// --- Computed helpers ---
const selectedSizeLabel = computed(
  () => sizeOptions.find((s) => s.value === selectedSize.value)?.label ?? ''
);
const selectedBgLabel = computed(
  () => bgOptions.find((b) => b.value === selectedBg.value)?.label ?? ''
);
const selectedBgHex = computed(
  () => bgOptions.find((b) => b.value === selectedBg.value)?.hex ?? '#fff'
);

// --- Actions ---
function onFileSelected(selectedFiles) {
  if (!selectedFiles.length) return;
  const f = selectedFiles[0];

  if (!f.type.startsWith('image/')) {
    alert('File harus berformat gambar (JPG, PNG, atau WEBP).');
    return;
  }

  const maxBytes = 20 * 1024 * 1024;
  if (f.size > maxBytes) {
    alert('Ukuran file melebihi batas 20MB.');
    return;
  }

  originalFile.value = f;
  state.value = 'loaded';

  const reader = new FileReader();
  reader.onload = (e) => {
    originalPreviewSrc.value = e.target.result;
  };
  reader.readAsDataURL(f);
}

async function generatePasPhoto() {
  if (!originalFile.value || !selectedSize.value || !selectedBg.value) return;

  state.value = 'loading';
  errorMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('file', originalFile.value);
    formData.append('size', selectedSize.value);
    formData.append('background', selectedBg.value);

    const apiBase = useRuntimeConfig().public.apiBase;
    const response = await fetch(`${apiBase}/image/pas-photo`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Terjadi kesalahan saat memproses gambar.');
    }

    resultDownloadUrl.value = json.data.downloadUrl;
    resultFileName.value = json.data.fileName;

    // Load result into an object URL for preview
    const imgResponse = await fetch(json.data.downloadUrl);
    const blob = await imgResponse.blob();
    resultPreviewSrc.value = URL.createObjectURL(blob);

    state.value = 'success';
  } catch (err) {
    errorMessage.value = err.message || 'Gagal menghubungi server. Coba beberapa saat lagi.';
    state.value = 'error';
  }
}

function backToEdit() {
  if (resultPreviewSrc.value) {
    URL.revokeObjectURL(resultPreviewSrc.value);
    resultPreviewSrc.value = '';
  }
  resultDownloadUrl.value = '';
  resultFileName.value = '';
  state.value = 'loaded';
}

function reset() {
  if (originalPreviewSrc.value && originalPreviewSrc.value.startsWith('blob:')) {
    URL.revokeObjectURL(originalPreviewSrc.value);
  }
  if (resultPreviewSrc.value) {
    URL.revokeObjectURL(resultPreviewSrc.value);
  }
  originalFile.value = null;
  originalPreviewSrc.value = '';
  resultPreviewSrc.value = '';
  resultDownloadUrl.value = '';
  resultFileName.value = '';
  errorMessage.value = '';
  state.value = 'idle';
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
