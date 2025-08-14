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

    // --- LÓGICA DO CARROSSEL DE DEPOIMENTOS ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        if (!track) return; 
        const slides = Array.from(track.children);
        const nextButton = carouselContainer.parentElement.querySelector('.next-button');
        const prevButton = carouselContainer.parentElement.querySelector('.prev-button');
        const dotsNav = carouselContainer.parentElement.querySelector('.carousel-dots');
        if (slides.length > 0 && nextButton && prevButton && dotsNav) {
            let currentIndex = 0;
            let intervalId;
            slides.forEach((slide, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    moveToSlide(index);
                    startAutoplay();
                });
                dotsNav.appendChild(dot);
            });
            const dots = Array.from(dotsNav.children);
            const moveToSlide = (targetIndex) => {
                track.style.transform = `translateX(-${100 * targetIndex}%)`;
                if(dots[currentIndex]) dots[currentIndex].classList.remove('active');
                if(dots[targetIndex]) dots[targetIndex].classList.add('active');
                currentIndex = targetIndex;
            };
            const advanceSlide = () => {
                const nextIndex = (currentIndex + 1) % slides.length;
                moveToSlide(nextIndex);
            };
            const startAutoplay = () => {
                clearInterval(intervalId);
                intervalId = setInterval(advanceSlide, 7000);
            };
            nextButton.addEventListener('click', () => {
                advanceSlide();
                startAutoplay();
            });
            prevButton.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(prevIndex);
                startAutoplay();
            });
            carouselContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
            carouselContainer.addEventListener('mouseleave', startAutoplay);
            if(slides.length > 1) {
                startAutoplay();
            }
        }
    }

    // --- LÓGICA PARA ANIMAÇÃO DO TÍTULO (ADICIONADA AQUI) ---
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
        }, {
            threshold: 0.5
        });
        observer.observe(homeSection);
    }

    // --- LÓGICA DO FORMULÁRIO COM POP-UP ---
    const form = document.querySelector('#contato form');
    const modal = document.getElementById('thank-you-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (form && modal && closeModalBtn) {
        form.addEventListener('submit', function(e) {
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
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('is-visible');
        });
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('is-visible');
            }
        });
    }

    // ========================================================
    // --- LÓGICA DOS ARTIGOS RECENTES (FILTRADO) ---
    // ========================================================
    
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
    const blogContainer = document.querySelector('#blog .container');

    if (blogContainer) {
        
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&select=sys.id,fields.titulo,fields.resumo,fields.slug&fields.categoria=Direito Migratório&limit=2`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const articlesParent = document.querySelector('.latest-articles-container');
                if (articlesParent && data.items) {
                    articlesParent.innerHTML = '';
                    if (data.items.length === 0) {
                         articlesParent.innerHTML = '<p>Nenhum artigo sobre Direito Migratório publicado recentemente.</p>';
                         return;
                    }
                    data.items.forEach(item => {
                        const fields = item.fields;
                        const articleSlug = fields.slug || '#';
                        const articleElement = document.createElement('div');
                        articleElement.classList.add('blog-post-banner');
                        articleElement.innerHTML = `
                            <div>
                                <h3>${fields.titulo}</h3>
                                <p>${fields.resumo}</p>
                            </div>
                            <a href="/artigo.html?slug=${articleSlug}" class="btn">Ler Artigo Completo</a> 
                        `;
                        articlesParent.appendChild(articleElement);
                    });
                }
            })
            .catch(error => console.error("Erro ao buscar os artigos:", error));
    }
});