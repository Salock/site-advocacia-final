document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA BUSCAR E EXIBIR O ARTIGO ---

    // Suas chaves de acesso do Contentful
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4'; // Recomendo usar a chave de "Content Delivery"
    
    // Elemento no HTML onde o artigo será inserido
    const articleContainer = document.getElementById('article-content');
    
    // Pega o "slug" (identificador do artigo) do endereço URL
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    // Se não houver slug no URL, mostra uma mensagem de erro e para a execução
    if (!slug) {
        if (articleContainer) {
            articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Identificador do artigo não fornecido no URL.</p>';
        }
        return;
    }

    // Monta a URL da API para buscar o artigo específico pelo seu slug
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

                // Define o título da aba do navegador
                document.title = `${fields.titulo || 'Artigo'} | Nexus Iuris`;

                // Monta o HTML da imagem principal, se existir
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
                
                // Monta o HTML do autor, se existir
                let authorHtml = '';
                if (fields.autorDoTexto) {
                    authorHtml = `por <strong>${fields.autorDoTexto}</strong>`;
                }
                
                // Monta o HTML do conteúdo completo, usando o renderizador de Rich Text
                let fullContentHtml = '';
                // CORREÇÃO FINAL: Garante que estamos a procurar por 'conteudoCompleto'
                if (fields.conteudoCompleto && window.richTextHtmlRenderer) {
                    fullContentHtml = window.richTextHtmlRenderer.documentToHtmlString(fields.conteudoCompleto);
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