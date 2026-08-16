document.addEventListener('DOMContentLoaded', () => {
  const shareButton = document.querySelector('#share-button');
  const feedback = document.querySelector('#share-feedback');
  const shareData = {
    title: 'Pezão Guincho e Peças',
    text: 'Fale com a Pezão Guincho e Peças em Porto Velho - RO.',
    url: window.location.href
  };

  const showFeedback = (message, success = false) => {
    feedback.textContent = message;
    feedback.classList.toggle('success', success);
  };

  shareButton.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showFeedback('Página compartilhada com sucesso.', true);
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      showFeedback('Link copiado. Agora é só colar nas redes sociais.', true);
    } catch {
      showFeedback('Copie o endereço da barra do navegador para compartilhar.');
    }
  });
});