// ==========================================================
// Proteção do Script (Evita os erros do Clarity)
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // Sticky CTA Mobile
  // ==========================================================
  const stickyCta = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('home');

  if (stickyCta && heroSection) {
    window.addEventListener('scroll', () => {
      // Mostra a barra fixa quando o usuário rolar além da Hero Section
      if (window.scrollY > heroSection.offsetHeight * 0.8) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    });
  }

  // ==========================================================
  // Tracking & Conversão - Clicks
  // ==========================================================
  const buyButtons = document.querySelectorAll('.product-buy-btn');
  if (buyButtons.length > 0) {
    buyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product-name');
        const productId = this.getAttribute('data-product-id');
        
        // 1. TikTok
        if (typeof ttq !== 'undefined') {
          ttq.track('AddToCart', {
            content_id: productId,
            content_name: productName,
            content_type: 'product',
            quantity: 1
          });
        }

        // 2. Meta Pixel (Facebook/Instagram)
        if (typeof fbq === 'function') {
          fbq('track', 'AddToCart', {
            content_ids: [productId],
            content_name: productName,
            content_type: 'product'
          });
        }

        // 3. Microsoft Clarity
        if (typeof clarity === 'function') {
          clarity("set", "ButtonClicked", productName);
        }
      });
    });
  }

  // ==========================================================
  // Scroll Depth e Tempo na Página (Com proteção)
  // ==========================================================
  let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight <= 0) return; // Evita erro se a página for menor que a tela

    const scrollPercent = (scrollTop / scrollHeight) * 100;

    [25, 50, 75, 100].forEach(mark => {
      if (scrollPercent >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        if (typeof ttq !== 'undefined') ttq.track('ScrollDepth', { depth: `${mark}%` });
        if (typeof fbq === 'function') fbq('trackCustom', 'ScrollDepth', { depth: `${mark}%` });
        if (typeof clarity === 'function') clarity("set", "ScrollDepth", `${mark}%`);
      }
    });
  });

  let timeSpent = 0;
  const timeInterval = setInterval(() => {
    timeSpent += 10;
    if (timeSpent === 30) {
      if (typeof ttq !== 'undefined') ttq.track('TimeOnSite_30s');
      if (typeof fbq === 'function') fbq('trackCustom', 'TimeOnSite_30s');
    }
    if (timeSpent === 60) {
      if (typeof ttq !== 'undefined') ttq.track('TimeOnSite_60s');
      if (typeof fbq === 'function') fbq('trackCustom', 'TimeOnSite_60s');
      clearInterval(timeInterval);
    }
  }, 10000);

});
