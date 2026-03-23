<template>
  <ToolPageLayout
    title="Kalkulator Ranking Siswa Gratis"
    description="Masukan daftar (nama - spasi - nilai) secara bertumpuk. Aplikasi akan mengurutkan peringkat murid secara berurutan sesuai juara yang sah."
    category-path="/tools/edu"
    category-label="Education Tools"
  >
    <ToolActionCard>
      
      <!-- Split View Structure -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         <!-- Left: Input Form -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center mb-2">
               <label class="block text-sm font-semibold text-gray-700">Daftar Input: Nama dan Nilai</label>
               <button v-if="inputText.length > 0" @click="reset" class="text-xs text-red-500 hover:text-red-700 font-medium">Reset</button>
            </div>
            <p class="text-xs text-gray-500 mb-3">Tulis 1 siswa per baris. Pisahkan nama dan nilai dengan jeda tanda Minus <code>-</code> atau TitikDua <code>:</code>.</p>
            <textarea
               v-model="inputText"
               @input="handleInput"
               rows="10"
               class="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-y shadow-inner flex-1"
               placeholder="Contoh:&#10;Budi Santoso - 85.5&#10;Andi - 92&#10;Siti: 92&#10;Rina - 78"
            ></textarea>
         </div>

         <!-- Right: Ranking Result Table -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center mb-2">
               <label class="block text-sm font-semibold text-gray-700">Hasil Pemeringkatan (Ranking)</label>
               <span v-if="rankedStudents.length" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{{ rankedStudents.length }} Siswa</span>
            </div>
            
            <div class="border border-gray-200 rounded-lg overflow-hidden flex-1 bg-gray-50">
               <div v-if="rankedStudents.length === 0" class="h-full min-h-[200px] flex items-center justify-center text-sm text-gray-400 p-6 text-center">
                  Ranking akan muncul di sini otomatis ketika Anda mulai mengetik data di kotak kiri.
               </div>
               <div v-else class="max-h-[300px] overflow-y-auto">
                  <table class="w-full text-sm text-left">
                     <thead class="text-xs text-gray-600 uppercase bg-gray-100 sticky top-0">
                        <tr>
                           <th scope="col" class="px-4 py-3 text-center w-16">Rank</th>
                           <th scope="col" class="px-4 py-3">Nama Siswa</th>
                           <th scope="col" class="px-4 py-3 text-right">Nilai</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y divide-gray-100 bg-white">
                        <tr v-for="(student, idx) in rankedStudents" :key="idx" class="hover:bg-gray-50 transition-colors">
                           <td class="px-4 py-3 text-center font-bold" :class="student.rank <= 3 ? 'text-primary-600' : 'text-gray-500'">
                              {{ student.rank }}
                           </td>
                           <td class="px-4 py-3 font-medium text-gray-900 truncate max-w-[120px]" :title="student.name">
                              {{ student.name }}
                           </td>
                           <td class="px-4 py-3 text-right text-gray-700">
                              {{ student.score }}
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>

    </ToolActionCard>

    <!-- INTRO & CONTENT -->
    <section class="mt-10 prose prose-gray max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-3">Tentukan Pemenang Di Kelas Anda</h2>
      <p class="text-gray-500 text-sm leading-relaxed">
        Menentukan ranking atau peringkat siswa secara manual rawan terhadap human-error (kesalahan mata), terutama saat terjadi fenomena seri (nilai yang persis berdekatan antar dua murid). Algoritma kalkulator ini menjaga prioritas rangking secara adil berbasis desimal yang tajam.
      </p>
    </section>

    <!-- HOW TO USE -->
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
import { ref } from 'vue';
import { getEducationTool, getRelatedEducationTools } from '~/data/educationTools.js';
import { calculateRanking } from '~/utils/educationTools.js';

// Metadata
const toolData = getEducationTool('ranking-calculator');
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
const inputText = ref('');
const rankedStudents = ref([]);

// Actions
function handleInput() {
   const lines = inputText.value.split('\n');
   const students = [];
   
   for (let line of lines) {
      if (!line.trim()) continue;
      
      // Separate by - or : (e.g. "Budi Santoso - 85.5")
      const parts = line.split(/[-:]/);
      if (parts.length >= 2) {
         // The last part is expected to be the score
         const scoreStr = parts.pop().trim();
         const score = parseFloat(scoreStr);
         const name = parts.join('-').trim() || 'Siswa N/A';
         
         if (!isNaN(score)) {
            students.push({ name, score });
         }
      } else {
         // If no separator is found, try separating by last space
         const spaces = line.trim().split(' ');
         if (spaces.length > 1) {
            const scoreStr = spaces.pop();
            const score = parseFloat(scoreStr);
            if (!isNaN(score)) {
               const name = spaces.join(' ');
               students.push({ name, score });
            }
         }
      }
   }
   
   rankedStudents.value = calculateRanking(students);
}

function reset() {
  inputText.value = '';
  rankedStudents.value = [];
}
</script>
