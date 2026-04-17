const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=technology,science&language=es`;

async function fetchNews() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        const articles = data.results;
        renderCards(articles);
        setupDownload(articles);
    } catch (error) {
        console.error("Error:", error);
    }
}

function renderCards(news) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = news.map(item => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <img src="${item.image_url || 'https://via.placeholder.com/400x200?text=News'}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title text-warning">${item.title}</h5>
                    <p class="small text-secondary font-monospace">
                        ${item.source_id} | ${new Date(item.pubDate).toLocaleDateString()}
                    </p>
                    <a href="${item.link}" target="_blank" class="btn btn-outline-warning btn-sm">Leer nota completa</a>
                </div>
            </div>
        </div>
    `).join('');
}

function setupDownload(news) {
    document.getElementById('downloadBtn').addEventListener('click', () => {
        let text = "--- TOP 10 NOTICIAS TECH & CIENCIA ---\n\n";
        news.slice(0, 10).forEach((n, i) => {
            text += `${i + 1}. ${n.title}\nCONTEXTO: ${n.description ? n.description.substring(0, 100) : 'N/A'}...\n\n`;
        });
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'noticias_tech.txt';
        link.click();
    });
}

fetchNews();