const games = [
{
        id: 1,
        title: "Neon Knight",
        genre: "Action",
        releaseDate: "20 Mei 2024",
        developedBy: "Nama Kamu",
        platforms: "Android, PC/Windows",
        isNew: true,
        desc: "Pertempuran pedang di masa depan...",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        // Pisahkan linknya di sini
        downloadWindows: "https://link-download-windows.com",
        downloadAndroid: "https://link-download-android.com"
    },
{
        id: 2,
        title: "ANjasss",
        genre: "Action",
        releaseDate: "20 Mei 2024",
        developedBy: "Nama Kamu",
        platforms: "Android, PC/Windows",
        isNew: true,
        desc: "Pertempuran pedang di masa depan...",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        // Pisahkan linknya di sini
        downloadWindows: "https://link-download-windows.com",
        downloadAndroid: "https://link-download-android.com"
    },
];

// Menampilkan Daftar Game di Home
function displayGames(category) {
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';
    const filtered = category === 'all' ? games : games.filter(g => g.genre === category);

    filtered.forEach((game) => {
        container.innerHTML += `
            <div class="game-card">
                <div class="image-container">
                    ${game.isNew ? '<span class="badge-new">NEW</span>' : ''}
                    <img src="${game.image}" class="card-img">
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

// Menampilkan Halaman Detail
function showDetail(gameId) {
    const game = games.find(g => g.id === gameId);
    const homePage = document.getElementById('homePage');
    const detailPage = document.getElementById('detailPage');
    const detailContent = document.getElementById('detailContent');

    homePage.style.display = 'none';
    detailPage.style.display = 'block';
    window.scrollTo(0,0);

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
                        <span class="info-label">TANGGAL RILIS</span>
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
                        
                        ${game.downloadWindows ? `
                            <a href="${game.downloadWindows}" target="_blank" class="btn-dl btn-windows">
                                <i class="fa-brands fa-windows"></i> Download for Windows
                            </a>
                        ` : ''}
                
                        ${game.downloadAndroid ? `
                            <a href="${game.downloadAndroid}" target="_blank" class="btn-dl btn-android">
                                <i class="fa-brands fa-android"></i> Download for Android
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('detailPage').style.display = 'none';
}

function filterGames(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayGames(category);
}

function toggleModal() {
    const modal = document.getElementById('donateModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

displayGames('all');

// Fungsi Pencarian
function searchGames() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('gameContainer');
    
    // Reset tombol filter ke 'All' saat mencari
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[onclick*="all"]').classList.add('active');

    const filtered = games.filter(game => 
        game.title.toLowerCase().includes(input) || 
        game.genre.toLowerCase().includes(input)
    );

    renderGames(filtered);
}

// Kita pisahkan fungsi render agar bisa dipakai ulang oleh Filter dan Search
function renderGames(data) {
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<div class="no-results">Game "${document.getElementById('searchInput').value}" tidak ditemukan.</div>`;
        return;
    }

    data.forEach((game) => {
        container.innerHTML += `
            <div class="game-card">
                <div class="image-container">
                    ${game.isNew ? '<span class="badge-new">NEW</span>' : ''}
                    <img src="${game.image}" class="card-img">
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

// Variabel global untuk ID game yang sedang dibuka
let currentOpenGameId = null;

function showDetail(gameId) {
    // 1. Cari data game berdasarkan ID
    const game = games.find(g => g.id === gameId);
    
    // Jika game tidak ditemukan (untuk jaga-jaga)
    if (!game) {
        console.error("Game not found!");
        return;
    }

// FUNGSI KOMENTAR BARU
function addComment() {
    const nameInput = document.getElementById('commenterName');
    const textInput = document.getElementById('commentText');

    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
        alert("Nama dan komentar tidak boleh kosong!");
        return;
    }

    const newComment = {
        name: nameInput.value,
        text: textInput.value,
        date: new Date().toLocaleString('id-ID'),
        gameId: currentOpenGameId
    };

    // Ambil komentar lama dari LocalStorage
    let allComments = JSON.parse(localStorage.getItem('gameVaultComments')) || [];
    
    // Tambah komentar baru
    allComments.push(newComment);
    
    // Simpan kembali ke LocalStorage
    localStorage.setItem('gameVaultComments', JSON.stringify(allComments));

    // Reset Form & Render ulang
    textInput.value = "";
    renderComments();
}

function renderComments() {
    const list = document.getElementById('commentList');
    list.innerHTML = "";
    
    const allComments = JSON.parse(localStorage.getItem('gameVaultComments')) || [];
    
    // Filter komentar hanya untuk game yang sedang dibuka
    const gameComments = allComments.filter(c => c.gameId === currentOpenGameId);

    if (gameComments.length === 0) {
        list.innerHTML = "<p style='color:var(--text-sec); margin-top:10px;'>Belum ada komentar. Jadi yang pertama!</p>";
        return;
    }

    // Tampilkan dari yang terbaru (di atas)
    gameComments.reverse().forEach(c => {
        list.innerHTML += `
            <div class="comment-item">
                <strong>${c.name}</strong>
                <p>${c.text}</p>
                <small>${c.date}</small>
            </div>
        `;
    });
}
