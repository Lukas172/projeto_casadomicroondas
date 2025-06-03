// Script específico para a página de Busca e Entrega
document.addEventListener('DOMContentLoaded', function() {
    // Animação suave para os itens do processo
    const steps = document.querySelectorAll('.step');
    
    // Configuração inicial para animação
    function setupAnimation() {
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.5s ease';
        });
    }
    
    // Animação dos steps
    function animateSteps() {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Observador de interseção para animação
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSteps();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(document.querySelector('.process-section'));
    }
    
    // Inicialização
    function init() {
        setupAnimation();
        setupIntersectionObserver();
    }
    
    init();
});