/**
 * educationTools.js — Utility helpers for Education calculations.
 */

export function parseScores(text) {
  if (!text) return [];
  // Split by comma, newline or spaces
  const rawParts = text.split(/[\n,;]/);
  const numbers = [];
  
  for (let part of rawParts) {
    if (part && part.trim() !== '') {
      const num = parseFloat(part.trim());
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
  
  return numbers;
}

export function calculateAverageScore(scoresArray) {
  if (!scoresArray || scoresArray.length === 0) return { total: 0, average: 0, count: 0 };
  
  const total = scoresArray.reduce((acc, curr) => acc + curr, 0);
  const average = total / scoresArray.length;
  
  return {
    total: parseFloat(total.toFixed(2)),
    average: parseFloat(average.toFixed(2)),
    count: scoresArray.length
  };
}

export function calculateRanking(studentsArray) {
  if (!studentsArray || studentsArray.length === 0) return [];
  
  // Create a copy to sort
  const sorted = [...studentsArray].sort((a, b) => b.score - a.score);
  
  let currentRank = 1;
  let currentScoreStr = '';
  
  return sorted.map((student, index) => {
    // Determine rank based on score tie handling
    if (index > 0 && Math.abs(student.score - sorted[index - 1].score) < 0.001) {
      // Tie score - same rank
      // Do not increment currentRank
    } else {
      currentRank = index + 1; // standard competition rank (1, 2, 2, 4)
    }
    
    return {
      ...student,
      rank: currentRank
    };
  });
}

export function generatePermissionLetter(data) {
  if (!data || !data.studentName || !data.date) return '';
  
  const {
    studentName,
    studentClass = '...',
    date,
    reason = 'sakit',
    parentName = '...',
    schoolName = 'Bapak/Ibu Guru'
  } = data;

  const todayStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  const targetDateStr = new Date(date).toLocaleDateString('id-ID', { weekday:'long', year: 'numeric', month: 'long', day: 'numeric' });

  return `Kepada Yth.
${schoolName}
Di tempat

Dengan hormat,
Dengan ini kami selaku orang tua/wali dari siswa:

Nama   : ${studentName}
Kelas  : ${studentClass}

Memberitahukan bahwa anak kami tidak dapat mengikuti proses kegiatan belajar mengajar pada hari ${targetDateStr} dikarenakan ${reason}.

Sehubungan dengan hal tersebut, kami memohon Bapak/Ibu Guru dapat memberikan izin yang bersangkutan.

Demikian surat izin ini kami buat atas perhatian dan pengertian Bapak/Ibu Guru, kami ucapkan terima kasih.

Hormat kami,
Orang Tua / Wali Siswa,


${parentName}`;
}
