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
    relatedTools: ['split-pdf', 'compress-pdf', 'jpg-to-pdf', 'pdf-to-jpg', 'pdf-to-word'],
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
  {
    slug: 'pdf-to-word',
    title: 'PDF ke Word',
    path: '/tools/pdf/pdf-to-word',
    shortDescription: 'Ubah file PDF menjadi dokumen Word (DOCX) yang bisa diedit.',
    seoTitle: 'PDF ke Word Online Gratis - Ubah PDF ke DOCX | QuickTools',
    seoDescription:
      'Ubah file PDF menjadi Word (DOCX) secara online dan gratis. Praktis untuk mengedit isi dokumen dengan lebih mudah di QuickTools.',
    howToSteps: [
      'Klik tombol "Pilih File PDF" atau seret file PDF ke area upload.',
      'Pastikan file berformat PDF dan tidak melebihi 20MB.',
      'Klik tombol "Konversi ke Word" dan tunggu proses selesai.',
      'Klik tombol unduh untuk menyimpan file DOCX ke perangkatmu.',
      'Buka file DOCX di Microsoft Word atau LibreOffice untuk mulai mengedit.',
    ],
    faq: [
      {
        question: 'Apakah layanan ini gratis?',
        answer:
          'Ya, konversi PDF ke Word di QuickTools sepenuhnya gratis tanpa perlu mendaftar atau berlangganan.',
      },
      {
        question: 'Apakah file saya disimpan di server?',
        answer:
          'Tidak. File input dihapus segera setelah konversi selesai. File output juga dihapus secara berkala.',
      },
      {
        question: 'Apakah hasil Word bisa langsung diedit?',
        answer:
          'Ya, file DOCX yang dihasilkan dapat dibuka dan diedit di Microsoft Word, LibreOffice Writer, atau Google Docs.',
      },
      {
        question: 'Kenapa format hasil bisa berbeda dari PDF asli?',
        answer:
          'Konversi PDF ke Word adalah proses yang kompleks. PDF tidak menyimpan struktur dokumen seperti Word, sehingga tata letak, font, dan gambar pada hasil konversi bisa sedikit berbeda — terutama untuk PDF berbasis gambar atau yang menggunakan layout kompleks.',
      },
      {
        question: 'Apakah bisa dipakai di HP?',
        answer:
          'Ya, QuickTools bekerja di semua perangkat termasuk smartphone dan tablet melalui browser.',
      },
    ],
    relatedTools: ['merge-pdf', 'split-pdf', 'compress-pdf', 'jpg-to-pdf', 'word-to-pdf'],
  },
  {
    slug: 'word-to-pdf',
    title: 'Word ke PDF',
    path: '/tools/pdf/word-to-pdf',
    shortDescription: 'Ubah file Word (DOCX/DOC) menjadi PDF yang rapi dan siap dibagikan.',
    seoTitle: 'Word ke PDF Online Gratis - Ubah DOCX ke PDF | QuickTools',
    seoDescription:
      'Ubah file Word (DOCX/DOC) ke PDF secara online dan gratis dengan cepat. Bebas instal aplikasi, hasil rapi untuk keperluan sekolah, kerja, atau administrasi di QuickTools.',
    howToSteps: [
      'Pilih atau seret file Word (.docx atau .doc) kamu ke area upload.',
      'Tunggu beberapa detik selagi sistem mengkonversi file.',
      'Format dan tata letak dokumenmu akan otomatis terkunci di PDF.',
      'Klik tombol "Unduh File PDF" untuk menyimpannya.',
    ],
    faq: [
      {
        question: 'Apakah hasil PDF akan sama persis dengan file Word saya?',
        answer: 'Dalam banyak kasus, tata letak, margin, dan gambar akan tetap persis seperti aslinya karena kami menggunakan LibreOffice Engine.',
      },
      {
        question: 'Format dokumen apa saja yang didukung?',
        answer: 'Saat ini, sistem kami mendukung penuh konversi dari format .docx dan format lama .doc.',
      },
      {
        question: 'Apakah file Word saya disimpan?',
        answer: 'Privasi adalah prioritas kami. File asal dan hasil PDF akan otomatis terhapus dari server segera setelah konversi selesai.',
      },
      {
        question: 'Apakah layanan ini gratis?',
        answer: 'Ya, benar-benar gratis tanpa perlu mendaftar.',
      },
      {
        question: 'Apakah bisa dipakai di HP?',
        answer: 'Ya, QuickTools bisa digunakan lewat browser HP (Android & iOS).',
      },
    ],
    relatedTools: ['pdf-to-word', 'merge-pdf', 'compress-pdf', 'split-pdf'],
  },
  {
    slug: 'add-pdf-watermark',
    title: 'Add PDF Watermark',
    path: '/tools/pdf/add-pdf-watermark',
    shortDescription: 'Tambahkan watermark teks ke file PDF secara online dan gratis.',
    seoTitle: 'Tambah Watermark PDF Online Gratis - Beri Tanda pada PDF | QuickTools',
    seoDescription: 'Tambahkan watermark teks ke file PDF secara online dan gratis. Cocok untuk dokumen sekolah, laporan, arsip, invoice, dan file administrasi lainnya di QuickTools.',
    howToSteps: [
      'Pilih atau seret file PDF yang ingin diberi watermark.',
      'Masukkan teks watermark (misalnya: RAHASIA, DRAFT).',
      'Atur posisi, ukuran, warna, putaran, dan transparansi watermark sesuai kebutuhan.',
      'Klik tombol "Terapkan Watermark" dan tunggu proses selesai.',
      'Unduh file PDF yang sudah dibubuhkan watermark.',
    ],
    faq: [
      {
        question: 'Apakah gratis?',
        answer: 'Ya, layanan perlindungan dengan penambahan watermark ke PDF ini sepenuhnya gratis.',
      },
      {
        question: 'Apakah file PDF saya aman?',
        answer: 'Sangat aman. File PDF yang Anda unggah dan hasil konversinya akan langsung terhapus dari server kami setelah proses selesai.',
      },
      {
        question: 'Apakah watermark ditambahkan ke semua halaman?',
        answer: 'Ya, sistem kami akan secara otomatis membubuhkan teks watermark pada setiap halaman di dalam dokumen PDF Anda.',
      },
      {
        question: 'Apakah bisa dipakai di HP?',
        answer: 'Tentu. Anda dapat langsung menggunakan alat ini melalui browser web di smartphone Android maupun iOS tanpa perlu instalasi aplikasi tambahan.',
      },
      {
        question: 'Bisakah saya menambahkan watermark teks?',
        answer: 'Fungsi utama tool ini difokuskan penuh untuk memberikan perlindungan tambahan berbasis teks secara fleksibel dan aman.',
      },
    ],
    relatedTools: ['merge-pdf', 'split-pdf', 'compress-pdf', 'word-to-pdf'],
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
