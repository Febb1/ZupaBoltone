const video = document.getElementById("video");
let lastScrollY = window.scrollY;
let isScrolling = false;
let lastTime = 0;

function handleScroll() {
    let scrollbars = window.scrollY - lastScrollY; // Differenza di scroll
    lastScrollY = window.scrollY;

    // Calcola la velocità del playback, ridotta per transizioni più dolci
    let playbackRate = scrollbars * .1
    
    

    ;

    // Calcola nuovo tempo del video con smorzamento
    let currentTime = video.currentTime + playbackRate;

    // Gestione del loop continuo
    if (currentTime >= video.duration) {
        currentTime = currentTime % video.duration; // Riavvia dal punto iniziale
    } else if (currentTime < 0) {
        currentTime = video.duration + (currentTime % video.duration); // Continua in reverse senza bloccarsi
    }

    video.currentTime = currentTime;
}

// Aggiungi il debounce per ridurre il numero di chiamate
window.addEventListener("scroll", () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            handleScroll();
            isScrolling = false;
        });
    }
});