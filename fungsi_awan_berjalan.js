const parallaxLayer = document.querySelector('[data-parallax-layer="2"]');
let mouseMovementX = 0;

// Efek mouse movement
window.addEventListener('mousemove', (e) => {
    // Hitung pergerakan mouse dengan sensitivitas yang dapat disesuaikan
    mouseMovementX = (e.clientX - window.innerWidth / 2) / 50;

    // Gabungkan mouse movement dengan animasi scroll
    requestAnimationFrame(() => {
        parallaxLayer.style.transform = `translateX(${mouseMovementX}px)`;
    });
});

// Kembalikan posisi jika mouse tidak bergerak
window.addEventListener('mouseleave', () => {
    parallaxLayer.style.transform = 'translateX(0)';
});