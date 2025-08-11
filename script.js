// O "sinal verde" começa aqui. TODO o código ficará aqui dentro.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU DROPDOWN ---
    // (O seu código original, que estava correto)
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
    // (O seu código original, que estava correto)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        if (!track) return; // Segurança extra
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

            startAutoplay();
        }
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
                    alert("Oops! Ocorreu um problema ao enviar a sua mensagem. Tente novamente.");
                }
            }).catch(error => {
                alert("Oops! Ocorreu um problema de rede. Verifique a sua conexão.");
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

    // --- LÓGICA PARA O BLOG DINÂMICO (CONTENTFUL) ---
    // NOTA DE SEGURANÇA: Expor o seu Access Token no lado do cliente não é recomendado para projetos em produção.
    // Para um projeto pessoal está OK, mas no futuro, considere usar funções serverless para proteger as suas chaves.
    const SPACE_ID = 'p2vxqfcphky1';
    const ACCESS_TOKEN = '-oK2OypPqIG8ZL4qx_XTs2rnn5iehc0LWEjxpa-NAMs';
    const blogArticlesContainer = document.querySelector('#blog .container'); // Corrigido para selecionar o container dos artigos

    // CORREÇÃO: Removida a verificação das chaves que impedia o código de rodar.
    if (blogArticlesContainer && SPACE_ID && ACCESS_TOKEN) {
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigoDeBlog`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Falha na resposta da rede');
                return response.json();
            })
            .then(data => {
                const articlesParent = document.querySelector('#blog .container');
                if (!articlesParent) return;

                // Limpa os artigos de exemplo e mantém o título
                const oldArticles = articlesParent.querySelectorAll('.blog-post');
                oldArticles.forEach(article => article.remove());

                // Adiciona os novos artigos
                data.items.forEach(item => {
                    const fields = item.fields;
                    const articleElement = document.createElement('article');
                    articleElement.classList.add('blog-post');
                    articleElement.innerHTML = `
                        <h3>${fields.titulo || 'Título não encontrado'}</h3>
                        <p>${fields.resumo || 'Resumo não encontrado'}</p>
                        <a href="#">Ler Mais</a> 
                    `;
                    articlesParent.appendChild(articleElement);
                });
            })
            .catch(error => {
                console.error("Erro ao buscar os artigos do Contentful:", error);
                const articlesParent = document.querySelector('#blog .container');
                if(articlesParent) {
                    // Mantém os artigos de exemplo se a API falhar
                    const errorP = document.createElement('p');
                    errorP.textContent = 'Não foi possível carregar os artigos no momento.';
                    errorP.style.color = 'orange';
                    articlesParent.appendChild(errorP);
                }
            });
    }

}); // O "sinal verde" TERMINA AQUI. Todo o código está agora dentro dele.