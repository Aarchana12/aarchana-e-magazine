document.addEventListener('DOMContentLoaded', loadCategoryPage);

async function loadCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const searchQuery = urlParams.get('search');

    const response = await fetch('assets/js/data.json');
    const articles = await response.json();

    const container = document.getElementById('categoryArticlesContainer');
    const title = document.getElementById('categoryTitle');

    let filteredArticles;

    if (category) {
        title.textContent = `Category: ${capitalizeFirstLetter(category)}`;
        filteredArticles = articles.filter(article => article.category === category.toLowerCase());
    } else if (searchQuery) {
        title.textContent = `Search Results for: "${searchQuery}"`;
        filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    } else {
        title.textContent = 'Articles';
        filteredArticles = articles;
    }

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p class="text-muted">No articles found.</p>';
    } else {
        container.innerHTML = filteredArticles.map(article => `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${article.image}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="article.html?id=${article.id}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function searchArticles() {
    const query = document.getElementById('searchInput').value;
    window.location.href = `category.html?search=${query}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
