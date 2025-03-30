// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(entry.target.classList.contains('parallax__content')) {
                entry.target.classList.add('aktif');
            }
            entry.target.classList.add('aktif');
        }
    });
}, { threshold: 0.3 });

// Observe elements
document.querySelectorAll('.parallax__content, .timeline-item').forEach((el, index) => {
    if(el.classList.contains('timeline-item')) {
        el.style.setProperty('--index', index);
    }
    observer.observe(el);
});