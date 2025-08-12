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
                const article = data.items[0].fields;
                const assets = data.includes?.Asset || [];

                // Define o título da aba do navegador com o título do artigo
                document.title = article.titulo + ' | Nexus Iuris';

                // Busca a imagem principal (lógica reutilizada)
                let imageHtml = '';
                if (article.imagemPrincipal) {
                    const imageId = article.imagemPrincipal.sys.id;
                    const imageAsset = assets.find(asset => asset.sys.id === imageId);
                    if (imageAsset) {
                        const imageUrl = 'https:' + imageAsset.fields.file.url;
                        const imageDescription = imageAsset.fields.description || article.titulo;
                        imageHtml = `<img src="${imageUrl}" alt="${imageDescription}" class="article-main-image">`;
                    }
                }

                // IMPORTANTE: Converte o conteúdo 'Rich Text' do Contentful para HTML
                // Se o seu campo de conteúdo completo não for Rich Text, esta parte precisará de ajuste.
                // Assumimos que o ID do campo é 'conteudoCompleto'
                const fullContentHtml = article.conteudoCompleto 
                    ? documentToHtmlString(article.conteudoCompleto) 
                    : '<p>O conteúdo completo deste artigo não está disponível.</p>';


                // Preenche o container do artigo com o conteúdo completo
                articleContainer.innerHTML = `
                    <h1>${article.titulo}</h1>
                    <div class="article-meta">Publicado em ${new Date(data.items[0].sys.createdAt).toLocaleDateString('pt-BR')}</div>
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

    // --- Função para converter Rich Text em HTML ---
    // Você precisa de uma biblioteca para isso. A mais comum é a do próprio Contentful.
    // Como não podemos adicionar bibliotecas externas aqui, vamos usar uma função simulada.
    // Para o código funcionar DE VERDADE, você precisará adicionar o SDK do Contentful.
    // Por agora, esta função irá apenas mostrar o conteúdo como texto simples.
    function documentToHtmlString(richTextDocument) {
        if (!richTextDocument || !richTextDocument.content) {
            return '';
        }
        let html = '';
        richTextDocument.content.forEach(node => {
            if (node.nodeType === 'paragraph') {
                let paragraphText = '';
                node.content.forEach(innerNode => {
                    if (innerNode.nodeType === 'text') {
                        paragraphText += innerNode.value;
                    }
                });
                html += `<p>${paragraphText}</p>`;
            }
            // Adicione mais 'if' aqui para outros tipos de nós (cabeçalhos, listas, etc.)
        });
        return html;
    }
});