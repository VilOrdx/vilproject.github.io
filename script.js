// --- DATABASE GAME ---
const games = [
    {
        id: 1,
        title: "Neon Knight",
        genre: "Visual Novel" "Netorare",
        releaseDate: "20 Mei 2024",
        developedBy: "Nama Kamu",
        platforms: "Android, PC/Windows",
        isNew: true,
        isHot: true,
        desc: "Pertempuran pedang di masa depan dengan grafik neon yang memukau...",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        downloadWindows: "https://link-download-windows.com",
        downloadAndroid: "https://link-download-android.com"
    },
    {
        id: 2,
        title: "KEinsdfat",
        genre: "NTR",
        releaseDate: "20 Mei 2024",
        developedBy: "Nama Kamu",
        platforms: "Android, PC/Windows",
        isNew: true,
        isHot: true,
        desc: "Pertempuran pedang di masa depan dengan grafik neon yang memukau...",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        downloadWindows: "https://link-download-windows.com",
        downloadAndroid: "https://link-download-android.com"
    },
    {
        id: 3,
        title: "Galaxy Raiders",
        genre: "NTR",
        releaseDate: "25 Juni 2024",
        developedBy: "Nama Kamu",
        platforms: "Android",
        isNew: false,
        isHot: true,
        desc: "Jelajahi galaksi dan kalahkan monster alien dalam RPG turn-based ini...",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
        downloadWindows: null, 
        downloadAndroid: "https://link-download-android.com"
    }
];

// --- LOGIKA UTAMA ---

// Variabel global untuk ID game yang sedang dibuka
let currentOpenGameId = null;

// Jalankan fungsi ini pertama kali saat web dibuka agar game muncul!
displayGames('all');

// Fungsi 1: Mengatur filter kategori
function displayGames(category) {
    const filtered = category === 'all' ? games : games.filter(g => g.genre === category);
    renderGames(filtered);
}

// Fungsi 2: Merender (menggambar) kartu game ke layar
function renderGames(data) {
    const container = document.getElementById('gameContainer');
    
    // Cek apakah elemen container ada di HTML
    if (!container) {
        console.error("Error: Element dengan ID 'gameContainer' tidak ditemukan di HTML!");
        return;
    }

    container.innerHTML = ''; // Bersihkan isi container sebelum diisi ulang

    if (data.length === 0) {
        container.innerHTML = `<div class="no-results">Game tidak ditemukan.</div>`;
        return;
    }

    data.forEach((game) => {
        container.innerHTML += `
            <div class="game-card">
                <div class="image-container">
                    ${game.isNew ? '<span class="badge-new">NEW</span>' : ''}
                    <img src="${game.image}" class="card-img" loading="lazy" alt="${game.title}">
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="genre-tag">${game.genre}</span>
                    </div>
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-desc">${game.desc.substring(0, 80)}...</p>
                    <button onclick="showDetail(${game.id})" class="play-btn">Lihat Detailnya</button>
                </div>
            </div>
        `;
    });
}

// Fungsi 3: Fitur Pencarian
function searchGames() {
    const inputElement = document.getElementById('searchInput');
    if (!inputElement) return; // Guard clause

    const input = inputElement.value.toLowerCase();
    
    // Reset tombol filter visual
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.filter-btn[onclick*="all"]');
    if (allBtn) allBtn.classList.add('active');

    const filtered = games.filter(game => 
        game.title.toLowerCase().includes(input) || 
        game.genre.toLowerCase().includes(input)
    );

    renderGames(filtered);
}

// Fungsi 4: Filter Tombol (Action, RPG, dll)
function filterGames(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayGames(category);
}

// --- NAVIGASI HALAMAN ---

function showHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('detailPage').style.display = 'none';
    window.scrollTo(0,0);
}

