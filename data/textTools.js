/**
 * textTools.js — Centralized source of truth for Text Tools data.
 */

export const TEXT_TOOLS = [
  {
    slug: 'word-counter',
    title: 'Word Counter',
    shortDescription: 'Hitung total kata, karakter, suku kata, dan kalimat secara otomatis dan real-time.',
    seoTitle: 'Word Counter Online Gratis - Hitung Kata dan Karakter | QuickTools',
    seoDescription: 'Hitung jumlah kata, karakter, kalimat, dan paragraf secara online dan gratis. Cocok untuk artikel, tugas, caption, dan berbagai kebutuhan penulisan.',
    path: '/tools/text/word-counter',
    howToSteps: [
      'Ketik atau tempel (paste) naskah teks Anda ke dalam kotak utama yang tersedia.',
      'Aplikasi akan seketika (secara real-time) menghitung jumlah karakter, kata, dan baris.',
      'Gunakan statistik tersebut untuk menyesuaikan dengan batas limit penulisan platform Anda (misalnya limit karakter Twitter atau tugas Esai).',
      'Klik tombol "Hapus" untuk mereset kalkulator dari awal.'
    ],
    faq: [
      {
        question: 'Apakah hasil teks saya disimpan di server?',
        answer: 'Tidak. Aplikasi ini berjalan murni (100%) di memori browser Anda (Klien). Kami sama sekali tidak memiliki basis data untuk melihat atau merekam tulisan Anda.',
      },
      {
        question: 'Apakah alat ini gratis diakses berkali-kali?',
        answer: 'Ya, Anda dapat menempel dan menghapus teks hingga jutaan baris tanpa adanya kuota berbayar.',
      },
      {
        question: 'Apakah aplikasi menghitung spasi sebagai karakter?',
        answer: 'Kami menyediakan dua indikator: "Total Karakter (dengan spasi)" dan "Karakter (tanpa spasi)" agar memudahkan Anda membuat laporan akurat.',
      }
    ],
    relatedTools: ['case-converter', 'remove-duplicate-text'],
  },
  {
    slug: 'case-converter',
    title: 'Case Converter',
    shortDescription: 'Ubah teks massal menjadi HURUF BESAR, huruf kecil, atau Setiap Kata Kapital.',
    seoTitle: 'Case Converter Online Gratis - Ubah Huruf Besar Kecil | QuickTools',
    seoDescription: 'Ubah teks menjadi huruf besar, huruf kecil, title case, atau sentence case secara online dan gratis. Cepat untuk editing teks dan dokumen.',
    path: '/tools/text/case-converter',
    howToSteps: [
      'Salin teks yang format kapitalisasinya berantakan.',
      'Tempel (Paste) ke dalam kotak teks yang tersedia.',
      'Klik salah satu dari 4 tombol format yang dinginkan: UPPERCASE, lowercase, Title Case, atau Sentence case.',
      'Klik tombol Salin (Copy) untuk menggunakannya di dokumen Anda.'
    ],
    faq: [
      {
        question: 'Apa itu Sentence case?',
        answer: 'Sentence case mengubah karakter pertama pada kalimat (setelah tanda titik) menjadi huruf kapital, sementara seluruh karakter lainnya menjadi huruf kecil (seperti standar bacaan biasa).',
      },
      {
        question: 'Berapa karakter maksimal yang dapat dikonversi?',
        answer: 'Aplikasi ini menggunakan teknologi peramban super cepat sehingga menangani +100.000 kata sekaligus secara instan tidak akan membebani komputer Anda.',
      },
    ],
    relatedTools: ['word-counter', 'remove-duplicate-text'],
  },
  {
    slug: 'remove-duplicate-text',
    title: 'Remove Duplicate Text',
    shortDescription: 'Bersihkan baris ganda yang berulang dari sebuah list panjang seketika.',
    seoTitle: 'Remove Duplicate Text Online Gratis - Hapus Teks Duplikat | QuickTools',
    seoDescription: 'Hapus baris teks yang duplikat secara online dan gratis. Cocok untuk membersihkan data, daftar nama, daftar nomor, dan teks berulang dengan cepat.',
    path: '/tools/text/remove-duplicate-text',
    howToSteps: [
      'Siapkan daftar panjang Anda (pastikan setiap item dipisahkan dengan Enter / Baris Baru).',
      'Tempelkan kumpulan daftar tersebut ke area teks.',
      'Sistem otomatis memindai dan menghapus kalimat/kata yang punya kesamaan 100%.',
      'Informasi jumlah baris asli vs sesudah dihapus akan ditampilkan sebagai ringkasan.'
    ],
    faq: [
      {
        question: 'Apakah fitur ini aman untuk data nomor HP massal?',
        answer: 'Sangat aman. Pemrosesan dilakukan murni di browser Anda (offline-first). Anda bisa membersihkan daftar nomor telepon (database penjualan) tanpa perlu takut tersebar.',
      },
      {
        question: 'Apakah huruf besar/kecil (Case Sensitive) berpengaruh?',
        answer: 'Sistem algoritma ini membedakan huruf besar dan huruf kecil. "Ayam" dan "ayam" dianggap dua kata yang berbeda karena strukturnya.',
      },
    ],
    relatedTools: ['word-counter', 'case-converter'],
  }
];

export function getTextTool(slug) {
  return TEXT_TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedTextTools(slugsArray) {
  if (!slugsArray || slugsArray.length === 0) return [];
  return TEXT_TOOLS.filter((tool) => slugsArray.includes(tool.slug)).slice(0, 3);
}
