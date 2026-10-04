/* RACO · Google Analytics 4 + banner de cookies (ES / CA / EN)
   Instalación: <script src="/cookies-raco.js"></script> justo después de <head>.
   - Google Analytics NO se carga hasta que el visitante pulsa "Aceptar".
   - El banner sigue el idioma de la web (atributo lang de <html>), también al cambiarlo sin recargar.
   - Oculta el aviso antiguo (#cookies) que decía que no había analítica.
   - Botón "Cookies" abajo a la izquierda para cambiar la elección; también racoCookies.open().
*/
(function () {
  var GA_ID = 'G-DCR5HRVHTH';
  var KEY = 'raco_consent';              // 'accepted' | 'rejected'
  var POLICY_URL = '/cookies.html';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  var gaLoaded = false;
  function loadGA() {
    window['ga-disable-' + GA_ID] = false;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
  if (choice === 'accepted') loadGA();

  var T = {
    es: { title: 'Cookies', text: 'Usamos cookies de analítica (Google Analytics) para saber cómo se usa la web y mejorarla. Solo se activan si las aceptas.', accept: 'Aceptar', reject: 'Rechazar', more: 'Más información', manage: 'Cookies' },
    ca: { title: 'Galetes', text: "Utilitzem galetes d'analítica (Google Analytics) per saber com s'utilitza la web i millorar-la. Només s'activen si les acceptes.", accept: 'Acceptar', reject: 'Rebutjar', more: 'Més informació', manage: 'Galetes' },
    en: { title: 'Cookies', text: 'We use analytics cookies (Google Analytics) to understand how the site is used and improve it. They are only enabled if you accept.', accept: 'Accept', reject: 'Reject', more: 'More info', manage: 'Cookies' }
  };
  function lang() {
    var l = (document.documentElement.lang || navigator.language || 'es').slice(0, 2).toLowerCase();
    return T[l] ? l : (l === 'va' ? 'ca' : 'es');
  }

  var css =
    '#cookies{display:none!important}' +
    '#raco-ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:440px;margin-left:auto;' +
    'background:#FFFDF8;color:#1C1C0E;border:1px solid #B8924A;border-radius:6px;padding:18px 20px;' +
    'box-shadow:0 8px 28px rgba(28,28,14,.18);font-family:Outfit,system-ui,sans-serif;font-weight:300;font-size:14px;line-height:1.5}' +
    '#raco-ck h2{margin:0 0 6px;font-family:"Bebas Neue",Outfit,sans-serif;font-weight:400;font-size:22px;letter-spacing:.06em;color:#1C1C0E}' +
    '#raco-ck p{margin:0 0 14px}' +
    '#raco-ck a{color:#B8924A;text-decoration:underline}' +
    '#raco-ck .b{display:flex;gap:10px}' +
    '#raco-ck button{flex:1;font:inherit;font-weight:400;font-size:14px;padding:10px 12px;border-radius:4px;' +
    'border:1px solid #1C1C0E;letter-spacing:.03em}' +
    '#raco-ck .ok{background:#1C1C0E;color:#FFFDF8}' +
    '#raco-ck .no{background:#FFFDF8;color:#1C1C0E}' +
    '#raco-ck button:focus-visible,#raco-ck-m:focus-visible{outline:2px solid #B8924A;outline-offset:2px}' +
    '#raco-ck-m{position:fixed;left:12px;bottom:12px;z-index:99998;background:#FFFDF8;color:#1C1C0E;' +
    'border:1px solid #B8924A;border-radius:20px;padding:5px 12px;font:300 12px Outfit,system-ui,sans-serif;opacity:.8}' +
    '#raco-ck-m:hover{opacity:1}';

  function clearGaCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') === 0) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  function save(val) {
    choice = val;
    try { localStorage.setItem(KEY, val); } catch (e) {}
    if (val === 'accepted') {
      loadGA();
    } else {
      gtag('consent', 'update', { analytics_storage: 'denied' });
      window['ga-disable-' + GA_ID] = true;
      clearGaCookies();
    }
    var b = document.getElementById('raco-ck');
    if (b) b.remove();
    showManage();
  }

  function bannerHTML(t) {
    return '<h2>' + t.title + '</h2>' +
      '<p>' + t.text + (POLICY_URL ? ' <a href="' + POLICY_URL + '">' + t.more + '</a>' : '') + '</p>' +
      '<div class="b"><button class="no" type="button">' + t.reject + '</button>' +
      '<button class="ok" type="button">' + t.accept + '</button></div>';
  }

  function showBanner() {
    if (document.getElementById('raco-ck')) return;
    var t = T[lang()];
    var d = document.createElement('div');
    d.id = 'raco-ck';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', t.title);
    d.innerHTML = bannerHTML(t);
    d.querySelector('.ok').onclick = function () { save('accepted'); };
    d.querySelector('.no').onclick = function () { save('rejected'); };
    document.body.appendChild(d);
    var m = document.getElementById('raco-ck-m');
    if (m) m.remove();
  }

  function showManage() {
    if (document.getElementById('raco-ck-m')) return;
    var m = document.createElement('button');
    m.id = 'raco-ck-m';
    m.type = 'button';
    m.textContent = T[lang()].manage;
    m.onclick = showBanner;
    document.body.appendChild(m);
  }

  // Si se cambia de idioma en la web (ES/CA/EN), el banner y el botón cambian también.
  function relabel() {
    var t = T[lang()];
    var b = document.getElementById('raco-ck');
    if (b) { b.remove(); showBanner(); }
    var m = document.getElementById('raco-ck-m');
    if (m) m.textContent = t.manage;
  }

  window.racoCookies = { open: showBanner };

  // Medición de clics en teléfono y email (solo se envía a Google si el visitante ha aceptado)
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="tel:"], a[href^="mailto:"]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    gtag('event', href.indexOf('tel:') === 0 ? 'llamada_click' : 'email_click', {
      link_url: href.split('?')[0],
      link_text: (a.textContent || '').trim().slice(0, 100)
    });
  });

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    if (choice === 'accepted' || choice === 'rejected') showManage();
    else showBanner();
    if (window.MutationObserver) {
      new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
