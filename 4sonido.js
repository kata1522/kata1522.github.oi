// Función para detectar tipo de media
function handleMediaPreview() {
    document.querySelectorAll('.media-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            const media = this.dataset.media;
            
            if(media) { // Si es video
                const videoPlayer = document.getElementById('video-player');
                videoPlayer.querySelector('source').src = media;
                videoPlayer.load();
                document.querySelector('.video-lightbox').classList.add('active');
                videoPlayer.play();
            } else { // Si es imagen
                const imgSrc = this.style.backgroundImage.slice(5, -2);
                openImageLightbox(imgSrc, this.querySelector('h3').textContent);
            }
        });
    });
}

// Lightbox para imágenes
function openImageLightbox(src, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox active';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${title}">
            <h3>${title}</h3>
            <button class="close-lightbox"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
        lightbox.remove();
    });
}

// Agregar al DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    handleMediaPreview();
    // ... resto del código existente
});