document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        if (articleContainer) articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2>';
        return;
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}`;

    // ========================================================
    // --- O NOSSO PRÓPRIO RENDERIZADOR DE RICH TEXT ---
    // ========================================================
    const renderNode = (node) => {
        if (!node || !node.nodeType) return '';

        // Renderizador para nós de texto com marcas (negrito, itálico, etc.)
        if (node.nodeType === 'text') {
            let text = node.value.replace(/\n/g, '<br>');
            if (node.marks) {
                node.marks.forEach(mark => {
                    if (mark.type === 'bold') text = `<strong>${text}</strong>`;
                    if (mark.type === 'italic') text = `<em>${text}</em>`;
                    if (mark.type === 'underline') text = `<u>${text}</u>`;
                });
            }
            return text;
        }

        // Renderizador para outros tipos de blocos (parágrafos, títulos, listas)
        const nodeRenderers = {
            'paragraph': (node) => `<p>${renderContent(node.content)}</p>`,
            'heading-2': (node) => `<h2>${renderContent(node.content)}</h2>`,
            'heading-3': (node) => `<h3>${renderContent(node.content)}</h3>`,
            'unordered-list': (node) => `<ul>${renderContent(node.content)}</ul>`,
            'ordered-list': (node) => `<ol>${renderContent(node.content)}</ol>`,
            'list-item': (node) => `<li>${renderContent(node.content).replace(/^<p>|<\/p>$/g, "")}</li>`, // Remove <p> extra dentro de <li>
            'hyperlink': (node) => `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${renderContent(node.content)}</a>`,
        };

        if (nodeRenderers[node.nodeType]) {
            return nodeRenderers[node.nodeType](node);
        }
        return '';
    };

    const renderContent = (content) => {
        if (!content) return '';
        return content.map(renderNode).join('');
    };
    // --- FIM DO RENDERIZADOR ---

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (articleContainer && data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                document.title = `${fields.titulo || 'Artigo'} | Nexus Iuris`;

                let authorHtml = '';
                if (fields.autorDoTexto) {
                    authorHtml = `por <strong>${fields.autorDoTexto}</strong>`;
                }

                // A MÁGICA ACONTECE AQUI: Usamos o NOSSO renderizador
                const fullContentHtml = fields.conteudoCompleto ? renderContent(fields.conteudoCompleto.content) : '<p>O conteúdo completo deste artigo não está disponível.</p>';

                articleContainer.innerHTML = `
                    <h1>${fields.titulo}</h1>
                    <div class="article-meta">
                        <span>Publicado em ${new Date(item.sys.createdAt).toLocaleDateString('pt-BR')}</span>
                        ${authorHtml ? `<span> &bull; ${authorHtml}</span>` : ''}
                    </div>
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
            if (articleContainer) articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2>';
        });
});