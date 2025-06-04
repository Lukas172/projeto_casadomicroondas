// Script específico para a página de Consertos
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos elementos ao rolar a página
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.problem-card, .step, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            observer.observe(element);
        });
    };
    
    // Inicialização
    animateOnScroll();
    
    // Botão de WhatsApp
    const whatsappBtn = document.querySelector('.cta-button.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Pode adicionar tracking ou outras ações aqui
            console.log('WhatsApp button clicked');
        });
    }
    
    // Botão de Telefone
    const phoneBtn = document.querySelector('.cta-button.phone');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            // Pode adicionar tracking ou outras ações aqui
            console.log('Phone button clicked');
        });
    }
});