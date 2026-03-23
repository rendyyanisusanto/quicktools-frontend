/**
 * developerTools.js — Centralized source of truth for Developer Tools data.
 */

export const DEVELOPER_TOOLS = [
  {
    slug: 'json-formatter',
    title: 'JSON Formatter',
    shortDescription: 'Rapikan, validasi, dan percantik sintaks struktur data JSON yang berantakan dalam seketika.',
    seoTitle: 'JSON Formatter Online Gratis - Format dan Validasi JSON | QuickTools',
    seoDescription: 'Rapikan dan validasi JSON secara online dan gratis. Cocok untuk developer, integrasi API, debugging, dan pembacaan data yang lebih mudah.',
    path: '/tools/developer/json-formatter',
    howToSteps: [
      'Salin kode JSON bernasalah atau tidak rapi (minified) dari API/Server asli Anda.',
      'Tempel (Paste) payload JSON tersebut ke area pengeditan.',
      'Klik tombol "Format & Rapikan" untuk mengubahnya ke bentuk JSON Indented (Mudah dibaca).',
      'Jika kode JSON punya kesalahan (Error Syntax), sistem akan otomatis menampilkan lokasi error barisnya.',
      'Gunakan tombol "Minify (Satu Baris)" untuk mengkonversinya ke versi ringan untuk keperluan payload HTTP pengiriman akhir.'
    ],
    faq: [
      {
        question: 'Apakah hasil JSON saya dikirimkan ke server eksternal?',
        answer: 'Sama sekali tidak. Proses validasi JSON berjalan secara internal di dalam peramban web Anda lewat teknologi native. Data yang sifatnya rahasia tidak pernah meninggalkan spesifik perangkat Anda.',
      },
      {
        question: 'Apakah aplikasi JSON Formatter ini gratis?',
        answer: 'Ya, 100% gratis tanpa pendaftaran.',
      }
    ],
    relatedTools: ['base64-encoder', 'uuid-generator'],
  },
  {
    slug: 'base64-encoder',
    title: 'Base64 Encoder',
    shortDescription: 'Konversi teks menjadi format Base64 yang aman atau pecahkan (Decode) secara cepat 1 arah.',
    seoTitle: 'Base64 Encoder Online Gratis - Encode dan Decode Base64 | QuickTools',
    seoDescription: 'Encode dan decode Base64 secara online dan gratis dengan cepat. Cocok untuk developer, data transfer, debugging, dan kebutuhan teknis lainnya.',
    path: '/tools/developer/base64-encoder',
    howToSteps: [
      'Tempel string text URL-safes / Base64 Payload ke area teks.',
      'Pilih Mode Dekripsi (Decode Base64 ke Teks Biasa) jika Anda ingin membacanya.',
      'Atau pilih Mode Enkripsi (Encode Teks ke Base64) untuk mempersiapkan string ke header API Anda.',
      'Silakan salin hasil output untuk digunakan lebih lanjut.'
    ],
    faq: [
      {
        question: 'Apa itu Base64 Array?',
        answer: 'Base64 adalah skema konversi data biner menjadi format ASCII untuk mengamankan karakter dalam transfer jaringan (seperti HTTP Header Authorization).',
      },
      {
        question: 'Apakah mendukung karakter Non-Latin (UTF-8) seperti huruf Arab atau Emoji?',
        answer: 'Ya, teknologi konversi di QuickTools menggunakan UTF-8 padding yang aman sehingga emoji dan karakter unik tidak akan error saat di dekode.',
      },
    ],
    relatedTools: ['json-formatter', 'uuid-generator'],
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    shortDescription: 'Ciptakan Universal Unique Identifier (UUID) versi 4 masal yang acak aman standar industri.',
    seoTitle: 'UUID Generator Online Gratis - Buat UUID Cepat | QuickTools',
    seoDescription: 'Buat UUID secara online dan gratis dengan cepat. Cocok untuk developer, database, testing, dan kebutuhan identifikasi unik.',
    path: '/tools/developer/uuid-generator',
    howToSteps: [
      'Buka Generator UUID.',
      'Tentukan jumlah yang Anda butuhkan secara serentak (1, 5, atau 10 buah).',
      'Klik tombol Buat ID Unik (Generate).',
      'Kumpulan standar identifier yang sepenuhnya aman dari tumbukan hash siap Anda salin untuk Database Primay Key Anda.'
    ],
    faq: [
      {
        question: 'Metode UUID keberapa yang digunakan?',
        answer: 'Platform kami secara default membangkitkan UUID v4 (Versi 4) yang dimotori oleh algoritma berbasis Pseudo-Random murni.',
      },
      {
        question: 'Apakah hasil UUID ini benar-benar acak?',
        answer: 'Kami menggunakan modul Web Crypto API bawaan browser modern untuk memastikan entropi keacakan aman sesuai standar persuratan teknologi IETF RFC 4122.',
      },
    ],
    relatedTools: ['base64-encoder', 'json-formatter'],
  }
];

export function getDeveloperTool(slug) {
  return DEVELOPER_TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedDeveloperTools(slugsArray) {
  if (!slugsArray || slugsArray.length === 0) return [];
  return DEVELOPER_TOOLS.filter((tool) => slugsArray.includes(tool.slug)).slice(0, 3);
}
