document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        if (articleContainer) articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Identificador do artigo não fornecido no URL.</p>';
        return;
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}&select=sys.createdAt,fields.titulo,fields.imagemPrincipal,fields.legendaDaImagem,fields.autorDoTexto,fields.conteudoCompleto`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (articleContainer && data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                const assets = data.includes?.Asset || [];

                // Função para renderizar o artigo completo
                const renderArticle = () => {
                    document.title = `${fields.titulo || 'Artigo'} | Nexus Iuris`;
                    
                    let imageHtml = '';
                    if (fields.imagemPrincipal && assets.length > 0) {
                        const imageId = fields.imagemPrincipal.sys.id;
                        const imageAsset = assets.find(asset => asset.sys.id === imageId);
                        if (imageAsset) {
                            const imageUrl = 'https:' + imageAsset.fields.file.url;
                            const imageDescription = imageAsset.fields.description || fields.titulo;
                            const imageCaption = fields.legendaDaImagem || '';
                            imageHtml = `
                                <figure class="post-figure">
                                    <img src="${imageUrl}" alt="${imageDescription}" class="article-main-image">
                                    ${imageCaption ? `<figcaption class="image-caption">${imageCaption}</figcaption>` : ''}
                                </figure>
                            `;
                        }
                    }
                    
                    let authorHtml = '';
                    if (fields.autorDoTexto) {
                        authorHtml = `por <strong>${fields.autorDoTexto}</strong>`;
                    }
                    
                    let fullContentHtml = '';
                    if (fields.conteudoCompleto && window.richTextHtmlRenderer) {
                        fullContentHtml = window.richTextHtmlRenderer.documentToHtmlString(fields.conteudoCompleto);
                    } else {
                        fullContentHtml = '<p>O conteúdo completo deste artigo não está disponível.</p>';
                    }

                    articleContainer.innerHTML = `
                        <h1>${fields.titulo}</h1>
                        <div class="article-meta">
                            <span>Publicado em ${new Date(item.sys.createdAt).toLocaleDateString('pt-BR')}</span>
                            ${authorHtml ? `<span> &bull; ${authorHtml}</span>` : ''}
                        </div>
                        ${imageHtml}
                        <div class="article-body">
                            ${fullContentHtml}
                        </div>
                    `;
                };

                // FUNÇÃO DE "ESPERA INTELIGENTE"
                const renderWhenReady = (tries = 0) => {
                    // Se a biblioteca já carregou, renderiza o artigo e para.
                    if (window.richTextHtmlRenderer) {
                        renderArticle();
                    } 
                    // Se ainda não carregou e já tentámos 50 vezes (5 segundos), desiste e mostra erro.
                    else if (tries > 50) {
                        console.error("A biblioteca do Contentful demorou demasiado a carregar.");
                        articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o conteúdo do artigo.</h2>';
                    } 
                    // Se ainda não carregou, espera 100ms e tenta de novo.
                    else {
                        setTimeout(() => renderWhenReady(tries + 1), 100);
                    }
                };
                
                // Inicia a tentativa de renderização
                renderWhenReady();

            } else {
                articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2>';
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o artigo do Contentful:", error);
            if (articleContainer) articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2>';
        });
});