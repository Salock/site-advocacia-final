document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para buscar e exibir o artigo ---

    // Suas chaves de acesso (as mesmas da página principal)
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';

    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Por favor, volte à página de artigos e selecione um.</p>';
        return;
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const article = data.items[0];
                const fields = article.fields;
                const assets = data.includes?.Asset || [];

                document.title = fields.titulo + ' | Nexus Iuris';

                let imageHtml = '';
                if (fields.imagemPrincipal) {
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
                
                // --- CORREÇÃO IMPORTANTE PARA LER O RICH TEXT COM FORMATAÇÃO ---
                let fullContentHtml = '';
                // Verifica se o campo existe e se a biblioteca do Contentful foi carregada
                if (fields.conteudoCompleto && window.richTextHtmlRenderer) {
                    // Usa a biblioteca para converter o Rich Text em HTML corretamente
                    fullContentHtml = window.richTextHtmlRenderer.documentToHtmlString(fields.conteudoCompleto);
                } else {
                    fullContentHtml = '<p>O conteúdo completo deste artigo não está disponível.</p>';
                }
                // --- FIM DA CORREÇÃO ---

                articleContainer.innerHTML = `
                    <h1>${fields.titulo}</h1>
                    <div class="article-meta">
                        <span>Publicado em ${new Date(article.sys.createdAt).toLocaleDateString('pt-BR')}</span>
                        ${authorHtml ? `<span> &bull; ${authorHtml}</span>` : ''}
                    </div>
                    ${imageHtml}
                    <div class="article-body">
                        ${fullContentHtml}
                    </div>
                `;

            } else {
                articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2>';
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o artigo do Contentful:", error);
            articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2>';
        });
});