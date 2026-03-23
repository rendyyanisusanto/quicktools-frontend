<template>
  <ToolPageLayout
    title="Generator Surat Izin Sekolah"
    description="Tidak perlu bingung menyusun kata-kata. Masukkan identitas, lalu salin format surat izin formal yang otomatis dibuat untuk dikirimkan melalui WA atau dicetak kertas."
    category-path="/tools/edu"
    category-label="Education Tools"
  >
    <ToolActionCard>
      
      <!-- Split Form and Output -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         <!-- Left: Input Form -->
         <div class="flex flex-col space-y-4">
            <h3 class="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Informasi Pemohon Izin</h3>
            
            <div>
               <label class="block text-xs font-semibold text-gray-600 mb-1">Nama Siswa</label>
               <input v-model="form.studentName" type="text" placeholder="Cth: Ananda Rizky" class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            
            <div>
               <label class="block text-xs font-semibold text-gray-600 mb-1">Kelas Tingkat</label>
               <input v-model="form.studentClass" type="text" placeholder="Cth: XII IPA 1" class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            
            <div>
               <label class="block text-xs font-semibold text-gray-600 mb-1">Tanggal Izin Tidak Masuk</label>
               <input v-model="form.date" type="date" class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            
            <div>
               <label class="block text-xs font-semibold text-gray-600 mb-1">Alasan Tidak Masuk</label>
               <select v-model="form.reason" class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="sakit">Sakit</option>
                  <option value="ada kepentingan keluarga yang mendesak">Kepentingan Keluarga</option>
                  <option value="menjelang keberangkatan ke luar kota">Ke Luar Kota</option>
                  <option value="dirawat di rumah sakit">Rawat Inap RS</option>
               </select>
            </div>
            
            <h3 class="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mt-4">Informasi Validasi (Ttd)</h3>
            
            <div>
               <label class="block text-xs font-semibold text-gray-600 mb-1">Nama Orang Tua / Wali</label>
               <input v-model="form.parentName" type="text" placeholder="Nama Bapak/Ibu" class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            
            <div>
               <label class="block text-xs font-semibold text-gray-600 mb-1">Ditujukan Kepada (Opsional)</label>
               <input v-model="form.schoolName" type="text" placeholder="Bapak/Ibu Guru Wali Kelas" class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
         </div>

         <!-- Right: Letter Preview Result -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center mb-2">
               <label class="block text-sm font-semibold text-gray-700">Pratinjau Surat Izin</label>
               <button v-if="generatedLetter" @click="copyLetter" class="text-xs font-bold px-3 py-1.5 rounded" :class="copied ? 'bg-green-100 text-green-700' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'">
                  <span v-if="copied">Ter-Salin! ✓</span>
                  <span v-else>Salin Teks (Copy)</span>
               </button>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-5 flex-1 bg-white shadow-sm font-serif text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
               {{ generatedLetter }}
            </div>
         </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Tidak Perlu Kertas dan Tinta Lagi</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Di era disrupsi digital, mayoritas instansi sekolah dan Bapak/Ibu wali kelas sudah sangat terbuka dengan pendekatan perizinan tidak masuk secara online via chatting WhatsApp. Alat pembuat surat ini berfungsi mengubah isian formulir singkat menjadi template bahasa Indonesia baku yang sopan dan pantas dibaca oleh staf sekolah.
      </p>
    </section>

    <!-- HOW TO USE -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Cara Menggunakan Pembuat Surat Bebas Typo</h2>
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
      <NuxtLink to="/tools/edu" class="text-sm text-primary-600 hover:underline">
        ← Lihat semua Education Tools
      </NuxtLink>
    </div>
  </ToolPageLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { getEducationTool, getRelatedEducationTools } from '~/data/educationTools.js';
import { generatePermissionLetter } from '~/utils/educationTools.js';

// Metadata
const toolData = getEducationTool('permission-letter-generator');
const relatedTools = getRelatedEducationTools(toolData.relatedTools);

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
const defaultDate = new Date().toISOString().split('T')[0];
const form = reactive({
   studentName: '',
   studentClass: '',
   date: defaultDate,
   reason: 'sakit',
   parentName: '',
   schoolName: ''
});
const copied = ref(false);

// Reactive Letter Generation
const generatedLetter = computed(() => {
   return generatePermissionLetter({
      ...form, 
      schoolName: form.schoolName || 'Bapak/Ibu Guru Wali Kelas'
   });
});

// Actions
async function copyLetter() {
   if (!generatedLetter.value) return;
   try {
      await navigator.clipboard.writeText(generatedLetter.value);
      copied.value = true;
      setTimeout(() => copied.value = false, 3000);
   } catch (err) {
      console.error('Failed to copy', err);
   }
}
</script>
