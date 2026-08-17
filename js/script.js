document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav a');
  const form = document.querySelector('#contact-form');
  const formMessage = document.querySelector('#form-message');
  const defaultWhatsappMessage = 'Olá! Vim pelo site da Pezão Guincho e Peças e gostaria de solicitar atendimento.';

  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    const url = new URL(link.href);
    url.searchParams.set('text', defaultWhatsappMessage);
    link.href = url.toString();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const updateActiveLink = () => {
    let currentId = 'inicio';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 130) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('nome').trim();
    const phone = data.get('telefone').trim();
    const service = data.get('servico');
    const message = data.get('mensagem').trim();
    const whatsappMessage = [
      'Olá! Vim pelo site da Pezão Guincho e Peças.',
      '',
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Serviço: ${service}`,
      message ? `Mensagem: ${message}` : ''
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/5569992615386?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener');
    formMessage.textContent = 'Abrindo o WhatsApp para enviar sua solicitação.';
    formMessage.classList.add('success');
    form.reset();
  });
});