// NAVBAR SCROLL EFFECT - Versão melhorada
function handleScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    const scrollClass = 'scrolled';
    const shouldAddClass = window.scrollY > 100;
    
    // Otimização: usa classList.toggle com condição
    header.classList.toggle(scrollClass, shouldAddClass);
    
    // Aplica estilos apenas se os elementos existirem
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.style.width = shouldAddClass ? '250px' : '350px';
    }
    
    // Menu mobile - versão simplificada
    const menuIcon = document.querySelector('.menu-mobile');
    if (menuIcon) {
        menuIcon.style.color = shouldAddClass ? '#333' : '#ECE9E0';
    }
}

// MENU MOBILE - Versão corrigida e simplificada
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-mobile');
    if (!menuBtn) return;
    
    const navMenu = document.querySelector('nav ul');
    if (!navMenu) return;
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede a propagação do evento
        navMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll', navMenu.classList.contains('show'));
        
        // Altera o ícone (se estiver usando Font Awesome)
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
// Fecha o menu ao clicar em links ou fora do menu
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && e.target !== menuBtn) {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');

        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});

// SMOOTH SCROLL - Mantendo a versão otimizada
function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                const navMenu = document.querySelector('nav ul.show');
                if (navMenu) {
                    navMenu.classList.remove('show');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
}

// RESIZE HANDLER - Corrigido para mobile
function handleResize() {
    const navMenu = document.querySelector('nav ul');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
        
        const menuIcon = document.querySelector('.menu-mobile i');
        if (menuIcon) {
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        }
    }
}

// INITIALIZATION - Versão robusta
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona classe de loaded
    document.documentElement.classList.add('loaded');
    
    // Configura eventos
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Inicializa componentes
    setupMobileMenu();
    setupSmoothScroll();
    
    // Dispara o scroll handler uma vez para estado inicial
    handleScroll();
});

// Fallback para garantir que tudo carregou
window.addEventListener('load', function() {
    document.documentElement.classList.add('loaded');
})};

