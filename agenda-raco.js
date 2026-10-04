/* RACO · Agenda: Navidad (menús de grupo) + Jueves de Bodega
   Instalación: <script src="/agenda-raco.js" defer></script> en index.html
   Los datos se editan en /agenda.json (no hace falta tocar este archivo).
*/
(function () {
  var DATA_URL = '/agenda.json';
  var EMAIL = 'hola@racorestaurant.com';
  var TEL = '+34660388061';
  var TEL_TXT = '660 388 061';
  var MENUS_URL = '/carta/#grupos';

  var T = {
    es: {
      nav: 'Agenda', label: 'Agenda',
      title: 'Lo que viene en Raco',
      xLabel: 'Navidad 2026', xTitle: 'Celebra las fiestas en Raco',
      xText: 'Comidas y cenas de empresa, familia o amigos. Tres menús cerrados para grupos, con nuestra cocina de producto y nuestros vinos.',
      pp: 'por persona', xSee: 'Ver los menús', xAsk: 'Pedir presupuesto',
      xNote: 'Las mejores fechas de diciembre vuelan: reserva con tiempo.',
      fDate: 'Fecha', fPax: 'Personas', fMenu: 'Menú', fAny: 'Aún no lo sé',
      xMailSubj: 'Navidad en Raco · grupo', xMailBody: 'Hola, queremos pedir presupuesto para un grupo en Navidad.',
      jLabel: 'Jueves de Bodega', jTitle: 'El bodeguero, en la mesa',
      jText: 'Los jueves de bodega, quien hace el vino viene a Raco y lo explica copa a copa. Plazas limitadas.',
      jWith: 'con', jBook: 'Reservar plaza', jCal: 'Añadir al calendario', jFull: 'Completo',
      jEmpty: 'Estamos cerrando las próximas bodegas.', jNotify: 'Avísame por email',
      jMailSubj: 'Jueves de Bodega', jMailBody: 'Hola, quiero reservar plaza para el Jueves de Bodega',
      jPeople: 'Somos ___ personas. Nombre y teléfono: ', contact: 'Nombre y teléfono: ',
      call: 'o llámanos al', close: 'Cerrar', more: 'Ver más'
    },
    ca: {
      nav: 'Agenda', label: 'Agenda',
      title: 'El que ve a Raco',
      xLabel: 'Nadal 2026', xTitle: 'Celebra les festes a Raco',
      xText: "Dinars i sopars d'empresa, família o amics. Tres menús tancats per a grups, amb la nostra cuina de producte i els nostres vins.",
      pp: 'per persona', xSee: 'Veure els menús', xAsk: 'Demanar pressupost',
      xNote: 'Les millors dates de desembre volen: reserva amb temps.',
      fDate: 'Data', fPax: 'Persones', fMenu: 'Menú', fAny: 'Encara no ho sé',
      xMailSubj: 'Nadal a Raco · grup', xMailBody: 'Hola, volem demanar pressupost per a un grup per Nadal.',
      jLabel: 'Dijous de Celler', jTitle: 'El seller, a taula',
      jText: "Els dijous de celler, qui fa el vi ve a Raco i l'explica copa a copa. Places limitades.",
      jWith: 'amb', jBook: 'Reservar plaça', jCal: 'Afegir al calendari', jFull: 'Complet',
      jEmpty: 'Estam tancant els propers cellers.', jNotify: "Avisa'm per email",
      jMailSubj: 'Dijous de Celler', jMailBody: 'Hola, vull reservar plaça per al Dijous de Celler',
      jPeople: 'Som ___ persones. Nom i telèfon: ', contact: 'Nom i telèfon: ',
      call: 'o truca’ns al', close: 'Tancar', more: 'Veure més'
    },
    en: {
      nav: 'Events', label: 'Events',
      title: 'Coming up at Raco',
      xLabel: 'Christmas 2026', xTitle: 'Celebrate the season at Raco',
      xText: 'Company, family or friends’ lunches and dinners. Three set menus for groups, with our product-led cooking and our wines.',
      pp: 'per person', xSee: 'See the menus', xAsk: 'Request a quote',
      xNote: 'December’s best dates go fast — book early.',
      fDate: 'Date', fPax: 'Guests', fMenu: 'Menu', fAny: 'Not sure yet',
      xMailSubj: 'Christmas at Raco · group', xMailBody: 'Hello, we would like a quote for a Christmas group booking.',
      jLabel: 'Winery Thursdays', jTitle: 'Meet the winemaker',
      jText: 'On Winery Thursdays, the people who make the wine come to Raco and talk you through it glass by glass. Limited seats.',
      jWith: 'with', jBook: 'Book a seat', jCal: 'Add to calendar', jFull: 'Sold out',
      jEmpty: 'We are lining up the next wineries.', jNotify: 'Let me know by email',
      jMailSubj: 'Winery Thursday', jMailBody: 'Hello, I would like to book a seat for the Winery Thursday',
      jPeople: 'We are ___ people. Name and phone: ', contact: 'Name and phone: ',
      call: 'or call us on', close: 'Close', more: 'See more'
    }
  };
  var MONTHS = {
    es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    ca: ['gen', 'febr', 'març', 'abr', 'maig', 'juny', 'jul', 'ag', 'set', 'oct', 'nov', 'des'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  function lang() {
    var l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return T[l] ? l : 'es';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function tx(v) { return v && typeof v === 'object' ? (v[lang()] || v.es || '') : (v || ''); }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function parse(s) { var p = String(s || '').split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(s) { var d = parse(s); return d.getDate() + ' ' + MONTHS[lang()][d.getMonth()]; }
  function track(name, label) { try { if (window.gtag) gtag('event', name, { event_label: label }); } catch (e) {} }

  var css =
    '#agenda{padding:6rem 1.5rem;background:var(--paper,#FFFDF8);color:var(--ink,#161E14)}' +
    '#agenda .ag-in{max-width:1080px;margin:0 auto}' +
    '#agenda .ag-head{text-align:center;margin-bottom:3rem}' +
    '#agenda .ag-lbl{font-family:"Bebas Neue",sans-serif;letter-spacing:.3em;font-size:12px;color:var(--gold-text,#8C6A2E)}' +
    '#agenda h2.ag-t{font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:clamp(34px,5vw,54px);letter-spacing:.04em;margin:.4rem 0 0;line-height:1}' +
    '#agenda .ag-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:1.5rem;align-items:stretch}' +
    '@media (max-width:860px){#agenda .ag-grid{grid-template-columns:1fr}#agenda{padding:4rem 1rem}}' +
    /* Navidad: panel oscuro */
    '#agenda .ag-x{background:var(--ink,#161E14);color:var(--paper,#FFFDF8);padding:2.4rem 2.2rem;position:relative;border:1px solid var(--gold-40,rgba(180,147,86,.4))}' +
    '#agenda .ag-x:before{content:"";position:absolute;inset:8px;border:1px solid var(--gold-20,rgba(180,147,86,.3));pointer-events:none}' +
    '#agenda .ag-k{font-family:"Bebas Neue",sans-serif;letter-spacing:.3em;font-size:12px;color:var(--gold,#B49356)}' +
    '#agenda h3{font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:clamp(28px,3.4vw,38px);letter-spacing:.04em;margin:.5rem 0 .8rem;line-height:1.05}' +
    '#agenda p{font-family:Outfit,sans-serif;font-weight:300;font-size:15px;line-height:1.65;margin:0 0 1.2rem}' +
    '#agenda .ag-prices{display:flex;border-top:1px solid var(--gold-40,rgba(180,147,86,.4));border-bottom:1px solid var(--gold-40,rgba(180,147,86,.4));margin:1.4rem 0}' +
    '#agenda .ag-prices div{flex:1;text-align:center;padding:1rem 0}' +
    '#agenda .ag-prices div+div{border-left:1px solid var(--gold-20,rgba(180,147,86,.3))}' +
    '#agenda .ag-prices b{display:block;font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:40px;line-height:1;color:var(--gold,#B49356)}' +
    '#agenda .ag-prices small{font-family:Outfit,sans-serif;font-size:11px;letter-spacing:.08em;opacity:.7}' +
    '#agenda .ag-form{display:grid;grid-template-columns:1.3fr .8fr 1fr;gap:.6rem;margin-bottom:.9rem}' +
    '@media (max-width:520px){#agenda .ag-form{grid-template-columns:1fr 1fr}#agenda .ag-form label:first-child{grid-column:1/-1}}' +
    '#agenda .ag-form label{display:flex;flex-direction:column;gap:4px;font:300 11px Outfit,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.85}' +
    '#agenda .ag-form input,#agenda .ag-form select{font:300 14px Outfit,sans-serif;background:transparent;color:inherit;border:1px solid var(--gold-40,rgba(180,147,86,.4));padding:9px 10px;border-radius:0;color-scheme:dark;width:100%;box-sizing:border-box}' +
    '#agenda .ag-form select option{color:#161E14}' +
    '#agenda .ag-btns{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:.4rem}' +
    '#agenda .ag-b{display:inline-block;font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:14px;padding:12px 20px;text-decoration:none;border:1px solid var(--gold,#B49356);background:var(--gold,#B49356);color:var(--ink,#161E14);text-align:center}' +
    '#agenda .ag-b.o{background:transparent;color:inherit}' +
    '#agenda .ag-b:hover{filter:brightness(1.08)}' +
    '#agenda .ag-sm{font:300 12px Outfit,sans-serif;opacity:.75;margin:1rem 0 0}' +
    '#agenda .ag-sm a{color:inherit}' +
    /* Jueves de Bodega: etiquetas de vino */
    '#agenda .ag-j{border:1px solid var(--gold-40,rgba(180,147,86,.4));padding:2.4rem 2.2rem;background:var(--paper,#FFFDF8)}' +
    '#agenda .ag-j .ag-k{color:var(--gold-text,#8C6A2E)}' +
    '#agenda .ag-list{display:flex;flex-direction:column;gap:.9rem;margin-top:1.4rem}' +
    '#agenda .ag-e{display:grid;grid-template-columns:76px 1fr;gap:1.1rem;padding:1rem;border:1px solid var(--ink-10,rgba(22,30,20,.08));background:#fff}' +
    '#agenda .ag-d{text-align:center;border-right:1px solid var(--gold-40,rgba(180,147,86,.4));padding-right:1rem}' +
    '#agenda .ag-d b{display:block;font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:44px;line-height:.9;color:var(--gold-text,#8C6A2E)}' +
    '#agenda .ag-d span{font-family:"Bebas Neue",sans-serif;letter-spacing:.2em;font-size:13px}' +
    '#agenda .ag-e h4{font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:24px;letter-spacing:.04em;margin:0;line-height:1.1}' +
    '#agenda .ag-meta{font:300 13px Outfit,sans-serif;color:var(--ink-30,rgba(22,30,20,.75));margin:.2rem 0 .6rem}' +
    '#agenda .ag-e .ag-b{font-size:12px;padding:8px 12px}' +
    '#agenda .ag-e .ag-b.o{border-color:var(--ink-30,rgba(22,30,20,.75))}' +
    '#agenda .ag-full{font-family:"Bebas Neue",sans-serif;letter-spacing:.2em;font-size:13px;color:#8a2c22;border:1px solid #8a2c22;padding:6px 10px;display:inline-block}' +
    '#agenda .ag-empty{margin-top:1.4rem;padding:1.4rem;border:1px dashed var(--gold-40,rgba(180,147,86,.4));text-align:center}' +
    '#agenda .ag-empty p{margin-bottom:.8rem}' +
    '#agenda .ag-j .ag-b.o{border-color:var(--ink,#161E14)}' +
    /* Aviso flotante */
    '#ag-pop{position:fixed;right:16px;bottom:16px;z-index:99990;width:340px;max-width:calc(100vw - 32px);background:var(--ink,#161E14);color:var(--paper,#FFFDF8);' +
    'border:1px solid var(--gold,#B49356);box-shadow:0 12px 34px rgba(0,0,0,.28);padding:1.1rem 1.2rem 1.2rem;font-family:Outfit,sans-serif;' +
    'transform:translateY(130%);transition:transform .5s cubic-bezier(.2,.8,.2,1)}' +
    '#ag-pop.on{transform:none}' +
    '#ag-pop .k{font-family:"Bebas Neue",sans-serif;letter-spacing:.3em;font-size:11px;color:var(--gold,#B49356)}' +
    '#ag-pop .t{font-family:"Bebas Neue",sans-serif;font-size:24px;letter-spacing:.04em;line-height:1.05;margin:.3rem 0 .4rem}' +
    '#ag-pop .s{font-weight:300;font-size:13px;line-height:1.5;opacity:.85;margin:0 0 .9rem}' +
    '#ag-pop a.go{display:inline-block;font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:13px;padding:9px 16px;background:var(--gold,#B49356);color:var(--ink,#161E14);text-decoration:none}' +
    '#ag-pop button.x{position:absolute;top:6px;right:8px;background:none;border:0;color:inherit;font-size:22px;line-height:1;opacity:.7;padding:4px 6px}' +
    '#ag-pop button.x:hover{opacity:1}' +
    '@media (max-width:520px){#ag-pop{right:8px;left:8px;bottom:8px;width:auto;max-width:none}}' +
    '#agenda a:focus-visible,#agenda button:focus-visible,#agenda input:focus-visible,#agenda select:focus-visible,#ag-pop a:focus-visible,#ag-pop button:focus-visible{outline:2px solid var(--gold,#B49356);outline-offset:2px}';

  var data = null;

  function xmasActive() {
    var x = data && data.navidad; if (!x) return false;
    var t = today();
    return t >= parse(x.mostrar_desde) && t <= parse(x.mostrar_hasta);
  }
  function upcoming() {
    var j = data && data.jueves_bodega; if (!j || !j.fechas) return [];
    var t = today();
    return j.fechas.filter(function (e) { return e && e.fecha && parse(e.fecha) >= t; })
      .sort(function (a, b) { return parse(a.fecha) - parse(b.fecha); });
  }

  function mailto(subj, body) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
  }

  function ics(e) {
    var d = e.fecha.replace(/-/g, '');
    var hm = (e.hora || '20:30').split(':');
    var start = d + 'T' + ('0' + hm[0]).slice(-2) + ('0' + (hm[1] || '0')).slice(-2) + '00';
    var endH = ('0' + Math.min(23, (+hm[0] + 3))).slice(-2);
    var end = d + 'T' + endH + ('0' + (hm[1] || '0')).slice(-2) + '00';
    var t = T[lang()];
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Raco//Agenda//ES', 'BEGIN:VEVENT',
      'UID:raco-' + d + '@racorestaurant.com',
      'DTSTART;TZID=Europe/Madrid:' + start, 'DTEND;TZID=Europe/Madrid:' + end,
      'SUMMARY:' + t.jLabel + ' · ' + (e.bodega || 'Raco'),
      'LOCATION:Raco · Wine Bar · Palma de Mallorca',
      'URL:https://racorestaurant.com/#agenda',
      'END:VEVENT', 'END:VCALENDAR'
    ];
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
  }

  function xmasHTML(t) {
    var x = data.navidad;
    var prices = (x.precios || []).map(function (p) {
      return '<div><b>' + esc(p) + '€</b><small>' + t.pp + '</small></div>';
    }).join('');
    var opts = '<option value="">' + t.fAny + '</option>' + (x.precios || []).map(function (p) {
      return '<option value="' + esc(p) + '">' + esc(p) + ' €</option>';
    }).join('');
    return '<div class="ag-x">' +
      '<span class="ag-k">' + t.xLabel + '</span>' +
      '<h3>' + t.xTitle + '</h3>' +
      '<p>' + t.xText + '</p>' +
      (prices ? '<div class="ag-prices">' + prices + '</div>' : '') +
      '<form class="ag-form" onsubmit="return false">' +
      '<label>' + t.fDate + '<input type="date" name="d" min="' + new Date().toISOString().slice(0, 10) + '"></label>' +
      '<label>' + t.fPax + '<input type="number" name="p" min="2" max="80" inputmode="numeric" placeholder="12"></label>' +
      '<label>' + t.fMenu + '<select name="m">' + opts + '</select></label>' +
      '</form>' +
      '<div class="ag-btns">' +
      '<a class="ag-b" href="#" data-ag="xask">' + t.xAsk + '</a>' +
      '<a class="ag-b o" href="' + MENUS_URL + '" data-ag="xsee">' + t.xSee + '</a>' +
      '</div>' +
      '<p class="ag-sm">' + t.xNote + ' ' + t.call + ' <a href="tel:' + TEL + '">' + TEL_TXT + '</a>.</p>' +
      '</div>';
  }

  function juevesHTML(t) {
    var list = upcoming().slice(0, 4);
    var items = list.map(function (e, i) {
      var d = parse(e.fecha);
      var meta = [e.zona, e.con ? t.jWith + ' ' + e.con : '', e.hora ? e.hora + ' h' : '', e.precio ? e.precio + ' €' : '']
        .filter(Boolean).map(esc).join(' · ');
      var note = tx(e.nota);
      var actions = e.completo ? '<span class="ag-full">' + t.jFull + '</span>' :
        '<div class="ag-btns"><a class="ag-b" href="#" data-ag="jbook" data-i="' + i + '">' + t.jBook + '</a>' +
        '<a class="ag-b o" href="' + ics(e) + '" download="raco-' + esc(e.fecha) + '.ics" data-ag="jcal">' + t.jCal + '</a></div>';
      return '<div class="ag-e"><div class="ag-d"><b>' + d.getDate() + '</b><span>' + MONTHS[lang()][d.getMonth()] + '</span></div>' +
        '<div><h4>' + esc(e.bodega || t.jLabel) + '</h4>' +
        (meta ? '<div class="ag-meta">' + meta + '</div>' : '') +
        (note ? '<p style="font-size:14px;margin:0 0 .7rem">' + esc(note) + '</p>' : '') +
        actions + '</div></div>';
    }).join('');
    var hasNl = !!document.getElementById('nl-email');
    var empty = '<div class="ag-empty"><p>' + t.jEmpty + '</p>' +
      (hasNl ? '<a class="ag-b o" href="#nl-email" data-ag="jnotify">' + t.jNotify + '</a>'
             : '<a class="ag-b o" href="' + mailto(t.jMailSubj, t.jNotify) + '">' + t.jNotify + '</a>') +
      '</div>';
    return '<div class="ag-j">' +
      '<span class="ag-k">' + t.jLabel + '</span>' +
      '<h3>' + t.jTitle + '</h3>' +
      '<p>' + t.jText + '</p>' +
      (items ? '<div class="ag-list">' + items + '</div>' : empty) +
      '</div>';
  }

  function render() {
    var t = T[lang()];
    var showX = xmasActive();
    var sec = document.getElementById('agenda');
    if (!sec) {
      sec = document.createElement('section');
      sec.id = 'agenda';
      sec.setAttribute('aria-label', t.label);
      var anchor = document.getElementById('bebidas');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(sec, anchor);
      else document.body.appendChild(sec);
    }
    sec.innerHTML = '<div class="ag-in"><div class="ag-head"><span class="ag-lbl">' + t.label + '</span>' +
      '<h2 class="ag-t">' + t.title + '</h2></div>' +
      '<div class="ag-grid"' + (showX ? '' : ' style="grid-template-columns:1fr;max-width:640px;margin:0 auto"') + '>' +
      (showX ? xmasHTML(t) : '') + juevesHTML(t) + '</div></div>';
    navLink(t);
  }

  function navLink(t) {
    var nav = document.getElementById('nav-links');
    if (!nav) return;
    var a = document.getElementById('ag-nav');
    if (!a) {
      var carta = nav.querySelector('a[href="/carta/"]');
      if (!carta) return;
      a = carta.cloneNode(false);
      a.id = 'ag-nav';
      a.removeAttribute('data-i18n');
      a.setAttribute('href', '#agenda');
      carta.parentNode.insertBefore(a, carta.nextSibling);
    }
    a.textContent = t.nav;
  }

  // Clicks: presupuesto Navidad, reservar Jueves, analítica
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-ag]') : null;
    if (!el) return;
    var t = T[lang()], k = el.getAttribute('data-ag');
    track('agenda_click', k);
    if (k === 'xask') {
      ev.preventDefault();
      var f = document.querySelector('#agenda .ag-form');
      var d = f && f.d.value, p = f && f.p.value, m = f && f.m.value;
      var body = t.xMailBody + '\n\n' +
        t.fDate + ': ' + (d ? d.split('-').reverse().join('/') : '—') + '\n' +
        t.fPax + ': ' + (p || '—') + '\n' +
        t.fMenu + ': ' + (m ? m + ' €' : t.fAny) + '\n\n' + t.contact;
      location.href = mailto(t.xMailSubj, body);
    } else if (k === 'jbook') {
      ev.preventDefault();
      var e = upcoming()[+el.getAttribute('data-i')];
      if (!e) return;
      location.href = mailto(t.jMailSubj + ' · ' + fmtDate(e.fecha),
        t.jMailBody + ' (' + fmtDate(e.fecha) + (e.bodega ? ', ' + e.bodega : '') + ').\n\n' + t.jPeople);
    } else if (k === 'jnotify') {
      ev.preventDefault();
      var inp = document.getElementById('nl-email');
      if (inp) { inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(function () { inp.focus(); }, 600); }
    } else if (k === 'pop') {
      closePop(true);
    }
  });

  // Aviso flotante: una vez por visita, sin tapar el banner de cookies
  var POP_KEY = 'raco_agenda_pop';
  function popItem() {
    var t = T[lang()], next = upcoming().filter(function (e) { return !e.completo; })[0];
    var soon = next && (parse(next.fecha) - today()) / 864e5 <= 6;
    if (soon) return { id: 'j' + next.fecha, k: t.jLabel + ' · ' + fmtDate(next.fecha), t: next.bodega || t.jTitle, s: t.jText };
    var x = data && data.navidad;
    if (x && xmasActive() && today() <= parse(x.aviso_hasta)) {
      var pr = (x.precios || []).map(function (p) { return p + '€'; }).join(' · ');
      return { id: 'xmas', k: t.xLabel, t: t.xTitle, s: (pr ? pr + ' ' + t.pp + '. ' : '') + t.xNote };
    }
    return null;
  }
  function closePop(seen) {
    var p = document.getElementById('ag-pop');
    if (!p) return;
    p.classList.remove('on');
    setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 600);
  }
  function showPop() {
    var it = popItem();
    if (!it) return;
    try { if (sessionStorage.getItem(POP_KEY)) return; sessionStorage.setItem(POP_KEY, it.id); } catch (e) {}
    var t = T[lang()];
    var p = document.createElement('div');
    p.id = 'ag-pop';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-label', it.k);
    p.innerHTML = '<button class="x" type="button" aria-label="' + t.close + '">×</button>' +
      '<div class="k">' + esc(it.k) + '</div><div class="t">' + esc(it.t) + '</div>' +
      '<p class="s">' + esc(it.s) + '</p><a class="go" href="#agenda" data-ag="pop">' + t.more + '</a>';
    p.querySelector('.x').onclick = function () { track('agenda_pop_close', it.id); closePop(true); };
    document.body.appendChild(p);
    requestAnimationFrame(function () { requestAnimationFrame(function () { p.classList.add('on'); }); });
    track('agenda_pop_show', it.id);
  }
  function schedulePop() {
    var started = Date.now(), done = false;
    function ready() {
      if (done) return;
      var sec = document.getElementById('agenda');
      var cookieOpen = !!document.getElementById('raco-ck');
      var scrolled = window.scrollY > window.innerHeight * 0.6;
      var nearAgenda = sec && sec.getBoundingClientRect().top < window.innerHeight; // ya la está viendo
      if (cookieOpen || nearAgenda) return;
      if (Date.now() - started > 6000 && scrolled) { done = true; showPop(); }
    }
    window.addEventListener('scroll', ready, { passive: true });
    setInterval(ready, 1500);
  }

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    fetch(DATA_URL, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (j) {
      data = j;
      if (!xmasActive() && !upcoming().length && !(data.jueves_bodega)) return;
      render();
      if (location.hash === '#agenda') document.getElementById('agenda').scrollIntoView();
      schedulePop();
      if (window.MutationObserver) {
        new MutationObserver(function () { render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
      }
    }).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
