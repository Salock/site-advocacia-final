// ========================================================
// --- SCRIPT.JS FINAL E DEFINITIVO ---
// ========================================================
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

    // ========================================================
    // --- LÓGICA DO CARROSSEL DA SECÇÃO "SOBRE" (COM AUTOPLAY) ---
    // ========================================================
    const sobreContainer = document.querySelector('#sobre');
    if (sobreContainer) {
        const track = sobreContainer.querySelector('.pilares-carousel-track');
        const prevButton = sobreContainer.querySelector('.sobre-prev');
        const nextButton = sobreContainer.querySelector('.sobre-next');
        const dotsNav = sobreContainer.querySelector('.sobre-dots');

        if (track && prevButton && nextButton && dotsNav) {
            const slides = Array.from(track.children);
            let currentIndex = 0;

            if (slides.length > 1) {
                dotsNav.innerHTML = '';
                slides.forEach((slide, index) => {
                    const dot = document.createElement('button');
                    dot.classList.add('carousel-dot');
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        moveToSlide(index);
                        resetInterval(); // Reinicia o timer ao clicar
                    });
                    dotsNav.appendChild(dot);
                });

                const dots = Array.from(dotsNav.children);

                const moveToSlide = (targetIndex) => {
                    track.style.transform = `translateX(-${100 * targetIndex}%)`;
                    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
                    if (dots[targetIndex]) dots[targetIndex].classList.add('active');
                    currentIndex = targetIndex;
                };

                const advanceSlide = () => {
                    moveToSlide((currentIndex + 1) % slides.length);
                };

                // --- LÓGICA DE AUTOPLAY ADICIONADA AQUI ---
                let intervalId = setInterval(advanceSlide, 4000); // 4 segundos por slide

                const resetInterval = () => {
                    clearInterval(intervalId);
                    intervalId = setInterval(advanceSlide, 4000);
                };

                // Pausa ao passar o rato (bom para usabilidade, mesmo em mobile funciona com toque longo)
                sobreContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
                sobreContainer.addEventListener('mouseleave', resetInterval);

                nextButton.addEventListener('click', () => {
                    advanceSlide();
                    resetInterval();
                });

                prevButton.addEventListener('click', () => {
                    moveToSlide((currentIndex - 1 + slides.length) % slides.length);
                    resetInterval();
                });
                // --- FIM DA LÓGICA DE AUTOPLAY ---

            } else {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }
    }

    // --- LÓGICA DOS ARTIGOS RECENTES ---
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const blogContainer = document.querySelector('#blog .container');
    if (blogContainer) {
        // ... (código do Contentful, sem alterações) ...
        const isMigratorioPage = document.body.classList.contains('page-migratorio');
        const categoria = isMigratorioPage ? 'Direito Migratório' : 'Direito Imobiliário';
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&select=sys.id,fields.titulo,fields.resumo,fields.slug&fields.categoria=${categoria}&limit=2`;
        fetch(url).then(response => response.json()).then(data => {
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
        }).catch(error => console.error("Erro ao buscar os artigos:", error));
    }
});