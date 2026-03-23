/**
 * educationTools.js — Centralized source of truth for Education Tools data.
 */

export const EDUCATION_TOOLS = [
  {
    slug: 'average-score-calculator',
    title: 'Average Score Calculator',
    shortDescription: 'Hitung total dan rata-rata nilai siswa secara akurat.',
    seoTitle: 'Kalkulator Nilai Rata-Rata Gratis - Hitung Rerata Nilai Mudah | QuickTools',
    seoDescription: 'Hitung nilai rata-rata secara online dan gratis dengan cepat. Cocok untuk guru, siswa, wali kelas, dan kebutuhan perhitungan nilai harian maupun rapor.',
    path: '/tools/edu/average-score-calculator',
    howToSteps: [
      'Masukkan daftar nilai ke dalam kolom yang tersedia, pisahkan dengan koma atau baris baru (enter).',
      'Klik tombol Hitung Rata-Rata.',
      'Aplikasi akan secara seketika (real-time) menghitung jumlah total nilai dan membaginya dengan jumlah data yang masuk.',
      'Klik tombol Bersihkan untuk mereset perhitungan.'
    ],
    faq: [
      {
        question: 'Apakah hasil input data tersimpan di server?',
        answer: 'Tidak. Aplikasi ini berjalan penuh (100%) di browser perangkat Anda. Kami tidak memiliki basis data untuk melihat atau menyimpan nilai tersebut.',
      },
      {
        question: 'Apakah aplikasi mendukung angka desimal?',
        answer: 'Ya, Anda dapat menggunakan tanda titik (.) untuk nilai bilangan desimal (misalnya 75.5 atau 88.25).',
      }
    ],
    relatedTools: ['ranking-calculator', 'percentage-calculator'],
  },
  {
    slug: 'ranking-calculator',
    title: 'Ranking Calculator',
    shortDescription: 'Urutkan ranking peringkat siswa berdasarkan nilai ulangan secara otomatis.',
    seoTitle: 'Kalkulator Ranking Siswa Gratis - Urutkan Nilai Otomatis | QuickTools',
    seoDescription: 'Hitung ranking siswa secara online dan gratis berdasarkan nilai. Cocok untuk guru, wali kelas, dan kebutuhan rekap penilaian secara cepat.',
    path: '/tools/edu/ranking-calculator',
    howToSteps: [
      'Masukkan nama siswa di kolom nama.',
      'Masukkan nilai yang didapat pada kolom nilai di sebelahnya.',
      'Klik "Tambah Baris" jika data siswa lebih dari yang tersedia.',
      'Klik tombol "Urutkan Ranking" untuk memproses data dari nilai tertinggi ke terendah secara otomatis.'
    ],
    faq: [
      {
        question: 'Bagaimana jika ada dua siswa yang memiliki nilai sama?',
        answer: 'Sistem kami akan menempatkan keduanya di urutan yang berdekatan dengan nilai yang sama (menjaga urutan input awal sebagai fallback).',
      },
      {
        question: 'Berapa siswa maksimal yang bisa diurutkan?',
        answer: 'Tidak ada batasan. Namun, untuk menjaga kestabilan browser, batasi di sekitar 500-1000 baris dalam satu kali perhitungan.',
      },
    ],
    relatedTools: ['average-score-calculator', 'permission-letter-generator'],
  },
  {
    slug: 'permission-letter-generator',
    title: 'Permission Letter Generator',
    shortDescription: 'Buat surat izin sakit atau keperluan keluarga ke sekolah secara otomatis rapi.',
    seoTitle: 'Generator Surat Izin Sekolah Gratis - Buat Surat Izin Cepat | QuickTools',
    seoDescription: 'Buat surat izin sekolah secara online dan gratis dengan format rapi. Cocok untuk siswa, orang tua, wali kelas, dan kebutuhan administrasi sekolah.',
    path: '/tools/edu/permission-letter-generator',
    howToSteps: [
      'Isi nama lengkap siswa, kelas, dan nama sekolah.',
      'Pilih tanggal izin dan jelaskan alasan kenapa siswa tidak masuk sekolah.',
      'Ketikkan nama nama Orang Tua/Wali yang sah.',
      'Klik tombol "Buat Surat Izin".',
      'Salin hasil teks surat izin yang rapi untuk dikirimkan melalui WhatsApp atau dicetak ulang.'
    ],
    faq: [
      {
        question: 'Apakah format ini resmi diakui sekolah?',
        answer: 'Format yang 100% di-generate aplikasi QuickTools ini adalah format standar surat izin tidak masuk yang paling umum diterima di seluruh sekolahan di Indonesia.',
      },
      {
        question: 'Apakah surat izin bisa dikirimkan langsung ke wali kelas lewat WA?',
        answer: 'Ya, ketika Anda menekan tombol Salin (Copy), tata letak spasi teks disesuaikan dengan format standar pesan WhatsApp. Anda tinggal tempel (Paste) di kolom chat.',
      },
    ],
    relatedTools: ['average-score-calculator', 'ranking-calculator'],
  }
];

export function getEducationTool(slug) {
  return EDUCATION_TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedEducationTools(slugsArray) {
  if (!slugsArray || slugsArray.length === 0) return [];
  return EDUCATION_TOOLS.filter((tool) => slugsArray.includes(tool.slug)).slice(0, 3);
}
