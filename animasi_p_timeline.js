document.addEventListener('DOMContentLoaded', function() {
    // Get all blocks and paragraphs
    const blocks = document.querySelectorAll('.block');
    const paragraphs = document.querySelectorAll('p');
    
    // Check if elements are visible on scroll
    function checkVisibility() {
      // Animate blocks
      blocks.forEach(block => {
        const blockTop = block.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (blockTop < windowHeight * 0.85) {
          block.classList.add('active');
        }
      });
      
      // Animate paragraphs with a slight delay
      paragraphs.forEach(paragraph => {
        const paraTop = paragraph.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (paraTop < windowHeight * 0.85) {
          setTimeout(() => {
            paragraph.classList.add('active');
          }, 200);
        }
      });
    }
    
    // Initial check
    checkVisibility();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkVisibility);
  });