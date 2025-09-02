// A função anônima garante que nosso código não entre em conflito com outros scripts.
(() => {
    console.log("--- blog.js INICIADO ---");

    const language = localStorage.getItem('userLanguage') || 'pt';
    console.log(`[blog.js] Idioma detectado: ${language}`);

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articlesParent = document.querySelector('.latest-articles-container');

    if (!articlesParent) {
        console.error("[blog.js] ERRO CRÍTICO: A div .latest-articles-container não foi encontrada na página.");
        return;
    }

    const isMigratorioPage = document.body.classList.contains('page-migratorio');
    const categoria = isMigratorioPage ? 'Direito Migratório' : 'Direito Imobiliário';
    console.log(`[blog.js] Categoria de busca: ${categoria}`);
    
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&fields.categoria=${encodeURIComponent(categoria)}&include=1`;
    
    articlesParent.innerHTML = '<p style="color: #333;">Carregando artigos...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Erro de rede: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("[blog.js] Dados recebidos do Contentful:", data);
            
            const assets = data.includes?.Asset || [];
            let articlesHtml = '';

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const fields = item.fields;
                    const langSuffix = language === 'en' ? '' : `_${language}`;
                    const titulo = fields[`titulo${langSuffix}`] || fields.titulo;
                    const resumo = fields[`resumo${langSuffix}`] || fields.resumo;
                    
                    let imageUrl = 'imagens/placeholder.png';

                    if (fields.imagemPrincipal) {
                        const imageAsset = assets.find(asset => asset.sys.id === fields.imagemPrincipal.sys.id);
                        if (imageAsset && imageAsset.fields?.file?.url) {
                            // AQUI ESTÁ A MUDANÇA: Usamos replaceAll para garantir que &amp; se torne &
                            imageUrl = ('https:' + imageAsset.fields.file.url + '?w=200&h=150&fit=cover&fm=webp').replaceAll('&amp;', '&');
                            console.log(`[blog.js] Imagem URL final para renderização: ${imageUrl}`); // Log da URL final
                        } else {
                            console.warn(`[blog.js] AVISO: Imagem com ID ${fields.imagemPrincipal.sys.id} não foi encontrada nos assets ou não está publicada. Usando placeholder.`);
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
                const errorMessages = { pt: 'Nenhum artigo encontrado para esta categoria.', en: 'No articles found for this category.', es: 'No se encontraron artículos para esta categoría.', fr: 'Aucun article trouvé pour esta categoria.' };
                articlesHtml = `<p style="color: #333;">${errorMessages[language] || errorMessages.en}</p>`;
            }
            articlesParent.innerHTML = articlesHtml;
        })
        .catch(error => {
            console.error("Erro fatal ao buscar os artigos (blog.js):", error);
            articlesParent.innerHTML = '<p style="color: #333;">Ocorreu um erro ao carregar os artigos. Verifique o console para detalhes.</p>';
        });
})();