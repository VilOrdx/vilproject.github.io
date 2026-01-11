const games = [
    {
        title: "Neon Knight",
        genre: "Action",
        date: "2024-05-20",
        isNew: true,
        desc: "Pertempuran pedang di masa depan yang penuh dengan lampu neon.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
        link: "#" // Masukkan link download file zip/exe di sini
    },
    {
        title: "Pixel Quest",
        genre: "RPG",
        date: "2024-04-15",
        isNew: false,
        desc: "RPG klasik bergaya 8-bit dengan cerita yang mendalam dan quest unik.",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&q=80",
        link: "#"
    },
    {
        title: "Shadow Runner",
        genre: "Action",
        date: "2024-05-25",
        isNew: true,
        desc: "Lari secepat mungkin melewati bayangan musuh tanpa terdeteksi.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
        link: "#"
    }
];

function displayGames(category) {
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';

    const filtered = category === 'all' ? games : games.filter(g => g.genre === category);

    filtered.forEach((game) => {
        container.innerHTML += `
            <div class="game-card">
                <div class="image-container">
                    ${game.isNew ? '<span class="badge-new">NEW UPDATE</span>' : ''}
                    <img src="${game.image}" class="card-img" alt="${game.title}">
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="genre-tag">${game.genre}</span>
                        <span class="post-date">${game.date}</span>
                    </div>
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-desc">${game.desc}</p>
                    <a href="${game.link}" class="play-btn" download>Download</a>
                </div>
            </div>
        `;
    });
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

// Inisialisasi saat web dibuka
displayGames('all');
