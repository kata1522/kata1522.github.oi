document.addEventListener('DOMContentLoaded', () => {
    const postres = [];
    const lightbox = document.querySelector('.postres-lightbox');
    const zoomedImage = document.querySelector('.zoomed-image');
    const imageDesc = document.querySelector('.image-desc');
    let currentIndex = 0;
    let currentImages = [];

    // Inicializar datos
    document.querySelectorAll('.postre-card').forEach((card, index) => {
        const images = card.dataset.images.split(',');
        postres.push({
            images: images,
            description: card.querySelector('.postre-back p').textContent
        });

        card.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = 0;
            currentImages = images;
            openLightbox();
        });
    });

    // Lightbox
    function openLightbox() {
        lightbox.classList.add('active');
        updateImage();
        setTimeout(() => {
            zoomedImage.classList.add('active');
        }, 50);
    }

    function updateImage() {
        zoomedImage.src = currentImages[currentIndex];
        imageDesc.textContent = postres.find(p => p.images.includes(currentImages[currentIndex])).description;
    }

    // Navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentIndex = btn.classList.contains('prev-btn') 
                ? (currentIndex - 1 + currentImages.length) % currentImages.length 
                : (currentIndex + 1) % currentImages.length;
            updateImage();
        });
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if(lightbox.classList.contains('active')) {
            if(e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                updateImage();
            }
            if(e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentImages.length;
                updateImage();
            }
            if(e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // Cerrar
    function closeLightbox() {
        zoomedImage.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.remove('active');
        }, 300);
    }

    document.querySelector('.close-btn').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
});