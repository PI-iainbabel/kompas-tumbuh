// ============================================================
// script.js — Logika Utama Kompas Tumbuh
// ============================================================
// Pengembang Utama : Psychosophia Behavioral Lab
//                    Prodi Psikologi Islam IAIN SAS
// Kolaborator      : Prodi BKI IAIN SAS
// Mitra            : LPKA Pangkalpinang
// Versi            : 1.0
// ============================================================

// ===== KONFIGURASI SUPABASE =====
const SUPABASE_URL = 'https://ovykmdunxsgtmcuszsuc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWttZHVueHNndG1jdXN6c3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMDQzODYsImV4cCI6MjA5ODY4MDM4Nn0.UQjcbkhx4UgpIpVpJoEq3zEQOQgIDDBr3b0N2DZv2WI';

// ===== INISIALISASI SUPABASE (AKTIF) =====
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Ekspor ke global agar bisa diakses dari semua halaman
window.supabase = supabase;

// ===== VARIABEL GLOBAL =====
let allData = [];

// ============================================================
// 1. FUNGSI LOAD DATA DARI SUPABASE
// ============================================================
async function loadAllData() {
    try {
        // ===== SEMENTARA: SIMULASI DATA DUMMY (hapus jika pakai Supabase) =====
        allData = dummyData();
        return allData;
    } catch (err) {
        console.error('Gagal memuat data:', err);
        alert('Gagal memuat data: ' + err.message);
        return [];
    }
}

// ============================================================
// 2. DATA DUMMY (UNTUK TESTING)
// ============================================================
function dummyData() {
    return [
        {
            kode_responden: 'A01',
            tanggal_wawancara: '2026-07-15',
            nama_enumerator: 'Mahasiswa BKI',
            skor_g1: 5,
            skor_g2: 4,
            skor_g3: 5,
            skor_g4: 4,
            total_skor_growth: 18,
            kategori_growth: 'TINGGI',
            tipe_orientasi: 'PIONIR',
            catatan_sikap: 'Pengen buktikan ke keluarga saya bisa berubah.',
            catatan_harapan: 'Ingin buka usaha kecil buat bantu ibu.',
            catatan_kontrol: 'Sulitnya kadang emosi. Coba latihan napas.',
            catatan_komitmen: 'Besok mulai hafalan surat pendek.',
            catatan_observasi: 'Anak antusias, percaya diri.'
        },
        {
            kode_responden: 'A02',
            tanggal_wawancara: '2026-07-16',
            nama_enumerator: 'Mahasiswa BKI',
            skor_g1: 4,
            skor_g2: 3,
            skor_g3: 4,
            skor_g4: 3,
            total_skor_growth: 14,
            kategori_growth: 'SEDANG',
            tipe_orientasi: 'PENCARI',
            catatan_sikap: 'Pengen berubah biar tidak mengecewakan ibu.',
            catatan_harapan: 'Pengen bisa ngaji dengan lancar.',
            catatan_kontrol: 'Susah fokus, sering kepikiran masa lalu.',
            catatan_komitmen: 'Besok coba shalat tepat waktu.',
            catatan_observasi: 'Antusias, tapi sesekali menunduk.'
        },
        {
            kode_responden: 'A03',
            tanggal_wawancara: '2026-07-17',
            nama_enumerator: 'Mahasiswa BKI',
            skor_g1: 5,
            skor_g2: 5,
            skor_g3: 4,
            skor_g4: 5,
            total_skor_growth: 19,
            kategori_growth: 'TINGGI',
            tipe_orientasi: 'PEJUANG',
            catatan_sikap: 'Pengen jadi orang yang berguna.',
            catatan_harapan: 'Pengen bisa kerja dan mandiri.',
            catatan_kontrol: 'Sulitnya kadang malas, tapi mau coba disiplin.',
            catatan_komitmen: 'Besok mulai bantu-bantu kegiatan di sini.',
            catatan_observasi: 'Anak terlihat bersemangat, punya banyak ide.'
        },
        {
            kode_responden: 'A04',
            tanggal_wawancara: '2026-07-18',
            nama_enumerator: 'Mahasiswa BKI',
            skor_g1: 2,
            skor_g2: 3,
            skor_g3: 2,
            skor_g4: 2,
            total_skor_growth: 9,
            kategori_growth: 'RENDAH',
            tipe_orientasi: 'TERLUKA',
            catatan_sikap: 'Bingung, kayaknya susah berubah.',
            catatan_harapan: 'Gak tahu mau jadi apa nanti.',
            catatan_kontrol: 'Sering kepikiran, gak bisa tidur.',
            catatan_komitmen: 'Gak tahu mau mulai dari mana.',
            catatan_observasi: 'Anak terlihat murung, bicara pelan.'
        }
    ];
}

