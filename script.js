document.addEventListener("DOMContentLoaded", () => {
  // 1. Intersection Observer for Fade-In Elements
  const fadeElements = document.querySelectorAll('.fade-element');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // 2. Sticky CTA Logic
  const stickyCta = document.getElementById('sticky-cta');
  const storeSection = document.getElementById('store');

  const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Show sticky CTA when we are NOT intersecting the store section
      if (!entry.isIntersecting) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  if (storeSection && stickyCta) {
    stickyObserver.observe(storeSection);
  }

  // 3. Live Notification (Social Proof)
  const notif = document.getElementById('live-notif');
  const notifName = document.getElementById('notif-name');
  const notifProduct = document.getElementById('notif-product');
  const notifImg = document.getElementById('notif-img');
  
  const fakePurchases = [
    { name: "Lucas T.", product: "Camiseta Original", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=100&q=80" },
    { name: "Mariana S.", product: "Camiseta The Sun", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=100&q=80" },
    { name: "Pedro H.", product: "Camiseta Drive", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&w=100&q=80" },
    { name: "Julia C.", product: "Camiseta Dream", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=100&q=80" }
  ];

  function showRandomNotification() {
    const randomPurchase = fakePurchases[Math.floor(Math.random() * fakePurchases.length)];
    notifName.textContent = randomPurchase.name;
    notifProduct.textContent = randomPurchase.product;
    notifImg.src = randomPurchase.img;
    
    notif.classList.add('show');
    
    setTimeout(() => {
      notif.classList.remove('show');
    }, 4000);
  }

  // Primeira notificação aparece após 8 segundos
  setTimeout(() => {
    showRandomNotification();
    // Depois, repete aleatoriamente a cada 15 a 30 segundos
    setInterval(showRandomNotification, Math.floor(Math.random() * 15000) + 15000);
  }, 8000);

  // 4. Checkout Overlay & Omni Pixel Tracking on Click
  const buyLinks = document.querySelectorAll('.buy-link');
  const overlay = document.getElementById('checkout-overlay');

  buyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const productId = link.getAttribute('data-product-id');
      const productName = link.getAttribute('data-product-name');

      // Dispara o Pixel Customizado OmniGrowth
      if (typeof window.OmniGrowth !== 'undefined') {
        window.OmniGrowth('track', 'add_to_cart', {
          product_id: productId,
          product_name: productName
        });
      }

      // Show VIP loading overlay
      overlay.classList.add('active');

      // Wait 1.2s for dramatic effect, then redirect
      setTimeout(() => {
        window.location.href = href;
      }, 1200);
    });
  });
});
