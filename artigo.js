document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA BUSCAR E EXIBIR O ARTIGO COMPLETO ---

    // Suas chaves de acesso do Contentful
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '-oK2OypPqIG8ZL4qx_XTs2rnn5iehc0LWEjxpa-NAMs';
    
    // Pega o container do artigo no HTML
    const articleContainer = document.getElementById('article-content');

    // Pega os parâmetros da URL para encontrar o "slug" do artigo
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    // Se não houver slug na URL, mostra uma mensagem de erro e para a execução
    if (!slug) {
        if (articleContainer) {
            articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Identificador do artigo não fornecido no URL.</p>';
        }
        return;
    }

    // Monta a URL da API para buscar o artigo específico pelo seu slug
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=conteudo&fields.slug=${slug}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na resposta da rede');
            }
            return response.json();
        })
        .then(data => {
            // Verifica se a API encontrou o artigo
            if (data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                const assets = data.includes?.Asset || [];

                // Define o título da aba do navegador com o título do artigo
                document.title = `${fields.titulo} | Nexus Iuris`;

                // Busca a imagem principal e a legenda
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
                
                // Busca o nome do autor
                let authorHtml = '';
                if (fields.autorDoTexto) {
                    authorHtml = `por <strong>${fields.autorDoTexto}</strong>`;
                }
                
                // Converte o conteúdo 'Rich Text' do Contentful para HTML
                let fullContentHtml = '';
                if (fields.conteudoCompleto && window.richTextHtmlRenderer) {
                    fullContentHtml = window.richTextHtmlRenderer.documentToHtmlString(fields.conteudoCompleto);
                } else {
                    fullContentHtml = '<p>O conteúdo completo deste artigo não está disponível.</p>';
                }

                // Preenche o container do artigo com o conteúdo completo
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