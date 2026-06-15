document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const promoBar = document.getElementById('promo-bar') || document.querySelector('.promo-bar');
  const stickyCta = document.getElementById('sticky-cta');
  const videos = document.querySelectorAll('video');
  const livingCards = document.querySelectorAll('.living-card');
  const productLinks = document.querySelectorAll('.product-link');

  // Cupom: simples, rápido e com feedback humano.
  if (promoBar) {
    promoBar.addEventListener('click', async () => {
      const original = promoBar.innerHTML;
      try {
        await navigator.clipboard.writeText('EDM20');
        promoBar.innerHTML = '<span>CUPOM EDM20 COPIADO — USE NO CHECKOUT</span>';
        promoBar.classList.add('copied');
        setTimeout(() => {
          promoBar.innerHTML = original;
          promoBar.classList.remove('copied');
        }, 1600);
      } catch (error) {
        promoBar.innerHTML = '<span>CUPOM: <strong>EDM20</strong></span>';
        setTimeout(() => { promoBar.innerHTML = original; }, 1600);
      }
    });
  }

  // Sticky CTA aparece depois da primeira dobra.
  if (stickyCta) {
    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top -520px',
        onEnter: () => stickyCta.classList.add('visible'),
        onLeaveBack: () => stickyCta.classList.remove('visible')
      });
    } else {
      window.addEventListener('scroll', () => {
        stickyCta.classList.toggle('visible', window.scrollY > 520);
      }, { passive: true });
    }
  }

  // Autoplay inteligente: toca apenas o vídeo em destaque para não pesar no celular.
  const playVideo = (video) => {
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const promise = video.play();
    if (promise && typeof promise.catch === 'function') promise.catch(() => {});
  };

  const pauseVideo = (video) => {
    if (!video || video.classList.contains('hero-film')) return;
    video.pause();
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
        playVideo(video);
      } else {
        pauseVideo(video);
      }
    });
  }, { threshold: [0, 0.35, 0.65] });

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    videoObserver.observe(video);
  });

  // Microanimações: leves, sem esconder produto nem travar imagem.
  if (window.gsap && window.ScrollTrigger) {
    gsap.from('.hero-copy > *', {
      opacity: 0,
      y: 22,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.2
    });

    livingCards.forEach((card, index) => {
      gsap.fromTo(card,
        { scale: 0.985, opacity: 0.92 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            end: 'top 28%',
            scrub: true
          }
        }
      );
    });
  }

  // Rastreamento dos capítulos vivos.
  livingCards.forEach(card => {
    card.addEventListener('click', () => {
      const product = card.dataset.product || 'Living Shirt';
      if (window.OmniGrowth) OmniGrowth('track', 'living_film_interaction', { product_name: product });
      if (window.fbq) fbq('trackCustom', 'LivingFilmInteraction', { content_name: product });
      if (window.ttq && ttq.track) ttq.track('ClickButton', { content_name: product });
    });
  });

  // Rastreamento dos cliques de compra.
  productLinks.forEach(link => {
    link.addEventListener('click', () => {
      const name = link.querySelector('.product-name')?.textContent || 'Produto Impontuality';
      const price = link.querySelector('.product-price')?.textContent || 'R$ 84,30';
      if (window.OmniGrowth) OmniGrowth('track', 'product_click', { product_name: name, product_price: price, destination: link.href });
      if (window.fbq) fbq('track', 'ViewContent', { content_name: name, content_type: 'product', value: 84.30, currency: 'BRL' });
      if (window.ttq && ttq.track) ttq.track('ViewContent', { content_name: name, content_type: 'product', value: 84.30, currency: 'BRL' });
    });
  });
});
