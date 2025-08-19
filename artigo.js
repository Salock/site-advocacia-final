// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para buscar e exibir o artigo ---

    // Suas chaves de acesso (as mesmas da página principal)
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';

    // Pega o container do artigo no HTML
    const articleContainer = document.getElementById('article-content');

    // Pega os parâmetros da URL para encontrar o "slug"
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    // Se não houver slug na URL, mostra uma mensagem de erro
    if (!slug) {
        articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Por favor, volte à página de artigos e selecione um.</p>';
        return;
    }

    // Monta a URL da API para buscar o artigo específico pelo seu slug
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Verifica se a API encontrou o artigo
            if (data.items && data.items.length > 0) {
                const article = data.items[0]; // Pega o artigo completo
                const fields = article.fields;
                const assets = data.includes?.Asset || [];

                // Define o título da aba do navegador com o título do artigo
                document.title = fields.titulo + ' | Nexus Iuris';

                // --- Lógica da Imagem (Reutilizada) ---
                let imageHtml = '';
                if (fields.imagemPrincipal) {
                    const imageId = fields.imagemPrincipal.sys.id;
                    const imageAsset = assets.find(asset => asset.sys.id === imageId);
                    if (imageAsset) {
                        const imageUrl = 'https:' + imageAsset.fields.file.url;
                        const imageDescription = imageAsset.fields.description || fields.titulo;
                        imageHtml = `<img src="${imageUrl}" alt="${imageDescription}" class="article-main-image">`;
                    }
                }
                
                // --- Lógica do Autor (ADICIONADA) ---
                let authorHtml = '';
                if (fields.autorDoTexto) {
                    authorHtml = `por <strong>${fields.autorDoTexto}</strong>`;
                }

                // --- CORREÇÃO: Lógica para converter o Conteúdo Completo (Rich Text) para HTML ---
                let fullContentHtml = '';
                if (fields.conteudoCompleto && fields.conteudoCompleto.content) {
                    fields.conteudoCompleto.content.forEach(node => {
                        // Converte parágrafos
                        if (node.nodeType === 'paragraph') {
                            let paragraphText = '';
                            node.content.forEach(innerNode => {
                                if (innerNode.nodeType === 'text') {
                                    paragraphText += innerNode.value;
                                }
                            });
                            fullContentHtml += `<p>${paragraphText}</p>`;
                        }
                        // Adicione mais 'if' aqui para outros tipos de nós (cabeçalhos H2, H3, listas, etc.) se precisar
                    });
                } else {
                    fullContentHtml = '<p>O conteúdo completo deste artigo não está disponível.</p>';
                }

                // Preenche o container do artigo com o conteúdo completo
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