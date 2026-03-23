/**
 * waTools.js — Single source of truth for WhatsApp Tools data.
 */

export const WA_TOOLS = [
  {
    slug: 'wa-link-generator',
    title: 'WA Link Generator',
    shortDescription: 'Buat link WhatsApp otomatis secara gratis untuk keperluan admin atau bisnis.',
    seoTitle: 'Link WhatsApp Generator Gratis - Buat Link WA Otomatis | QuickTools',
    seoDescription: 'Buat link WhatsApp otomatis dengan nomor dan pesan custom secara gratis. Cocok untuk bisnis, admin, customer service, dan kebutuhan promosi online.',
    path: '/tools/wa/wa-link-generator',
    howToSteps: [
      'Masukkan nomor WhatsApp tujuan (misal: 08123456789 atau 62812...). Format akan diperbaiki secara otomatis.',
      'Tambahkan pesan kustom (opsional) yang akan langsung muncul di kolom chat pembeli.',
      'Klik tombol Buat Link.',
      'Salin link tersebut untuk dibagikan di bio Instagram, formulir, atau website Anda.',
    ],
    faq: [
      {
        question: 'Apakah nomor saya aman?',
        answer: 'Tentu. Link dan pesan dihasilkan langsung di piranti lunak (browser) Anda tanpa disimpan ke server eksternal.',
      },
      {
        question: 'Bisakah saya tidak menyertakan pesan?',
        answer: 'Ya, Anda bisa mengosongkan kolom teks pesan. Link tetap akan mengarahkan langsung ke nomor tujuan.',
      },
    ],
    relatedTools: ['wa-qr-code', 'wa-without-save-number'],
  },
  {
    slug: 'wa-without-save-number',
    title: 'WA Tanpa Simpan Nomor',
    shortDescription: 'Chat nomor Whatsapp baru tanpa perlu repot menyimpan kontaknya ke HP Anda.',
    seoTitle: 'WhatsApp Tanpa Simpan Nomor - Chat WA Langsung | QuickTools',
    seoDescription: 'Chat WhatsApp langsung tanpa perlu simpan nomor terlebih dahulu. Cepat, praktis, dan gratis untuk keperluan komunikasi sehari-hari.',
    path: '/tools/wa/wa-without-save-number',
    howToSteps: [
      'Ketik atau salin tempel nomor ponsel asing yang ingin Anda chat.',
      'Sistem kami akan mengecek dan membersihkan tanda baca dari nomor tersebut.',
      'Langsung tekan tombol "Buka Chat WhatsApp".',
      'Aplikasi WhatsApp di HP atau Laptop Anda akan langsung membuka jendela chat nomor tersebut.',
    ],
    faq: [
      {
        question: 'Kenapa saya butuh fitur ini?',
        answer: 'Banyak orang merasa risi menyimpan kontak pembeli, kurir paket, atau penjual temporer. Aplikasi WhatsApp bawaan mengharuskan Anda menyimpan kontak, namun Tool ini menjadi jembatan agar Anda bisa chat langsung.',
      },
      {
        question: 'Apakah bisa digunakan di iPhone / Android?',
        answer: 'Bisa. Tool ini beradaptasi mendeteksi lingkungan. Jika di HP, link akan memicu aplikasi WhatsApp terbuka.',
      },
    ],
    relatedTools: ['wa-link-generator', 'wa-message-generator'],
  },
  {
    slug: 'wa-message-generator',
    title: 'Generator Pesan WA',
    shortDescription: 'Siapkan pesan terformat (bold/italic) siap kirim dalam jumlah massal.',
    seoTitle: 'Generator Pesan WhatsApp Gratis - Buat Pesan WA Otomatis | QuickTools',
    seoDescription: 'Buat pesan WhatsApp otomatis dengan format rapi dan siap kirim. Cocok untuk promosi, customer service, pengumuman, admin, dan kebutuhan komunikasi cepat.',
    path: '/tools/wa/wa-message-generator',
    howToSteps: [
      'Tuliskan template pesan panjang Anda pada kolom yang disediakan.',
      'Periksa hasil preview secara langsung.',
      'Buat link siap kirim sekaligus simpan teks tersebut ke Clipboard (Copy).',
      'Gunakan teks atau tautan ini untuk dikirimkan melalui grup maupun chat personal.',
    ],
    faq: [
      {
        question: 'Kenapa butuh generator terpisah?',
        answer: 'Karena URL di browser tidak dapat menerima teks mentah (harus di encode menjadi %20 untuk spasi dsb). Generator ini mengonversi teks rapi Anda menjadi format mesin seketika.',
      },
      {
        question: 'Adakah batasan panjang karakter?',
        answer: 'Standar aplikasi WhatsApp membatasi 1 tautan URL maksimal sekitar 2000 karakter.',
      },
    ],
    relatedTools: ['wa-link-generator', 'wa-without-save-number'],
  },
  {
    slug: 'wa-qr-code',
    title: 'WA QR Code',
    shortDescription: 'Ubah link WhatsApp bisnis atau personal Anda menjadi gambar Barcode / QR Code.',
    seoTitle: 'QR Code WhatsApp Gratis - Buat QR untuk Chat WA | QuickTools',
    seoDescription: 'Buat QR Code WhatsApp secara gratis agar orang bisa langsung chat tanpa mengetik nomor. Cocok untuk toko, promosi, banner, kartu nama, dan bisnis.',
    path: '/tools/wa/wa-qr-code',
    howToSteps: [
      'Masukkan nomor handphone dan sapaan teks opsional.',
      'QR Code resolusi tinggi akan terbuat secara langsung (Live).',
      'Tes terlebih dahulu dengan kamera HP Anda untuk memastikan Barcode berhasil.',
      'Download gambar QR tersebut lalu tempel di poster cetak, kartu nama, brosur, tiket, atau presentasi Anda.',
    ],
    faq: [
      {
        question: 'Adakah masa kadaluarsanya?',
        answer: 'Tidak sama sekali. Barcode yang dihasilkan bersifat permanen dan akan selalu berfungsi selama nomor WhatsApp tersebut aktif.',
      },
      {
        question: 'Apakah barcode ini berbayar atau dilacak?',
        answer: 'Tidak! Kami tidak menumpangkan analytics apapun. Ini adalah QR Code statis 100% gratis asli tanpa sisipan iklan.',
      },
    ],
    relatedTools: ['wa-link-generator', 'wa-message-generator'],
  },
];

export function getWaTool(slug) {
  return WA_TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedWaTools(slugsArray) {
  if (!slugsArray || slugsArray.length === 0) return [];
  return WA_TOOLS.filter((tool) => slugsArray.includes(tool.slug)).slice(0, 3);
}
