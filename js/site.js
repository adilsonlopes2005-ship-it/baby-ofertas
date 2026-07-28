// Baby Ofertas — comportamento compartilhado (ano do rodapé, modal de política, formulário de newsletter)
(function(){
  const APPS_SCRIPT_URL = "COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT";
  const CONSENT_VERSION = "v1-2026-06-14";

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // modal de política de privacidade
  const modal = document.getElementById('modal');
  if (modal) {
    const openModal = () => modal.classList.add('open');
    const closeModal = () => modal.classList.remove('open');
    document.querySelectorAll('[data-open-policy]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openModal(); }));
    const closeBtn = document.getElementById('closePolicy');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    const polDate = document.getElementById('polDate');
    if (polDate) polDate.textContent = new Date().toLocaleDateString('pt-BR');
  }

  // mini-formulário do herói: leva pro formulário completo (com consentimento) em vez de enviar direto
  document.querySelectorAll('[data-quick-signup]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]').value.trim();
      const target = document.getElementById('email');
      if (target) target.value = email;
      const section = document.getElementById('newsletter');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      const consent = document.getElementById('consent');
      if (consent) consent.focus();
    });
  });

  // formulário completo de inscrição (nome, e-mail, canais, consentimento)
  const form = document.getElementById('form');
  if (!form) return;
  const msg = document.getElementById('msg');
  const btn = document.getElementById('submit');
  const show = (t, ok) => { msg.textContent = t; msg.className = 'msg ' + (ok ? 'ok' : 'err'); };
  async function getIp(){ try { const r = await fetch('https://api.ipify.org?format=json'); return (await r.json()).ip || ''; } catch { return ''; } }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const canais = [...document.querySelectorAll('input[name=canal]:checked')].map(c => c.value);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show('Digite um e-mail válido.', false);
    if (canais.length === 0) return show('Escolha pelo menos um canal.', false);
    if (!document.getElementById('consent').checked) return show('É preciso aceitar a Política de Privacidade.', false);
    btn.disabled = true; btn.textContent = 'Enviando...';
    const payload = new URLSearchParams({
      nome: document.getElementById('nome').value.trim(), email, canais: canais.join(','),
      consent: 'true', consentVersion: CONSENT_VERSION, ip: await getIp(),
      userAgent: navigator.userAgent, timestamp: new Date().toISOString()
    });
    try {
      await fetch(APPS_SCRIPT_URL, { method: 'POST', body: payload.toString(), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      form.reset(); show('Pronto! 🎉 Confira seu e-mail para confirmar a inscrição.', true);
    } catch { show('Não foi possível enviar agora. Tente novamente em instantes.', false); }
    finally { btn.disabled = false; btn.textContent = 'Quero receber as ofertas'; }
  });
})();
