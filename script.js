document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  const stickyCta = document.getElementById("sticky-cta");
  const promoBar = document.querySelector(".promo-bar");

  // 1. Sticky CTA Logic
  ScrollTrigger.create({
    trigger: "body",
    start: "top -500px",
    toggleActions: "play none reverse none",
    onEnter: () => stickyCta.classList.add("visible"),
    onLeaveBack: () => stickyCta.classList.remove("visible"),
  });

  // 2. Copiar Cupom ao clicar (Efeito Magnético)
  if (promoBar) {
    promoBar.addEventListener("click", () => {
      navigator.clipboard.writeText("EDM20").then(() => {
        const originalText = promoBar.innerHTML;
        gsap.to(promoBar, { 
          backgroundColor: "#FFF", 
          color: "#121212", 
          duration: 0.2, 
          onComplete: () => {
            promoBar.innerHTML = "CUPOM COPIADO! ATIVADO ➔";
            gsap.to(promoBar, { 
              backgroundColor: "var(--accent-color)", 
              color: "var(--bg-dark)", 
              delay: 1.5, 
              duration: 0.5, 
              onComplete: () => {
                promoBar.innerHTML = originalText;
              }
            });
          }
        });
      });
    });
  }

  // 3. Rastreamento de cliques em produtos
  const productLinks = document.querySelectorAll(".product-link");
  productLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const productName = link.querySelector(".product-name")?.textContent || "Produto";
      const productPrice = link.querySelector(".product-price")?.textContent || "N/A";
      
      // Rastreamento OmniGrowth
      if (window.OmniGrowth) {
        OmniGrowth('track', 'product_click', {
          product_name: productName,
          product_price: productPrice
        });
      }
      
      // Rastreamento Meta (Facebook Pixel)
      if (window.fbq) {
        fbq('track', 'ViewContent', {
          content_name: productName,
          content_type: 'product',
          value: productPrice
        });
      }
      
      // Rastreamento TikTok
      if (window.ttq) {
        ttq.track('ViewContent', {
          content_name: productName,
          content_type: 'product'
        });
      }
    });
  });
});
