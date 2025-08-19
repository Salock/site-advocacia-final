document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '-oK2OypPqIG8ZL4qx_XTs2rnn5iehc0LWEjxpa-NAMs';
    
    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        if(articleContainer) articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Identificador do artigo não fornecido no URL.</p>';
        return;
    }

    // ESTA É A URL FINAL E CORRETA
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=conteudo&fields.slug=${slug}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na resposta da rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                const assets = data.includes?.Asset || [];

                document.title = `${fields.titulo} | Nexus Iuris`;

                let imageHtml = '';
                if (fields.imagemPrincipal && assets) {
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

            } else {
                articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Não foi encontrado nenhum artigo com este identificador.</p>';
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o artigo do Contentful:", error);
            articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2>';
        });
});