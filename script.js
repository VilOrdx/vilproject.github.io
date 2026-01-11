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
        <button class="btn-back" onclick="showHome()">← Kembali</button>
        <img src="${game.image}" class="detail-header-img">
        
        <div class="detail-grid">
            <div class="detail-main">
                <h1>${game.title}</h1>
                <p style="margin-top:20px; color: var(--text-sec);">${game.desc}</p>
            </div>
            
            <div class="detail-side">
                <div class="detail-info-card">
                    <div class="info-item">
                        <span class="info-label">GENRE</span>
                        <span class="info-value">${game.genre}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">DIKEMBANGKAN OLEH</span>
                        <span class="info-value">${game.developedBy}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">RILIS</span>
                        <span class="info-value">${game.releaseDate}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">SUPPORT DEVICE</span>
                        <span class="info-value">${game.platforms}</span>
                    </div>
                    
                    <div class="download-box">
    <p style="margin-bottom: 10px; font-size: 0.9rem; font-weight: bold;">UNDUH GAME:</p>
    
    ${game.downloadWindows ? `
        <a href="${game.downloadWindows}" class="play-btn" style="background: #0078d4; color: white; border: none; margin-bottom: 10px;">
            Download for Windows (PC)
        </a>
    ` : ''}

    ${game.downloadAndroid ? `
        <a href="${game.downloadAndroid}" class="play-btn" style="background: #3DDC84; color: #000; border: none;">
            Download for Android (APK)
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

