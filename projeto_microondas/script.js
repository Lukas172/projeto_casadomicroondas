// script.js - Código completo do carrossel interativo

document.addEventListener('DOMContentLoaded', () => {
    // ========== SELEÇÃO DE ELEMENTOS ========== //
    const track = document.querySelector('.carousel-track'); // Faixa de slides
    const slides = Array.from(document.querySelectorAll('.carousel-slide')); // Lista de slides
    const indicators = Array.from(document.querySelectorAll('.indicator')); // Bolinhas indicadoras
    const nextButton = document.querySelector('.next'); // Botão "próximo"
    const prevButton = document.querySelector('.prev'); // Botão "anterior"
    const carouselContainer = document.querySelector('.carousel-container'); // Container principal

    // ========== CONFIGURAÇÕES ========== //
    let currentSlide = 0; // Slide atual
    const totalSlides = slides.length; // Total de slides
    let autoScrollInterval; // Variável para controlar o auto-scroll
    const autoScrollDelay = 5000; // 5 segundos entre transições

    // ========== FUNÇÕES PRINCIPAIS ========== //

    /**
     * Atualiza a posição do carrossel e os indicadores
     */
    const updateCarousel = () => {
        // Movimenta a faixa de slides
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualiza a classe 'active' nos indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    };

    /**
     * Avança para o próximo slide
     */
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides; // Volta ao início se chegar no final
        updateCarousel();
    };

    /**
     * Volta para o slide anterior
     */
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Vai para o final se estiver no início
        updateCarousel();
    };

    /**
     * Inicia o auto-scroll
     */
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
    };

    /**
     * Para o auto-scroll
     */
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // ========== EVENT LISTENERS ========== //

    // Botão "próximo"
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoScroll(); // Pausa auto-scroll quando o usuário interage
        startAutoScroll(); // Reinicia após um tempo (opcional)
    });

    // Botão "anterior"
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoScroll();
        startAutoScroll(); // Reinicia após um tempo (opcional)
    });

    // Indicadores de slide (bolinhas)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            stopAutoScroll();
            startAutoScroll(); // Reinicia após um tempo (opcional)
        });
    });

    // Pausa auto-scroll quando o mouse está sobre o carrossel
    carouselContainer.addEventListener('mouseenter', stopAutoScroll);
    carouselContainer.addEventListener('mouseleave', startAutoScroll);

    // ========== INICIALIZAÇÃO ========== //
    updateCarousel(); // Posiciona o primeiro slide
    startAutoScroll(); // Inicia o auto-scroll

    // ========== RECURSOS ADICIONAIS ========== //

    // Teclado (opcional - navegação com setas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Adaptação para touch (opcional)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    /**
     * Detecta gestos de swipe (toque lateral)
     */
    const handleSwipe = () => {
        const threshold = 50; // Sensibilidade do gesto
        if (touchEndX < touchStartX - threshold) nextSlide(); // Swipe para esquerda
        if (touchEndX > touchStartX + threshold) prevSlide(); // Swipe para direita
    };
});