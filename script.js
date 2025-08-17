// O "sinal verde" começa aqui. TODO o código ficará aqui dentro.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU DROPDOWN ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuDropdown = document.querySelector('.menu-dropdown');

    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            menuDropdown.classList.toggle('is-active');
        });

        const menuLinks = menuDropdown.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuDropdown.classList.contains('is-active')) {
                    menuDropdown.classList.remove('is-active');
                }
            });
        });

        document.addEventListener('click', () => {
            if (menuDropdown.classList.contains('is-active')) {
                menuDropdown.classList.remove('is-active');
            }
        });
    }

    // --- LÓGICA PARA ANIMAÇÃO DO TÍTULO ---
    const homeSection = document.querySelector('#home');
    const heroTitle = document.querySelector('#home h1');

    if (homeSection && heroTitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroTitle.classList.add('visible');
                } else {
                    heroTitle.classList.remove('visible');
                }
            });
        }, { threshold: 0.5 });
        observer.observe(homeSection);
    }

    // --- LÓGICA DO FORMULÁRIO COM POP-UP ---
    const form = document.querySelector('#contato form');
    const modal = document.getElementById('thank-you-modal');
    if (form && modal) {
        const closeModalBtn = document.getElementById('close-modal-btn');
        if (closeModalBtn) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                }).then(response => {
                    if (response.ok) {
                        form.reset();
                        modal.classList.add('is-visible');
                    } else {
                        alert("Ocorreu um problema ao enviar a sua mensagem.");
                    }
                }).catch(error => {
                    alert("Ocorreu um problema de rede.");
                });
            });
            closeModalBtn.addEventListener('click', () => modal.classList.remove('is-visible'));
            modal.addEventListener('click', (event) => {
                if (event.target === modal) modal.classList.remove('is-visible');
            });
        }
    }

    // --- LÓGICA DO CARROSSEL DE DEPOIMENTOS (SEÇÃO #DEPOIMENTOS) ---
    const depoimentosContainer = document.querySelector('#depoimentos .carousel-container');
    if (depoimentosContainer) {
        // ... (o seu código do carrossel de depoimentos que já funciona) ...
    }

    // --- LÓGICA DO CARROSSEL DA SECÇÃO "SOBRE" (APENAS EM MOBILE) ---
    const isMobile = () => window.innerWidth <= 768;

    const setupSobreCarousel = () => {
        const sobreContainer = document.querySelector('#sobre');
        if (!sobreContainer) return;

        const track = sobreContainer.querySelector('.pilares-carousel-track');
        // ... (o resto do seu código para este carrossel) ...
    };

    if (isMobile()) {
        setupSobreCarousel();
    }
    
    // --- LÓGICA DOS ARTIGOS RECENTES (CONTENTFUL) ---
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const blogContainer = document.querySelector('#blog .container');
    
    if (blogContainer) {
        const isMigratorioPage = document.body.classList.contains('page-migratorio');
        const categoria = isMigratorioPage ? 'Direito Migratório' : 'Direito Imobiliário';
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&select=sys.id,fields.titulo,fields.resumo,fields.slug&fields.categoria=${categoria}&limit=2`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const articlesParent = document.querySelector('.latest-articles-container');
                if (articlesParent && data.items) {
                    articlesParent.innerHTML = '';
                    if (data.items.length === 0) {
                        articlesParent.innerHTML = `<p>Nenhum artigo sobre ${categoria} publicado recentemente.</p>`;
                        return;
                    }
                    data.items.forEach(item => {
                        const fields = item.fields;
                        const articleSlug = fields.slug || '#';
                        const articleElement = document.createElement('div');
                        articleElement.classList.add('blog-post-banner');
                        articleElement.innerHTML = `<div><h3>${fields.titulo}</h3><p>${fields.resumo}</p></div><a href="/artigo.html?slug=${articleSlug}" class="btn">Ler Artigo Completo</a>`;
                        articlesParent.appendChild(articleElement);
                    });
                }
            })
            .catch(error => console.error("Erro ao buscar os artigos:", error));
    }

}); // O "sinal verde" TERMINA AQUI. Todo o código está agora dentro dele.