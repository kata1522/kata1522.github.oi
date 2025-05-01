document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para los Likes
    const likeButtons = document.querySelectorAll('.likes');
    
    likeButtons.forEach(like => {
        // Cargar likes desde localStorage
        const postId = like.closest('.blog-card').getAttribute('data-id') || Date.now().toString();
        const storedLikes = localStorage.getItem(`likes-${postId}`);
        
        if(storedLikes) {
            const likeCount = like.querySelector('span') || document.createElement('span');
            likeCount.textContent = storedLikes;
            like.appendChild(likeCount);
        }

        like.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLikes = parseInt(this.querySelector('span').textContent) || 0;
            const newLikes = currentLikes + 1;
            
            this.querySelector('span').textContent = newLikes;
            this.classList.add('liked');
            
            // Guardar en localStorage
            const card = this.closest('.blog-card');
            const id = card.getAttribute('data-id') || Date.now().toString();
            card.setAttribute('data-id', id);
            localStorage.setItem(`likes-${id}`, newLikes);
            
            // Animación temporal
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Funcionalidad para el Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if(!validateEmail(email)) {
                alert('Por favor ingresa un correo electrónico válido');
                return;
            }

            try {
                // Simulación de envío a Formspree
                const response = await fetch('https://formspree.io/f/your-form-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email })
                });

                if(response.ok) {
                    showMessage('¡Gracias por suscribirte!', 'success');
                    emailInput.value = '';
                    localStorage.setItem('subscribed', 'true');
                } else {
                    showMessage('Error al suscribirte. Intenta nuevamente.', 'error');
                }
            } catch (error) {
                showMessage('Error de conexión. Intenta más tarde.', 'error');
            }
        });
    }

    // Funciones auxiliares
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(text, type) {
        const existingMessage = document.querySelector('.form-message');
        if(existingMessage) existingMessage.remove();

        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        
        newsletterForm.parentNode.insertBefore(message, newsletterForm.nextSibling);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Lightbox para videos locales
    const videoLightbox = document.querySelector('.video-lightbox');
    const videoPlayer = document.getElementById('video-player');
    const closeBtn = document.querySelector('.close-lightbox');

    // Abrir lightbox
    document.querySelectorAll('.video-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            const videoPath = this.dataset.video;
            videoPlayer.querySelector('source').src = videoPath;
            videoPlayer.load();
            videoLightbox.classList.add('active');
            videoPlayer.play();
        });
    });

    // Cerrar lightbox
    function closeLightbox() {
        videoLightbox.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.querySelector('source').src = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    videoLightbox.addEventListener('click', e => e.target === videoLightbox && closeLightbox());
    document.addEventListener('keydown', e => e.key === 'Escape' && closeLightbox());

    // Menú Hamburguesa (compartido)
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    document.addEventListener('click', e => {
        if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });
});