document.addEventListener("DOMContentLoaded", () => {
  const hookLoader = document.getElementById('hook-loader');
  const startBtn = document.getElementById('start-journey');
  const mainContent = document.getElementById('main-content');
  const stickyCta = document.getElementById('sticky-cta');

  // 1. 🧲 THE HOOK: Lógica de entrada
  startBtn.addEventListener('click', () => {
    hookLoader.classList.add('fade-out');
    mainContent.classList.remove('hidden');
    
    // Inicia animações de entrada
    setTimeout(() => {
      document.querySelector('.hero-content').classList.add('visible');
    }, 100);
  });

  // 2. Intersection Observer para elementos Fade-In
  const fadeElements = document.querySelectorAll('.fade-element');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // 3. Sticky CTA Logic
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  });

  // 4. Copiar Cupom ao clicar (Efeito Magnético)
  const promoBar = document.querySelector('.promo-bar');
  const couponText = document.getElementById('copy-coupon');

  promoBar.addEventListener('click', () => {
    navigator.clipboard.writeText('EDM20').then(() => {
      const originalText = promoBar.innerHTML;
      promoBar.innerHTML = "CUPOM COPIADO! APROVEITE ➔";
      promoBar.style.background = "#FFF";
      
      setTimeout(() => {
        promoBar.innerHTML = originalText;
        promoBar.style.background = "var(--acid-green)";
      }, 2000);
    });
  });

  // 5. Notificações Sociais (Social Proof)
  const notif = document.getElementById('live-notif');
  const notifName = document.getElementById('notif-name');
  const notifProduct = document.getElementById('notif-product');
  const notifImg = document.getElementById('notif-img');
  
  const fakePurchases = [
    { name: "Lucas T.", product: "Camiseta Original", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=100&q=80" },
    { name: "Mariana S.", product: "Camiseta The Sun", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=100&q=80" },
    { name: "Pedro H.", product: "Camiseta Drive", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&w=100&q=80" }
  ];

  function showRandomNotification() {
    const randomPurchase = fakePurchases[Math.floor(Math.random() * fakePurchases.length)];
    notifName.textContent = randomPurchase.name;
    notifProduct.textContent = randomPurchase.product;
    notifImg.src = randomPurchase.img;
    
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
  }

  setInterval(showRandomNotification, 20000);

  // 6. Checkout Overlay
  const buyLinks = document.querySelectorAll('.buy-link');
  const overlay = document.getElementById('checkout-overlay');

  buyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      overlay.classList.add('active');
      
      setTimeout(() => {
        window.location.href = href;
      }, 1500);
    });
  });
});
