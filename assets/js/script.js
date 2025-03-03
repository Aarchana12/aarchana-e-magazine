document.addEventListener('DOMContentLoaded', loadNews);

async function loadNews() {
    const response = await fetch('assets/js/data.json');
    const articles = await response.json();

    const container = document.getElementById('newsContainer');
    container.innerHTML = articles.map(article => `
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

function searchArticles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    window.location.href = `category.html?search=${query}`;
}
function loadArticle(article) {
    const articleContainer = document.getElementById("articleContainer");

    let multimediaHtml = '';

    if (article.multimedia) {
        if (article.multimedia.type === 'youtube') {
            multimediaHtml = `
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="${article.multimedia.url}" allowfullscreen></iframe>
                </div>`;
        } else if (article.multimedia.type === 'slideshow') {
            multimediaHtml = '<div class="slideshow">';
            article.multimedia.images.forEach(img => {
                multimediaHtml += `<img src="${img}" class="img-fluid" alt="Slideshow Image">`;
            });
            multimediaHtml += '</div>';
        } else if (article.multimedia.type === 'spotify') {
            multimediaHtml = `
                <iframe style="border-radius:12px" src="${article.multimedia.url}" 
                        width="100%" height="352" frameBorder="0" 
                        allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
        }
    }

    articleContainer.innerHTML = `
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        ${multimediaHtml}
        <p>${article.content.replace(/\n/g, "<br>")}</p>
    `;
}
