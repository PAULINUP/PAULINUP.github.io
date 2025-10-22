// Efeito de scroll no header
window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Atualizar contador de urgência
function updateUrgencyCounter() {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  const timeLeft = endOfDay - now;
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  document.querySelector('.urgency-counter').innerHTML = 
    `🔥 OFERTA ESPECIAL: Frete Grátis + 10% de Desconto - Apenas ${hours}h ${minutes}m restantes!`;
}

// Atualizar a cada minuto
updateUrgencyCounter();
setInterval(updateUrgencyCounter, 60000);

// Newsletter form handler
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  
  // Aqui você integraria com seu serviço de email marketing
  // Exemplo: Mailchimp, ConvertKit, etc.
  
  // Feedback visual
  const button = this.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Inscrito! ✓';
  button.style.background = 'linear-gradient(90deg, #00cc00, #00aa00)';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
  }, 3000);
  
  this.reset();
});

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Tracking de cliques nos produtos (para Google Analytics)
document.querySelectorAll('.product a').forEach(button => {
  button.addEventListener('click', function() {
    // Aqui você pode adicionar eventos do Google Analytics
    console.log('Produto clicado:', this.closest('.product').querySelector('.product-title').textContent);
  });
});

// Animação de entrada para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.product, .testimonial').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
