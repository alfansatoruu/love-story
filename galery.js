
const carouselDiv = document.querySelector('.curved-carousel');
const controlsDiv = document.createElement('div');
controlsDiv.className = 'carousel-controls';
controlsDiv.innerHTML = `
  <button class="backwards">BACKWARDS</button>
  <button class="stop">STOP</button>
  <button class="forwards">FORWARDS</button>
`;
carouselDiv.appendChild(controlsDiv);


const track = document.querySelector('.carousel-track');
const images = track.querySelectorAll('img');
let currentIndex = 5;
let isPlaying = false;
let intervalId = null;
const animationDuration = 3000;


function updateCarousel() {
    images.forEach((img, index) => {
        img.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

        const offset = index - currentIndex;

        if (offset >= -5 && offset <= 5) {

            const xPosition = offset * 150;
            const zPosition = Math.abs(offset) * -50;
            const rotation = offset * -10;
            const opacity = 1 - Math.min(Math.abs(offset) * 0.1, 0.5);

            img.style.transform = `translateX(${xPosition}px) translateZ(${zPosition}px) rotateY(${rotation}deg)`;
            img.style.opacity = opacity;
            img.style.zIndex = 10 - Math.abs(offset);
        } else {

            img.style.opacity = '0';
            if (offset < 0) {
                img.style.transform = 'translateX(-800px) translateZ(-400px) rotateY(50deg)';
            } else {
                img.style.transform = 'translateX(800px) translateZ(-400px) rotateY(-50deg)';
            }
        }
    });
}


updateCarousel();


function moveForward() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateCarousel();
    } else {

        currentIndex = 0;
        updateCarousel();
    }
}


function moveBackward() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    } else {

        currentIndex = images.length - 1;
        updateCarousel();
    }
}


function startAutoplay() {
    if (!isPlaying) {
        isPlaying = true;
        intervalId = setInterval(moveForward, animationDuration);
        document.querySelector('.stop').textContent = 'STOP';
    }
}


function stopAutoplay() {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(intervalId);
        document.querySelector('.stop').textContent = 'PLAY';
    }
}


document.querySelector('.backwards').addEventListener('click', () => {
    stopAutoplay();
    moveBackward();
});

document.querySelector('.forwards').addEventListener('click', () => {
    stopAutoplay();
    moveForward();
});

document.querySelector('.stop').addEventListener('click', () => {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
});


startAutoplay();


let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {

        stopAutoplay();
        moveForward();
    } else if (touchEndX > touchStartX + swipeThreshold) {

        stopAutoplay();
        moveBackward();
    }
}