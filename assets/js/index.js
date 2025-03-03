document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/js/data.json')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('articlesContainer');
            data.slice(0, 6).forEach(article => {
                const div = document.createElement('div');
                div.className = 'col-md-4 mb-4';
                div.innerHTML = `
                    <div class="card">
                        <img src="${article.image}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.content.slice(0, 100)}...</p>
                            <a href="article.html?id=${article.id}" class="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>`;
                container.appendChild(div);
            });
        });
});
