// script.js - Código completo do carrossel interativo e funcionalidade de agendamento

document.addEventListener('DOMContentLoaded', () => {
    // ========== CARROSSEL ========== //
    const initCarousel = () => {
        // Seleção de elementos
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const indicators = Array.from(document.querySelectorAll('.indicator'));
        const nextButton = document.querySelector('.carousel-next');
        const prevButton = document.querySelector('.carousel-prev');
        const carouselContainer = document.querySelector('.carousel-container');

        // Configurações
        if (!track || !slides.length) return; // Sai se não encontrar elementos
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoScrollInterval;
        const autoScrollDelay = 5000;

        // Funções do carrossel
        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        };

        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        // Event listeners do carrossel
        if (nextButton) nextButton.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll();
            startAutoScroll();
        });

        if (prevButton) prevButton.addEventListener('click', () => {
            prevSlide();
            stopAutoScroll();
            startAutoScroll();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                stopAutoScroll();
                startAutoScroll();
            });
        });

        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoScroll);
            carouselContainer.addEventListener('mouseleave', startAutoScroll);
        }

        // Inicialização
        updateCarousel();
        startAutoScroll();

        // Suporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Suporte para touch
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) nextSlide();
            if (touchEndX > touchStartX + threshold) prevSlide();
        };
    };

    // ========== AGENDAMENTO ========== //
    const initAgendamento = () => {
        const agendarBtn = document.getElementById('agendarBtn');
        
        if (agendarBtn) {
            agendarBtn.addEventListener('click', function() {
                alert('Serviço agendado com sucesso! Entraremos em contato para confirmar.');
                // Aqui você pode adicionar mais lógica para o agendamento
            });
        }
    };

    // ========== INICIALIZAÇÃO DOS MÓDULOS ========== //
    initCarousel();
    initAgendamento();
});