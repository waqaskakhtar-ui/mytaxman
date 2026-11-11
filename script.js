/**
 * TAXMAN (mytaxman.ca) &bull; Production Redesign Interactive Engine
 * Controls: Folder Cascade Decorators, Sticky Header Blur, Testimonials Carousel,
 * Scroll Reveal Animations, Mobile Navigation, and Email Inquiry Generator.
 */

// ==========================================================================
// 1. SERVICES CONFIGURATION ARRAY (Decoupled & Easy to Edit)
// ==========================================================================
const servicesConfig = [
  {
    id: 't4-employees',
    number: '01',
    tabLabel: 'T4 Employees',
    title: 'T4 Employees',
    subtitle: 'Personal Tax Services',
    tone: 'folder-tone-1',
    intro: 'Professional tax preparation and support tailored to individual taxpayers. Explore the services available to help manage your personal tax requirements.',
    services: [
      'Service details coming soon',
      'Tax preparation and filing',
      'Individual tax support',
      'Additional services to be announced'
    ],
    ctaText: 'Get started with T1',
    ctaLink: '#contact'
  },
  {
    id: 'small-business',
    number: '02',
    tabLabel: 'Small Business',
    title: 'Small Business',
    subtitle: 'Small Business Services',
    tone: 'folder-tone-2',
    intro: 'Tax and accounting solutions designed to support business owners and self-employed professionals. More information about available services will be provided soon.',
    services: [
      'Service details coming soon',
      'Business tax support',
      'Financial and accounting assistance',
      'Additional services to be announced'
    ],
    ctaText: 'Small business support',
    ctaLink: '#contact'
  },
  {
    id: 'corporations',
    number: '03',
    tabLabel: 'Corporations',
    title: 'Corporations',
    subtitle: 'Corporate Tax Services',
    tone: 'folder-tone-3',
    intro: 'Dedicated support for incorporated businesses and organizations. Discover the available solutions and professional services as more details become available.',
    services: [
      'Service details coming soon',
      'Corporate tax support',
      'Business financial assistance',
      'Additional services to be announced'
    ],
    ctaText: 'Corporate T2 consultation',
    ctaLink: '#contact'
  },
  {
    id: 'deceased-rights',
    number: '04',
    tabLabel: 'Deceased & Rights & Things',
    title: 'Deceased & Rights & Things',
    subtitle: 'Estate & Final Tax Services',
    tone: 'folder-tone-4',
    intro: 'Specialized tax-related assistance for deceased individuals and estate matters. Further information about the services offered will be available soon.',
    services: [
      'Service details coming soon',
      'Estate-related tax assistance',
      'Final tax return support',
      'Additional services to be announced'
    ],
    ctaText: 'Estate tax guidance',
    ctaLink: '#contact'
  }
];

// ==========================================================================
// 2. DOM CONTENT LOADED INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initFolderCascadeInteractions();
  initTestimonialsCarousel();
  initScrollReveal();
  initContactForm();
  updateCopyrightYear();
});

// ==========================================================================
// 3. STICKY HEADER WITH SCROLL BLUR
// ==========================================================================
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ==========================================================================
// 4. MOBILE NAVIGATION TOGGLE
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-menu');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('is-open');
    mobileNav.classList.toggle('is-open', !isOpen);
    mobileNav.hidden = isOpen;
    toggleBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  });

  // Close mobile nav when clicking any nav anchor
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      mobileNav.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================================================
// 5. FOLDER CASCADE INTERACTIONS (Touch & Focus Support)
// ==========================================================================
function initFolderCascadeInteractions() {
  const folders = document.querySelectorAll('.folder-card');

  folders.forEach(folder => {
    // Tap support for touch screens without hover
    folder.addEventListener('click', (e) => {
      if (e.target.closest('.folder-cta-link')) return; // allow cta navigation
      
      const wasTapped = folder.classList.contains('is-tapped');
      folders.forEach(f => f.classList.remove('is-tapped'));
      if (!wasTapped) {
        folder.classList.add('is-tapped');
      }
    });

    // Keyboard navigation: Enter or Space triggers subtle lift
    folder.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!e.target.closest('a')) {
          e.preventDefault();
          folder.classList.toggle('is-tapped');
        }
      }
    });
  });

  // Wire top header and mobile drawer 4-service links to spotlight target folder
  const navFolderLinks = document.querySelectorAll('[data-folder-target]');
  navFolderLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetNum = link.getAttribute('data-folder-target');
      const targetFolder = document.querySelector(`.folder-card[data-folder="${targetNum}"]`);

      document.querySelectorAll('.nav-links .nav-item').forEach(navItem => {
        navItem.classList.toggle('active', navItem.getAttribute('data-folder-target') === targetNum);
      });

      if (targetFolder) {
        folders.forEach(f => f.classList.remove('is-tapped', 'is-active'));
        targetFolder.classList.add('is-active');
      }
    });
  });

  // Remove tap/active state when clicking outside folders and service nav links
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.folder-card') && !e.target.closest('[data-folder-target]')) {
      folders.forEach(f => f.classList.remove('is-tapped', 'is-active'));
    }
  });
}

// ==========================================================================
// 6. TESTIMONIALS SCROLL-SNAP CAROUSEL
// ==========================================================================
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonial-track-wrap');
  const prevBtn = document.querySelector('[data-carousel="prev"]');
  const nextBtn = document.querySelector('[data-carousel="next"]');

  if (!track || !prevBtn || !nextBtn) return;

  function scrollCards(direction) {
    const card = track.querySelector('.testimonial-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // width + gap
    track.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  prevBtn.addEventListener('click', () => scrollCards(-1));
  nextBtn.addEventListener('click', () => scrollCards(1));
}

// ==========================================================================
// 7. SCROLL REVEAL ANIMATIONS (IntersectionObserver & Fallback, 60fps)
// ==========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  function checkReveals() {
    const vh = window.innerHeight || document.documentElement.clientHeight || 1000;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh + 100) {
        el.classList.add('is-revealed');
      }
    });
  }

  // Initial immediate reveal of visible elements
  checkReveals();
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });

  // IntersectionObserver for smooth 60fps triggers
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });
  }
}

// ==========================================================================
// 8. CONTACT INQUIRY FORM (Generates Safe Mailto Draft)
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const statusEl = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
    const email = form.elements['email'] ? form.elements['email'].value.trim() : '';
    const service = form.elements['service'] ? form.elements['service'].value : '';
    const message = form.elements['message'] ? form.elements['message'].value.trim() : '';

    const subject = encodeURIComponent(`TAXMAN Inquiry: ${service || 'General'} - ${name}`);
    const body = encodeURIComponent(
      `Hello TAXMAN Team,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service Requested: ${service}\n\n` +
      `Inquiry Details:\n${message}\n\n` +
      `Sent via mytaxman.ca contact form.`
    );

    if (statusEl) {
      statusEl.textContent = 'Opening your email client with your prepared tax inquiry...';
      statusEl.style.color = '#8c1d2e';
      statusEl.style.fontWeight = '700';
    }

    setTimeout(() => {
      window.location.href = `mailto:returns@mytaxman.ca?subject=${subject}&body=${body}`;
    }, 250);
  });
}

// ==========================================================================
// 9. AUTOMATIC COPYRIGHT YEAR
// ==========================================================================
function updateCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
