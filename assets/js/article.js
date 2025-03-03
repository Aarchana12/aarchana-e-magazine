document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const articleId = parseInt(params.get('id'), 10);

    if (!articleId) {
        document.getElementById('articleContent').innerHTML = `
            <div class="alert alert-warning">⚠️ No article selected. Please go back and choose an article.</div>`;
        return;
    }

    fetch('assets/data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const article = data.find(item => item.id === articleId);

            if (article) {
                displayArticle(article);
            } else {
                document.getElementById('articleContent').innerHTML = `
                    <div class="alert alert-danger">❌ Article not found.</div>`;
            }
        })
        .catch(error => {
            console.error('Error loading article:', error);
            document.getElementById('articleContent').innerHTML = `
                <div class="alert alert-danger">⚠️ Failed to load article. Please try again later.</div>`;
        });
});

function displayArticle(article) {
    let multimediaHTML = '';

    if (article.multimedia) {
        if (article.multimedia.type === 'youtube') {
            multimediaHTML = `
                <div class="video-container">
                    <iframe src="${article.multimedia.url}" 
                            frameborder="0" allowfullscreen></iframe>
                </div>`;
        } else if (article.multimedia.type === 'slideshow' && Array.isArray(article.multimedia.images)) {
            multimediaHTML = `
                <div class="slideshow-container">
                    ${article.multimedia.images.map(img => `<img src="${img}" class="slideshow-image">`).join('')}
                </div>`;
        } else if (article.multimedia.type === 'spotify') {
            multimediaHTML = `
                <div class="spotify-container">
                    <iframe style="border-radius:12px" 
                            src="${article.multimedia.url}" 
                            width="100%" height="352" frameBorder="0" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"></iframe>
                </div>`;
        }
    } else {
        multimediaHTML = `<p>No multimedia available.</p>`;
    }

    const articleHTML = `
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <img src="${article.image}" alt="${article.title}" class="article-image">
        
        <h4>Related Multimedia:</h4>
        ${multimediaHTML}

        <hr>

        <div class="article-content">
            ${article.content ? article.content.replace(/\n/g, '<br>') : `<p>No additional content available.</p>`}
        </div>
    `;

    document.getElementById('articleContent').innerHTML = articleHTML;
}