// ============================================================
// 3. FUNGSI RENDER STATISTIK (UNTUK DASHBOARD)
// ============================================================
function renderStats(data) {
    const total = data.length;
    const growthTinggi = data.filter(d => d.kategori_growth === 'TINGGI').length;
    const growthSedang = data.filter(d => d.kategori_growth === 'SEDANG').length;
    const growthRendah = data.filter(d => d.kategori_growth === 'RENDAH').length;
    const pionir = data.filter(d => d.tipe_orientasi === 'PIONIR').length;
    const pencari = data.filter(d => d.tipe_orientasi === 'PENCARI').length;
    const pejuang = data.filter(d => d.tipe_orientasi === 'PEJUANG').length;
    const terluka = data.filter(d => d.tipe_orientasi === 'TERLUKA').length;

    const el = (id) => document.getElementById(id);
    if (el('total-anak')) el('total-anak').textContent = total;
    if (el('growth-tinggi')) el('growth-tinggi').textContent = growthTinggi;
    if (el('growth-sedang')) el('growth-sedang').textContent = growthSedang;
    if (el('growth-rendah')) el('growth-rendah').textContent = growthRendah;
    if (el('tipe-pionir')) el('tipe-pionir').textContent = pionir;
    if (el('tipe-pencari')) el('tipe-pencari').textContent = pencari;
    if (el('tipe-pejuang')) el('tipe-pejuang').textContent = pejuang;
    if (el('tipe-terluka')) el('tipe-terluka').textContent = terluka;
}

// ============================================================
// 4. FUNGSI RENDER GRAFIK (UNTUK DASHBOARD)
// ============================================================
function renderCharts(data) {
    // Chart 1: Growth Mindset (Doughnut)
    const growthCount = { TINGGI: 0, SEDANG: 0, RENDAH: 0 };
    data.forEach(d => growthCount[d.kategori_growth]++);

    const ctx1 = document.getElementById('chart-growth');
    if (ctx1) {
        if (window._growthChart) window._growthChart.destroy();

        window._growthChart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Tinggi', 'Sedang', 'Rendah'],
                datasets: [{
                    data: [growthCount.TINGGI, growthCount.SEDANG, growthCount.RENDAH],
                    backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { family: 'Inter' } } }
                }
            }
        });
    }

    // Chart 2: Tipe Orientasi (Bar)
    const tipeCount = { PIONIR: 0, PENCARI: 0, PEJUANG: 0, TERLUKA: 0 };
    data.forEach(d => tipeCount[d.tipe_orientasi]++);

    const ctx2 = document.getElementById('chart-tipe');
    if (ctx2) {
        if (window._tipeChart) window._tipeChart.destroy();

        window._tipeChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['🟢 Pionir', '🟠 Pencari', '🔵 Pejuang', '🔴 Terluka'],
                datasets: [{
                    label: 'Jumlah',
                    data: [tipeCount.PIONIR, tipeCount.PENCARI, tipeCount.PEJUANG, tipeCount.TERLUKA],
                    backgroundColor: ['#059669', '#d97706', '#2563eb', '#dc2626'],
                    borderRadius: 8,
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: 'Inter' } } },
                    x: { ticks: { font: { family: 'Inter' } } }
                }
            }
        });
    }
}

