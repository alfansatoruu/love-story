document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const parallaxContainer = document.querySelector('[data-parallax-layers]');
  if (!parallaxContainer) {
    console.error('Parallax container not found');
    return;
  }

  // Ambil semua layer yang ada dan urutkan berdasarkan posisi Z-index
  const layers = gsap.utils.toArray('[data-parallax-layer]').sort((a, b) => 
    +window.getComputedStyle(a).zIndex - +window.getComputedStyle(b).zIndex
  );

  const yPercents = [70, 55, 40, 10]; // Nilai offset yang sama

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: parallaxContainer,
      start: "0% 0%",
      end: "100% 0%",
      scrub: 0
    }
  });

  layers.forEach((layer, idx) => {
    tl.to(
      layer,
      {
        yPercent: yPercents[idx],
        ease: "none"
      },
      idx === 0 ? undefined : "<"
    );
  });
});

// Konfigurasi Lenis tetap sama
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);