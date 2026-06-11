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
    `🔥 Lote Exclusivo liberado: Frete Grátis e 10% OFF - Expira em ${hours}h ${minutes}m!`;
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

// Tracking de cliques nos produtos (TikTok Pixel e Microsoft Clarity)
document.querySelectorAll('.product a').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.closest('.product').querySelector('.product-title').textContent;
    const productId = this.getAttribute('data-product-id');
    
    // Dispara evento no TikTok Pixel
    if (typeof ttq !== 'undefined') {
      ttq.track('AddToCart', {
        content_id: productId,
        content_name: productName,
        content_type: 'product',
        quantity: 1
      });
    }

    // Marca no Microsoft Clarity se estiver carregado
    if (typeof clarity === 'function') {
      clarity("set", "ButtonClicked", productName);
    }
  });
});

// --- Rastreamento Comportamental Profundo ---

// 1. Scroll Depth Tracking (Rastrear até onde o usuário rolou a página)
let scrollMarks = { 25: false, 50: false, 75: false, 100: false };

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  [25, 50, 75, 100].forEach(mark => {
    if (scrollPercent >= mark && !scrollMarks[mark]) {
      scrollMarks[mark] = true;
      if (typeof ttq !== 'undefined') {
        ttq.track('ScrollDepth', { depth: `${mark}%` });
      }
      if (typeof clarity === 'function') {
        clarity("set", "ScrollDepth", `${mark}%`);
      }
    }
  });
});

// 2. Time on Page Tracking (Rastrear quem fica muito tempo na página)
let timeSpent = 0;
const timeInterval = setInterval(() => {
  timeSpent += 10;
  if (timeSpent === 30) {
    if (typeof ttq !== 'undefined') {
      ttq.track('TimeOnSite_30s');
    }
  }
  if (timeSpent === 60) {
    if (typeof ttq !== 'undefined') {
      ttq.track('TimeOnSite_60s');
    }
    clearInterval(timeInterval); // Para de contar após 60s para economizar requisições
  }
}, 10000); // Checa a cada 10 segundos


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