// ============================================================
// 5. FUNGSI RENDER TABEL (UNTUK DASHBOARD)
// ============================================================
function renderTable(data) {
    const tbody = document.getElementById('tabel-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-gray-400 py-6">Belum ada data. Silakan input data terlebih dahulu.</td></tr>`;
        return;
    }

    data.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="font-medium">${d.kode_responden}</td>
            <td>${d.tanggal_wawancara}</td>
            <td>${d.total_skor_growth}</td>
            <td><span class="glass-badge glass-badge-${d.kategori_growth.toLowerCase()}">${d.kategori_growth}</span></td>
            <td>${emojiTipe(d.tipe_orientasi)} ${d.tipe_orientasi}</td>
            <td><a href="profil.html?id=${d.kode_responden}" class="text-blue-600 hover:underline text-sm">Lihat Profil</a></td>
        `;
        tbody.appendChild(tr);
    });
}

// ============================================================
// 6. FUNGSI RENDER KARTU PROFIL (UNTUK PROFIL.HTML)
// ============================================================
function renderCard(d) {
    const tipeMap = {
        PIONIR: {
            header: 'header-pionir',
            icon: '🟢',
            sub: 'Sudah Menemukan Arah',
            desc: 'Sudah punya mimpi dan keyakinan kuat untuk berubah. Siap menjadi pelopor perubahan.'
        },
        PENCARI: {
            header: 'header-pencari',
            icon: '🟠',
            sub: 'Mencari Jalan Pulang',
            desc: 'Semangat membara, tapi masih perlu dituntun untuk percaya pada kemampuannya.'
        },
        PEJUANG: {
            header: 'header-pejuang',
            icon: '🔵',
            sub: 'Masih Mencari Titik Terang',
            desc: 'Punya ketahanan dan semangat juang, tapi masih bingung mau ke mana.'
        },
        TERLUKA: {
            header: 'header-terluka',
            icon: '🔴',
            sub: 'Menunggu Sembuh',
            desc: 'Butuh perhatian dan kesabaran ekstra untuk membangun kembali kepercayaan diri.'
        }
    };

    const info = tipeMap[d.tipe_orientasi] || tipeMap.PENCARI;
    const badgeClass = {
        TINGGI: 'glass-badge-tinggi',
        SEDANG: 'glass-badge-sedang',
        RENDAH: 'glass-badge-rendah'
    };
    const descGrowth = {
        TINGGI: 'Keyakinan kuat untuk berkembang.',
        SEDANG: 'Keyakinan cukup, masih perlu penguatan.',
        RENDAH: 'Masih ragu dengan kemampuan diri.'
    };

    const html = `
        <div class="${info.header} p-6 text-gray-800">
            <div class="flex flex-wrap justify-between items-start gap-2">
                <div><h1 class="text-2xl font-bold flex items-center gap-2">🧭 Kartu Profil Psikososial</h1><p class="text-sm opacity-75">"Kompas Tumbuh" · LPKA Pangkalpinang</p></div>
                <div class="text-right"><span class="text-sm font-medium">Kode: ${d.kode_responden}</span><br><span class="text-sm opacity-75">Tanggal: ${d.tanggal_wawancara}</span></div>
            </div>
        </div>
        <div class="px-6 py-4 border-b border-white/30 flex flex-wrap items-center justify-between gap-2">
            <div><span class="text-3xl mr-2">${info.icon}</span><span class="text-xl font-bold">TAHAP ${d.tipe_orientasi}</span><span class="text-sm text-gray-500 ml-2">— ${info.sub}</span></div>
            <span class="text-sm text-gray-500 italic">${info.desc}</span>
        </div>
        <div class="p-6 space-y-5">
            <div><h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">🧠 Platform Dasar Psikis</h2>
                <div class="flex items-center gap-3 mt-1"><span class="text-2xl font-bold">${d.total_skor_growth}</span><span class="text-sm text-gray-500">/ 20</span><span class="glass-badge ${badgeClass[d.kategori_growth]}">${d.kategori_growth}</span></div>
                <p class="text-sm text-gray-600 mt-1">${descGrowth[d.kategori_growth] || '-'}</p>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"><h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">🧭 Extended TPB</h2>
                <div class="space-y-2 text-sm"><div><span class="font-medium text-gray-600">Sikap:</span> ${d.catatan_sikap || '-'}</div>
                <div><span class="font-medium text-gray-600">Harapan:</span> ${d.catatan_harapan || '-'}</div>
                <div><span class="font-medium text-gray-600">Kontrol:</span> ${d.catatan_kontrol || '-'}</div>
                <div><span class="font-medium text-gray-600">Komitmen:</span> ${d.catatan_komitmen || '-'}</div></div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"><h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">📋 Catatan Enumerator</h2><p class="text-sm text-gray-600">${d.catatan_observasi || '-'}</p></div>
        </div>
        <div class="px-6 py-4 bg-white/20 backdrop-blur-sm border-t border-white/30 flex flex-wrap justify-between items-center no-print">
            <span class="text-xs text-gray-400">Enumerator: ${d.nama_enumerator}</span>
            <div class="flex gap-2"><button onclick="window.print()" class="btn-glass-primary">🖨️ Cetak</button><a href="dashboard.html" class="btn-glass-secondary">⬅ Kembali</a></div>
        </div>
    `;
    const container = document.getElementById('kartu-profil');
    if (container) container.innerHTML = html;
}

// ============================================================
// 7. HELPER: EMOJI TIPE
// ============================================================
function emojiTipe(tipe) {
    const map = { PIONIR: '🟢', PENCARI: '🟠', PEJUANG: '🔵', TERLUKA: '🔴' };
    return map[tipe] || '';
}

// ============================================================
// 8. FUNGSI LOAD PROFIL PER ORANG
// ============================================================
async function loadProfile(kode) {
    const data = await loadAllData();
    const profil = data.find(d => d.kode_responden === kode);
    if (!profil) {
        const container = document.getElementById('kartu-profil');
        if (container) {
            container.innerHTML = `<div class="p-10 text-center text-red-500">❌ Data untuk kode ${kode} tidak ditemukan.</div>`;
        }
        return;
    }
    renderCard(profil);
}

// ============================================================
// 9. EKSPORT CSV
// ============================================================
function exportCSV() {
    if (!allData || allData.length === 0) {
        alert('Belum ada data untuk diekspor.');
        return;
    }
    const headers = ['Kode', 'Tanggal', 'Enumerator', 'Skor_G1', 'Skor_G2', 'Skor_G3', 'Skor_G4', 'Total_Growth', 'Kategori_Growth', 'Tipe', 'Sikap', 'Harapan', 'Kontrol', 'Komitmen', 'Observasi'];
    const rows = allData.map(d => [
        d.kode_responden, d.tanggal_wawancara, d.nama_enumerator,
        d.skor_g1, d.skor_g2, d.skor_g3, d.skor_g4,
        d.total_skor_growth, d.kategori_growth, d.tipe_orientasi,
        `"${(d.catatan_sikap || '').replace(/"/g, '""')}"`,
        `"${(d.catatan_harapan || '').replace(/"/g, '""')}"`,
        `"${(d.catatan_kontrol || '').replace(/"/g, '""')}"`,
        `"${(d.catatan_komitmen || '').replace(/"/g, '""')}"`,
        `"${(d.catatan_observasi || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `kompas_tumbuh_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
}

