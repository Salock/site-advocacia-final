document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        'imobiliario_page_title': { pt: 'VMatos Assessoria Jurídica | Especialistas em Direito Imobiliário', en: 'VMatos Assessoria Jurídica | Real Estate Law Experts', es: 'VMatos Assessoria Jurídica | Expertos en Derecho Inmobiliario', fr: 'VMatos Assessoria Jurídica | Experts en Droit Immobilier' },
        'imobiliario_meta_description': { pt: 'Segurança jurídica para seu imóvel em todas as etapas.', en: 'Legal security for your property at every stage.', es: 'Seguridad jurídica para su inmueble en todas las etapas.', fr: 'Sécurité juridique pour votre bien immobilier à chaque étape.' },
        'nav_home': { pt: 'Home', en: 'Home', es: 'Inicio', fr: 'Accueil' },
        'nav_about': { pt: 'Sobre Nós', en: 'About Us', es: 'Sobre Nosotros', fr: 'À Propos' },
        'nav_articles': { pt: 'Artigos', en: 'Articles', es: 'Artículos', fr: 'Articles' },
        'nav_contact': { pt: 'Contato', en: 'Contact', es: 'Contacto', fr: 'Contact' },
        'imobiliario_home_title': { pt: 'Tranquilidade na compra do seu imóvel ou rescisão contratual.', en: 'Peace of mind in your property purchase or contract termination.', es: 'Tranquilidad en la compra de su inmueble o rescisión contractual.', fr: 'Tranquillité d\'esprit lors de l\'achat de votre bien ou de la résiliation de votre contrat.' },
        'imobiliario_home_subtitle': { pt: 'Se o sonho virou problema, nós temos a solução!', en: 'If the dream became a problem, we have the solution!', es: 'Si el sueño se convirtió en un problema, ¡tenemos la solución!', fr: 'Si le rêve est devenu un problème, nous avons la solution !' },
        'home_button': { pt: 'Fale Conosco', en: 'Contact Us', es: 'Hable con Nosotros', fr: 'Contactez-Nous' },
        'sobre_title': { pt: 'Nossa Abordagem', en: 'Our Approach', es: 'Nuestro Enfoque', fr: 'Notre Approche' },
        'pilar1_title': { pt: 'Foco no Cliente', en: 'Client Focus', es: 'Enfoque en el Cliente', fr: 'Focalisation Client' },
        'pilar1_text': { 
            pt: 'A VMatos Assessoria Jurídica foi fundada com a missão de atuar no mercado imobiliário, com foco na rescisão contratual de compra e venda de imóveis na planta. A gênese de nossa atuação reside na constatação das inúmeras vulnerabilidades e dissabores enfrentados por adquirentes de imóveis, que frequentemente se deparam com a falta de transparência, atrasos na entrega e onerosidade excessiva por parte das construtoras e incorporadoras.', 
            en: 'VMatos Assessoria Jurídica was founded with the mission to operate in the real estate market, focusing on the termination of purchase and sale agreements for off-plan properties. The genesis of our work lies in observing the numerous vulnerabilities and troubles faced by property buyers, who often encounter a lack of transparency, delivery delays, and excessive costs from construction and development companies.', 
            es: 'VMatos Assessoria Jurídica fue fundado con la misión de actuar en el mercado inmobiliario, centrándose en la rescisión de contratos de compraventa de inmuebles sobre plano. La génesis de nuestra actuación reside en la constatación de las innumerables vulnerabilidades y disgustos que enfrentan los adquirentes de inmuebles, quienes frecuentemente se encuentran con falta de transparencia, retrasos en la entrega y onerosidad excesiva por parte de las constructoras y promotoras.', 
            fr: 'VMatos Assessoria Jurídica a été fondé avec la mission d\'opérer sur le marché immobilier, en se concentrant sur la résiliation des contrats d\'achat et de vente de biens immobiliers sur plan. La genèse de notre travail réside dans l\'observation des nombreuses vulnérabilités et désagréments rencontrés par les acheteurs de biens immobiliers, qui sont souvent confrontés à un manque de transparence, des retards de livraison et des coûts excessifs de la part des constructeurs et promoteurs.' 
        },
        'pilar2_title': { pt: 'Soluções Estratégicas', en: 'Strategic Solutions', es: 'Soluciones Estratégicas', fr: 'Solutions Stratégiques' },
        'pilar2_text': { 
            pt: 'Com uma visão estratégica e humanizada, identificamos a necessidade de um suporte jurídico que pudesse resguardar os direitos do consumidor. Oferecemos soluções eficazes para a resolução de conflitos, garantindo a restituição de valores pagos, anulação de cláusulas abusivas e a justa reparação por danos morais.', 
            en: 'With a strategic and humanized vision, we identified the need for legal support that could safeguard consumer rights. We offer effective legal solutions for conflict resolution, ensuring the refund of paid amounts, annulment of abusive clauses and fines, and just compensation for moral damages.', 
            es: 'Con una visión estratégica y humanizada, identificamos la necesidad de un apoyo jurídico que pudiera salvaguardar los derechos del consumidor. Oferecemos soluciones jurídicas eficaces para la resolución de conflictos, garantizando la restitución de los importes pagados, la anulación de cláusulas y multas abusivas y la justa reparación por daños morales.', 
            fr: 'Avec une vision stratégique et humanisée, nous avons identifié le besoin d\'un soutien juridique pouvant sauvegarder les droits des consommateurs. Nous offrons des solutions juridiques efficaces pour la résolution des conflits, garantissant le remboursement des montants payés, l\'annulation des clauses et amendes abusives et une juste réparation pour les préjudices moraux.' 
        },
        'pilar3_title': { pt: 'Equipe Especializada', en: 'Specialized Team', es: 'Equipo Especializado', fr: 'Équipe Spécialisée' },
        'pilar3_text': { 
            pt: 'Nossa equipe é composta por profissionais com vasto conhecimento em direito imobiliário e do consumidor. Dedicamo-nos integralmente a cada caso, buscando a melhor estratégia para assegurar que os direitos de nossos clientes sejam integralmente preservados.', 
            en: 'Our team is composed of professionals with vast knowledge in real estate and consumer law. We dedicate ourselves fully to each case, seeking the best strategy to ensure that our clients\' rights are fully preserved.', 
            es: 'Nuestro equipo está compuesto por profesionales con un vasto conocimiento en derecho inmobiliario y del consumidor. Nos dedicamos íntegramente a cada caso, buscando la mejor estrategia para asegurar que los derechos de nuestros clientes sean plenamente preservados.', 
            fr: 'Notre équipe est composée de professionnels possédant une vaste connaissance en droit immobilier et de la consommation. Nous nous consacrons entièrement à chaque cas, en recherchant la meilleure stratégie pour garantir que les droits de nos clients soient intégralement préservés.' 
        },
        'blog_title': { pt: 'Artigos e dúvidas frequentes', en: 'Articles and frequently asked questions', es: 'Artículos y preguntas frecuentes', fr: 'Articles et questions fréquemment posées' },
        'contato_title': { pt: 'Fale Conosco', en: 'Contact Us', es: 'Contáctenos', fr: 'Contactez-Nous' },
        'form_name': { pt: 'Nome:', en: 'Name:', es: 'Nombre:', fr: 'Nom:' },
        'form_phone': { pt: 'Telefone/Celular:', en: 'Phone/Mobile:', es: 'Teléfono/Móvil:', fr: 'Téléphone/Portable:' },
        'form_email': { pt: 'E-mail:', en: 'E-mail:', es: 'E-mail:', fr: 'E-mail:' },
        'form_message': { pt: 'Mensagem:', en: 'Message:', es: 'Mensaje:', fr: 'Message:' },
        'contato_button': { pt: 'Quero uma análise do meu caso', en: 'I want a case analysis', es: 'Quiero un análisis de mi caso', fr: 'Je souhaite une analyse de mon cas' },
        'contato_intro_html': { pt: 'Fique à vontade para nos contatar diretamente por <a href="https://wa.me/5511952016791" target="_blank" rel="noopener noreferrer">WhatsApp</a> ou <a href="mailto:seu-email-aqui@vmatos.com.br">E-mail</a>. Se preferir, preencha o formulário abaixo e nossa equipe retornará em breve.', en: 'Feel free to contact us directly via <a href="https://wa.me/5511952016791" target="_blank" rel="noopener noreferrer">WhatsApp</a> or <a href="mailto:seu-email-aqui@vmatos.com.br">Email</a>. Alternatively, fill out the form below and our team will get back to you shortly.', es: 'No dude en contactarnos directamente por <a href="https://wa.me/5511952016791" target="_blank" rel="noopener noreferrer">WhatsApp</a> o <a href="mailto:seu-email-aqui@vmatos.com.br">E-mail</a>. Si lo prefiere, complete el formulario a continuación y nuestro equipo le responderá en breve.', fr: 'N\'hésitez pas à nous contacter directement via <a href="https://wa.me/5511952016791" target="_blank" rel="noopener noreferrer">WhatsApp</a> ou par <a href="mailto:seu-email-aqui@vmatos.com.br">E-mail</a>. Si vous préférez, remplissez le formulaire ci-dessous et notre équipe vous répondra rapidement.' },
        'modal_title': { pt: 'Mensagem Enviada!', en: 'Message Sent!', es: '¡Mensaje Enviado!', fr: 'Message Envoyé !' },
        'modal_text': { pt: 'Obrigado por entrar em contato. Responderemos assim que possível.', en: 'Thank you for contacting us. We will respond as soon as possible.', es: 'Gracias por contactarnos. Responderemos tan pronto como sea posible.', fr: 'Merci de nous avoir contactés. Nous vous répondrons dès que possible.' },
        'modal_button': { pt: 'Fechar', en: 'Close', es: 'Cerrar', fr: 'Fermer' },
        'footer_text': { pt: '© 2025 VMatos Assessoria Jurídica. Todos os direitos reservados.', en: '© 2025 VMatos Assessoria Jurídica. All rights reserved.', es: '© 2025 VMatos Assessoria Jurídica. Todos los derechos reservados.', fr: '© 2025 VMatos Assessoria Jurídica. Tous droits réservés.' }
    };

    const getLocaleForApi = (language) => {
        const localeMap = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', fr: 'fr-FR' };
        return localeMap[language] || 'en-US';
    };

    const fetchArticles = (language) => {
        const SPACE_ID = 'p2vxqfcphky1';
        const ACCESS_TOKEN = '6SOiDvnwO4V8Ljl8OyHLhYpKvaWfAkxMIgm11ABtgb4';
        const articlesParent = document.querySelector('.latest-articles-container');
        if (!articlesParent) return;

        const isMigratorioPage = document.body.classList.contains('page-migratorio');
        const categoria = isMigratorioPage ? 'Direito Migratório' : 'Direito Imobiliário';
        const locale = getLocaleForApi(language);
        
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=artigos&order=-sys.createdAt&fields.categoria=${encodeURIComponent(categoria)}&locale=${locale}&include=1`;
        
        articlesParent.innerHTML = '<p style="color: #333;">Carregando artigos...</p>';

        fetch(url).then(response => response.json()).then(data => {
            const assets = data.includes?.Asset || [];
            let articlesHtml = '';

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const fields = item.fields;
                    
                    let imageUrl = 'imagens/placeholder.png';
                    if (fields.imagemPrincipal && assets.length > 0) {
                        const imageAsset = assets.find(asset => asset.sys.id === fields.imagemPrincipal.sys.id);
                        
                        if (imageAsset && imageAsset.fields && imageAsset.fields.file && imageAsset.fields.file.url) {
                            imageUrl = 'https:' + imageAsset.fields.file.url + '?w=200&h=150&fit=cover&fm=webp';
                        }
                    }

                    const date = new Date(item.sys.createdAt);
                    const formattedDate = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

                    articlesHtml += `
                        <a href="artigo.html?slug=${fields.slug}" class="article-list-item">
                            <div class="article-list-image">
                                <img src="${imageUrl}" alt="${fields.titulo}">
                            </div>
                            <div class="article-list-content">
                                <h3>${fields.titulo}</h3>
                                <p class="article-date">${formattedDate}</p>
                            </div>
                        </a>
                    `;
                });
            } else {
                articlesHtml = '<p style="color: #333;">Nenhum artigo encontrado para esta categoria.</p>';
            }
            articlesParent.innerHTML = articlesHtml;
        }).catch(error => {
            console.error("Erro ao buscar os artigos:", error);
            articlesParent.innerHTML = '<p style="color: #333;">Ocorreu um erro ao carregar os artigos.</p>';
        });
    };

    const translatePage = (language) => { document.querySelectorAll('[data-translate]').forEach(element => { const key = element.getAttribute('data-translate'); if (translations[key] && translations[key][language]) { if (element.tagName === 'META') { element.setAttribute('content', translations[key][language]); } else if (element.tagName === 'TITLE') { document.title = translations[key][language]; } else { element.innerHTML = translations[key][language]; } } }); document.documentElement.setAttribute('lang', language); const currentLangText = document.getElementById('current-lang-text'); if (currentLangText) { currentLangText.textContent = language.toUpperCase(); } if (document.getElementById('blog')) { fetchArticles(language); } };
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) { const langToggleButton = langSwitcher.querySelector('.lang-toggle-btn'); const langButtons = langSwitcher.querySelectorAll('.lang-btn'); if (langToggleButton) { langToggleButton.addEventListener('click', (event) => { event.stopPropagation(); langSwitcher.classList.toggle('is-open'); }); } if (langButtons.length > 0) { langButtons.forEach(button => { button.addEventListener('click', (event) => { event.preventDefault(); const selectedLang = button.getAttribute('data-lang'); langButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); localStorage.setItem('userLanguage', selectedLang); translatePage(selectedLang); langSwitcher.classList.remove('is-open'); }); }); } document.addEventListener('click', () => { if (langSwitcher.classList.contains('is-open')) { langSwitcher.classList.remove('is-open'); } }); }
    const savedLang = localStorage.getItem('userLanguage');
    const browserLang = navigator.language.substring(0, 2);
    let initialLang = 'pt';
    if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) { initialLang = savedLang; } else if (['pt', 'en', 'es', 'fr'].includes(browserLang)) { initialLang = browserLang; }
    const activeButton = langSwitcher.querySelector(`.lang-btn[data-lang="${initialLang}"]`);
    if (activeButton) { langSwitcher.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active')); activeButton.classList.add('active'); }
    setTimeout(() => { translatePage(initialLang); }, 100);
    const menuToggle = document.querySelector('.menu-toggle');
    const menuDropdown = document.querySelector('.menu-dropdown');
    if (menuToggle && menuDropdown) { menuToggle.addEventListener('click', (event) => { event.stopPropagation(); menuDropdown.classList.toggle('is-active'); }); const menuLinks = menuDropdown.querySelectorAll('a'); menuLinks.forEach(link => { link.addEventListener('click', () => { if (menuDropdown.classList.contains('is-active')) { menuDropdown.classList.remove('is-active'); } }); }); }
    const homeSection = document.querySelector('#home');
    const heroTitle = document.querySelector('#home h1');
    if (homeSection && heroTitle) { const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { heroTitle.classList.add('visible'); } else { heroTitle.classList.remove('visible'); } }); }, { threshold: 0.5 }); observer.observe(homeSection); }
    const form = document.querySelector('#contato form');
    const modal = document.getElementById('thank-you-modal');
    if (form && modal) { const closeModalBtn = document.getElementById('close-modal-btn'); if (closeModalBtn) { form.addEventListener('submit', function (e) { e.preventDefault(); const formData = new FormData(form); fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(formData).toString() }).then(response => { if (response.ok) { form.reset(); modal.classList.add('is-visible'); } else { alert("Ocorreu um problema ao enviar a sua mensagem."); } }).catch(error => { alert("Ocorreu um problema de rede."); }); }); closeModalBtn.addEventListener('click', () => modal.classList.remove('is-visible')); modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('is-visible'); }); } }
    const sobreContainer = document.querySelector('#sobre');
    if (sobreContainer) {
        let sobreCarouselInitialized = false;
        let sobreEventListeners = [];
        let sobreIntervalId = null;
        const setupSobreCarousel = () => { if (sobreCarouselInitialized) return; const track = sobreContainer.querySelector('.pilares-carousel-track'); const prevButton = sobreContainer.querySelector('.sobre-prev'); const nextButton = sobreContainer.querySelector('.sobre-next'); const dotsNav = sobreContainer.querySelector('.sobre-dots'); if (!track || !prevButton || !nextButton || !dotsNav) return; const slides = Array.from(track.children); if (slides.length <= 1) return; let currentIndex = 0; dotsNav.innerHTML = ''; slides.forEach((slide, index) => { const dot = document.createElement('button'); dot.classList.add('carousel-dot'); if (index === 0) dot.classList.add('active'); const dotClickHandler = () => { moveToSlide(index); resetInterval(); }; dot.addEventListener('click', dotClickHandler); sobreEventListeners.push({ element: dot, type: 'click', handler: dotClickHandler }); dotsNav.appendChild(dot); }); const dots = Array.from(dotsNav.children); const moveToSlide = (targetIndex) => { track.style.transform = `translateX(-${100 * targetIndex}%)`; if (dots[currentIndex]) dots[currentIndex].classList.remove('active'); if (dots[targetIndex]) dots[targetIndex].classList.add('active'); currentIndex = targetIndex; }; const advanceSlide = () => { moveToSlide((currentIndex + 1) % slides.length); }; const startAutoplay = () => { clearInterval(sobreIntervalId); sobreIntervalId = setInterval(advanceSlide, 4000); }; const resetInterval = () => startAutoplay(); const nextClickHandler = () => { advanceSlide(); resetInterval(); }; const prevClickHandler = () => { moveToSlide((currentIndex - 1 + slides.length) % slides.length); resetInterval(); }; nextButton.addEventListener('click', nextClickHandler); prevButton.addEventListener('click', prevClickHandler); sobreContainer.addEventListener('mouseenter', () => clearInterval(sobreIntervalId)); sobreContainer.addEventListener('mouseleave', resetInterval); sobreEventListeners.push({ element: nextButton, type: 'click', handler: nextClickHandler }); sobreEventListeners.push({ element: prevButton, type: 'click', handler: prevClickHandler }); sobreEventListeners.push({ element: sobreContainer, type: 'mouseenter', handler: () => clearInterval(sobreIntervalId) }); sobreEventListeners.push({ element: sobreContainer, type: 'mouseleave', handler: resetInterval }); startAutoplay(); sobreCarouselInitialized = true; };
        const destroySobreCarousel = () => { if (!sobreCarouselInitialized) return; clearInterval(sobreIntervalId); const track = sobreContainer.querySelector('.pilares-carousel-track'); const dotsNav = sobreContainer.querySelector('.sobre-dots'); sobreEventListeners.forEach(listener => { listener.element.removeEventListener(listener.type, listener.handler); }); sobreEventListeners = []; if (track) track.style.transform = 'translateX(0%)'; if (dotsNav) dotsNav.innerHTML = ''; sobreCarouselInitialized = false; };
        const handleResize = () => { if (window.innerWidth <= 768) { setupSobreCarousel(); } else { destroySobreCarousel(); } };
        handleResize();
        window.addEventListener('resize', handleResize);
    }
});