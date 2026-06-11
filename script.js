// ==========================================================
// Efeito de scroll no header
// ==========================================================
window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ==========================================================
// Smooth scroll para âncoras
// ==========================================================
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

// ==========================================================
// Botões Magnéticos (Efeito premium)
// ==========================================================
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const position = btn.getBoundingClientRect();
    const x = e.pageX - position.left - position.width / 2;
    const y = e.pageY - position.top - position.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
  });

  btn.addEventListener('mouseout', function(e) {
    btn.style.transform = 'translate(0px, 0px)';
  });
});

// ==========================================================
// Reveal Elements on Scroll
// ==========================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ==========================================================
// Tracking & Conversão
// ==========================================================

// 1. Tracking de Produtos
document.querySelectorAll('.product-buy').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product-name');
    const productId = this.getAttribute('data-product-id');
    
    if (typeof ttq !== 'undefined') {
      ttq.track('AddToCart', {
        content_id: productId,
        content_name: productName,
        content_type: 'product',
        quantity: 1
      });
    }
    if (typeof clarity === 'function') {
      clarity("set", "ButtonClicked", productName);
    }
  });
});

// 2. Scroll Depth
let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  [25, 50, 75, 100].forEach(mark => {
    if (scrollPercent >= mark && !scrollMarks[mark]) {
      scrollMarks[mark] = true;
      if (typeof ttq !== 'undefined') ttq.track('ScrollDepth', { depth: `${mark}%` });
      if (typeof clarity === 'function') clarity("set", "ScrollDepth", `${mark}%`);
    }
  });
});

// 3. Time on Page
let timeSpent = 0;
const timeInterval = setInterval(() => {
  timeSpent += 10;
  if (timeSpent === 30 && typeof ttq !== 'undefined') ttq.track('TimeOnSite_30s');
  if (timeSpent === 60) {
    if (typeof ttq !== 'undefined') ttq.track('TimeOnSite_60s');
    clearInterval(timeInterval);
  }
}, 10000);

// ==========================================================
// Newsletter Form Handler
// ==========================================================
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  const oldText = btn.textContent;
  
  btn.textContent = 'Enviado! ✓';
  btn.style.background = '#00cc00';
  btn.style.color = '#fff';
  
  setTimeout(() => {
    btn.textContent = oldText;
    btn.style.background = '#fff';
    btn.style.color = '#000';
    this.reset();
  }, 3000);
});
