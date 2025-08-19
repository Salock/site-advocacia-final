document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA BUSCAR E EXIBIR O ARTIGO ---

    // Suas chaves de acesso do Contentful
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4'; 
    
    const articleContainer = document.getElementById('article-content');
    
    // Pega o "slug" (identificador do artigo) do endereço URL
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        if (articleContainer) {
            articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Identificador do artigo não fornecido no URL.</p>';
        }
        return;
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na resposta da rede: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (articleContainer && data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                const assets = data.includes?.Asset || [];

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
                if (fields.conteudoCompleto && window.richTextHtmlRenderer && window.richTextTypes) {
                    
                    const { documentToHtmlString } = window.richTextHtmlRenderer;
                    const { BLOCKS } = window.richTextTypes;

                    // Define as regras de renderização personalizadas
                    const options = {
                        renderNode: {
                            // Esta regra aplica-se a qualquer imagem que você incorporar no texto
                            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                                const assetId = node.data.target.sys.id;
                                const asset = assets.find(asset => asset.sys.id === assetId);
                                
                                if (asset) {
                                    const imageUrl = 'https:' + asset.fields.file.url;
                                    const imageDescription = asset.fields.description || '';
                                    
                                    // Retorna o HTML personalizado para a imagem
                                    return `
                                        <figure class="embedded-asset">
                                            <img src="${imageUrl}" alt="${imageDescription}" />
                                            ${imageDescription ? `<figcaption>${imageDescription}</figcaption>` : ''}
                                        </figure>
                                    `;
                                }
                                return '';
                            }
                        }
                    };

                    // Chama a função com as nossas opções personalizadas
                    fullContentHtml = documentToHtmlString(fields.conteudoCompleto, options);

                } else {
                    fullContentHtml = '<p>O conteúdo completo deste artigo não está disponível.</p>';
                }

                // Insere todo o HTML gerado na página
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
            if (articleContainer) {
                articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2><p>Por favor, tente novamente mais tarde.</p>';
            }
        });
});