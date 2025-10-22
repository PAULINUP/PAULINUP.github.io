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
  
  alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
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
