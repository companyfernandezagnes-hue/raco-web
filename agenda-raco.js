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
  var BOOK_URL = 'https://www.thefork.es/restaurante/raco-r868613';

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
      xNote: 'December’s best dates go fast, so book early.',
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
    /* Ventana emergente (modal) */
    '#ag-modal{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .35s ease}' +
    '#ag-modal.on{opacity:1}' +
    '#ag-modal .bg{position:absolute;inset:0;background:rgba(22,30,20,.62);backdrop-filter:blur(2px)}' +
    '#ag-modal .card{position:relative;width:min(860px,100%);max-height:calc(100vh - 32px);overflow:auto;background:var(--paper,#FFFDF8);color:var(--ink,#161E14);' +
    'border:1px solid var(--gold,#B49356);box-shadow:0 24px 60px rgba(0,0,0,.35);transform:translateY(18px) scale(.98);transition:transform .45s cubic-bezier(.2,.8,.2,1)}' +
    '#ag-modal.on .card{transform:none}' +
    '#ag-modal .x{position:absolute;top:8px;right:10px;z-index:2;background:none;border:0;font-size:28px;line-height:1;padding:4px 8px;color:inherit;opacity:.75}' +
    '#ag-modal .x:hover{opacity:1}' +
    '#ag-modal .hd{text-align:center;padding:1.8rem 1.5rem 1.2rem}' +
    '#ag-modal .k{font-family:"Bebas Neue",sans-serif;letter-spacing:.3em;font-size:12px;color:var(--gold-text,#8C6A2E)}' +
    '#ag-modal h2{font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:clamp(30px,4.6vw,44px);letter-spacing:.04em;margin:.3rem 0 0;line-height:1}' +
    '#ag-modal .gr{display:grid;grid-template-columns:1fr 1fr}' +
    '@media (max-width:720px){#ag-modal .gr{grid-template-columns:1fr}#ag-modal{align-items:flex-end;padding:0}#ag-modal .card{max-height:92vh;border-left:0;border-right:0;border-bottom:0}}' +
    '#ag-modal .px{background:var(--ink,#161E14);color:var(--paper,#FFFDF8);padding:1.8rem 1.8rem 2rem;position:relative}' +
    '#ag-modal .px:before{content:"";position:absolute;inset:8px;border:1px solid var(--gold-20,rgba(180,147,86,.3));pointer-events:none}' +
    '#ag-modal .px .k{color:var(--gold,#B49356)}' +
    '#ag-modal .pj{padding:1.8rem 1.8rem 2rem;border-top:1px solid var(--gold-40,rgba(180,147,86,.4))}' +
    '@media (min-width:721px){#ag-modal .pj{border-top:0}}' +
    '#ag-modal h3{font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:28px;letter-spacing:.04em;margin:.4rem 0 .6rem;line-height:1.05}' +
    '#ag-modal p{font:300 14px/1.6 Outfit,sans-serif;margin:0 0 1rem}' +
    '#ag-modal .pr{display:flex;border-top:1px solid var(--gold-40,rgba(180,147,86,.4));border-bottom:1px solid var(--gold-40,rgba(180,147,86,.4));margin:1rem 0 1.2rem}' +
    '#ag-modal .pr div{flex:1;text-align:center;padding:.7rem 0}' +
    '#ag-modal .pr div+div{border-left:1px solid var(--gold-20,rgba(180,147,86,.3))}' +
    '#ag-modal .pr b{display:block;font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:34px;line-height:1;color:var(--gold,#B49356)}' +
    '#ag-modal .pr small{font:300 10px Outfit,sans-serif;letter-spacing:.08em;opacity:.7}' +
    '#ag-modal .ls{list-style:none;margin:.8rem 0 1.2rem;padding:0}' +
    '#ag-modal .ls li{display:grid;grid-template-columns:58px 1fr;gap:.9rem;align-items:center;padding:.65rem 0;border-bottom:1px solid var(--ink-10,rgba(22,30,20,.08))}' +
    '#ag-modal .ls .d{text-align:center;border-right:1px solid var(--gold-40,rgba(180,147,86,.4));padding-right:.8rem}' +
    '#ag-modal .ls .d b{display:block;font-family:"Bebas Neue",sans-serif;font-weight:400;font-size:32px;line-height:.9;color:var(--gold-text,#8C6A2E)}' +
    '#ag-modal .ls .d span{font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:11px}' +
    '#ag-modal .ls .n{font-family:"Bebas Neue",sans-serif;font-size:20px;letter-spacing:.04em;line-height:1.1}' +
    '#ag-modal .ls .n small{display:block;font:300 12px Outfit,sans-serif;letter-spacing:0;color:var(--ink-30,rgba(22,30,20,.75))}' +
    '#ag-modal .bt{display:flex;gap:.6rem;flex-wrap:wrap}' +
    '#ag-modal .b{display:inline-block;font-family:"Bebas Neue",sans-serif;letter-spacing:.18em;font-size:13px;padding:11px 16px;text-decoration:none;border:1px solid var(--gold,#B49356);background:var(--gold,#B49356);color:var(--ink,#161E14)}' +
    '#ag-modal .b.o{background:transparent;color:inherit}' +
    '#ag-modal .pj .b.o{border-color:var(--ink,#161E14)}' +
    /* Pestaña fija para volver a abrir la agenda */
    '#ag-pill{position:fixed;right:14px;bottom:14px;z-index:99980;display:flex;align-items:center;gap:8px;background:var(--ink,#161E14);color:var(--paper,#FFFDF8);' +
    'border:1px solid var(--gold,#B49356);padding:9px 14px 9px 12px;font-family:"Bebas Neue",sans-serif;letter-spacing:.2em;font-size:13px;box-shadow:0 6px 18px rgba(0,0,0,.2);' +
    'transform:translateY(160%);transition:transform .45s cubic-bezier(.2,.8,.2,1)}' +
    '#ag-pill.on{transform:none}' +
    '#ag-pill i{width:7px;height:7px;border-radius:50%;background:var(--gold,#B49356);box-shadow:0 0 0 0 rgba(180,147,86,.7);animation:agp 2.2s infinite}' +
    '@keyframes agp{0%{box-shadow:0 0 0 0 rgba(180,147,86,.6)}70%{box-shadow:0 0 0 8px rgba(180,147,86,0)}100%{box-shadow:0 0 0 0 rgba(180,147,86,0)}}' +
    '@media (prefers-reduced-motion:reduce){#ag-modal,#ag-modal .card,#ag-pill{transition:none}#ag-pill i{animation:none}}' +
    '#ag-modal a:focus-visible,#ag-modal button:focus-visible,#ag-pill:focus-visible{outline:2px solid var(--gold,#B49356);outline-offset:2px}' +
    '#agenda a:focus-visible,#agenda button:focus-visible,#agenda input:focus-visible,#agenda select:focus-visible{outline:2px solid var(--gold,#B49356);outline-offset:2px}';

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
      'SUMMARY:' + t.jLabel + ' · ' + (tx(e.bodega) || 'Raco'),
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
        '<div class="ag-btns"><a class="ag-b" href="' + BOOK_URL + '" target="_blank" rel="noopener" data-ag="jbook">' + t.jBook + '</a>' +
        '<a class="ag-b o" href="' + ics(e) + '" download="raco-' + esc(e.fecha) + '.ics" data-ag="jcal">' + t.jCal + '</a></div>';
      return '<div class="ag-e"><div class="ag-d"><b>' + d.getDate() + '</b><span>' + MONTHS[lang()][d.getMonth()] + '</span></div>' +
        '<div><h4>' + esc(tx(e.bodega) || t.jLabel) + '</h4>' +
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
    if (!el || el.closest('#ag-modal')) return;
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
    } else if (k === 'jnotify') {
      ev.preventDefault();
      var inp = document.getElementById('nl-email');
      if (inp) { inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(function () { inp.focus(); }, 600); }
    }
  });

  // Ventana emergente: se abre sola una vez por visita y luego queda la pestaña "Agenda"
  var POP_KEY = 'raco_agenda_pop';
  var lastFocus = null;
  function hasContent() { return xmasActive() || upcoming().length > 0; }

  function modalHTML(t) {
    var x = data.navidad, showX = xmasActive() && today() <= parse(x.aviso_hasta || x.mostrar_hasta);
    var list = upcoming().slice(0, 3);
    var left = showX ?
      '<div class="px"><span class="k">' + t.xLabel + '</span><h3>' + t.xTitle + '</h3>' +
      '<p>' + t.xText + '</p>' +
      '<div class="pr">' + (x.precios || []).map(function (p) { return '<div><b>' + esc(p) + '€</b><small>' + t.pp + '</small></div>'; }).join('') + '</div>' +
      '<div class="bt"><a class="b" href="#agenda" data-ag="mx">' + t.xAsk + '</a><a class="b o" href="' + MENUS_URL + '" data-ag="xsee">' + t.xSee + '</a></div></div>' : '';
    var items = list.map(function (e, i) {
      var d = parse(e.fecha);
      var sub = [e.hora ? e.hora + ' h' : '', e.precio ? e.precio + ' €' : '', e.completo ? t.jFull : ''].filter(Boolean).join(' · ');
      return '<li><div class="d"><b>' + d.getDate() + '</b><span>' + MONTHS[lang()][d.getMonth()] + '</span></div>' +
        '<div class="n">' + esc(tx(e.bodega) || t.jLabel) + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</div></li>';
    }).join('');
    var right = '<div class="pj"><span class="k">' + t.jLabel + '</span><h3>' + t.jTitle + '</h3>' +
      '<p>' + t.jText + '</p>' +
      (items ? '<ul class="ls">' + items + '</ul>' : '<p><em>' + t.jEmpty + '</em></p>') +
      '<div class="bt"><a class="b" href="' + BOOK_URL + '" target="_blank" rel="noopener" data-ag="mbook">' + t.jBook + '</a><a class="b o" href="#agenda" data-ag="pop">' + t.more + '</a></div></div>';
    return '<div class="bg" data-ag="close"></div><div class="card">' +
      '<button class="x" type="button" data-ag="close" aria-label="' + t.close + '">×</button>' +
      '<div class="hd"><span class="k">' + t.label + '</span><h2 id="ag-m-t">' + t.title + '</h2></div>' +
      '<div class="gr"' + (left ? '' : ' style="grid-template-columns:1fr"') + '>' + left + right + '</div></div>';
  }

  function openModal(auto) {
    if (!hasContent() || document.getElementById('ag-modal')) return;
    var t = T[lang()];
    lastFocus = document.activeElement;
    var m = document.createElement('div');
    m.id = 'ag-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-labelledby', 'ag-m-t');
    m.innerHTML = modalHTML(t);
    document.body.appendChild(m);
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(function () { requestAnimationFrame(function () { m.classList.add('on'); }); });
    var x = m.querySelector('.x'); if (x) x.focus();
    pill(false);
    track(auto ? 'agenda_modal_auto' : 'agenda_modal_open', lang());
  }
  function closeModal(then) {
    var m = document.getElementById('ag-modal');
    if (!m) { if (then) then(); return; }
    m.classList.remove('on');
    document.documentElement.style.overflow = '';
    setTimeout(function () {
      if (m.parentNode) m.parentNode.removeChild(m);
      pill(true);
      if (then) then(); else if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 320);
  }
  function goSection(focusForm) {
    var sec = document.getElementById('agenda');
    if (!sec) return;
    window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    if (focusForm) setTimeout(function () { var i = sec.querySelector('.ag-form input'); if (i) i.focus({ preventScroll: true }); }, 700);
  }

  function pill(show) {
    var p = document.getElementById('ag-pill');
    if (!p) {
      if (!show || !hasContent()) return;
      p = document.createElement('button');
      p.id = 'ag-pill';
      p.type = 'button';
      p.onclick = function () { openModal(false); };
      document.body.appendChild(p);
    }
    p.innerHTML = '<i></i>' + T[lang()].nav;
    var cookieOpen = !!document.getElementById('raco-ck');
    if (show && cookieOpen) setTimeout(function () { if (!document.getElementById('ag-modal')) pill(true); }, 1200);
    var hide = !show || cookieOpen;
    if (hide) p.classList.remove('on');
    else requestAnimationFrame(function () { p.classList.add('on'); });
  }

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('#ag-modal [data-ag]') : null;
    if (!el) return;
    var k = el.getAttribute('data-ag');
    if (k === 'close') { ev.preventDefault(); track('agenda_modal_close', ''); closeModal(); }
    else if (k === 'pop') { ev.preventDefault(); closeModal(function () { goSection(false); }); }
    else if (k === 'mx') { ev.preventDefault(); closeModal(function () { goSection(true); }); }
    else if (k === 'xsee') { closeModal(); }
    else if (k === 'mbook') { track('agenda_click', 'mbook'); }
  });
  document.addEventListener('keydown', function (ev) {
    var m = document.getElementById('ag-modal');
    if (!m) return;
    if (ev.key === 'Escape') { closeModal(); return; }
    if (ev.key === 'Tab') {
      var f = m.querySelectorAll('a,button,input,select');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });

  function schedulePop() {
    var seen = false;
    try { seen = !!sessionStorage.getItem(POP_KEY); } catch (e) {}
    if (seen || location.hash === '#agenda') { pill(true); return; }
    var start = Date.now(), done = false;
    var iv = setInterval(function () {
      if (done) return;
      var loader = document.getElementById('loader');
      var loaderOn = loader && loader.offsetParent !== null && getComputedStyle(loader).opacity !== '0' && getComputedStyle(loader).visibility !== 'hidden';
      var cookieOpen = !!document.getElementById('raco-ck');
      if (cookieOpen) { pill(false); return; }
      if (loaderOn && Date.now() - start < 9000) return;
      if (Date.now() - start < 3500) return;
      done = true; clearInterval(iv);
      try { sessionStorage.setItem(POP_KEY, '1'); } catch (e) {}
      openModal(true);
    }, 700);
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
        new MutationObserver(function () { render(); var m = document.getElementById('ag-modal'); if (m) { m.innerHTML = modalHTML(T[lang()]); } var p = document.getElementById('ag-pill'); if (p) p.innerHTML = '<i></i>' + T[lang()].nav; }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
      }
    }).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
