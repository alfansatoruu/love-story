document.addEventListener("DOMContentLoaded", () => {
  // Ensure ScrollTrigger is registered
  gsap.registerPlugin(ScrollTrigger);

  // Select the parallax container
  const parallaxContainer = document.querySelector('[data-parallax-layers]');
  
  if (!parallaxContainer) {
    console.error('Parallax container not found');
    return;
  }

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: parallaxContainer,
      start: "0% 0%",
      end: "100% 0%",
      scrub: 0
    }
  });

  const layers = [
    { layer: "1", yPercent: 70 },
    { layer: "2", yPercent: 55 },
    { layer: "3", yPercent: 40 },
    { layer: "4", yPercent: 10 }
  ];

  layers.forEach((layerObj, idx) => {
    // Use more specific selector and log for debugging
    const layerElements = parallaxContainer.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
    
    if (layerElements.length === 0) {
      console.warn(`No elements found for layer ${layerObj.layer}`);
      return;
    }

    tl.to(
      layerElements,
      {
        yPercent: layerObj.yPercent,
        ease: "none"
      },
      idx === 0 ? undefined : "<"
    );
  });
});

// Lenis smooth scrolling setup
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);