// ============================================================
// 10. FUNGSI SIMPAN DATA (UNTUK INPUT.HTML)
// ============================================================
async function saveData(data) {
    try {
        console.log('Data disimpan:', data);
        allData.unshift(data);
        return { success: true };
    } catch (err) {
        console.error('Gagal menyimpan data:', err);
        return { success: false, error: err.message };
    }
}

// ============================================================
// 11. INISIALISASI DASHBOARD
// ============================================================
async function initDashboard() {
    const data = await loadAllData();
    renderStats(data);
    renderCharts(data);
    renderTable(data);
}

// ============================================================
// 12. EKSPOR FUNGSI GLOBAL
// ============================================================
window.exportCSV = exportCSV;
window.initDashboard = initDashboard;
window.loadProfile = loadProfile;
window.saveData = saveData;
window.loadAllData = loadAllData;

// ============================================================
// 13. NAVIGASI SCROLL EFFECT & LOGOUT
// ============================================================
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-top');
    if (nav) {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

async function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            localStorage.removeItem('supabase_session');
            window.location.href = 'index.html';
        } catch (err) {
            alert('Gagal logout: ' + err.message);
        }
    }
}
window.logout = logout;

// ============================================================
// 14. AUTO-INIT SAAT DOKUMEN SIAP
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const isDashboard = document.getElementById('stat-ringkasan');
    const isProfil = document.getElementById('kartu-profil');
    const isInput = document.getElementById('form-kompas');

    if (isDashboard) {
        initDashboard();
    }
    if (isProfil) {
        const params = new URLSearchParams(window.location.search);
        const kode = params.get('id');
        if (kode) {
            loadProfile(kode);
        } else {
            isProfil.innerHTML = `<div class="p-10 text-center text-red-500">❌ Kode responden tidak ditemukan di URL.</div>`;
        }
    }
    if (isInput) {
        console.log('Halaman input siap digunakan.');
    }
});
