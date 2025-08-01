document.addEventListener('DOMContentLoaded', function() {
    
    // --- Typing Effect ---
    const words = ["BCA Final Year Student", "Tech Enthusiast", "Future AI Developer"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-effect');

    // Make sure the element exists before trying to use it
    if (typingElement) {
        function type() {
            if (i === words.length) i = 0;
            currentWord = words[i];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, j - 1);
                j--;
                if (j === 0) {
                    isDeleting = false;
                    i++;
                }
            } else {
                typingElement.textContent = currentWord.substring(0, j + 1);
                j++;
                if (j === currentWord.length) {
                    // Add a delay before starting to delete
                    setTimeout(() => { isDeleting = true; }, 1000);
                }
            }
            
            const typeSpeed = isDeleting ? 50 : 150;
            // Add a longer delay when a new word starts typing
            const delay = (j === currentWord.length && !isDeleting) ? 2000 : typeSpeed;
            setTimeout(type, delay);
        }
        type();
    }


    // --- Spotlight and 3D Tilt Effect ---
    const spotlight = document.querySelector('.spotlight');
    const introText = document.querySelector('.intro-text');

    if (spotlight && introText) {
        document.addEventListener('mousemove', (e) => {
            // Spotlight follows cursor
            spotlight.style.left = e.pageX + 'px';
            spotlight.style.top = e.pageY + 'px';
            
            // 3D Tilt effect
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xRotation = ((clientY / innerHeight) - 0.5) * -15; // Max rotation 15deg
            const yRotation = ((clientX / innerWidth) - 0.5) * 15;  // Max rotation 15deg
            
            introText.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        // Reset tilt when mouse leaves the window
        document.addEventListener('mouseleave', () => {
            introText.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }
});