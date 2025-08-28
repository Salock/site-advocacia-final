document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articleContainer = document.getElementById('article-content');

    if (!articleContainer) return;

    // Função principal que busca e exibe os artigos
    const fetchAndDisplayArticles = (category) => {
        
        // CORREÇÃO: Adicionamos "&include=1" ao final da URL
        let url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&include=1`;

        if (category !== 'todos') {
            url += `&fields.categoria=${encodeURIComponent(category)}`;
        }

        const gridContainer = document.querySelector('.articles-grid');
        if (gridContainer) {
            gridContainer.innerHTML = '<p style="text-align: center;">Carregando artigos...</p>';
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const assets = data.includes?.Asset || [];
                let articlesHtml = '';

                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        const fields = item.fields;
                        
                        let imageUrl = '';
                        let imageClass = 'placeholder';
                        if (fields.imagemPrincipal && assets.length > 0) {
                            const imageAsset = assets.find(asset => asset.sys.id === fields.imagemPrincipal.sys.id);
                            if (imageAsset) {
                                imageUrl = `https:' + imageAsset.fields.file.url + '?w=400&h=400&fit=cover&fm=webp`;
                                imageClass = '';
                            }
                        }

                        let authorHtml = '';
                        if (fields.autorDoTexto) {
                            authorHtml = `<div class="post-author">por <strong>${fields.autorDoTexto}</strong></div>`;
                        }

                        articlesHtml += `
                            <a href="artigo.html?slug=${fields.slug}" class="article-card">
                                <div class="article-card-image ${imageClass}" style="background-image: url('${imageUrl}')"></div>
                                <div class="article-card-content">
                                    <h3>${fields.titulo}</h3>
                                    <p>${fields.resumo}</p>
                                    ${authorHtml}
                                </div>
                            </a>
                        `;
                    });
                } else {
                    articlesHtml = '<p style="text-align: center;">Nenhum artigo encontrado para esta categoria.</p>';
                }
                
                if (gridContainer) {
                    gridContainer.innerHTML = articlesHtml;
                }
            })
            .catch(error => {
                console.error("Erro ao buscar o arquivo de artigos:", error);
                if (gridContainer) {
                    gridContainer.innerHTML = '<p style="text-align: center;">Ocorreu um erro ao carregar os artigos.</p>';
                }
            });
    };

    const setupFilters = () => {
        const filterHtml = `
            <h1>Arquivo de Artigos</h1>
            <p>Explore nossa coleção de artigos sobre direito imobiliário e migratório.</p>
            <div class="filter-container">
                <button class="filter-btn active" data-category="todos">Todos</button>
                <button class="filter-btn" data-category="Direito Imobiliário">Direito Imobiliário</button>
                <button class="filter-btn" data-category="Direito Migratório">Direito Migratório</button>
            </div>
            <div class="articles-grid"></div>
        `;
        articleContainer.innerHTML = filterHtml;

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.dataset.category;
                fetchAndDisplayArticles(category);
            });
        });
    };

    document.title = 'Arquivo de Artigos | Nexus Iuris';
    setupFilters();
    fetchAndDisplayArticles('todos');
});