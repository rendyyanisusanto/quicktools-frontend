/**
 * imageTools.js — Single source of truth for Image Tools data.
 */

export const IMAGE_TOOLS = [
  {
    slug: 'pas-foto-generator',
    title: 'Pas Foto Generator',
    shortDescription: 'Buat pas foto ukuran 2x3, 3x4, dan 4x6 secara online gratis dengan background merah atau biru.',
    seoTitle: 'Pas Foto Online 3x4, 4x6 Gratis - Ubah Foto Jadi Pas Foto | QuickTools',
    seoDescription: 'Ubah foto menjadi pas foto ukuran 2x3, 3x4, dan 4x6 secara online gratis. Pilih background merah atau biru, hasil siap cetak di QuickTools.',
    path: '/tools/image/pas-foto-generator',
    howToSteps: [
      'Upload foto dari perangkat Anda (JPG, PNG, atau WEBP, maksimal 20MB).',
      'Pilih ukuran pas foto yang dibutuhkan: 2x3, 3x4, atau 4x6.',
      'Pilih warna background yang diinginkan: merah atau biru.',
      'Klik tombol "Generate Pas Foto" dan tunggu beberapa detik.',
      'Lihat hasil perbandingan sebelum dan sesudah, lalu unduh hasilnya.',
    ],
    faq: [
      {
        question: 'Apakah gratis?',
        answer: 'Ya, Pas Foto Generator ini 100% gratis tanpa batasan penggunaan harian.',
      },
      {
        question: 'Apakah bisa ganti background?',
        answer: 'Tentu. Anda bisa memilih background merah atau biru sesuai ketentuan dokumen yang dibutuhkan.',
      },
      {
        question: 'Ukuran apa saja tersedia?',
        answer: 'Tersedia tiga ukuran standar: 2x3 cm, 3x4 cm, dan 4x6 cm yang umum digunakan untuk dokumen resmi Indonesia.',
      },
      {
        question: 'Apakah hasilnya siap cetak?',
        answer: 'Ya. Hasil gambar dihasilkan dengan resolusi dan DPI yang cukup untuk keperluan cetak standar.',
      },
      {
        question: 'Apakah bisa di HP?',
        answer: 'Ya. Halaman ini sepenuhnya responsif dan dapat digunakan melalui browser HP maupun komputer.',
      },
    ],
    relatedTools: ['compress-image', 'crop-image', 'resize-image'],
  },
/*
  {
    slug: 'remove-background',
    title: 'Remove Background',
    shortDescription: 'Hapus background foto secara otomatis dan unduh hasilnya dalam format PNG transparan.',
    seoTitle: 'Remove Background Online Gratis - Hapus Background Foto | QuickTools',
    seoDescription: 'Hapus background gambar secara online dan gratis dengan cepat. Upload foto, lihat hasil sebelum dan sesudah, lalu download PNG transparan di QuickTools.',
    path: '/tools/image/remove-background',
    howToSteps: [
      'Pilih gambar (JPG, PNG, atau WEBP) yang ingin dihapus latar belakangnya.',
      'Sistem secara cerdas akan menganalisis foto dan menghapus background secara otomatis.',
      'Bandingkan hasil menggunakan slider Sebelum/Sesudah yang tersedia.',
      'Unduh hasil akhir berupa gambar PNG dengan background transparan.',
    ],
    faq: [
      {
        question: 'Apakah gratis?',
        answer: 'Ya, penghapus latar belakang ini 100% gratis digunakan.',
      },
      {
        question: 'Apakah foto saya disimpan?',
        answer: 'Foto yang Anda unggah hanya diproses sementara dan akan segera dihapus dari server kami setelah selesai diunduh.',
      },
      {
        question: 'Format apa yang didukung?',
        answer: 'Kami mendukung format populer seperti image/jpeg, image/png, dan image/webp.',
      },
      {
        question: 'Apakah hasil background transparan?',
        answer: 'Tentu. File yang diunduh akan memiliki format PNG yang mendukung lapisan transparan dari latar yang terhapus.',
      },
      {
        question: 'Apakah bisa dipakai di HP?',
        answer: 'Alat ini didesain responsif, sehingga Anda bisa menggunakannya dengan nyaman melalui browser HP maupun komputer.',
      },
      {
        question: 'Kenapa hasilnya berbeda untuk tiap foto?',
        answer: 'Kecerdasan buatan (AI) kami bekerja maksimal jika ada kontras yang jelas antara objek utama (orang/benda) dengan background. Pada foto yang rumit atau blur, hasilnya mungkin kurang presisi.',
      },
    ],
    relatedTools: ['jpg-to-png', 'crop-image'],
  },
*/
  {
    slug: 'compress-image',
    title: 'Compress Image',
    shortDescription: 'Kurangi ukuran file gambar tanpa mengorbankan kualitas secara berlebihan.',
    seoTitle: 'Compress Image Online Gratis - Kecilkan Ukuran Gambar | QuickTools',
    seoDescription: 'Kecilkan ukuran gambar secara online dan gratis tanpa mengurangi kualitas secara berlebihan. Cocok untuk upload web, WhatsApp, formulir, dan kebutuhan administrasi.',
    path: '/tools/image/compress-image',
    howToSteps: [
      'Pilih gambar (JPG atau PNG) yang ingin dikompres dengan klik atau seret ke area yang disediakan.',
      'Sistem akan otomatis memproses dan memperkecil ukuran gambar langsung di browser Anda.',
      'Tinjau informasi perbandingan ukuran sebelum dan sesudah kompresi.',
      'Klik tombol unduh untuk menyimpan gambar hasil kompresi.',
    ],
    faq: [
      {
        question: 'Apakah hasil gambar menjadi buram?',
        answer: 'Kami menggunakan algoritma kompresi pintar di browser Anda yang mempertahankan kualitas visual sebaik mungkin sambil mengurangi ukuran file secara signifikan.',
      },
      {
        question: 'Apakah foto saya dikirim ke server?',
        answer: 'Tidak. Seluruh proses kompresi dilakukan secara lokal di dalam browser Anda (Client-side). File gambar 100% aman dan tidak pernah diunggah ke server kami.',
      },
      {
        question: 'Berapa persen file bisa dikurangi?',
        answer: 'Bervariasi, biasanya antara 30% hingga 80% tergantung resolusi dan kompleksitas warna pada gambar asli Anda.',
      },
    ],
    relatedTools: ['resize-image', 'crop-image'],
  },
  {
    slug: 'resize-image',
    title: 'Resize Image',
    shortDescription: 'Ubah resolusi lebar dan tinggi gambar dengan cepat dan presisi.',
    seoTitle: 'Resize Image Online Gratis - Ubah Ukuran Gambar Mudah | QuickTools',
    seoDescription: 'Ubah ukuran gambar secara online dan gratis dengan cepat. Cocok untuk foto profil, upload website, formulir, marketplace, dan dokumen digital.',
    path: '/tools/image/resize-image',
    howToSteps: [
      'Unggah gambar yang ingin diubah ukurannya.',
      'Masukkan nilai lebar (width) atau tinggi (height) baru yang Anda inginkan (dalam pixel).',
      'Klik tombol "Resize" untuk melihat hasilnya.',
      'Silakan unduh gambar yang sudah berhasil diubah resolusinya.',
    ],
    faq: [
      {
        question: 'Bisakah mempertahankan rasio asli gambar?',
        answer: 'Ya. Jika fitur rasio otomatis aktif, mengubah lebar akan secara otomatis menghitung tinggi yang proporsional agar gambar tidak menjadi lonjong.',
      },
      {
        question: 'Apakah file tetap aman?',
        answer: 'Sangat aman. Proses resize dilakukan sepenuhnya di dalam browser perangkat Anda tanpa campur tangan server.',
      },
    ],
    relatedTools: ['compress-image', 'crop-image'],
  },
  {
    slug: 'crop-image',
    title: 'Crop Image',
    shortDescription: 'Potong bagian gambar tertentu untuk menghilangkan area yang tidak perlu.',
    seoTitle: 'Crop Image Online Gratis - Potong Gambar Cepat | QuickTools',
    seoDescription: 'Potong gambar secara online dan gratis dengan mudah. Cocok untuk merapikan foto, membuat thumbnail, menyesuaikan gambar profil, dan kebutuhan desain sederhana.',
    path: '/tools/image/crop-image',
    howToSteps: [
      'Pilih gambar dari perangkat Anda.',
      'Sesuaikan area kotak pemotongan (crop box) pada preview gambar.',
      'Klik tombol "Crop Gambar".',
      'Simpan dan unduh gambar yang telah selesai dipotong.',
    ],
    faq: [
      {
        question: 'Apakah gratis memotong gambar di sini?',
        answer: 'Ya, Anda bisa menggunakan layanan ini 100% gratis tanpa batasan jumlah gambar per hari.',
      },
      {
        question: 'Fitur crop berlaku untuk format apa saja?',
        answer: 'Format gambar populer seperti JPG/JPEG, PNG, dan WebP didukung dengan baik.',
      },
    ],
    relatedTools: ['resize-image', 'png-to-jpg'],
  },
  {
    slug: 'jpg-to-png',
    title: 'JPG ke PNG',
    shortDescription: 'Ubah format gambar JPG/JPEG menjadi format PNG transparan.',
    seoTitle: 'JPG ke PNG Online Gratis - Konversi Gambar Mudah | QuickTools',
    seoDescription: 'Ubah file JPG menjadi PNG secara online dan gratis. Praktis untuk kebutuhan desain, dokumen digital, dan penggunaan gambar dengan kualitas yang tetap baik.',
    path: '/tools/image/jpg-to-png',
    howToSteps: [
      'Pilih file JPG/JPEG yang mau diubah.',
      'Tunggu sekejap saat browser melakukan konversi format gambar.',
      'Unduh file hasil yang kini sudah berformat .PNG.',
    ],
    faq: [
      {
        question: 'Apakah bisa diakses lewat HP?',
        answer: 'Tentu. Anda dapat mengonversi JPG ke PNG menggunakan browser HP apapun baik Android maupun iPhone.',
      },
      {
        question: 'Apa kelebihan ekstensi PNG dibandung JPG?',
        answer: 'Secara umum, PNG jauh lebih baik untuk menangani grafis dengan logo, teks, atau detail tajam tanpa artefak kompresi. Namun ukuran filenya relatif lebih besar dari JPG.',
      },
    ],
    relatedTools: ['png-to-jpg', 'compress-image'],
  },
  {
    slug: 'png-to-jpg',
    title: 'PNG ke JPG',
    shortDescription: 'Ubah format gambar PNG menjadi JPG yang lebih ringan.',
    seoTitle: 'PNG ke JPG Online Gratis - Konversi Gambar Cepat | QuickTools',
    seoDescription: 'Ubah file PNG menjadi JPG secara online dan gratis dengan mudah. Cocok untuk memperkecil ukuran file dan memudahkan upload ke berbagai platform.',
    path: '/tools/image/png-to-jpg',
    howToSteps: [
      'Unggah gambar PNG Anda ke area upload.',
      'Sistem secara aman dan instan akan mengonversi lapisan gambar menjadi flat JPG.',
      'Tekan tombol unduh untuk mendapatkan hasil dengan format .JPG yang lebih ringan.',
    ],
    faq: [
      {
        question: 'Bagaimana jika PNG saya transparan?',
        answer: 'Ekstensi JPG tidak mendukung background yang transparan. Bagian transparan otomatis akan diubah menjadi warna putih pekat.',
      },
      {
        question: 'Mengapa merubah ke JPG?',
        answer: 'File JPG lebih universal untuk keperluan foto, pendaftaran lamaran kerja, upload data pendidikan, dengan ukuran logis yang jauh lebih kecil daripada PNG.',
      },
    ],
    relatedTools: ['jpg-to-png', 'compress-image'],
  },
  {
    slug: 'image-to-icon',
    title: 'Image to Icon',
    shortDescription: 'Ubah gambar menjadi kumpulan ukuran icon atau favicon standar dengan cepat.',
    seoTitle: 'Image to Icon Online Gratis - Buat Favicon dari Gambar | QuickTools',
    seoDescription: 'Ubah gambar menjadi icon atau favicon secara online dan gratis. Generate berbagai ukuran favicon untuk website dengan cepat dan mudah.',
    path: '/tools/image/image-to-icon',
    howToSteps: [
      'Pilih gambar JPG atau PNG (maksimal 5MB) untuk diunggah.',
      'Tekan tombol Generate Icon, lalu tunggu proses berjalan sejenak di browser Anda.',
      'Sistem akan memotong dan meresize gambar ke dalam berbagai ukuran standar (16px - 256px).',
      'Unduh satuan secara manual, atau klik "Download Semua (ZIP)" untuk mendapatkan paket lengkap.',
    ],
    faq: [
      {
        question: 'Apa itu favicon?',
        answer: 'Favicon adalah ikon kecil yang muncul di tab browser samping judul website Anda. Pembuatan favicon penting untuk branding dan identitas situs.',
      },
      {
        question: 'Ukuran favicon standar apa saja yang dihasilkan?',
        answer: 'Kami membagi ukuran ke standar: 16x16, 32x32, 48x48 (Desktop web), 64x64, 128x128, 192x192 (Android/Web App), dan 256x256 (HD Icons).',
      },
      {
        question: 'Apakah bisa dari file JPG?',
        answer: 'Ya. Anda bebas memasukkan file berekstensi JPG maupun PNG, maka format akhirnya secara otomatis tersimpan sebagai PNG demi menjaga kanal alfa transparan.',
      },
      {
        question: 'Apakah file foto yang diunggah aman?',
        answer: 'Sangat aman. Sama halnya alat kompresi lain di sini, semua pengolahan ikon dieksekusi sepenuhnya melalui kapabilitas lokal browser (Client-side), sehingga tiada gambar yang pernah terkirim ke server mana pun.',
      },
    ],
    relatedTools: ['compress-image', 'resize-image', 'jpg-to-png', 'png-to-jpg'],
  },
];

export function getImageTool(slug) {
  return IMAGE_TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedImageTools(slugsArray) {
  if (!slugsArray || slugsArray.length === 0) return [];
  return IMAGE_TOOLS.filter((tool) => slugsArray.includes(tool.slug)).slice(0, 3);
}
