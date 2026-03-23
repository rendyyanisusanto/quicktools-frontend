/**
 * calculatorTools.js — Centralized source of truth for Calculator Tools data.
 */

export const CALCULATOR_TOOLS = [
  {
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    shortDescription: 'Kalkulasi harga akhir setelah diskon promosi secara akurat dan cepat.',
    seoTitle: 'Kalkulator Diskon Gratis - Hitung Potongan Harga Mudah | QuickTools',
    seoDescription: 'Hitung diskon, harga setelah potongan, dan besar penghematan secara online dan gratis. Cocok untuk belanja, bisnis, promo, dan kebutuhan perhitungan cepat.',
    path: '/tools/calculator/discount-calculator',
    howToSteps: [
      'Masukkan harga awal (asli) barang atau jasa di kotak Harga Asli.',
      'Masukkan angka persentase diskon (misalnya 15 atau 20) tanpa simbol %.',
      'Hasil perhitungan (Potongan Diskon & Harga Akhir) akan langsung tampil di layar.',
      'Gunakan tombol reset bila ingin memulai kalkulasi baru.'
    ],
    faq: [
      {
        question: 'Apakah ada limit jumlah angka harga?',
        answer: 'Tidak, Anda bisa menghitung nilai besar hingga miliaran rupiah. Sistem kami dilengkapi dengan format Rupiah standar untuk pembacaan.',
      },
      {
        question: 'Apakah aplikasi bisa menghitung diskon ganda (diskon bersarung)?',
        answer: 'Saat ini (versi 1) masih terfokus pada 1 tahapan kalkulasi persentase diskon. Anda dapat menggunakan kalkulator berulang untuk potongan tahap dua.',
      }
    ],
    relatedTools: ['percentage-calculator', 'average-score-calculator'],
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    shortDescription: 'Hitung berbagai macam logika persentase untuk laporan atau keuangan harian.',
    seoTitle: 'Kalkulator Persentase Gratis - Hitung Persen Mudah | QuickTools',
    seoDescription: 'Hitung persentase secara online dan gratis dengan cepat. Cocok untuk nilai, diskon, pertumbuhan, perbandingan, dan berbagai kebutuhan perhitungan harian.',
    path: '/tools/calculator/percentage-calculator',
    howToSteps: [
      'Pilih Mode Perhitungan yang Anda butuhkan: Mencari Persen dari Angka, Angka X berapa persen Y, atau Kenaikan/Penurunan.',
      'Isi nilai variabel pertama dan kedua.',
      'Sistem akan memvalidasi secara instan nilai masukan Anda.',
      'Hasil pecahan, desimal, atau angka eksak langsung tersaji di layar.'
    ],
    faq: [
      {
        question: 'Apa perbedaan mode 1 (Berapa X% dari Y) dan 2 (X itu berapa % dari Y)?',
        answer: 'Mode 1 menanyakan "Potongannya". Contoh: 10% dari 50.000 adalah 5.000. Mode 2 mencari persentasenya. Contoh: 5.000 dari 50.000 adalah 10%.',
      },
      {
        question: 'Apakah cocok digunakan di HP?',
        answer: 'Seluruh UI dan antarmuka aplikasi Persen ini dibuat khusus mempermudah pengetikan di layar sentuh pada mobile device Anda.',
      },
    ],
    relatedTools: ['discount-calculator', 'average-score-calculator'],
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    shortDescription: 'Ketahui detail usia seseorang dalam hitungan hari, bulan, dan tahun pastinya.',
    seoTitle: 'Kalkulator Umur Gratis - Hitung Usia dari Tanggal Lahir | QuickTools',
    seoDescription: 'Hitung umur secara online dan gratis berdasarkan tanggal lahir. Tampilkan usia dalam tahun, bulan, dan hari dengan cepat dan mudah.',
    path: '/tools/calculator/age-calculator',
    howToSteps: [
      'Pilih Tanggal Lahir Anda dari Menu Input Kalender.',
      'Secara default, aplikasi akan membandingkan usia anda dengan Tanggal Hari Ini.',
      'Untuk kebutuhan khusus administrasi, ubah batas validasi dengan opsi Bandingkan dengan Tanggal Lain.',
      'Hasil terperinci berupa tahun, lalu sisa bulannya, hingga sisa hari akan muncul.'
    ],
    faq: [
      {
        question: 'Kenapa perhitungan hari pada bayi penting untuk dicari?',
        answer: 'Banyak syarat administrasi maskapai, sekolah, maupun kesehatan vaksinasi menggunakan rujukan detail perhitungan bulan beserta harinya ketimbang sekadar tahun.',
      },
      {
        question: 'Apakah sistem menangani kasus hitungan kabisat?',
        answer: 'Ya, sistem akan otomatis menyesuaikan kalender bulan Februari (28/29 hari) secara otomatis.',
      },
    ],
    relatedTools: ['discount-calculator', 'percentage-calculator'],
  }
];

export function getCalculatorTool(slug) {
  return CALCULATOR_TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedCalculatorTools(slugsArray) {
  if (!slugsArray || slugsArray.length === 0) return [];
  return CALCULATOR_TOOLS.filter((tool) => slugsArray.includes(tool.slug)).slice(0, 3);
}
