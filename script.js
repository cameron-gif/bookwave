document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Mobile ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const topNav = document.querySelector('.top-nav');

    mobileMenuBtn.addEventListener('click', () => {
        topNav.classList.toggle('active');
        const isExpanded = topNav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                topNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            }
        });
    });

    // Dados de exemplo para as histórias (mockados por enquanto)
    const allDummyStories = [
        { id: 1, title: 'O Último Suspiro do Dragão', author: 'Elara Vance', genre: 'Fantasia', cover: 'images/placeholder-cover.png' },
        { id: 2, title: 'Cibernética de Nova Tóquio', author: 'Kaito Yamada', genre: 'Ficção Científica', cover: 'images/placeholder-cover.png' },
        { id: 3, title: 'Amor à Primeira Byte', author: 'Sophie Clarke', genre: 'Romance', cover: 'images/placeholder-cover.png' },
        { id: 4, title: 'O Mistério da Mansão Blackwood', author: 'Arthur Pendelton', genre: 'Mistério', cover: 'images/placeholder-cover.png' },
        { id: 5, title: 'A Sombra do Corvo', author: 'Lena Thorne', genre: 'Terror', cover: 'images/placeholder-cover.png' },
        { id: 6, title: 'Entre Estrelas Cadentes', author: 'Maya Alani', genre: 'Romance', cover: 'images/placeholder-cover.png' },
        { id: 7, title: 'Reino Submerso', author: 'Driftwood Chronicles', genre: 'Aventura', cover: 'images/placeholder-cover.png' },
        { id: 8, title: 'Códigos Antigos', author: 'Cipher', genre: 'Suspense', cover: 'images/placeholder-cover.png' },
        { id: 9, title: 'A Ascensão dos Elementais', author: 'Anya Sharma', genre: 'Fantasia', cover: 'images/placeholder-cover.png' },
        { id: 10, title: 'Crônicas do Apocalipse Zumbi', author: 'Marcus V.', genre: 'Terror', cover: 'images/placeholder-cover.png' },
        { id: 11, title: 'O Enigma do Relógio Quebrado', author: 'Clara Beaumont', genre: 'Mistério', cover: 'images/placeholder-cover.png' },
        { id: 12, title: 'O Futuro Esquecido', author: 'Zoe Collins', genre: 'Ficção Científica', cover: 'images/placeholder-cover.png' },
        { id: 13, title: 'Coração de Rubi', author: 'Lia Martinez', genre: 'Romance', cover: 'images/placeholder-cover.png' },
        { id: 14, title: 'A Maldição da Fênix', author: 'Kai Anderson', genre: 'Fantasia', cover: 'images/placeholder-cover.png' },
        { id: 15, title: 'O Último Refúgio', author: 'Ethan Hunt', genre: 'Aventura', cover: 'images/placeholder-cover.png' },
        { id: 16, title: 'Segredos da Cidade Oculta', author: 'Sophia Gray', genre: 'Mistério', cover: 'images/placeholder-cover.png' },
        { id: 17, title: 'O Chamado das Profundezas', author: 'River Song', genre: 'Terror', cover: 'images/placeholder-cover.png' },
        { id: 18, title: 'Conexões Interplanetárias', author: 'Jax Orion', genre: 'Ficção Científica', cover: 'images/placeholder-cover.png' },
    ];


    // --- Carregar Histórias em Destaque (APENAS SE ESTIVER NA PÁGINA INICIAL) ---
    const featuredStoriesGrid = document.getElementById('featured-stories');
    if (featuredStoriesGrid) {
        const homepageStories = allDummyStories.slice(0, 8); 

        function loadFeaturedStories() {
            featuredStoriesGrid.innerHTML = '';
            homepageStories.forEach(story => {
                const storyCard = document.createElement('a');
                storyCard.href = `#story-${story.id}`; 
                storyCard.classList.add('story-card');
                storyCard.setAttribute('aria-label', `Leia a história ${story.title} por ${story.author}`);

                storyCard.innerHTML = `
                    <img src="${story.cover}" alt="Capa de ${story.title}" loading="lazy">
                    <div class="story-card-info">
                        <h3>${story.title}</h3>
                        <p>Por ${story.author}</p>
                        <span class="genre-tag">${story.genre}</span>
                    </div>
                `;
                featuredStoriesGrid.appendChild(storyCard);
            });
        }
        loadFeaturedStories();
    }


    // --- Carregar TODAS as Histórias na Página Explorar ---
    const allStoriesList = document.getElementById('all-stories-list');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfoSpan = document.getElementById('page-info');

    const storiesPerPage = 6;
    let currentPage = 1;

    function renderStories(storiesToRender, targetElement) {
        if (!targetElement) return;
        targetElement.innerHTML = ''; 
        
        const emptyMessageId = targetElement.id.replace('-list', '-empty-state');
        const emptyMessageElement = document.getElementById(emptyMessageId);

        if (storiesToRender.length === 0) {
            targetElement.style.display = 'none';
            if(emptyMessageElement) emptyMessageElement.style.display = 'block';
        } else {
            targetElement.style.display = 'grid';
            if(emptyMessageElement) emptyMessageElement.style.display = 'none';
        }

        storiesToRender.forEach(story => {
            const storyCard = document.createElement('a');
            storyCard.href = `#story-${story.id}`; 
            storyCard.classList.add('story-card');
            storyCard.setAttribute('aria-label', `Leia a história ${story.title} por ${story.author}`);

            storyCard.innerHTML = `
                <img src="${story.cover}" alt="Capa de ${story.title}" loading="lazy">
                <div class="story-card-info">
                    <h3>${story.title}</h3>
                    <p>Por ${story.author}</p>
                    <span class="genre-tag">${story.genre}</span>
                </div>
            `;
            targetElement.appendChild(storyCard);
        });
    }

    function updatePaginationControls() {
        if (!pageInfoSpan) return;
        const totalPages = Math.ceil(allDummyStories.length / storiesPerPage);
        pageInfoSpan.textContent = `Página ${currentPage} de ${totalPages}`;

        if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
    }

    function loadAllStories() {
        if (!allStoriesList) return; 

        const startIndex = (currentPage - 1) * storiesPerPage;
        const endIndex = startIndex + storiesPerPage;
        const storiesToDisplay = allDummyStories.slice(startIndex, endIndex);

        renderStories(storiesToDisplay, allStoriesList);
        updatePaginationControls();
    }

    if (allStoriesList) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadAllStories();
            }
        });

        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(allDummyStories.length / storiesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                loadAllStories();
            }
        });
        loadAllStories();
    }


    // --- Lógica das Abas da Minha Biblioteca ---
    const tabButtons = document.querySelectorAll('.library-tabs .tab-button');
    const tabContents = document.querySelectorAll('.library-main .tab-content');

    const favoriteStories = allDummyStories.slice(0, 3); 
    const readStories = allDummyStories.slice(3, 6);   
    const publishedStories = []; 

    function activateTab(tabId) {
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`${tabId}-content`);

        if (activeButton) activeButton.classList.add('active');
        if (activeContent) {
            activeContent.classList.add('active');
            if (tabId === 'favorites') {
                renderStories(favoriteStories, document.getElementById('favorites-list'));
            } else if (tabId === 'read') {
                renderStories(readStories, document.getElementById('read-list'));
            } else if (tabId === 'published') {
                renderStories(publishedStories, document.getElementById('published-list'));
            }
        }
    }

    if (document.body.classList.contains('library-page')) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                activateTab(tabId);
            });
        });
        activateTab('favorites');
    }


    // --- Gerenciar Links de Navegação Ativos ---
    const navLinks = document.querySelectorAll('.nav-link');
    const userActionButtons = document.querySelectorAll('.user-actions .btn');

    function activateNavLink() {
        // Obter o nome do arquivo HTML atual (ex: 'index.html', 'explorar.html', etc.)
        const currentPath = window.location.pathname.split('/').pop();

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove 'active' de todos os links primeiro
            const linkHref = link.getAttribute('href');

            // Verifica se o link aponta para o arquivo HTML atual
            if (linkHref === currentPath) {
                link.classList.add('active');
            } 
            // Lógica especial para o link "Início" quando na página raiz ou index.html
            else if (currentPath === '' && linkHref === 'index.html#inicio') {
                link.classList.add('active');
            }
            // Lógica para links de âncora dentro da própria página index.html
            else if (currentPath === 'index.html' && linkHref.startsWith('index.html#')) {
                const sections = document.querySelectorAll('section, footer');
                let currentActiveSectionId = '';
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    // Considera a seção ativa se estiver pelo menos 30% visível na tela
                    if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3) {
                        currentActiveSectionId = section.id;
                    }
                });
                if (linkHref === `index.html#${currentActiveSectionId}`) {
                    link.classList.add('active');
                }
            }
        });

        // Lógica para ativar botões de Login/Cadastro no header (se houver)
        userActionButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === currentPath) {
                btn.classList.add('active');
            }
        });
    }

    // Ativa o link ao carregar a página e ao rolar/redimensionar
    activateNavLink();
    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('resize', activateNavLink);
    window.addEventListener('hashchange', activateNavLink); // Importante para links de âncora


    // --- Funcionalidade de Tema Escuro (Dark Theme) ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Ativar tema claro');
        } else {
            body.classList.remove('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Ativar tema escuro');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});