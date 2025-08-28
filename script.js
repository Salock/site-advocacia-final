// ========================================================
// --- SCRIPT.JS FINAL E OTIMIZADO ---
// ========================================================
document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // --- 1. DICIONÁRIO DE TRADUÇÕES E FUNÇÕES ASSOCIADAS ---
    // ========================================================
    const translations = {
        'imobiliario_page_title': { pt: 'Nexus Iuris | Especialistas em Direito Imobiliário', en: 'Nexus Iuris | Real Estate Law Experts', es: 'Nexus Iuris | Expertos en Derecho Inmobiliario', fr: 'Nexus Iuris | Experts en Droit Immobilier' },
        'imobiliario_meta_description': { pt: 'Segurança jurídica para seu imóvel em todas as etapas.', en: 'Legal security for your property at every stage.', es: 'Seguridad jurídica para su inmueble en todas las etapas.', fr: 'Sécurité juridique pour votre bien immobilier à chaque étape.' },
        'nav_home': { pt: 'Home', en: 'Home', es: 'Inicio', fr: 'Accueil' },
        'nav_about': { pt: 'Sobre Nós', en: 'About Us', es: 'Sobre Nosotros', fr: 'À Propos' },
        'nav_services': { pt: 'Áreas de Atuação', en: 'Practice Areas', es: 'Áreas de Actuación', fr: 'Domaines de Compétence' },
        'nav_articles': { pt: 'Artigos', en: 'Articles', es: 'Artículos', fr: 'Articles' },
        'nav_contact': { pt: 'Contato', en: 'Contact', es: 'Contacto', fr: 'Contact' },
        'imobiliario_home_title': { pt: 'Tranquilidade na compra do seu imóvel ou rescisão contratual.', en: 'Peace of mind in your property purchase or contract termination.', es: 'Tranquilidad en la compra de su inmueble o rescisión contractual.', fr: 'Tranquillité d\'esprit lors de l\'achat de votre bien ou de la résiliation de votre contrat.' },
        'imobiliario_home_subtitle': { pt: 'Se o sonho virou problema, nós temos a solução!', en: 'If the dream became a problem, we have the solution!', es: 'Si el sueño se convirtió en un problema, ¡tenemos la solución!', fr: 'Si le rêve est devenu un problème, nous avons la solution !' },
        'home_button': { pt: 'Fale Conosco', en: 'Contact Us', es: 'Hable con Nosotros', fr: 'Contactez-Nous' },
        'sobre_title': { pt: 'Nossa Abordagem', en: 'Our Approach', es: 'Nuestro Enfoque', fr: 'Notre Approche' },
        'pilar1_title': { pt: 'Foco no Cliente', en: 'Client Focus', es: 'Enfoque en el Cliente', fr: 'Focalisation Client' },
        'pilar1_text': { pt: 'O Nexus Iuris foi fundado com a missão de atuar no mercado imobiliário, com foco na rescisão contratual de compra e venda de imóveis na planta. A gênese de nossa atuação reside na constatação das inúmeras vulnerabilidades e dissabores enfrentados por adquirentes de imóveis, que frequentemente se deparam com a falta de transparência, atrasos na entrega e onerosidade excessiva por parte das construtoras e incorporadoras.', en: 'Nexus Iuris was founded with the mission to operate in the real estate market, focusing on the termination of purchase and sale agreements for off-plan properties. The genesis of our work lies in observing the numerous vulnerabilities and troubles faced by property buyers, who often encounter a lack of transparency, delivery delays, and excessive costs from construction and development companies.', es: 'Nexus Iuris fue fundado con la misión de actuar en el mercado inmobiliario, centrándose en la rescisión de contratos de compraventa de inmuebles sobre plano. La génesis de nuestra actuación reside en la constatación de las innumerables vulnerabilidades y disgustos que enfrentan los adquirentes de inmuebles, quienes frecuentemente se encuentran con falta de transparencia, retrasos en la entrega y onerosidad excesiva por parte de las constructoras y promotoras.', fr: 'Nexus Iuris a été fondé avec la mission d\'opérer sur le marché immobilier, en se concentrant sur la résiliation des contrats d\'achat et de vente de biens immobiliers sur plan. La genèse de notre travail réside dans l\'observation des nombreuses vulnérabilités et désagréments rencontrés par les acheteurs de biens immobiliers, qui sont souvent confrontés à un manque de transparence, des retards de livraison et des coûts excessifs de la part des constructeurs et promoteurs.' },
        'pilar2_title': { pt: 'Soluções Estratégicas', en: 'Strategic Solutions', es: 'Soluciones Estratégicas', fr: 'Solutions Stratégiques' },
        'pilar2_text': { pt: 'Com uma visão estratégica e humanizada, identificamos a necessidade de um suporte jurídico que pudesse resguardar os direitos do consumidor. Oferecemos soluções eficazes para a resolução de conflitos, garantindo a restituição de valores pagos, anulação de cláusulas abusivas e a justa reparação por danos morais.', en: 'With a strategic and humanized vision, we identified the need for legal support that could safeguard consumer rights. We offer effective legal solutions for conflict resolution, ensuring the refund of paid amounts, annulment of abusive clauses and fines, and just compensation for moral damages.', es: 'Con una visión estratégica y humanizada, identificamos la necesidad de un apoyo jurídico que pudiera salvaguardar los derechos del consumidor. Oferecemos soluciones jurídicas eficaces para la resolución de conflictos, garantizando la restitución de los importes pagados, la anulación de cláusulas y multas abusivas y la justa reparación por daños morales.', fr: 'Avec une vision stratégique et humanisée, nous avons identifié le besoin d\'un soutien juridique pouvant sauvegarder les droits des consommateurs. Nous offrons des solutions juridiques efficaces pour la résolution des conflits, garantissant le remboursement des montants payés, l\'annulation des clauses et amendes abusives et une juste réparation pour les préjudices moraux.' },
        'pilar3_title': { pt: 'Equipe Especializada', en: 'Specialized Team', es: 'Equipo Especializado', fr: 'Équipe Spécialisée' },
        'pilar3_text': { pt: 'Nossa equipe é composta por profissionais com vasto conhecimento em direito imobiliário e do consumidor. Dedicamo-nos integralmente a cada caso, buscando a melhor estratégia para assegurar que os direitos de nossos clientes sejam integralmente preservados.', en: 'Our team is composed of professionals with vast knowledge in real estate and consumer law. We dedicate ourselves fully to each case, seeking the best strategy to ensure that our clients\' rights are fully preserved.', es: 'Nuestro equipo está compuesto por profesionales con un vasto conocimiento en derecho inmobiliario y del consumidor. Nos dedicamos íntegramente a cada caso, buscando la mejor estrategia para asegurar que los derechos de nuestros clientes sean plenamente preservados.', fr: 'Notre équipe est composée de professionnels possédant une vaste connaissance en droit immobilier et de la consommation. Nous nous consacrons entièrement à chaque cas, en recherchant la meilleure stratégie pour garantir que les droits de nos clients soient intégralement préservés.' },
        'areas_title': { pt: 'Nossas Áreas de Atuação', en: 'Our Practice Areas', es: 'Nuestras Áreas de Actuación', fr: 'Nos Domaines de Compétence' },
        'areas_item1': { pt: 'Contratos e Rescisões', en: 'Contracts and Terminations', es: 'Contratos y Rescisiones', fr: 'Contrats et Résiliations' },
        'areas_item2': { pt: 'Direito do Consumidor', en: 'Consumer Law', es: 'Derecho del Consumidor', fr: 'Droit de la Consommation' },
        'areas_item3': { pt: 'Direito imobiliário', en: 'Real Estate Law', es: 'Derecho Inmobiliario', fr: 'Droit Immobilier' },
        'blog_title': { pt: 'Artigos Recentes', en: 'Recent Articles', es: 'Artículos Recientes', fr: 'Articles Récents' },
        'blog_archive_button': { pt: 'Ver Arquivo Completo', en: 'View Full Archive', es: 'Ver Archivo Completo', fr: 'Voir les Archives Complètes' },
        'depoimentos_title': { pt: 'O Que os Nossos Clientes Dizem', en: 'What Our Clients Say', es: 'Lo Que Dicen Nuestros Clientes', fr: 'Ce Que Disent Nos Clients' },
        'contato_title': { pt: 'Fale Conosco', en: 'Contact Us', es: 'Contáctenos', fr: 'Contactez-Nous' },
        'contato_subtitle': { pt: 'Estamos prontos para ajudar. Envie sua mensagem!', en: 'We are ready to help. Send your message!', es: 'Estamos listos para ayudar. ¡Envíe su mensaje!', fr: 'Nous sommes prêts à vous aider. Envoyez votre message !' },
        'form_name': { pt: 'Nome:', en: 'Name:', es: 'Nombre:', fr: 'Nom:' },
        'form_phone': { pt: 'Telefone/Celular:', en: 'Phone/Mobile:', es: 'Teléfono/Móvil:', fr: 'Téléphone/Portable:' },
        'form_email': { pt: 'E-mail:', en: 'E-mail:', es: 'E-mail:', fr: 'E-mail:' },
        'form_message': { pt: 'Mensagem:', en: 'Message:', es: 'Mensaje:', fr: 'Message:' },
        'contato_button': { pt: 'Quero uma análise do meu caso', en: 'I want a case analysis', es: 'Quiero un análisis de mi caso', fr: 'Je souhaite une analyse de mon cas' },
        'modal_title': { pt: 'Mensagem Enviada!', en: 'Message Sent!', es: '¡Mensaje Enviado!', fr: 'Message Envoyé !' },
        'modal_text': { pt: 'Obrigado por entrar em contato. Responderemos assim que possível.', en: 'Thank you for contacting us. We will respond as soon as possible.', es: 'Gracias por contactarnos. Responderemos tan pronto como sea posible.', fr: 'Merci de nous avoir contactés. Nous vous répondrons dès que possible.' },
        'modal_button': { pt: 'Fechar', en: 'Close', es: 'Cerrar', fr: 'Fermer' },
        'footer_text': { pt: '© 2025 Nexus Iuris. Todos os direitos reservados.', en: '© 2025 Nexus Iuris. All rights reserved.', es: '© 2025 Nexus Iuris. Todos los derechos reservados.', fr: '© 2025 Nexus Iuris. Tous droits réservés.' }
    };

    const getLocaleForApi = (language) => {
        const localeMap = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', fr: 'fr-FR' };
        return localeMap[language] || 'en-US';
    };

    const fetchArticles = (language) => {
        const SPACE_ID = 'p2vxqfcphky1';
        const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
        const blogContainer = document.querySelector('#blog .container');
        if (!blogContainer) return;

        const isMigratorioPage = document.body.classList.contains('page-migratorio');
        const categoria = isMigratorioPage ? 'Direito Migratório' : 'Direito Imobiliário';
        const locale = getLocaleForApi(language);
        
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&select=sys.id,fields.titulo,fields.resumo,fields.slug,fields.categoria&fields.categoria=${categoria}&limit=2&locale=${locale}`;
        
        fetch(url).then(response => response.json()).then(data => {
            const articlesParent = document.querySelector('.latest-articles-container');
            if (articlesParent && data.items) {
                articlesParent.innerHTML = '';
                if (data.items.length === 0) {
                    articlesParent.innerHTML = `<p style="color: white; text-shadow: none;">Nenhum artigo sobre ${categoria} publicado recentemente neste idioma.</p>`;
                    return;
                }
                data.items.forEach(item => {
                    const fields = item.fields;
                    const articleSlug = fields.slug || '#';
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('blog-post-banner');
                    articleElement.innerHTML = `<div><h3>${fields.titulo}</h3><p>${fields.resumo}</p></div><a href="artigo.html?slug=${articleSlug}" class="btn">Ler Artigo Completo</a>`;
                    articlesParent.appendChild(articleElement);
                });
            }
        }).catch(error => console.error("Erro ao buscar os artigos:", error));
    };

    const translatePage = (language) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] && translations[key][language] && translations[key][language] !== '') {
                if (element.tagName === 'META') {
                    element.setAttribute('content', translations[key][language]);
                } else if (element.tagName === 'TITLE') {
                    document.title = translations[key][language];
                } else {
                    element.textContent = translations[key][language];
                }
            }
        });
        document.documentElement.setAttribute('lang', language);
        const currentLangText = document.getElementById('current-lang-text');
        if (currentLangText) {
            currentLangText.textContent = language.toUpperCase();
        }
        fetchArticles(language);
    };
    
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        const langToggleButton = langSwitcher.querySelector('.lang-toggle-btn');
        const langButtons = langSwitcher.querySelectorAll('.lang-btn');
        if (langToggleButton) {
            langToggleButton.addEventListener('click', (event) => {
                event.stopPropagation();
                langSwitcher.classList.toggle('is-open');
            });
        }
        if (langButtons.length > 0) {
            langButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const selectedLang = button.getAttribute('data-lang');
                    langButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    localStorage.setItem('userLanguage', selectedLang);
                    translatePage(selectedLang);
                    langSwitcher.classList.remove('is-open');
                });
            });
        }
        document.addEventListener('click', () => {
            if (langSwitcher.classList.contains('is-open')) {
                langSwitcher.classList.remove('is-open');
            }
        });
    }

    // --- Determina e aplica o idioma inicial ---
    const savedLang = localStorage.getItem('userLanguage');
    const browserLang = navigator.language.substring(0, 2);
    let initialLang = 'en'; 

    if (['pt', 'en', 'es', 'fr'].includes(browserLang)) {
        initialLang = browserLang;
    }
    if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) {
        initialLang = savedLang;
    }

    if (langSwitcher) {
        const activeButton = langSwitcher.querySelector(`.lang-btn[data-lang="${initialLang}"]`);
        if (activeButton) {
            langSwitcher.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        }
    }

    setTimeout(() => {
        translatePage(initialLang);
    }, 100);

    // ========================================================
    // --- 2. LÓGICA DO MENU DROPDOWN ---
    // ========================================================
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
    }

    // ========================================================
    // --- 3. LÓGICA PARA ANIMAÇÃO DO TÍTULO ---
    // ========================================================
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

    // ========================================================
    // --- 4. LÓGICA DO FORMULÁRIO COM POP-UP ---
    // ========================================================
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
    // --- 5. LÓGICA DO CARROSSEL DE DEPOIMENTOS (AUTOPLAY CORRIGIDO) ---
    // ========================================================
    const depoimentosContainer = document.querySelector('#depoimentos');
    if (depoimentosContainer) {
        const carouselBox = depoimentosContainer.querySelector('.carousel-container');
        const track = depoimentosContainer.querySelector('.carousel-track');
        const prevButton = depoimentosContainer.querySelector('.prev-button');
        const nextButton = depoimentosContainer.querySelector('.next-button');
        const dotsNav = depoimentosContainer.querySelector('.carousel-dots');

        if (carouselBox && track && prevButton && nextButton && dotsNav) {
            const slides = Array.from(track.children);
            let currentIndex = 0;
            let intervalId = null;

            if (slides.length > 1) {
                const advanceSlide = () => {
                    const nextIndex = (currentIndex + 1) % slides.length;
                    moveToSlide(nextIndex);
                };
                const moveToSlide = (targetIndex) => {
                    if (!track) return;
                    track.style.transform = `translateX(-${100 * targetIndex}%)`;
                    const currentDot = dotsNav.querySelector('.active');
                    if(currentDot) currentDot.classList.remove('active');
                    const newDot = dotsNav.children[targetIndex];
                    if(newDot) newDot.classList.add('active');
                    currentIndex = targetIndex;
                };
                const startAutoplay = () => {
                    clearInterval(intervalId);
                    intervalId = setInterval(advanceSlide, 5000);
                };
                dotsNav.innerHTML = '';
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
                nextButton.addEventListener('click', () => {
                    advanceSlide();
                    startAutoplay();
                });
                prevButton.addEventListener('click', () => {
                    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                    moveToSlide(prevIndex);
                    startAutoplay();
                });
                carouselBox.addEventListener('mouseenter', () => {
                    clearInterval(intervalId);
                });
                carouselBox.addEventListener('mouseleave', () => {
                    startAutoplay();
                });
                startAutoplay();
            } else {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }
    }
    
    // ========================================================
    // --- 6. LÓGICA DO CARROSSEL "SOBRE" (MOBILE-ONLY) ---
    // ========================================================
    const sobreContainer = document.querySelector('#sobre');
    if (sobreContainer) {
        let sobreCarouselInitialized = false;
        let sobreEventListeners = [];
        let sobreIntervalId = null; 

        const setupSobreCarousel = () => {
            if (sobreCarouselInitialized) return;
            const track = sobreContainer.querySelector('.pilares-carousel-track');
            const prevButton = sobreContainer.querySelector('.sobre-prev');
            const nextButton = sobreContainer.querySelector('.sobre-next');
            const dotsNav = sobreContainer.querySelector('.sobre-dots');
            if (!track || !prevButton || !nextButton || !dotsNav) return;
            const slides = Array.from(track.children);
            if (slides.length <= 1) return;
            let currentIndex = 0;
            dotsNav.innerHTML = '';
            slides.forEach((slide, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                const dotClickHandler = () => { moveToSlide(index); resetInterval(); };
                dot.addEventListener('click', dotClickHandler);
                sobreEventListeners.push({ element: dot, type: 'click', handler: dotClickHandler });
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
            const startAutoplay = () => {
                clearInterval(sobreIntervalId); 
                sobreIntervalId = setInterval(advanceSlide, 4000); 
            };
            const resetInterval = () => startAutoplay();
            const nextClickHandler = () => { advanceSlide(); resetInterval(); };
            const prevClickHandler = () => { moveToSlide((currentIndex - 1 + slides.length) % slides.length); resetInterval(); };
            nextButton.addEventListener('click', nextClickHandler);
            prevButton.addEventListener('click', prevClickHandler);
            sobreContainer.addEventListener('mouseenter', () => clearInterval(sobreIntervalId));
            sobreContainer.addEventListener('mouseleave', resetInterval);
            sobreEventListeners.push({ element: nextButton, type: 'click', handler: nextClickHandler });
            sobreEventListeners.push({ element: prevButton, type: 'click', handler: prevClickHandler });
            sobreEventListeners.push({ element: sobreContainer, type: 'mouseenter', handler: () => clearInterval(sobreIntervalId) });
            sobreEventListeners.push({ element: sobreContainer, type: 'mouseleave', handler: resetInterval });
            startAutoplay();
            sobreCarouselInitialized = true;
        };
        const destroySobreCarousel = () => {
            if (!sobreCarouselInitialized) return;
            clearInterval(sobreIntervalId); 
            const track = sobreContainer.querySelector('.pilares-carousel-track');
            const dotsNav = sobreContainer.querySelector('.sobre-dots');
            sobreEventListeners.forEach(listener => {
                listener.element.removeEventListener(listener.type, listener.handler);
            });
            sobreEventListeners = [];
            if (track) track.style.transform = 'translateX(0%)';
            if (dotsNav) dotsNav.innerHTML = '';
            sobreCarouselInitialized = false;
        };
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setupSobreCarousel();
            } else {
                destroySobreCarousel();
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
    }

});