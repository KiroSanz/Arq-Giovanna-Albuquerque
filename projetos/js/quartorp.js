// Carrossel de Imagens
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}

// Auto-avanço (opcional)
setInterval(() => {
    moveSlide(1);
}, 5000);

// Menu Mobile (se já não tiver no seu JS)
document.getElementById('menuMobile').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
});

// Navbar scroll effect - Versão otimizada
function handleScroll() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');
    const navLinks = document.querySelectorAll('nav ul li a');
    const menuIcon = document.querySelector('.menu-mobile i');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        // Otimização: Evita redesenhos desnecessários
        requestAnimationFrame(() => {
            navLinks.forEach(link => {
                link.style.color = '#333';
            });
            if (menuIcon) menuIcon.style.color = '#333';
        });
    } else {
        header.classList.remove('scrolled');
        requestAnimationFrame(() => {
            navLinks.forEach(link => {
                link.style.color = '';
            });
            if (menuIcon) menuIcon.style.color = '';
        });
    }
}

// Menu Mobile - Versão otimizada
function setupMobileMenu() {
    const menuBtn = document.getElementById('menuMobile');
    if (!menuBtn) return;
    
    const nav = document.querySelector('nav ul');
    const icon = menuBtn.querySelector('i');
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Adiciona/remove classe no body para bloquear scroll
        document.body.classList.toggle('no-scroll', nav.classList.contains('show'));
    });
    
    // Fecha o menu ao clicar em links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
                document.body.classList.remove('no-scroll');
            }
        });
    });
}

// Smooth Scroll melhorado
function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Considera altura da navbar
                        behavior: 'smooth'
                    });
                    history.replaceState(null, null, targetId);
                }
            }
        });
    });
}

// Fecha menu ao redimensionar para desktop
function handleResize() {
    const nav = document.querySelector('nav ul');
    const icon = document.querySelector('.menu-mobile i');
    
    if (window.innerWidth > 768 && nav.classList.contains('show')) {
        nav.classList.remove('show');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
        document.body.classList.remove('no-scroll');
    }
}

    // Versão robusta do carregamento
    document.addEventListener('DOMContentLoaded', function() {
        // Garante que o HTML já está completamente parseado
        document.documentElement.classList.add('loaded');
        
        // Fallback caso ainda não esteja visível
        setTimeout(function() {
            if (getComputedStyle(document.documentElement).visibility === 'hidden') {
                document.documentElement.style.visibility = 'visible';
                document.documentElement.style.opacity = 1;
            }
        }, 1000);
    });
    
    // Fallback adicional para browsers muito antigos
    window.addEventListener('load', function() {
        document.documentElement.classList.add('loaded');
    });