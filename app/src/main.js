import './style.css';
import { initPage, initReveal } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  initReveal();

  // ===== ANIMATED COUNTERS =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + (target >= 100 ? '+' : '+');
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

  // ===== PORTFOLIO FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
        if (match) { item.style.opacity = '0'; setTimeout(() => item.style.opacity = '1', 50); }
      });
    });
  });

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const organization = form.querySelector('#organization').value.trim();
      const serviceSelect = form.querySelector('#service');
      const service = serviceSelect.options[serviceSelect.selectedIndex]?.text || '';
      const message = form.querySelector('#message').value.trim();

      const subject = `Website Enquiry – ${name}${organization ? ' (' + organization + ')' : ''}`;
      const body = `Hi SJ Coders Team,

Name: ${name}
Email: ${email}
Organization: ${organization || 'N/A'}
Service Interest: ${service || 'N/A'}

Message:
${message}`;

      window.location.href = `mailto:info@sjcoders.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Opening Email App...';
      btn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
      setTimeout(() => { btn.innerHTML = 'Send Message <i data-lucide="send"></i>'; btn.style.background = ''; if (window.lucide) lucide.createIcons(); }, 3000);
      form.reset();
    });
  }
});