function showDetail(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    currentOpenGameId = gameId;

    document.getElementById('homePage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
    window.scrollTo(0,0);

    const detailContent = document.getElementById('detailContent');
    
    detailContent.innerHTML = `
        <button class="btn-back" onclick="showHome()">← Kembali ke Home</button>
        
        <div class="detail-header-wrapper">
             <img src="${game.image}" class="detail-header-img" alt="${game.title}">
        </div>
        
        <div class="detail-grid">
            <div class="detail-main">
                <h1 style="font-size: 2.5rem; margin-bottom: 10px;">${game.title}</h1>
                <div style="display:flex; gap:10px; margin-bottom:20px;">
                    <span class="genre-tag" style="background:rgba(255,255,255,0.1); padding:5px 10px; border-radius:4px;">${game.genre}</span>
                </div>
                <p style="line-height: 1.8; color: var(--text-sec); font-size: 1.1rem;">
                    ${game.desc}
                </p>
            </div>
            
            <div class="detail-side">
                <div class="detail-info-card">
                    <div class="info-item">
                        <span class="info-label">GENRE</span>
                        <span class="info-value">${game.genre}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">DEVELOPER</span>
                        <span class="info-value">${game.developedBy}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">RILIS</span>
                        <span class="info-value">${game.releaseDate}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">PLATFORM</span>
                        <span class="info-value">${game.platforms}</span>
                    </div>
                    
                    <div class="download-box">
                        <p style="margin-bottom: 15px; font-size: 0.9rem; font-weight: bold; color: white;">
                            UNDUH GAME SEKARANG:
                        </p>
                        ${game.downloadWindows ? `<a href="${game.downloadWindows}" target="_blank" class="btn-dl btn-windows"><i class="fa-brands fa-windows"></i> Download for Windows</a>` : ''}
                        ${game.downloadAndroid ? `<a href="${game.downloadAndroid}" target="_blank" class="btn-dl btn-android"><i class="fa-brands fa-android"></i> Download for Android</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    renderComments();
}

// --- FITUR LAINNYA ---

function toggleModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

// --- SISTEM KOMENTAR ---

function addComment() {
    const nameInput = document.getElementById('commenterName');
    const textInput = document.getElementById('commentText');

    if (!nameInput || !textInput) return;

    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
        alert("Nama dan komentar tidak boleh kosong!");
        return;
    }

    const newComment = {
        name: nameInput.value,
        text: textInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"), // Basic security
        date: new Date().toLocaleString('id-ID'),
        gameId: currentOpenGameId
    };

    let allComments = JSON.parse(localStorage.getItem('gameVaultComments')) || [];
    allComments.push(newComment);
    localStorage.setItem('gameVaultComments', JSON.stringify(allComments));

    textInput.value = "";
    renderComments();
}

function renderComments() {
    const list = document.getElementById('commentList');
    if (!list) return;
    
    list.innerHTML = "";
    
    const allComments = JSON.parse(localStorage.getItem('gameVaultComments')) || [];
    const gameComments = allComments.filter(c => c.gameId === currentOpenGameId);

    if (gameComments.length === 0) {
        list.innerHTML = "<p style='color:var(--text-sec); margin-top:10px;'>Belum ada komentar. Jadi yang pertama!</p>";
        return;
    }

    gameComments.reverse().forEach((c, index) => {
        // Kita gunakan index asli dari array allComments untuk menghapus
        const originalIndex = allComments.indexOf(c);
        
        list.innerHTML += `
            <div class="comment-item" style="position: relative;">
                <strong>${c.name}</strong>
                <p>${c.text}</p>
                <small>${c.date}</small>
                
                <button onclick="deleteComment(${originalIndex})" 
                        style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #ff4444; cursor: pointer; font-size: 0.7rem;">
                    [Hapus]
                </button>
            </div>
        `;
    });
}

function deleteComment(index) {
    // Ganti 'admin123' dengan password yang kamu inginkan
    const password = prompt("Masukkan Kode Admin untuk menghapus komentar:");

    if (password === "vilganteng") { // <-- GANTI PASSWORD DISINI
        let allComments = JSON.parse(localStorage.getItem('gameVaultComments')) || [];
        
        // Hapus 1 item berdasarkan index
        allComments.splice(index, 1);
        
        // Simpan kembali ke LocalStorage
        localStorage.setItem('gameVaultComments', JSON.stringify(allComments));
        
        // Refresh daftar komentar
        renderComments();
        alert("Komentar berhasil dihapus!");
    } else {
        alert("Kode Admin salah!");
    }
}

function initHeroSlider() {
    const container = document.getElementById('slidesContainer');
    const dotsContainer = document.getElementById('sliderDots');
    
    // 1. Filter game yang punya label isHot
    const hotGames = games.filter(g => g.isHot);
    
    if (hotGames.length === 0) {
        document.getElementById('heroSlider').style.display = 'none';
        return;
    }

    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    // 2. Render Slide & Dots secara otomatis
    hotGames.forEach((game, index) => {
        const activeClass = index === 0 ? 'active' : '';
        
        // Buat Slide
        container.innerHTML += `
            <div class="slide ${activeClass}">
                <img src="${game.image}" alt="${game.title}">
                <div class="slide-content">
                    <span class="badge-hot">HOT GAME</span>
                    <h2>${game.title}</h2>
                    <p>${game.desc.substring(0, 100)}...</p>
                    <button onclick="showDetail(${game.id})" class="btn-donate">Lihat Detail</button>
                </div>
            </div>
        `;

        // Buat Dot
        dotsContainer.innerHTML += `
            <span class="dot ${activeClass}" onclick="currentSlideManual(${index})"></span>
        `;
    });

    startAutoSlide();
}

let slideIdx = 0;
let slideTimer;

function startAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => changeSlide(1), 15000);
}

function changeSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIdx].classList.remove('active');
    dots[slideIdx].classList.remove('active');

    slideIdx = (slideIdx + n + slides.length) % slides.length;

    slides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
    startAutoSlide(); // Reset timer setiap kali ganti slide
}

function currentSlideManual(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIdx].classList.remove('active');
    dots[slideIdx].classList.remove('active');

    slideIdx = n;

    slides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
    startAutoSlide();
}

// Panggil fungsi inisialisasi
initHeroSlider();
