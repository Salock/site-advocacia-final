document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        'page_title': { pt: 'VMatos Assessoria Jurídica | Assessoria Jurídica Especializada', en: 'VMatos Assessoria Jurídica | Specialized Legal Advisory', es: 'VMatos Assessoria Jurídica | Asesoría Jurídica Especializada', fr: 'VMatos Assessoria Jurídica | Conseil Juridique Spécialisé' },
        'meta_description': { pt: 'Assessoria jurídica especializada em Direito Imobiliário e Direito Migratório.', en: 'Specialized legal advisory in Real Estate Law and Immigration Law.', es: 'Asesoría jurídica especializada en Derecho Inmobiliario y Derecho Migratorio.', fr: 'Conseil juridique spécialisé en Droit Immobilier et Droit de l\'Immigration.' },
        'portal_tagline': { pt: 'Selecione a área de atuação para iniciar sua consulta.', en: 'Select the practice area to start your consultation.', es: 'Seleccione el área de práctica para iniciar su consulta.', fr: 'Sélectionnez le domaine de pratique pour commencer votre consultation.' },
        'imobiliario_title': { pt: 'Direito Imobiliário', en: 'Real Estate Law', es: 'Derecho Inmobiliario', fr: 'Droit Immobilier' },
        'imobiliario_desc': { pt: 'Soluções para a compra, venda e regularização do seu imóvel.', en: 'Solutions for the purchase, sale, and regularization of your property.', es: 'Soluciones para la compra, venta y regularización de su inmueble.', fr: 'Solutions pour l\'achat, la vente et la régularisation de votre bien immobilier.' },
        'migratorio_title': { pt: 'Direito Migratório', en: 'Immigration Law', es: 'Derecho Migratorio', fr: 'Droit de l\'Immigration' },
        'migratorio_desc': { pt: 'Assessoria para vistos, cidadania e residência no país.', en: 'Advisory for visas, citizenship, and residency in the country.', es: 'Asesoría para visas, ciudadanía y residencia en el país.', fr: 'Conseil pour les visas, la citoyenneté et la résidence dans le pays.' },
        
        /* --- NOVAS TRADUÇÕES ADICIONADAS --- */
        'consumidor_title': { pt: 'Direito do Consumidor e Casa de Apostas Online', en: 'Consumer Law & Online Betting Houses', es: 'Derecho del Consumidor y Casas de Apuestas en Línea', fr: 'Droit de la Consommation & Maisons de Paris en Ligne' },
        'consumidor_desc': { pt: 'Defesa especializada em conflitos com casas de apostas online.', en: 'Specialized defense in conflicts with online betting houses.', es: 'Defensa especializada en conflictos con casas de apuestas en línea.', fr: 'Défense spécialisée dans les conflits avec les maisons de paris en ligne.' },

        'footer_text': { pt: '© 2025 VMatos Assessoria Jurídica. Todos os direitos reservados.', en: '© 2025 VMatos Assessoria Jurídica. All rights reserved.', es: '© 2025 VMatos Assessoria Jurídica. Todos los derechos reservados.', fr: '© 2025 VMatos Assessoria Jurídica. Tous droits réservés.' }
    };

    const langSwitcher = document.querySelector('.language-switcher');
    
    if (!langSwitcher) return;

    const langToggleButton = langSwitcher.querySelector('.lang-toggle-btn');
    const langButtons = langSwitcher.querySelectorAll('.lang-btn');
    const currentLangText = document.getElementById('current-lang-text');

    const translatePage = (language) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] && translations[key][language]) {
                if (element.tagName === 'META') {
                    element.setAttribute('content', translations[key][language]);
                } else {
                    element.innerHTML = translations[key][language];
                }
            }
        });
        document.documentElement.setAttribute('lang', language);
        if (currentLangText) {
            currentLangText.textContent = language.toUpperCase();
        }
    };

    if (langToggleButton && langButtons.length > 0) {
        langToggleButton.addEventListener('click', (event) => {
            event.stopPropagation();
            langSwitcher.classList.toggle('is-open');
        });

        langButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedLang = button.getAttribute('data-lang');
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                translatePage(selectedLang);
                localStorage.setItem('userLanguage', selectedLang);
            });
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
    translatePage(initialLang);

    document.addEventListener('click', () => {
        if (langSwitcher.classList.contains('is-open')) {
            langSwitcher.classList.remove('is-open');
        }
    });
});