// ============================================================
// script.js — Fungsi Global Kompas Tumbuh
// ============================================================
// Digunakan bersama oleh semua halaman untuk fungsi umum.
// ============================================================

// ===== TOGGLE THEME (Mode Gelap/Terang) =====
function toggleTheme() {
    const html = document.documentElement;
    const sun = document.getElementById('theme-sun-nav');
    const moon = document.getElementById('theme-moon-nav');

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
        if (sun) sun.classList.add('hidden');
        if (moon) moon.classList.remove('hidden');
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
        if (sun) sun.classList.remove('hidden');
        if (moon) moon.classList.add('hidden');
    }
}

// ===== LOGOUT =====
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('kompas_login');
        window.location.href = 'index.html';
    }
}

// ===== NAVIGASI SCROLL EFFECT =====
// Menambahkan kelas 'scrolled' pada .nav-top saat scroll
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

// ===== INISIALISASI THEME SAAT LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Cek preferensi tema dari localStorage atau sistem
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        const moon = document.getElementById('theme-moon-nav');
        const sun = document.getElementById('theme-sun-nav');
        if (sun) sun.classList.add('hidden');
        if (moon) moon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        const sun = document.getElementById('theme-sun-nav');
        const moon = document.getElementById('theme-moon-nav');
        if (sun) sun.classList.remove('hidden');
        if (moon) moon.classList.add('hidden');
    }

    // Tandai menu aktif berdasarkan halaman saat ini
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-top a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('bg-white/20', 'text-cyan-500', 'dark:text-cyan-400');
        } else {
            link.classList.remove('bg-white/20', 'text-cyan-500', 'dark:text-cyan-400');
        }
    });
});

// ===== EKSPOR FUNGSI KE GLOBAL =====
window.toggleTheme = toggleTheme;
window.logout = logout;
