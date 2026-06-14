document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  const hookLoader = document.getElementById("hook-loader");
  const startBtn = document.getElementById("start-journey");
  const mainContent = document.getElementById("main-content");
  const stickyCta = document.getElementById("sticky-cta");

  // 1. 🧲 THE HOOK: Lógica de entrada com GSAP
  startBtn.addEventListener("click", () => {
    gsap.to(hookLoader, { opacity: 0, duration: 0.8, ease: "power2.inOut", onComplete: () => {
      hookLoader.style.display = "none";
      mainContent.classList.remove("hidden");
      // Animação de entrada do Hero Content
      gsap.fromTo(".hero-content", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
      // Animação do scroll indicator
      gsap.fromTo(".scroll-indicator", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.8 }
      );
    }});
  });

  // 2. Animações de Scroll com GSAP (substituindo fade-element)
  gsap.utils.toArray(".fade-element").forEach(element => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Quando o topo do elemento atinge 85% da viewport
        end: "bottom top",
        toggleActions: "play none none none", // Play a animação uma vez
      }
    });
  });

  // 3. Sticky CTA Logic
  ScrollTrigger.create({
    trigger: "body",
    start: "top -500px", // Mostra o CTA depois de rolar 500px
    toggleActions: "play none reverse none",
    onEnter: () => stickyCta.classList.add("visible"),
    onLeaveBack: () => stickyCta.classList.remove("visible"),
  });

  // 4. Copiar Cupom ao clicar (Efeito Magnético)
  const promoBar = document.querySelector(".promo-bar");
  const couponText = document.getElementById("copy-coupon");

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

  // 5. Checkout Overlay
  const buyLinks = document.querySelectorAll(".buy-link");
  const overlay = document.getElementById("checkout-overlay");

  buyLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      overlay.classList.add("active");
      
      setTimeout(() => {
        window.location.href = href;
      }, 1500);
    });
  });
});
