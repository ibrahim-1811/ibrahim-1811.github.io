
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Typing Effect for Header
       ========================================= */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "Mohammad Ibrahim Memon"; // Or whatever text you want
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Adjust typing speed here
            } else {
                // Remove cursor blinking class after typing is done?
                // typingElement.classList.remove('typing-cursor');
            }
        }

        // Clear initial content just in case
        typingElement.textContent = "";
        setTimeout(type, 500); // Start after a small delay
    }

    /* =========================================
       2. Scroll Animations (Fade In Up)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach(el => observer.observe(el));

});
