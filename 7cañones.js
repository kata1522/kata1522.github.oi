document.addEventListener('DOMContentLoaded', function() {
    // ==================== MENÚ HAMBURGUESA ====================
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // ==================== FORMULARIO NEWSLETTER ====================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if(!validateEmail(email)) {
                showMessage('Por favor ingresa un correo válido', 'error');
                return;
            }

            try {
                // Simulación de envío a API
                await new Promise(resolve => setTimeout(resolve, 1000));
                showMessage('¡Gracias por suscribirte!', 'success');
                emailInput.value = '';
            } catch (error) {
                showMessage('Error de conexión', 'error');
            }
        });
    }

    // ==================== SISTEMA DE LIKES ====================
    document.querySelectorAll('.likes').forEach(like => {
        like.addEventListener('click', function() {
            const counter = this.querySelector('span');
            counter.textContent = parseInt(counter.textContent) + 1;
            this.classList.add('liked');
            setTimeout(() => this.classList.remove('liked'), 1000);
        });
    });

    // ==================== SCROLL SUAVE ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== LIGHTBOX ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('image-title');
    const lightboxDesc = document.getElementById('image-description');
    let currentImageIndex = 0;
    let totalImages = 0;

    // Abrir lightbox
    document.querySelectorAll('.dress-card').forEach((card, index, array) => {
        card.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = card.querySelector('img').src;
            lightboxTitle.textContent = card.querySelector('h3').textContent;
            lightboxDesc.textContent = card.querySelector('p').textContent;
            currentImageIndex = index;
            totalImages = array.length;
        });
    });

    // Cerrar lightbox
    document.querySelector('.close-btn').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.classList.remove('active');
    });

    // Navegación
    document.querySelector('.prev-btn').addEventListener('click', showPrevImage);
    document.querySelector('.next-btn').addEventListener('click', showNextImage);

    // Teclado
    document.addEventListener('keydown', (e) => {
        if(lightbox.classList.contains('active')) {
            if(e.key === 'Escape') lightbox.classList.remove('active');
            if(e.key === 'ArrowLeft') showPrevImage();
            if(e.key === 'ArrowRight') showNextImage();
        }
    });

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        const currentCard = document.querySelectorAll('.dress-card')[currentImageIndex];
        lightboxImg.src = currentCard.querySelector('img').src;
        lightboxTitle.textContent = currentCard.querySelector('h3').textContent;
        lightboxDesc.textContent = currentCard.querySelector('p').textContent;
    }

    // ==================== FUNCIONES AUXILIARES ====================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        
        if(newsletterForm) {
            newsletterForm.parentNode.insertBefore(message, newsletterForm.nextSibling);
            setTimeout(() => message.remove(), 5000);
        }
    }
});

// Datos de los cañones (debes completar con tus imágenes y textos)
const canonData = [
    {
        front: 'img/fondo2.png',
        back: 'img/Codigoprueba.png',
        title: 'Cañón Manual de Confeti',
        desc: 'Confeti clásico en colores pastel'
    },
    {
        front: 'img/Codigoprueba.png', 
        back: 'img/Cañonpastel.jfif',
        title: 'Cañón Premium',
        desc: 'Confeti metálico con efecto brillante'
    },
    // Agregar más elementos según sea necesario
];

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const lightbox = document.querySelector('.canon-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const imageTitle = document.querySelector('.image-title');
    const imageDesc = document.querySelector('.image-desc');
    let currentIndex = 0;

    // Evento click en las cartas
    document.querySelectorAll('.canon-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            openLightbox();
        });
    });
    

    // Función para abrir el lightbox
    function openLightbox() {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll
    }

    // Función para actualizar el contenido
    function updateLightbox() {
        const currentCanon = canonData[currentIndex];
        lightboxImage.src = currentCanon.back;
        imageTitle.textContent = currentCanon.title;
        imageDesc.textContent = currentCanon.desc;
    }

    // Navegación
    function navigate(direction) {
        currentIndex += direction;
        
        // Lógica para ciclo infinito
        if(currentIndex < 0) currentIndex = canonData.length - 1;
        if(currentIndex >= canonData.length) currentIndex = 0;
        
        updateLightbox();
    }

    // Controles de navegación
    document.querySelector('.prev-btn').addEventListener('click', () => navigate(-1));
    document.querySelector('.next-btn').addEventListener('click', () => navigate(1));

    // Control por teclado
    document.addEventListener('keydown', (e) => {
        if(lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'ArrowRight':
                    navigate(1);
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        }
    });

    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Eventos de cierre
    document.querySelector('.close-btn').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
});