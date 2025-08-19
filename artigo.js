document.addEventListener('DOMContentLoaded', () => {

    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '-oK2OypPqIG8ZL4qx_XTs2rnn5iehc0LWEjxpa-NAMs';
    
    const articleContainer = document.getElementById('article-content');
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    // NOTA: A URL abaixo foi simplificada para o nosso teste.
    // Ela agora tenta buscar TODOS os artigos do tipo 'conteudo', sem filtrar por slug.
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=conteudo`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Se a resposta não for OK, lança um erro para ser apanhado pelo .catch()
                throw new Error('Falha na resposta da rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Este código só vai ser executado se o fetch for bem-sucedido.
            // Para o teste, não vamos mostrar um artigo específico, apenas confirmar que a ligação funciona.
            console.log("Conexão com o Contentful bem-sucedida!", data);
            
            if (articleContainer) {
                 articleContainer.innerHTML = '<h2>Teste de Conexão Bem-Sucedido!</h2><p>O Content-Type "conteudo" foi encontrado. O problema está no "slug" do artigo.</p>';
            }
        })
        .catch(error => {
            // Se o erro 400 (Bad Request) continuar, ele vai aparecer aqui.
            console.error("Erro ao buscar os artigos do Contentful:", error);
            if (articleContainer) {
                articleContainer.innerHTML = '<h2>Teste Falhou.</h2><p>O erro "400 Bad Request" continua. O Content-Type "conteudo" está incorreto.</p>';
            }
        });
});