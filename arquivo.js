document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const archiveGrid = document.getElementById('archive-grid');

    if (archiveGrid) {
        // A URL da API SEM o parâmetro '&limit=2' para buscar TODOS os artigos
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&select=sys.id,fields.titulo,fields.resumo,fields.imagemPrincipal,fields.slug`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    archiveGrid.innerHTML = ''; // Limpa a mensagem "Carregando..."

                    const assets = data.includes?.Asset || [];

                    data.items.forEach(item => {
                        const fields = item.fields;
                        const articleSlug = fields.slug || '#';

                        let imageHtml = '';
                        if (fields.imagemPrincipal) {
                             const imageId = fields.imagemPrincipal.sys.id;
                             const imageAsset = assets.find(asset => asset.sys.id === imageId);
                             if(imageAsset) {
                                const imageUrl = 'https:' + imageAsset.fields.file.url;
                                const imageDescription = imageAsset.fields.description || fields.titulo;
                                imageHtml = `<div class="article-card-image" style="background-image: url('${imageUrl}');"></div>`;
                             }
                        } else {
                            // Imagem placeholder caso o artigo não tenha uma
                            imageHtml = `<div class="article-card-image placeholder"></div>`;
                        }

                        const articleCard = document.createElement('a');
                        articleCard.href = `/artigo.html?slug=${articleSlug}`;
                        articleCard.className = 'article-card';
                        
                        articleCard.innerHTML = `
                            ${imageHtml}
                            <div class="article-card-content">
                                <h3>${fields.titulo}</h3>
                                <p>${fields.resumo}</p>
                                <span class="read-more-link">Ler Artigo Completo &rarr;</span>
                            </div>
                        `;
                        
                        archiveGrid.appendChild(articleCard);
                    });
                } else {
                    archiveGrid.innerHTML = '<p>Nenhum artigo encontrado.</p>';
                }
            })
            .catch(error => {
                console.error("Erro ao buscar os artigos do Contentful:", error);
                archiveGrid.innerHTML = '<p>Ocorreu um erro ao carregar os artigos.</p>';
            });
    }
});