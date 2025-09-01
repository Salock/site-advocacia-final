document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    const savedLang = localStorage.getItem('userLanguage') || navigator.language.substring(0, 2) || 'pt';

    if (!slug) {
        if (articleContainer) articleContainer.innerHTML = '<h2>Artigo não encontrado.</h2>';
        return;
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&fields.slug=${slug}&include=1`;

    const renderNode = (node) => {
        if (!node || !node.nodeType) return '';
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

        if (node.nodeType === 'embedded-asset-block') {
            const assetId = node.data.target.sys.id;
            const assetData = window.contentfulAssets.find(asset => asset.sys.id === assetId);
            if (assetData && assetData.fields && assetData.fields.file && assetData.fields.file.url) {
                const imageUrl = 'https:' + assetData.fields.file.url;
                const imageDescription = assetData.fields.description || '';
                const imageCaption = assetData.fields.title || '';
                return `<figure class="embedded-asset"><img src="${imageUrl}" alt="${imageDescription}">${imageCaption ? `<figcaption>${imageCaption}</figcaption>` : ''}</figure>`;
            }
            return '';
        }

        const nodeRenderers = {
            'paragraph': (node) => `<p>${renderContent(node.content)}</p>`,
            'heading-2': (node) => `<h2>${renderContent(node.content)}</h2>`,
            'heading-3': (node) => `<h3>${renderContent(node.content)}</h3>`,
            'unordered-list': (node) => `<ul>${renderContent(node.content)}</ul>`,
            'ordered-list': (node) => `<ol>${renderContent(node.content)}</ol>`,
            'list-item': (node) => `<li>${renderContent(node.content).replace(/^<p>|<\/p>$/g, "")}</li>`,
            'hyperlink': (node) => `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${renderContent(node.content)}</a>`,
        };
        if (nodeRenderers[node.nodeType]) { return nodeRenderers[node.nodeType](node); }
        return '';
    };

    const renderContent = (content) => { if (!content) return ''; return content.map(renderNode).join(''); };

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (articleContainer && data.items && data.items.length > 0) {
                const item = data.items[0];
                const fields = item.fields;
                window.contentfulAssets = data.includes?.Asset || [];

                const langSuffix = savedLang === 'en' ? '' : `_${savedLang}`;
                const titulo = fields[`titulo${langSuffix}`] || fields.titulo;
                const legendaDaImagem = fields[`legendaDaImagem${langSuffix}`] || fields.legendaDaImagem;
                
                let conteudoCompleto;
                if (savedLang === 'en') {
                    conteudoCompleto = fields.conteudoCompleto;
                } else {
                    conteudoCompleto = fields[`contedoCompleto${langSuffix}`] || fields[`conteudoCompleto${langSuffix}`] || fields.conteudoCompleto;
                }

                document.title = `${titulo || 'Artigo'} | VMatos Assessoria Jurídica`;
                
                let imageHtml = '';
                if (fields.imagemPrincipal && window.contentfulAssets.length > 0) {
                    const imageAsset = window.contentfulAssets.find(asset => asset.sys.id === fields.imagemPrincipal.sys.id);
                    if (imageAsset && imageAsset.fields && imageAsset.fields.file && imageAsset.fields.file.url) {
                        const imageUrl = 'https:' + imageAsset.fields.file.url;
                        const imageDescription = imageAsset.fields.description || titulo;
                        imageHtml = `<figure class="post-figure"><img src="${imageUrl}" alt="${imageDescription}" class="article-main-image">${legendaDaImagem ? `<figcaption class="image-caption">${legendaDaImagem}</figcaption>` : ''}</figure>`;
                    }
                }

                let authorHtml = '';
                if (fields.autorDoTexto) { authorHtml = `por <strong>${fields.autorDoTexto}</strong>`; }
                
                const formattedDate = new Date(item.sys.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
                
                const fullContentHtml = conteudoCompleto ? renderContent(conteudoCompleto.content) : '<p>O conteúdo completo deste artigo não está disponível.</p>';

                articleContainer.innerHTML = `<h1>${titulo}</h1><div class="article-meta"><span>Publicado em ${formattedDate}</span>${authorHtml ? `<span> &bull; ${authorHtml}</span>` : ''}</div>${imageHtml}<div class="article-body">${fullContentHtml}</div>`;
            } else {
                articleContainer.innerHTML = '<h2>Artigo não encontrado ou não disponível neste idioma.</h2>';
            }
        })
        .catch(error => { console.error("Erro ao buscar o artigo do Contentful:", error); if (articleContainer) articleContainer.innerHTML = '<h2>Ocorreu um erro ao carregar o artigo.</h2>'; });

    // --- FUNCIONALIDADE PARA ESCONDER HEADER E FOOTER ---

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const langSwitcher = document.querySelector('.language-switcher');
    const menuDropdown = document.querySelector('.menu-dropdown');

    if(header && footer && langSwitcher && menuDropdown) {
        if (window.innerWidth <= 768) {
            let lastScrollY = window.scrollY;
            window.addEventListener('scroll', () => {
                if (window.scrollY > lastScrollY && window.scrollY > 50) {
                    header.style.transform = 'translateY(-100%)';
                    footer.style.transform = 'translateY(100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                    footer.style.transform = 'translateY(0)';
                }
                lastScrollY = window.scrollY;
            });
        } else {
            document.addEventListener('mousemove', (e) => {
                const isLangMenuOpen = langSwitcher.classList.contains('is-open');
                const isMainMenuOpen = menuDropdown.classList.contains('is-active');

                // CONDIÇÃO CORRIGIDA PARA "SEGURAR" O MENU
                if (e.clientY < 120 || isLangMenuOpen || isMainMenuOpen) {
                    header.style.transform = 'translateY(0)';
                } else {
                    header.style.transform = 'translateY(-100%)';
                }
                if (e.clientY > window.innerHeight - 100) {
                    footer.style.transform = 'translateY(0)';
                } else {
                    footer.style.transform = 'translateY(100%)';
                }
            });
            header.style.transition = 'transform 0.4s ease-in-out';
            footer.style.transition = 'transform 0.4s ease-in-out';
        }
    }
});