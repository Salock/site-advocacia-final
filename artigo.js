document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        if (articleContainer) {
            articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2><p>Identificador do artigo não fornecido no URL.</p>';
        }
        return;
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}&select=sys.createdAt,fields.titulo,fields.imagemPrincipal,fields.legendaDaImagem,fields.autorDoTexto,fields.conteudoCompleto`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (articleContainer && data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                
                // --- INÍCIO DO BLOCO DE DEPURAÇÃO ---
                
                console.log('--- INÍCIO DA DEPURAÇÃO ---');
                console.log('Dados do campo "conteudoCompleto" recebidos da API:', fields.conteudoCompleto);
                console.log('Biblioteca de renderização do Contentful (deve ser um objeto):', window.richTextHtmlRenderer);
                console.log('--- FIM DA DEPURAÇÃO ---');

                // --- FIM DO BLOCO DE DEPURAÇÃO ---
                
                const assets = data.includes?.Asset || [];
                document.title = `${fields.titulo || 'Artigo'} | Nexus Iuris`;

                let imageHtml = '';
                if (fields.imagemPrincipal && assets.length > 0) {
                    // ... (código da imagem)
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
                articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2>';
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o artigo do Contentful:", error);
            if (articleContainer) {
                articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2>';
            }
        });
});