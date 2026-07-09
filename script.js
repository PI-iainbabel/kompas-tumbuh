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

// script.js
function toggleSidebar() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// Tutup sidebar saat overlay diklik
document.getElementById('sidebar-overlay')?.addEventListener('click', toggleSidebar);

// Ekspor fungsi toggleSidebar ke global
window.toggleSidebar = toggleSidebar;

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

// ===== TOGGLE MOBILE MENU (HAMBURGER) =====
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
}

// ===== INISIALISASI NAVIGASI MOBILE =====
function initMobileNav() {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        // Klik hamburger
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Tutup menu saat link di klik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Tutup menu saat klik di luar
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Tutup menu saat resize ke desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                closeMobileMenu();
            }
        });
    }
}

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

    // Inisialisasi mobile nav
    initMobileNav();
});

// ===== EKSPOR FUNGSI KE GLOBAL =====
window.toggleTheme = toggleTheme;
window.logout = logout;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
