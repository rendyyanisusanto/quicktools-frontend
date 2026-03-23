/**
 * pdfTools.js — Centralized metadata for all PDF tools.
 *
 * Each tool includes SEO metadata, how-to steps, FAQ, and related tools.
 * Used by tool pages to avoid hardcoding content inline.
 */

export const PDF_TOOLS = [
  {
    slug: 'merge-pdf',
    title: 'Merge PDF',
    path: '/tools/pdf/merge-pdf',
    shortDescription: 'Gabungkan beberapa file PDF menjadi satu dokumen.',
    seoTitle: 'Merge PDF Online Gratis - Gabungkan File PDF Cepat | QuickTools',
    seoDescription:
      'Gabungkan beberapa file PDF menjadi satu secara online dan gratis. Cepat, mudah, dan tanpa instal aplikasi di QuickTools.',
    howToSteps: [
      'Klik tombol "Pilih File PDF" atau seret file ke area upload.',
      'Pilih minimal 2 file PDF yang ingin digabungkan.',
      'Urutkan file sesuai kebutuhan jika perlu.',
      'Klik tombol "Gabungkan PDF".',
      'Unduh file PDF hasil gabungan.',
    ],
    faq: [
      {
        question: 'Berapa banyak file PDF yang bisa digabungkan?',
        answer:
          'Kamu bisa menggabungkan hingga 10 file PDF sekaligus. Tiap file maksimal 20MB.',
      },
      {
        question: 'Apakah file PDF saya aman?',
        answer:
          'File hanya disimpan sementara selama proses penggabungan dan dihapus secara otomatis setelahnya.',
      },
      {
        question: 'Apakah hasilnya menjaga kualitas asli?',
        answer:
          'Ya, proses merge tidak mengkompres atau mengubah kualitas konten PDF asli.',
      },
      {
        question: 'Apakah bisa digunakan di HP?',
        answer: 'Ya, QuickTools bekerja di semua perangkat termasuk smartphone dan tablet.',
      },
    ],
    relatedTools: ['split-pdf', 'compress-pdf', 'jpg-to-pdf', 'pdf-to-jpg'],
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF',
    path: '/tools/pdf/split-pdf',
    shortDescription: 'Pisahkan halaman PDF menjadi file terpisah.',
    seoTitle: 'Split PDF Online Gratis | QuickTools',
    seoDescription: 'Pisahkan file PDF menjadi beberapa dokumen terpisah secara online dan gratis.',
    howToSteps: [
      'Pilih atau seret satu file PDF yang ingin dipisah.',
      'Pilih mode pemisahan: Ekstrak Halaman Tertentu atau Pisah Semua Halaman.',
      'Jika mengekstrak, masukkan rentang halaman (contoh: 1-3, 5).',
      'Klik tombol "Pisahkan PDF".',
      'Unduh file PDF hasil pemisahan.',
    ],
    faq: [
      {
        question: 'Format rentang halaman seperti apa yang didukung?',
        answer: 'Kamu dapat memasukkan rentang (misal: 1-5) atau halaman spesifik yang dipisahkan dengan koma (misal: 1, 3, 5, 7-10).',
      },
      {
        question: 'Apakah hasil pemisahan menurunkan kualitas PDF?',
        answer: 'Tidak, proses ini hanya memisahkan halaman tanpa melakukan kompresi atau mengubah kualitas dokumen asli.',
      },
      {
        question: 'Apakah file saya aman?',
        answer: 'File hanya diproses sementara di server kami dan akan langsung dihapus setelah proses pemisahan selesai.',
      },
    ],
    relatedTools: ['merge-pdf', 'compress-pdf'],
  },
  {
    slug: 'compress-pdf',
    title: 'Compress PDF',
    path: '/tools/pdf/compress-pdf',
    shortDescription: 'Kurangi ukuran file PDF tanpa mengorbankan kualitas.',
    seoTitle: 'Compress PDF Online Gratis | QuickTools',
    seoDescription: 'Kurangi ukuran file PDF secara online dan gratis tanpa instal aplikasi.',
    howToSteps: [
      'Pilih file PDF yang ingin dikompres dengan klik tombol atau seret file ke area yang disediakan.',
      'Klik tombol "Compress PDF".',
      'Tunggu beberapa saat sementara kami mengoptimalkan struktur metadata PDF Anda.',
      'Tinjau informasi perubahan ukuran file.',
      'Unduh file PDF yang telah dioptimasi.',
    ],
    faq: [
      {
        question: 'Apakah kualitas dokumen saya akan menurun?',
        answer: 'Tidak. Fokus utama kami saat ini adalah membuang data metadata yang tidak digunakan tanpa mengubah piksel atau kualitas rendering asli dokumen Anda.',
      },
      {
        question: 'Mengapa ukuran file saya tidak banyak berkurang?',
        answer: 'Jika file PDF aslinya sudah sangat teroptimasi atau berisi gambar-gambar yang sangat padat tanpa metadata berlebih, persentase kompresi akan kecil.',
      },
    ],
    relatedTools: ['merge-pdf', 'split-pdf'],
  },
  {
    slug: 'jpg-to-pdf',
    title: 'JPG ke PDF',
    path: '/tools/pdf/jpg-to-pdf',
    shortDescription: 'Konversi gambar JPG menjadi file PDF.',
    seoTitle: 'JPG ke PDF Online Gratis | QuickTools',
    seoDescription: 'Ubah gambar JPG menjadi PDF secara online dan gratis.',
    howToSteps: [
      'Seret dan lepaskan file JPG/JPEG pilihanmu.',
      'Pilih satu atau lebih file gambar.',
      'Periksa urutan gambar, gambar yang pertama akan menjadi halaman pertama.',
      'Klik tombol "Ubah ke PDF".',
      'Unduh file PDF hasil gabungan seluruh gambarmu.',
    ],
    faq: [
      {
        question: 'Apakah ada batasan jumlah file JPG?',
        answer: 'Ya, maksimal 10 file dalam satu kali proses.',
      },
      {
        question: 'Apakah tata letak gambar di PDF akan berubah?',
        answer: 'Dimensi halaman PDF akan secara presisi disesuaikan agar sama persis ukuran pixelnya dengan gambar aslimu.',
      },
    ],
    relatedTools: ['merge-pdf', 'pdf-to-jpg'],
  },
  {
    slug: 'pdf-to-jpg',
    title: 'PDF ke JPG',
    path: '/tools/pdf/pdf-to-jpg',
    shortDescription: 'Konversi halaman PDF menjadi gambar JPG.',
    seoTitle: 'PDF ke JPG Online Gratis | QuickTools',
    seoDescription: 'Ubah halaman PDF menjadi gambar JPG secara online dan gratis.',
    howToSteps: [
      'Pilih file PDF yang halamannya ingin kamu ubah menjadi gambar.',
      'Klik tombol proses "Ubah ke JPG".',
      'Sistem akan mengubah setiap halaman menjadi file gambar JPG.',
    ],
    faq: [
      {
        question: 'Kapan fitur ini akan tersedia secara penuh?',
        answer: 'Saat ini fungsionalitas rendering piksel penuh masih dalam pengembangan aktif oleh tim engineering kami demi hasil resolusi maksimal.',
      },
    ],
    relatedTools: ['merge-pdf', 'jpg-to-pdf'],
  },
];

/** Get a single PDF tool by slug */
export function getPdfTool(slug) {
  return PDF_TOOLS.find((t) => t.slug === slug) || null;
}

/** Get related tools metadata by slug list */
export function getRelatedPdfTools(slugs) {
  return PDF_TOOLS.filter((t) => slugs.includes(t.slug));
}
