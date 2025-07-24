document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU DROPDOWN ---
    // Seleciona os elementos corretos
    const menuToggle = document.querySelector('.menu-toggle'); 
    const menuDropdown = document.querySelector('.menu-dropdown');

    if (menuToggle && menuDropdown) {
        // Evento de clique para abrir/fechar o menu
        menuToggle.addEventListener('click', (event) => {
            // Impede que o clique se propague para outros elementos, como o 'document'
            event.stopPropagation(); 
            // Usa a classe .is-active, que definimos no CSS refatorado
            menuDropdown.classList.toggle('is-active');
        });

        // Fecha o menu se clicar em qualquer um dos links (para navegação na página)
        const menuLinks = menuDropdown.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuDropdown.classList.contains('is-active')) {
                    menuDropdown.classList.remove('is-active');
                }
            });
        });
        
        // BÓNUS: Fecha o menu se clicar em qualquer lugar fora dele
        document.addEventListener('click', () => {
            if (menuDropdown.classList.contains('is-active')) {
                menuDropdown.classList.remove('is-active');
            }
        });
    }

    /* --- ROLAGEM SUAVE --- */
    // O bloco de código para rolagem suave foi removido. 
    // A regra 'scroll-behavior: smooth;' no seu CSS já faz este trabalho
    // de forma mais simples e eficiente. Menos código, mesmo resultado!

    // --- LÓGICA DO CARROSSEL DE DEPOIMENTOS ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carouselContainer.querySelector('.next-button');
        const prevButton = carouselContainer.querySelector('.prev-button');
        const dotsNav = carouselContainer.querySelector('.carousel-dots');

        // Apenas executa se existirem slides
        if (slides.length > 0) {
            let currentIndex = 0;
            let intervalId;

            // Cria os pontos de navegação dinamicamente
            slides.forEach((slide, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                // Adiciona um listener a cada ponto criado
                dot.addEventListener('click', () => {
                    moveToSlide(index);
                    startAutoplay(); // Reinicia o timer ao clicar num ponto
                });
                dotsNav.appendChild(dot);
            });
            
            const dots = Array.from(dotsNav.children);

            // Função principal para mover os slides
            const moveToSlide = (targetIndex) => {
                // O CSS já define a largura dos slides como 100%. 
                // Usar percentagens no transform é mais robusto e não precisa do cálculo de 'slideWidth'.
                track.style.transform = 'translateX(-' + 100 * targetIndex + '%)';
                
                // Atualiza a classe 'active' no ponto de navegação
                dots[currentIndex].classList.remove('active');
                dots[targetIndex].classList.add('active');
                
                currentIndex = targetIndex;
            };
            
            // Função para avançar para o próximo slide
            const advanceSlide = () => {
                const nextIndex = (currentIndex + 1) % slides.length; // O '%' garante que volta ao início
                moveToSlide(nextIndex);
            };

            // Função para iniciar e reiniciar o autoplay
            const startAutoplay = () => {
                clearInterval(intervalId); // Limpa qualquer timer anterior
                intervalId = setInterval(advanceSlide, 7000); // 7 segundos
            };

            // Navegação pelos botões
            nextButton.addEventListener('click', () => {
                advanceSlide();
                startAutoplay();
            });

            prevButton.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(prevIndex);
                startAutoplay();
            });

            // Pausa o carrossel quando o rato está sobre ele
            carouselContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
            carouselContainer.addEventListener('mouseleave', startAutoplay);
            
            // Inicia o autoplay assim que a página carrega
            startAutoplay();
        }
    }
});

    // --- NOVA LÓGICA PARA ANIMAÇÃO REPETIDA DO TÍTULO ---
    const homeSection = document.querySelector('#home');
    const heroTitle = document.querySelector('#home h1');

    if (homeSection && heroTitle) {
        // Cria um "observador" que vai vigiar a secção #home
        const observer = new IntersectionObserver((entries) => {
            // A função 'entries' é uma lista de tudo o que o observador está a vigiar (neste caso, só a #home)
            entries.forEach(entry => {
                // 'isIntersecting' é verdadeiro se a secção estiver visível no ecrã
                if (entry.isIntersecting) {
                    // Se estiver visível, adiciona a classe para a animação começar
                    heroTitle.classList.add('visible');
                } else {
                    // Se sair do ecrã, remove a classe para "resetar" a animação para a próxima vez
                    heroTitle.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.5 // A animação começa quando 50% da secção estiver visível
        });

        // Manda o observador começar a "vigiar" a secção #home
        observer.observe(homeSection);
    }
    