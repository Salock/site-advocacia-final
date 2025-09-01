// A função anônima garante que nosso código não entre em conflito com outros scripts.
(() => {
    // Pega o idioma que já foi definido pelo script.js principal
    const language = localStorage.getItem('userLanguage') || 'pt';

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articlesParent = document.querySelector('.latest-articles-container');

    // Se a seção de artigos não existir nesta página, o script para aqui.
    if (!articlesParent) {
        return;
    }

    const isMigratorioPage = document.body.classList.contains('page-migratorio');
    const categoria = isMigratorioPage ? 'Direito Migratório' : 'Direito Imobiliário';
    
    // URL genérica que busca todos os campos de idioma e inclui os assets (imagens)
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&fields.categoria=${encodeURIComponent(categoria)}&include=1`;
    
    articlesParent.innerHTML = '<p style="color: #333;">Carregando artigos...</p>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const assets = data.includes?.Asset || [];
            let articlesHtml = '';

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const fields = item.fields;

                    // Lógica de tradução que escolhe o campo correto (ex: titulo_pt)
                    const langSuffix = language === 'en' ? '' : `_${language}`;
                    const titulo = fields[`titulo${langSuffix}`] || fields.titulo;
                    const resumo = fields[`resumo${langSuffix}`] || fields.resumo;
                    
                    let imageUrl = 'imagens/placeholder.png'; // Imagem padrão

                    // Lógica de busca da imagem que funcionou no nosso teste
                    if (fields.imagemPrincipal) {
                        const imageAsset = assets.find(asset => asset.sys.id === fields.imagemPrincipal.sys.id);
                        if (imageAsset && imageAsset.fields && imageAsset.fields.file && imageAsset.fields.file.url) {
                            imageUrl = 'https:' + imageAsset.fields.file.url + '?w=200&h=150&fit=cover&fm=webp';
                        }
                    }

                    const date = new Date(item.sys.createdAt);
                    const formattedDate = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

                    if (titulo && resumo) {
                        articlesHtml += `
                            <a href="artigo.html?slug=${fields.slug}" class="article-list-item">
                                <div class="article-list-image">
                                    <img src="${imageUrl}" alt="${titulo}">
                                </div>
                                <div class="article-list-content">
                                    <h3>${titulo}</h3>
                                    <p class="article-date">${formattedDate}</p>
                                </div>
                            </a>
                        `;
                    }
                });
            }
            
            if (articlesHtml === '') {
                // Para a mensagem de erro, precisamos de um pequeno objeto de tradução local
                const errorMessages = {
                    pt: 'Nenhum artigo encontrado para esta categoria.',
                    en: 'No articles found for this category.',
                    es: 'No se encontraron artículos para esta categoría.',
                    fr: 'Aucun article trouvé para cette catégorie.'
                };
                articlesHtml = `<p style="color: #333;">${errorMessages[language] || errorMessages.en}</p>`;
            }
            articlesParent.innerHTML = articlesHtml;
        })
        .catch(error => {
            console.error("Erro ao buscar os artigos (blog.js):", error);
            articlesParent.innerHTML = '<p style="color: #333;">Ocorreu um erro ao carregar os artigos.</p>';
        });
})(); // A função é chamada imediatamente