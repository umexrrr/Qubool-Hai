/**
 * QUBOOL HAI EVENTS & DECOR — LUXURY INTERACTION ENGINE
 * Baby Pink × White Contemporary Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initFloatingPetals();
  initHeroParallax();
  initCardTilt();
  initGalleryFilterAndLightbox();
  initContactForm();
  initImageFallbacks();
  initPageTransitions();
});

/* ==========================================================================
   1. Navbar Scroll Transition
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.luxury-nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ==========================================================================
   2. Mobile Fullscreen Drawer Menu
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggle.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   3. Signature "Floating Petal" Effect (Canvas)
   ========================================================================== */
function initFloatingPetals() {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Soft romantic color palette for drifting petals
  const petalColors = [
    'rgba(255, 240, 245, 0.75)', // soft ivory blush
    'rgba(251, 218, 229, 0.65)', // delicate baby pink
    'rgba(247, 198, 214, 0.55)', // petal blush
    'rgba(255, 255, 255, 0.70)'  // pure white petal
  ];

  const petalCount = window.innerWidth < 768 ? 14 : 28;
  const petals = [];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.015;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayRadius = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.y += this.speedY;
      this.swayAngle += this.swaySpeed;
      this.x += Math.sin(this.swayAngle) * this.swayRadius + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      // Draw organic curved petal geometry
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size, 0, this.size * 1.4);
      ctx.bezierCurveTo(-this.size * 0.8, this.size, -this.size * 0.8, -this.size * 0.5, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  let animationFrameId;
  const render = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    animationFrameId = requestAnimationFrame(render);
  };

  // Pause when tab is invisible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });

  render();
}

/* ==========================================================================
   4. Subtle 3D Hero Parallax (Depth without obscuring photography)
   ========================================================================== */
function initHeroParallax() {
  const heroWrapper = document.querySelector('.hero-photography-first');
  const heroImage = document.querySelector('.hero-image-wrapper');
  const heroContent = document.querySelector('.hero-content');

  if (!heroWrapper || !heroImage || !heroContent) return;
  if (window.innerWidth < 768) return; // Lightweight on mobile

  heroWrapper.addEventListener('mousemove', (e) => {
    const rect = heroWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Very subtle, luxurious depth
    heroImage.style.transform = `scale(1.04) translate(${x * -16}px, ${y * -16}px)`;
    heroContent.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
  });

  heroWrapper.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'scale(1.03) translate(0px, 0px)';
    heroContent.style.transform = 'translate(0px, 0px)';
  });
}

/* ==========================================================================
   5. Card 3D Depth & Perspective
   ========================================================================== */
function initCardTilt() {
  if (window.innerWidth < 992) return;
  const cards = document.querySelectorAll('.service-editorial-card, .editorial-cell, .approach-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   6. Gallery Filtering & Fullscreen Lightbox
   ========================================================================== */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox-modal');

  // Category Filtering
  if (filterBtns.length && galleryCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Fullscreen Lightbox
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCat = lightbox.querySelector('.lightbox-cat');
  const lightboxWaBtn = lightbox.querySelector('.lightbox-wa-btn');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-card-title')?.innerText || 'Qubool Hai Decor';
      const cat = card.querySelector('.gallery-card-cat')?.innerText || 'Wedding & Nikah';

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxTitle) lightboxTitle.innerText = title;
      if (lightboxCat) lightboxCat.innerText = cat;

      if (lightboxWaBtn) {
        const msg = encodeURIComponent(`Hello Qubool Hai Events & Decor, I loved this decor setup: "${title}" (${cat}). I would love to enquire about having something similar for my celebration.`);
        lightboxWaBtn.href = `https://wa.me/919301266908?text=${msg}`;
      }

      lightbox.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   7. Contact Form WhatsApp Auto-Builder
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('qubool-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim() || 'Client';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || 'Not specified';
    const eventType = form.querySelector('[name="event_type"]')?.value || 'Nikah / Wedding';
    const eventDate = form.querySelector('[name="event_date"]')?.value || 'TBD';
    const venue = form.querySelector('[name="venue"]')?.value.trim() || 'Indore';
    const guests = form.querySelector('[name="guests"]')?.value || 'Not specified';
    const message = form.querySelector('[name="message"]')?.value.trim() || 'No additional notes.';

    const waText = 
`*NEW CELEBRATION ENQUIRY — QUBOOL HAI EVENTS & DECOR*
----------------------------------------
*Name:* ${name}
*Phone:* ${phone}
*Event Type:* ${eventType}
*Event Date:* ${eventDate}
*Venue / Location:* ${venue}
*Estimated Guests:* ${guests}

*Vision & Details:*
${message}
----------------------------------------
_Sent via Qubool Hai website enquiry form_`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/919301266908?text=${encodedText}`;

    // Provide visual confirmation & redirect to WhatsApp
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Opening WhatsApp...</span>`;
      submitBtn.style.background = '#25d366';
      submitBtn.style.color = '#ffffff';

      setTimeout(() => {
        window.open(waUrl, '_blank');
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 600);
    }
  });
}

/* ==========================================================================
   8. Image Error Fallback Handler
   ========================================================================== */
function initImageFallbacks() {
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', () => {
      // Gracefully switch to the branded baby-pink placeholder
      if (!img.src.includes('placeholder.svg')) {
        img.src = 'public/images/placeholder.svg';
        img.alt = 'Qubool Hai Events & Decor — Replace with project photograph';
      }
    });
  });
}

/* ==========================================================================
   9. Soft Baby Pink Page Transitions
   ========================================================================== */
function initPageTransitions() {
  const veil = document.querySelector('.page-veil');
  if (!veil) return;

  // Intercept internal page navigation links
  const links = document.querySelectorAll('a[href$=".html"], a[href="/about"], a[href="/services"], a[href="/gallery"], a[href="/contact"], a[href="/"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      // Ignore anchors or external links
      if (!targetHref || targetHref.startsWith('#') || targetHref.startsWith('http') || targetHref.startsWith('mailto') || targetHref.startsWith('tel') || targetHref.startsWith('wa.me')) {
        return;
      }

      e.preventDefault();
      veil.classList.add('is-active');

      setTimeout(() => {
        window.location.href = targetHref;
      }, 500);
    });
  });
}
