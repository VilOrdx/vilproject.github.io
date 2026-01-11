// --- DATABASE GAME ---
const games = [
    {
        id: 1,
        title: "Neon Knight",
        genre: "Action",
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
        id: 2, // FIXED: ID tidak boleh sama
        title: "Cyber Katana", // Saya rapikan judulnya dari typo
        genre: "Action",
        releaseDate: "20 Mei 2024",
        developedBy: "Nama Kamu",
        platforms: "Android, PC/Windows",
        isNew: true,
        isHot: true,
        desc: "Pertempuran pedang di masa depan dengan grafik neon yang memukau...",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", // Ganti gambar agar beda
        downloadWindows: "https://link-download-windows.com",
        downloadAndroid: "https://link-download-android.com"
    },
    {
        id: 3, // FIXED: Urutan ID dilanjutkan
        title: "Galaxy Raiders",
        genre: "RPG",
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

// --- LOGIKA UTAMA (Dijalankan setelah HTML siap) ---
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi awal
    displayGames('all');
    initHeroSlider();
});

// Variabel global
let currentOpenGameId = null;

// Fungsi 1: Mengatur filter kategori
function displayGames(category) {
    const filtered = category === 'all' ? games : games.filter(g => g.genre === category);
    renderGames(filtered);
    
    // Update status tombol aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(category === 'all' && btn.innerText.toLowerCase().includes('semua')) {
            btn.classList.add('active');
        } else if (btn.innerText.includes(category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Fungsi 2: Merender kartu game
function renderGames(data) {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    container.innerHTML = ''; 

    if (data.length === 0) {
        container.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align:center;">Game tidak ditemukan.</div>`;
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

// Fungsi 3: Pencarian
function searchGames() {
    const inputElement = document.getElementById('searchInput');
    if (!inputElement) return;

    const input = inputElement.value.toLowerCase();
    
    // Hapus active class dari semua filter btn saat searching
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

    const filtered = games.filter(game => 
        game.title.toLowerCase().includes(input) || 
        game.genre.toLowerCase().includes(input)
    );

    renderGames(filtered);
}

// Fungsi 4: Filter Tombol Wrapper
function filterGames(category, btn) {
    // Reset semua tombol visual
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    // Set tombol yang diklik jadi active
    if(btn) btn.classList.add('active');
    
    displayGames(category);
}

// --- NAVIGASI HALAMAN ---

function showHome() {
    const home = document.getElementById('homePage');
    const detail = document.getElementById('detailPage');
    
    if(home && detail) {
        home.style.display = 'block';
        detail.style.display = 'none';
        window.scrollTo(0,0);
    }
}

function showDetail(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) {
        console.error("Game ID not found:", gameId);
        return;
    }

    currentOpenGameId = gameId;

    const home = document.getElementById('homePage');
    const detail = document.getElementById('detailPage');
    const detailContent = document.getElementById('detailContent');

    if(home && detail && detailContent) {
        home.style.display = 'none';
        detail.style.display = 'block';
        window.scrollTo(0,0);

        detailContent.innerHTML = `
            <button class="btn-back" onclick="showHome()">← Kembali ke Home</button>
            
            <div class="detail-header-wrapper">
                 <img src="${game.image}" class="detail-header-img" alt="${game.title}">
                 <div class="detail-overlay"></div>
            </div>
            
            <div class="detail-grid">
                <div class="detail-main">
                    <h1 class="detail-title">${game.title}</h1>
                    <div class="tag-row">
                        <span class="genre-tag">${game.genre}</span>
                        ${game.isNew ? '<span class="badge-new-static">NEW RILIS</span>' : ''}
                    </div>
                    <p class="detail-desc">${game.desc}</p>
                </div>
                
                <div class="detail-side">
                    <div class="detail-info-card">
                        <div class="info-row">
                            <span class="info-label">GENRE</span>
                            <span class="info-value">${game.genre}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">DEVELOPER</span>
                            <span class="info-value">${game.developedBy}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">RILIS</span>
                            <span class="info-value">${game.releaseDate}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">PLATFORM</span>
                            <span class="info-value">${game.platforms}</span>
                        </div>
                        
                        <div class="download-box">
                            <p class="dl-label">UNDUH GAME SEKARANG:</p>
                            ${game.downloadWindows ? `<a href="${game.downloadWindows}" target="_blank" class="btn-dl btn-windows"><i class="fa-brands fa-windows"></i> Download Windows</a>` : ''}
                            ${game.downloadAndroid ? `<a href="${game.downloadAndroid}" target="_blank" class="btn-dl btn-android"><i class="fa-brands fa-android"></i> Download Android</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        renderComments();
    }
}

// --- SLIDER SYSTEM ---

let slideIdx = 0;
let slideTimer;

function initHeroSlider() {
    const container = document.getElementById('slidesContainer');
    const dotsContainer = document.getElementById('sliderDots');
    const heroSection = document.getElementById('heroSlider');
    
    // Safety check jika elemen tidak ada di HTML
    if (!container || !dotsContainer || !heroSection) return;

    const hotGames = games.filter(g => g.isHot);
    
    if (hotGames.length === 0) {
        heroSection.style.display = 'none';
        return;
    }

    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    hotGames.forEach((game, index) => {
        // Buat Slide
        const slideDiv = document.createElement('div');
        slideDiv.className = index === 0 ? 'slide active' : 'slide';
        slideDiv.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="slide-content">
                <span class="badge-hot">🔥 HOT GAME</span>
                <h2>${game.title}</h2>
                <p>${game.desc.substring(0, 100)}...</p>
                <button onclick="showDetail(${game.id})" class="btn-donate">Lihat Detail</button>
            </div>
        `;
        container.appendChild(slideDiv);

        // Buat Dot
        const dotSpan = document.createElement('span');
        dotSpan.className = index === 0 ? 'dot active' : 'dot';
        dotSpan.onclick = () => currentSlideManual(index);
        dotsContainer.appendChild(dotSpan);
    });

    startAutoSlide();
}

function startAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => changeSlide(1), 5000); // 5 detik lebih ideal
}

function changeSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if(slides.length === 0) return;

    slides[slideIdx].classList.remove('active');
    dots[slideIdx].classList.remove('active');

    slideIdx = (slideIdx + n + slides.length) % slides.length;

    slides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
}

function currentSlideManual(n) {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;

    // Reset timer agar tidak bentrok saat user klik manual
    clearInterval(slideTimer);
    
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIdx].classList.remove('active');
    dots[slideIdx].classList.remove('active');

    slideIdx = n;

    slides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
    
    startAutoSlide(); // Mulai timer lagi
}

// --- KOMENTAR SYSTEM ---
// (Logika komentar tetap sama, hanya menambahkan safety check)

function addComment() {
    const nameInput = document.getElementById('commenterName');
    const textInput = document.getElementById('commentText');

    if (!nameInput || !textInput) return;
    if (!nameInput.value.trim() || !textInput.value.trim()) {
        alert("Nama dan komentar wajib diisi!");
        return;
    }

    const newComment = {
        name: nameInput.value,
        text: textInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
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
        list.innerHTML = "<p style='opacity:0.6; margin-top:10px;'>Belum ada komentar.</p>";
        return;
    }

    // Render dari yang terbaru (reverse)
    [...gameComments].reverse().forEach((c) => {
        // Cari index asli untuk fitur hapus
        const originalIndex = allComments.indexOf(c);
        
        list.innerHTML += `
            <div class="comment-item">
                <div class="comment-header">
                    <strong>${c.name}</strong>
                    <small>${c.date}</small>
                </div>
                <p>${c.text}</p>
                <button onclick="deleteComment(${originalIndex})" class="btn-delete-comment">[Hapus]</button>
            </div>
        `;
    });
}

function deleteComment(index) {
    const password = prompt("Masukkan Kode Admin:");
    if (password === "vilganteng") { 
        let allComments = JSON.parse(localStorage.getItem('gameVaultComments')) || [];
        allComments.splice(index, 1);
        localStorage.setItem('gameVaultComments', JSON.stringify(allComments));
        renderComments();
        alert("Terhapus!");
    } else {
        alert("Password Salah!");
    }
}
