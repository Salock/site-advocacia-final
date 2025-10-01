document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA MANTER A POSIÇÃO DO SCROLL AO MUDAR IDIOMA ---
    const targetSectionId = sessionStorage.getItem('scrollToSection');
    if (targetSectionId) {
        const targetSection = document.querySelector(targetSectionId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        sessionStorage.removeItem('scrollToSection');
    }

    const translations = {
        // =============================================
        // --- TRADUÇÕES PÁGINA: DIREITO IMOBILIÁRIO ---
        // =============================================
        'imobiliario_page_title': { pt: 'VMatos Assessoria Jurídica | Especialistas em Direito Imobiliário', en: 'VMatos Legal Advisory | Real Estate Law Experts', es: 'VMatos Asesoría Jurídica | Expertos en Derecho Inmobiliario', fr: 'VMatos Conseil Juridique | Experts en Droit Immobilier' },
        'imobiliario_meta_description': { pt: 'Segurança jurídica para seu imóvel em todas as etapas.', en: 'Legal security for your property at every stage.', es: 'Seguridad jurídica para su inmueble en todas las etapas.', fr: 'Sécurité juridique pour votre bien immobilier à chaque étape.' },
        'imobiliario_home_title': { pt: 'Tranquilidade na compra do seu imóvel ou rescisão contratual.', en: 'Peace of mind in your property purchase or contract termination.', es: 'Tranquilidad en la compra de su inmueble o rescisión contractual.', fr: 'Tranquillité d\'esprit lors de l\'achat de votre bien ou de la résiliation de votre contrat.' },
        'imobiliario_home_subtitle': { pt: 'Se o sonho virou problema, nós temos a solução!', en: 'If the dream became a problem, we have the solution!', es: 'Si el sueño se convirtió en un problema, ¡tenemos la solución!', fr: 'Si le rêve est devenu un problème, nous avons la solution !' },
        'imobiliario_pilar1_titulo': { pt: 'Nossa missão', en: 'Our Mission', es: 'Nuestra Misión', fr: 'Notre Mission' },
        'imobiliario_pilar1_texto': { 
            pt: `A VMatos Assessoria foi fundada com a missão de atuar no mercado imobiliário, com foco na rescisão contratual de compra e venda de imóveis na planta. A gênese de nossa atuação reside na constatação das inúmeras vulnerabilidades e dissabores enfrentados por adquirentes de imóveis, que frequentemente se deparam com a falta de transparência, atrasos na entrega e onerosidade excessiva por parte das construtoras e incorporadoras.`,
            en: `VMatos Advisory was founded with the mission to operate in the real estate market, focusing on the contractual termination of purchase and sale agreements for off-plan properties. The genesis of our work lies in observing the numerous vulnerabilities and troubles faced by property buyers, who often encounter a lack of transparency, delivery delays, and excessive costs from construction and development companies.`,
            es: `VMatos Asesoría fue fundada con la misión de actuar en el mercado inmobiliario, con un enfoque en la rescisión contractual de compraventa de inmuebles sobre plano. El origen de nuestra actuación reside en la constatación de las innumerables vulnerabilidades y disgustos que enfrentan los adquirentes de inmuebles, quienes frecuentemente se encuentran con falta de transparencia, retrasos en la entrega y una onerosidad excesiva por parte de las constructoras y promotoras.`,
            fr: `VMatos Conseil a été fondé avec pour mission d'intervenir sur le marché immobilier, en se concentrant sur la résiliation contractuelle des contrats de vente de biens immobiliers sur plan. La genèse de notre travail réside dans la constatation des nombreuses vulnérabilités et désagréments rencontrés par les acquéreurs, qui sont souvent confrontés à un manque de transparence, des retards de livraison et des charges excessives de la part des constructeurs et promoteurs.`
        },
        'imobiliario_pilar2_titulo': { pt: 'Soluções estratégicas', en: 'Strategic Solutions', es: 'Soluciones Estratégicas', fr: 'Solutions Stratégiques' },
        'imobiliario_pilar2_texto': {
            pt: `Com uma visão estratégica e humanizada, identificamos a necessidade premente de um suporte jurídico especializado que pudesse resguardar os direitos do consumidor. Oferecemos soluções jurídicas eficazes para a resolução de conflitos, garantindo a restituição de valores pagos, anulação de cláusulas e multas abusivas e a justa reparação por danos morais.`,
            en: `With a strategic and humanized vision, we identified the pressing need for specialized legal support that could safeguard consumer rights. We offer effective legal solutions for conflict resolution, ensuring the refund of paid amounts, annulment of abusive clauses and fines, and just compensation for moral damages.`,
            es: `Con una visión estratégica y humanizada, identificamos la necesidad apremiante de un soporte jurídico especializado que pudiera salvaguardar los derechos del consumidor. Ofrecemos soluciones jurídicas eficaces para la resolución de conflictos, garantizando la restitución de los valores pagados, la anulación de cláusulas y multas abusivas y la justa reparación por daños morales.`,
            fr: `Avec une vision stratégique et humanisée, nous avons identifié le besoin pressant d'un soutien juridique spécialisé capable de protéger les droits des consommateurs. Nous offrons des solutions juridiques efficaces pour la résolution des conflits, garantissant le remboursement des sommes versées, l'annulation des clauses et amendes abusives et une juste réparation des préjudices moraux.`
        },
        'imobiliario_pilar3_titulo': { pt: 'A Equipe', en: 'The Team', es: 'El Equipo', fr: 'L\'Équipe' },
        'imobiliario_pilar3_texto': {
            pt: `Nossa equipe é composta por profissionais com vasto conhecimento em direito imobiliário e do consumidor. Dedicamo-nos integralmente a cada caso, buscando a melhor estratégia para assegurar que os direitos de nossos clientes sejam integralmente preservados.`,
            en: `Our team is composed of professionals with vast knowledge in real estate and consumer law. We dedicate ourselves fully to each case, seeking the best strategy to ensure that our clients' rights are fully preserved.`,
            es: `Nuestro equipo está compuesto por profesionales con un vasto conocimiento en derecho inmobiliario y del consumidor. Nos dedicamos íntegramente a cada caso, buscando la mejor estrategia para asegurar que los derechos de nuestros clientes sean plenamente preservados.`,
            fr: `Notre équipe est composée de professionnels possédant une vaste connaissance du droit immobilier et de la consommation. Nous nous consacrons entièrement à chaque cas, en recherchant la meilleure stratégie pour garantir que les droits de nos clients soient intégralement préservés.`
        },

        // =============================================
        // --- TRADUÇÕES PÁGINA: DIREITO MIGRATÓRIO ---
        // =============================================
        'migratorio_page_title': { pt: 'VMatos Assessoria Jurídica | Especialistas em Direito Migratório', en: 'VMatos Legal Advisory | Immigration Law Specialists', es: 'VMatos Asesoría Jurídica | Especialistas en Derecho Migratorio', fr: 'VMatos Conseil Juridique | Spécialistes en Droit de l\'Immigration' },
        'migratorio_meta_description': { pt: 'Assessoria completa para vistos, cidadania e regularização migratória.', en: 'Complete advisory for visas, citizenship, and immigration regularization.', es: 'Asesoría completa para visados, ciudadanía y regularización migratoria.', fr: 'Conseil complet pour les visas, la citoyenneté et la régularisation de l\'immigration.' },
        'migratorio_home_title': { pt: 'Visto brasileiro, transporte e moradia em um só lugar.', en: 'Brazilian visa, transportation, and housing in one place.', es: 'Visado brasileño, transporte y alojamiento en un solo lugar.', fr: 'Visa brésilien, transport et logement en un seul endroit.' },
        'migratorio_home_subtitle': { pt: 'Sua história no Brasil começa aqui!', en: 'Your story in Brazil starts here!', es: '¡Tu historia en Brasil comienza aquí!', fr: 'Votre histoire au Brésil commence ici !' },
        'migratorio_pilar1_titulo': { pt: 'Nossa missão', en: 'Our Mission', es: 'Nuestra Misión', fr: 'Notre Mission' },
        'migratorio_pilar1_texto': {
            pt: `Na VMatos Assessoria, entendemos que a mudança para um novo país é um grande passo. Por isso, trabalhamos para tornar a sua chegada ao Brasil o mais fácil e acolhedora possível.`,
            en: `At VMatos Advisory, we understand that moving to a new country is a big step. Therefore, we work to make your arrival in Brazil as easy and welcoming as possible.`,
            es: `En VMatos Asesoría, entendemos que mudarse a un nuevo país es un gran paso. Por eso, trabajamos para que su llegada a Brasil sea lo más fácil y acogedora posible.`,
            fr: `Chez VMatos Conseil, nous comprenons que déménager dans un nouveau pays est une grande étape. C'est pourquoi nous nous efforçons de rendre votre arrivée au Brésil aussi simple et accueillante que possible.`
        },
        'migratorio_pilar2_titulo': { pt: 'Soluções estratégicas', en: 'Strategic Solutions', es: 'Soluciones Estratégicas', fr: 'Solutions Stratégiques' },
        'migratorio_pilar2_texto': {
            pt: `Oferecemos assessoria completa para obtenção do visto brasileiro, mas não paramos por aí: nossa missão é cuidar de você desde o momento em que pisa em solo brasileiro e para isso possuímos serviço de recepção no aeroporto com transfer privativo, levando você e suas malas com segurança e conforto ao seu destino.`,
            en: `We offer complete advisory for obtaining a Brazilian visa, but we don't stop there: our mission is to take care of you from the moment you set foot on Brazilian soil. For this, we provide an airport reception service with a private transfer, taking you and your luggage safely and comfortably to your destination.`,
            es: `Ofrecemos una asesoría completa para la obtención del visado brasileño, pero no nos detenemos ahí: nuestra misión es cuidar de usted desde el momento en que pisa suelo brasileño. Para ello, contamos con un servicio de recepción en el aeropuerto con traslado privado, llevándole a usted y sus maletas con seguridad y comodidad a su destino.`,
            fr: `Nous offrons un conseil complet pour l'obtention du visa brésilien, mais nous ne nous arrêtons pas là : notre mission est de prendre soin de vous dès l'instant où vous posez le pied sur le sol brésilien. Pour ce faire, nous disposons d'un service d'accueil à l'aéroport avec un transfert privé, vous transportant, vous et vos bagages, en toute sécurité et confort jusqu'à votre destination.`
        },
        'migratorio_pilar3_titulo': { pt: 'Foco no recomeço', en: 'Focus on a New Start', es: 'Enfoque en el Recomienzo', fr: 'Focus sur le Nouveau Départ' },
        'migratorio_pilar3_texto': {
            pt: `Pensamos em cada detalhe para que você possa se concentrar no que realmente importa: seu novo começo no Brasil.`,
            en: `We think of every detail so you can focus on what really matters: your new beginning in Brazil.`,
            es: `Pensamos en cada detalle para que usted pueda concentrarse en lo que realmente importa: su nuevo comienzo en Brasil.`,
            fr: `Nous pensons à chaque détail pour que vous puissiez vous concentrer sur ce qui compte vraiment : votre nouveau départ au Brésil.`
        },

        // =============================================
        // --- TRADUÇÕES PÁGINA: DIREITO DO CONSUMIDOR ---
        // =============================================
        'consumidor_page_title': { pt: 'VMatos Assessoria | Direito do Consumidor para Casas de Apostas', en: 'VMatos Advisory | Consumer Law for Betting Houses', es: 'VMatos Asesoría | Derecho del Consumidor para Casas de Apuestas', fr: 'VMatos Conseil | Droit de la Consommation pour les Maisons de Paris' },
        'consumidor_meta_description': { pt: 'Assessoria jurídica especializada em conflitos com casas de apostas online. Protegemos os seus direitos como consumidor.', en: 'Specialized legal advisory in conflicts with online betting houses. We protect your rights as a consumer.', es: 'Asesoría jurídica especializada en conflictos con casas de apuestas en línea. Protegemos sus derechos como consumidor.', fr: 'Conseil juridique spécialisé dans les conflits avec les maisons de paris en ligne. Nous protégeons vos droits en tant que consommateur.' },
        'consumidor_home_title': { pt: 'Problemas com casa de apostas online?', en: 'Problems with online betting houses?', es: '¿Problemas con casas de apuestas en línea?', fr: 'Problèmes avec les maisons de paris en ligne ?' },
        'consumidor_home_subtitle': { pt: 'Nós temos a solução!', en: 'We have the solution!', es: '¡Tenemos la solución!', fr: 'Nous avons la solution !' },
        'consumidor_pilar1_titulo': { pt: 'Atuação especializada', en: 'Specialized Practice', es: 'Actuación Especializada', fr: 'Action Spécialisée' },
        'consumidor_pilar1_texto': {
            pt: `Atuamos como assessoria jurídica especializada em solucionar conflitos relacionados a casas de apostas online, empregando nosso conhecimento e experiência para resguardar seu direito enquanto consumidor ou terceiro interessado.`,
            en: `We act as a specialized legal advisory to resolve conflicts related to online betting houses, using our knowledge and experience to safeguard your rights as a consumer or interested third party.`,
            es: `Actuamos como asesoría jurídica especializada en solucionar conflictos relacionados con casas de apuestas en línea, empleando nuestro conocimiento y experiencia para resguardar su derecho como consumidor o tercero interesado.`,
            fr: `Nous agissons en tant que conseil juridique spécialisé dans la résolution de conflits liés aux maisons de paris en ligne, en utilisant nos connaissances et notre expérience pour protéger vos droits en tant que consommateur ou tiers intéressé.`
        },
        'consumidor_pilar2_titulo': { pt: 'Abordagens técnicas', en: 'Technical Approaches', es: 'Enfoques Técnicos', fr: 'Approches Techniques' },
        'consumidor_pilar2_texto': {
            pt: `Com crescimento exponencial do mercado digital de jogos, aumenta-se também a complexidade legal, exigindo abordagens técnicas para garantir que seus direitos sejam resguardados.`,
            en: `With the exponential growth of the digital gaming market, legal complexity also increases, requiring technical approaches to ensure your rights are protected.`,
            es: `Con el crecimiento exponencial del mercado de juegos digitales, también aumenta la complejidad legal, exigiendo enfoques técnicos para garantizar que sus derechos sean protegidos.`,
            fr: `Avec la croissance exponentielle du marché des jeux numériques, la complexité juridique augmente également, nécessitant des approches techniques pour garantir la protection de vos droits.`
        },
        'consumidor_pilar3_titulo': { pt: 'Proteção legal', en: 'Legal Protection', es: 'Protección Legal', fr: 'Protection Légale' },
        'consumidor_pilar3_texto': {
            pt: `Nosso principal objetivo é assegurar a proteção legal de nossos clientes no universo das apostas online e restabelecer a justiça onde houver violação de garantias.`,
            en: `Our main objective is to ensure the legal protection of our clients in the world of online betting and to restore justice where there has been a violation of guarantees.`,
            es: `Nuestro principal objetivo es asegurar la protección legal de nuestros clientes en el universo de las apuestas en línea y restablecer la justicia donde haya habido una violación de garantías.`,
            fr: `Notre objectif principal est d'assurer la protection juridique de nos clients dans l'univers des paris en ligne et de rétablir la justice en cas de violation des garanties.`
        },

        // =============================================
        // --- TRADUÇÕES PÁGINA DO PORTAL ---
        // =============================================
        'consumidor_title': { pt: 'Direito do Consumidor', en: 'Consumer Law', es: 'Derecho del Consumidor', fr: 'Droit de la Consommation' },
        'consumidor_desc': { pt: 'Defesa especializada em conflitos com casas de apostas online.', en: 'Specialized defense in conflicts with online betting houses.', es: 'Defensa especializada en conflictos con casas de apuestas en línea.', fr: 'Défense spécialisée dans les conflits avec les maisons de paris en ligne.' },
        
        // =============================================
        // --- TRADUÇÕES COMUNS ---
        // =============================================
        'nav_home': { pt: 'Home', en: 'Home', es: 'Inicio', fr: 'Accueil' },
        'nav_about': { pt: 'Sobre Nós', en: 'About Us', es: 'Sobre Nosotros', fr: 'À Propos' },
        'nav_articles': { pt: 'Artigos', en: 'Articles', es: 'Artículos', fr: 'Articles' },
        'nav_contact': { pt: 'Contato', en: 'Contact', es: 'Contacto', fr: 'Contact' },
        'home_button': { pt: 'Fale Conosco', en: 'Contact Us', es: 'Hable con Nosotros', fr: 'Contactez-Nous' },
        'sobre_title': { pt: 'Nossa Abordagem', en: 'Our Approach', es: 'Nuestro Enfoque', fr: 'Notre Approche' },
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
        'footer_text': { pt: '© 2025 VMatos Assessoria Jurídica. Todos os direitos reservados.', en: '© 2025 VMatos Legal Advisory. All rights reserved.', es: '© 2025 VMatos Asesoría Jurídica. Todos los derechos reservados.', fr: '© 2025 VMatos Conseil Juridique. Tous droits réservés.' }
    };

    const translatePage = (language) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] && translations[key][language]) {
                if (element.tagName === 'META') {
                    element.setAttribute('content', translations[key][language]);
                } else if (element.tagName === 'TITLE') {
                    document.title = translations[key][language];
                } else {
                    element.innerHTML = translations[key][language];
                }
            }
        });
        document.documentElement.setAttribute('lang', language);
        const currentLangText = document.getElementById('current-lang-text');
        if (currentLangText) {
            currentLangText.textContent = language.toUpperCase();
        }
    };
    
    let currentVisibleSection = '#home';
    const sections = document.querySelectorAll('main section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                currentVisibleSection = `#${entry.target.id}`;
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => sectionObserver.observe(section));


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
                    
                    sessionStorage.setItem('scrollToSection', currentVisibleSection);

                    const selectedLang = button.getAttribute('data-lang');
                    langButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    localStorage.setItem('userLanguage', selectedLang);

                    if (window.location.pathname.includes('artigo.html') || document.getElementById('blog')) {
                        location.reload();
                    }
                    
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

    const savedLang = localStorage.getItem('userLanguage');
    const browserLang = navigator.language.substring(0, 2);
    let initialLang = 'pt';
    if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) {
        initialLang = savedLang;
    } else if (['pt', 'en', 'es', 'fr'].includes(browserLang)) {
        initialLang = browserLang;
    }
    
    const activeButton = langSwitcher.querySelector(`.lang-btn[data-lang="${initialLang}"]`);
    if (activeButton) {
        langSwitcher.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    setTimeout(() => {
        translatePage(initialLang);
    }, 100);

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
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
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
                const dotClickHandler = () => {
                    moveToSlide(index);
                    resetInterval();
                };
                dot.addEventListener('click', dotClickHandler);
                sobreEventListeners.push({
                    element: dot,
                    type: 'click',
                    handler: dotClickHandler
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
            const startAutoplay = () => {
                clearInterval(sobreIntervalId);
                sobreIntervalId = setInterval(advanceSlide, 4000);
            };
            const resetInterval = () => startAutoplay();
            const nextClickHandler = () => {
                advanceSlide();
                resetInterval();
            };
            const prevClickHandler = () => {
                moveToSlide((currentIndex - 1 + slides.length) % slides.length);
                resetInterval();
            };
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
	
	/* =============== LÓGICA DO POP-UP (COM REAPARECIMENTO) =============== */
    const popupOverlay = document.getElementById('popup-overlay');
    const closeBtn = document.querySelector('.popup-close-btn');
    const ctaBtn = document.querySelector('.popup-cta-btn');

    // --- [NOVO] Variáveis de controle ---
    let popupJaFoiFechado = false;
    let popupJaReapareceu = false;

    // Lógica para direcionar o botão para o WhatsApp
    if (ctaBtn) {
        const numeroWhatsApp = '5511952016791';
        const mensagemPadrao = 'Olá! Li um artigo no site e gostaria de mais informações.';
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemPadrao)}`;
        ctaBtn.href = linkWhatsApp;
        ctaBtn.target = '_blank';
        ctaBtn.rel = 'noopener noreferrer';
    }

    // Função para mostrar o pop-up
    function abrirPopup() {
        if (popupOverlay) {
            popupOverlay.style.display = 'flex';
        }
    }

    // --- [MODIFICADO] Função para fechar o pop-up ---
    function fecharPopup() {
        if (popupOverlay) {
            popupOverlay.style.display = 'none';
        }

        // Se é a primeira vez que o pop-up é fechado E ele ainda não reapareceu
        if (!popupJaFoiFechado && !popupJaReapareceu) {
            popupJaFoiFechado = true; // Marca que já foi fechado uma vez

            // Inicia um cronômetro para reabrir o pop-up
            setTimeout(() => {
                abrirPopup();
                popupJaReapareceu = true; // Marca que já reapareceu, para não repetir
            }, 45000); // 45000 milissegundos = 45 segundos
        }
    }

    // --- EVENTOS ---
    // 1. Mostrar o pop-up inicial após 1.5 segundos
    setTimeout(abrirPopup, 1500);

    // 2. Fechar ao clicar no botão 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', fecharPopup);
    }

    // 3. Fechar ao clicar fora da caixa (no overlay)
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (event) => {
            if (event.target === popupOverlay) {
                fecharPopup();
            }
        });
    }
	
});