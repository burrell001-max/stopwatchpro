/* ============================================================
   STOPWATCHPRO — app.js
   Single-file vanilla-JS app: router + 9 timer tools + i18n +
   theming + localStorage persistence. No build step required.
   ============================================================ */
(function(){
"use strict";

/* ---------------------------------------------------------
   1. I18N
--------------------------------------------------------- */
const I18N = {
  en:{ brand:"StopwatchPro",
    nav_home:"Home", nav_stopwatch:"Stopwatch", nav_countdown:"Countdown",
    nav_splits:"Split Timer", nav_interval:"Interval", nav_clock:"Clock",
    nav_alarm:"Alarm", nav_metronome:"Metronome", nav_chess:"Chess Clock", nav_tally:"Tally Counter",
    nav_faq:"FAQ", nav_about:"About", nav_privacy:"Privacy", nav_contact:"Contact",
    hero_eyebrow:"Free · No sign-up · Works offline",
    hero_title:"Every timer tool you need, in one clean place.",
    hero_sub:"Stopwatch, countdown, intervals, alarms and more — fast, distraction-free, and built for presentations, workouts, classrooms and meetings.",
    quick_access:"Quick access",
    start:"Start", stop:"Stop", pause:"Pause", resume:"Resume", reset:"Reset", lap:"Lap", split:"Split",
    fullscreen:"Full screen", exit_fullscreen:"Exit full screen",
    copy:"Copy results", save:"Save", edit:"Edit", delete:"Delete", load:"Load", cancel:"Cancel",
    ready:"ready", running:"running", paused:"paused",
    settings_title:"Appearance & Accessibility", lbl_bg:"Background", lbl_text:"Timer Text", lbl_accent:"Accent",
    lbl_largetext:"Large text mode", lbl_contrast:"High contrast mode", btn_save:"Save",
    ad_placeholder:"Advertisement — placeholder (activates after AdSense approval)",
    shortcuts:"Shortcuts", sc_fullscreen:"full screen", sc_start:"start/stop", sc_lap:"lap/split", sc_reset:"reset",
    empty_saved:"Nothing saved yet.", name_placeholder:"Name this timer…", add_step:"Add step",
    step_name:"Step name", step_seconds:"Seconds", routine_name:"Routine name…",
    countdown_units_s:"Seconds", countdown_units_m:"Minutes", countdown_units_h:"Hours",
    countdown_units_d:"Days", countdown_units_w:"Weeks", countdown_units_mo:"Months", countdown_units_y:"Years",
    alarm_add:"Add alarm", alarm_time:"Time", alarm_label:"Label", alarm_sound:"Sound", preview:"Preview", test:"Test",
    until_next:"Next alarm in", no_alarms:"No alarms set.", chess_p1:"Player 1", chess_p2:"Player 2",
    chess_minutes:"Minutes per side", chess_start:"Start game", tap_to_switch:"Tap your side after each move",
    metronome_tap:"Tap tempo", bpm:"BPM", tally_reset:"Reset",
  },
  es:{ brand:"StopwatchPro",
    nav_home:"Inicio", nav_stopwatch:"Cronómetro", nav_countdown:"Cuenta atrás",
    nav_splits:"Tiempos parciales", nav_interval:"Intervalos", nav_clock:"Reloj",
    nav_alarm:"Alarma", nav_metronome:"Metrónomo", nav_chess:"Reloj de ajedrez", nav_tally:"Contador",
    nav_faq:"Preguntas", nav_about:"Acerca de", nav_privacy:"Privacidad", nav_contact:"Contacto",
    hero_eyebrow:"Gratis · Sin registro · Funciona sin conexión",
    hero_title:"Todas las herramientas de cronometraje que necesitas, en un solo lugar.",
    hero_sub:"Cronómetro, cuenta atrás, intervalos, alarmas y más — rápido, sin distracciones, ideal para presentaciones, entrenamientos, clases y reuniones.",
    quick_access:"Acceso rápido",
    start:"Iniciar", stop:"Detener", pause:"Pausar", resume:"Reanudar", reset:"Reiniciar", lap:"Vuelta", split:"Parcial",
    fullscreen:"Pantalla completa", exit_fullscreen:"Salir de pantalla completa",
    copy:"Copiar resultados", save:"Guardar", edit:"Editar", delete:"Eliminar", load:"Cargar", cancel:"Cancelar",
    ready:"listo", running:"en marcha", paused:"pausado",
    settings_title:"Apariencia y accesibilidad", lbl_bg:"Fondo", lbl_text:"Texto del temporizador", lbl_accent:"Acento",
    lbl_largetext:"Texto grande", lbl_contrast:"Alto contraste", btn_save:"Guardar",
    ad_placeholder:"Anuncio — marcador de posición (se activa tras la aprobación de AdSense)",
    shortcuts:"Atajos", sc_fullscreen:"pantalla completa", sc_start:"iniciar/detener", sc_lap:"vuelta/parcial", sc_reset:"reiniciar",
    empty_saved:"Nada guardado todavía.", name_placeholder:"Nombra este temporizador…", add_step:"Añadir paso",
    step_name:"Nombre del paso", step_seconds:"Segundos", routine_name:"Nombre de la rutina…",
    countdown_units_s:"Segundos", countdown_units_m:"Minutos", countdown_units_h:"Horas",
    countdown_units_d:"Días", countdown_units_w:"Semanas", countdown_units_mo:"Meses", countdown_units_y:"Años",
    alarm_add:"Añadir alarma", alarm_time:"Hora", alarm_label:"Etiqueta", alarm_sound:"Sonido", preview:"Vista previa", test:"Probar",
    until_next:"Próxima alarma en", no_alarms:"Sin alarmas configuradas.", chess_p1:"Jugador 1", chess_p2:"Jugador 2",
    chess_minutes:"Minutos por jugador", chess_start:"Iniciar partida", tap_to_switch:"Toca tu lado después de cada jugada",
    metronome_tap:"Marcar tempo", bpm:"BPM", tally_reset:"Reiniciar",
  },
  fr:{ brand:"StopwatchPro",
    nav_home:"Accueil", nav_stopwatch:"Chronomètre", nav_countdown:"Compte à rebours",
    nav_splits:"Temps intermédiaires", nav_interval:"Intervalles", nav_clock:"Horloge",
    nav_alarm:"Alarme", nav_metronome:"Métronome", nav_chess:"Pendule d'échecs", nav_tally:"Compteur",
    nav_faq:"FAQ", nav_about:"À propos", nav_privacy:"Confidentialité", nav_contact:"Contact",
    hero_eyebrow:"Gratuit · Sans inscription · Fonctionne hors ligne",
    hero_title:"Tous les outils de chronométrage dont vous avez besoin, au même endroit.",
    hero_sub:"Chronomètre, compte à rebours, intervalles, alarmes et plus — rapide, sans distraction, idéal pour présentations, entraînements, cours et réunions.",
    quick_access:"Accès rapide",
    start:"Démarrer", stop:"Arrêter", pause:"Pause", resume:"Reprendre", reset:"Réinitialiser", lap:"Tour", split:"Intermédiaire",
    fullscreen:"Plein écran", exit_fullscreen:"Quitter le plein écran",
    copy:"Copier les résultats", save:"Enregistrer", edit:"Modifier", delete:"Supprimer", load:"Charger", cancel:"Annuler",
    ready:"prêt", running:"en cours", paused:"en pause",
    settings_title:"Apparence et accessibilité", lbl_bg:"Fond", lbl_text:"Texte du minuteur", lbl_accent:"Accent",
    lbl_largetext:"Texte agrandi", lbl_contrast:"Contraste élevé", btn_save:"Enregistrer",
    ad_placeholder:"Publicité — emplacement réservé (activé après approbation AdSense)",
    shortcuts:"Raccourcis", sc_fullscreen:"plein écran", sc_start:"démarrer/arrêter", sc_lap:"tour/intermédiaire", sc_reset:"réinitialiser",
    empty_saved:"Rien d'enregistré pour le moment.", name_placeholder:"Nommez ce minuteur…", add_step:"Ajouter une étape",
    step_name:"Nom de l'étape", step_seconds:"Secondes", routine_name:"Nom de la routine…",
    countdown_units_s:"Secondes", countdown_units_m:"Minutes", countdown_units_h:"Heures",
    countdown_units_d:"Jours", countdown_units_w:"Semaines", countdown_units_mo:"Mois", countdown_units_y:"Années",
    alarm_add:"Ajouter une alarme", alarm_time:"Heure", alarm_label:"Libellé", alarm_sound:"Son", preview:"Aperçu", test:"Tester",
    until_next:"Prochaine alarme dans", no_alarms:"Aucune alarme définie.", chess_p1:"Joueur 1", chess_p2:"Joueur 2",
    chess_minutes:"Minutes par joueur", chess_start:"Démarrer la partie", tap_to_switch:"Touchez votre côté après chaque coup",
    metronome_tap:"Tempo au tap", bpm:"BPM", tally_reset:"Réinitialiser",
  },
  de:{ brand:"StopwatchPro",
    nav_home:"Start", nav_stopwatch:"Stoppuhr", nav_countdown:"Countdown",
    nav_splits:"Zwischenzeiten", nav_interval:"Intervall", nav_clock:"Uhr",
    nav_alarm:"Wecker", nav_metronome:"Metronom", nav_chess:"Schachuhr", nav_tally:"Zähler",
    nav_faq:"FAQ", nav_about:"Über uns", nav_privacy:"Datenschutz", nav_contact:"Kontakt",
    hero_eyebrow:"Kostenlos · Keine Anmeldung · Funktioniert offline",
    hero_title:"Alle Timer-Tools, die Sie brauchen, an einem Ort.",
    hero_sub:"Stoppuhr, Countdown, Intervalle, Wecker und mehr — schnell, ablenkungsfrei, ideal für Präsentationen, Training, Unterricht und Meetings.",
    quick_access:"Schnellzugriff",
    start:"Start", stop:"Stopp", pause:"Pause", resume:"Fortsetzen", reset:"Zurücksetzen", lap:"Runde", split:"Zwischenzeit",
    fullscreen:"Vollbild", exit_fullscreen:"Vollbild beenden",
    copy:"Ergebnisse kopieren", save:"Speichern", edit:"Bearbeiten", delete:"Löschen", load:"Laden", cancel:"Abbrechen",
    ready:"bereit", running:"läuft", paused:"pausiert",
    settings_title:"Darstellung & Barrierefreiheit", lbl_bg:"Hintergrund", lbl_text:"Timer-Text", lbl_accent:"Akzent",
    lbl_largetext:"Große Schrift", lbl_contrast:"Hoher Kontrast", btn_save:"Speichern",
    ad_placeholder:"Werbung — Platzhalter (aktiviert nach AdSense-Freigabe)",
    shortcuts:"Tastenkürzel", sc_fullscreen:"Vollbild", sc_start:"Start/Stopp", sc_lap:"Runde/Zwischenzeit", sc_reset:"Zurücksetzen",
    empty_saved:"Noch nichts gespeichert.", name_placeholder:"Timer benennen…", add_step:"Schritt hinzufügen",
    step_name:"Schrittname", step_seconds:"Sekunden", routine_name:"Name der Routine…",
    countdown_units_s:"Sekunden", countdown_units_m:"Minuten", countdown_units_h:"Stunden",
    countdown_units_d:"Tage", countdown_units_w:"Wochen", countdown_units_mo:"Monate", countdown_units_y:"Jahre",
    alarm_add:"Alarm hinzufügen", alarm_time:"Uhrzeit", alarm_label:"Bezeichnung", alarm_sound:"Ton", preview:"Vorhören", test:"Testen",
    until_next:"Nächster Alarm in", no_alarms:"Keine Alarme eingestellt.", chess_p1:"Spieler 1", chess_p2:"Spieler 2",
    chess_minutes:"Minuten pro Spieler", chess_start:"Spiel starten", tap_to_switch:"Nach jedem Zug Ihre Seite antippen",
    metronome_tap:"Tempo tippen", bpm:"BPM", tally_reset:"Zurücksetzen",
  },
  nl:{ brand:"StopwatchPro",
    nav_home:"Home", nav_stopwatch:"Stopwatch", nav_countdown:"Aftellen",
    nav_splits:"Tussentijden", nav_interval:"Interval", nav_clock:"Klok",
    nav_alarm:"Wekker", nav_metronome:"Metronoom", nav_chess:"Schaakklok", nav_tally:"Teller",
    nav_faq:"FAQ", nav_about:"Over ons", nav_privacy:"Privacy", nav_contact:"Contact",
    hero_eyebrow:"Gratis · Geen account · Werkt offline",
    hero_title:"Alle timertools die je nodig hebt, op één plek.",
    hero_sub:"Stopwatch, aftellen, intervallen, wekkers en meer — snel, zonder afleiding, ideaal voor presentaties, trainingen, lessen en vergaderingen.",
    quick_access:"Snelle toegang",
    start:"Start", stop:"Stop", pause:"Pauze", resume:"Hervatten", reset:"Resetten", lap:"Ronde", split:"Tussentijd",
    fullscreen:"Volledig scherm", exit_fullscreen:"Volledig scherm sluiten",
    copy:"Resultaten kopiëren", save:"Opslaan", edit:"Bewerken", delete:"Verwijderen", load:"Laden", cancel:"Annuleren",
    ready:"klaar", running:"loopt", paused:"gepauzeerd",
    settings_title:"Weergave & toegankelijkheid", lbl_bg:"Achtergrond", lbl_text:"Timer-tekst", lbl_accent:"Accent",
    lbl_largetext:"Grote tekst", lbl_contrast:"Hoog contrast", btn_save:"Opslaan",
    ad_placeholder:"Advertentie — plaatshouder (actief na AdSense-goedkeuring)",
    shortcuts:"Sneltoetsen", sc_fullscreen:"volledig scherm", sc_start:"start/stop", sc_lap:"ronde/tussentijd", sc_reset:"resetten",
    empty_saved:"Nog niets opgeslagen.", name_placeholder:"Naam voor deze timer…", add_step:"Stap toevoegen",
    step_name:"Naam van stap", step_seconds:"Seconden", routine_name:"Naam van routine…",
    countdown_units_s:"Seconden", countdown_units_m:"Minuten", countdown_units_h:"Uren",
    countdown_units_d:"Dagen", countdown_units_w:"Weken", countdown_units_mo:"Maanden", countdown_units_y:"Jaren",
    alarm_add:"Wekker toevoegen", alarm_time:"Tijd", alarm_label:"Label", alarm_sound:"Geluid", preview:"Voorbeeld", test:"Testen",
    until_next:"Volgende wekker over", no_alarms:"Geen wekkers ingesteld.", chess_p1:"Speler 1", chess_p2:"Speler 2",
    chess_minutes:"Minuten per speler", chess_start:"Spel starten", tap_to_switch:"Tik op jouw kant na elke zet",
    metronome_tap:"Tempo tikken", bpm:"BPM", tally_reset:"Resetten",
  }
};

let LANG = localStorage.getItem('sp_lang') || 'en';
function t(key){ return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key; }

function applyStaticI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    el.textContent = t(k);
  });
  document.getElementById('langSelect').value = LANG;
}

/* ---------------------------------------------------------
   2. TOOL REGISTRY (for nav + home grid)
--------------------------------------------------------- */
const TOOLS = [
  {id:'stopwatch', icon:'⏱️', color:'--accent-stopwatch', primary:true},
  {id:'countdown', icon:'⏳', color:'--accent-countdown', primary:true},
  {id:'splits',    icon:'🏁', color:'--accent-splits'},
  {id:'interval',  icon:'🔁', color:'--accent-interval'},
  {id:'clock',     icon:'🕒', color:'--accent-clock'},
  {id:'alarm',     icon:'⏰', color:'--accent-alarm'},
  {id:'metronome', icon:'🎵', color:'--accent-metronome'},
  {id:'chess',     icon:'♟️', color:'--accent-chess'},
  {id:'tally',     icon:'🔢', color:'--accent-tally'},
];

function toolLabel(id){ return t('nav_'+id); }
function toolColor(id){
  const tool = TOOLS.find(x=>x.id===id);
  return tool ? getComputedStyle(document.documentElement).getPropertyValue(tool.color).trim() : '';
}

/* ---------------------------------------------------------
   3. THEME (colors, dark mode, accessibility)
--------------------------------------------------------- */
const root = document.documentElement;
function loadTheme(){
  const saved = JSON.parse(localStorage.getItem('sp_theme')||'{}');
  if(saved.dark) root.setAttribute('data-theme','dark');
  if(saved.bg) root.style.setProperty('--bg', saved.bg);
  if(saved.text) root.style.setProperty('--text', saved.text);
  if(saved.accent) root.style.setProperty('--accent-user', saved.accent);
  if(saved.largeText) root.setAttribute('data-largetext','1');
  if(saved.contrast) root.setAttribute('data-contrast','1');
  document.getElementById('themeToggleBtn').textContent = saved.dark ? '☀️' : '🌙';
}
function saveTheme(patch){
  const cur = JSON.parse(localStorage.getItem('sp_theme')||'{}');
  const next = Object.assign(cur, patch);
  localStorage.setItem('sp_theme', JSON.stringify(next));
}
document.getElementById('themeToggleBtn').addEventListener('click', ()=>{
  const isDark = root.getAttribute('data-theme')==='dark';
  if(isDark){ root.removeAttribute('data-theme'); saveTheme({dark:false}); document.getElementById('themeToggleBtn').textContent='🌙'; }
  else{ root.setAttribute('data-theme','dark'); saveTheme({dark:true}); document.getElementById('themeToggleBtn').textContent='☀️'; }
});

const PRESETS = [
  {bg:'#fafbfc', text:'#14181f', accent:'#2952e3'},
  {bg:'#0c0f14', text:'#eef1f5', accent:'#00d4ff'},
  {bg:'#101913', text:'#e8f5e9', accent:'#37b24d'},
  {bg:'#1a0f1a', text:'#f9e8ff', accent:'#c026d3'},
  {bg:'#fff8f0', text:'#3a2418', accent:'#ff6b4a'},
];
function renderPresets(){
  const wrap = document.getElementById('themePresets');
  wrap.innerHTML = PRESETS.map(p=>`<button class="theme-preset" style="background:${p.bg};border-color:${p.accent}" data-bg="${p.bg}" data-text="${p.text}" data-accent="${p.accent}"></button>`).join('');
  wrap.querySelectorAll('.theme-preset').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.getElementById('colorBg').value = btn.dataset.bg;
      document.getElementById('colorText').value = btn.dataset.text;
      document.getElementById('colorAccent').value = btn.dataset.accent;
    });
  });
}

const settingsOverlay = document.getElementById('settingsOverlay');
document.getElementById('settingsBtn').addEventListener('click', ()=>{
  const saved = JSON.parse(localStorage.getItem('sp_theme')||'{}');
  document.getElementById('colorBg').value = saved.bg || '#fafbfc';
  document.getElementById('colorText').value = saved.text || '#14181f';
  document.getElementById('colorAccent').value = saved.accent || '#2952e3';
  document.getElementById('largeTextToggle').checked = !!saved.largeText;
  document.getElementById('contrastToggle').checked = !!saved.contrast;
  settingsOverlay.classList.remove('hidden');
});
document.getElementById('settingsClose').addEventListener('click', ()=>settingsOverlay.classList.add('hidden'));
settingsOverlay.addEventListener('click', e=>{ if(e.target===settingsOverlay) settingsOverlay.classList.add('hidden'); });
document.getElementById('settingsSave').addEventListener('click', ()=>{
  const bg = document.getElementById('colorBg').value;
  const text = document.getElementById('colorText').value;
  const accent = document.getElementById('colorAccent').value;
  const largeText = document.getElementById('largeTextToggle').checked;
  const contrast = document.getElementById('contrastToggle').checked;
  root.style.setProperty('--bg', bg);
  root.style.setProperty('--text', text);
  root.style.setProperty('--accent-user', accent);
  largeText ? root.setAttribute('data-largetext','1') : root.removeAttribute('data-largetext');
  contrast ? root.setAttribute('data-contrast','1') : root.removeAttribute('data-contrast');
  saveTheme({bg,text,accent,largeText,contrast});
  settingsOverlay.classList.add('hidden');
  render(); // re-apply accent to current tool
});

/* premium/Stripe section intentionally omitted */

/* ---------------------------------------------------------
   4. SOUND ENGINE (Web Audio — no external files needed)
--------------------------------------------------------- */
let actx = null;
function audioCtx(){ if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)(); return actx; }
const SOUNDS = {
  beep:   ()=>playTone([880], 0.15, 'sine'),
  chime:  ()=>playTone([523.25,659.25,783.99], 0.18, 'sine', true),
  digital:()=>playTone([1200,1200], 0.08, 'square', true, 0.09),
  bell:   ()=>playTone([660,880,660], 0.22, 'triangle', true),
  click:  ()=>playTone([2000], 0.02, 'square'),
};
function playTone(freqs, dur, type, sequential, gap){
  const ctx = audioCtx();
  freqs.forEach((f,i)=>{
    const t0 = ctx.currentTime + (sequential ? i*(gap||dur*0.9) : 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type; osc.frequency.value = f;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.22, t0+0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t0); osc.stop(t0+dur+0.02);
  });
}

/* ---------------------------------------------------------
   5. HELPERS
--------------------------------------------------------- */
function pad(n,d=2){ return String(Math.trunc(n)).padStart(d,'0'); }
function fmtStopwatch(ms){
  const t = Math.floor(ms);
  const m = Math.floor(t/60000), s = Math.floor((t%60000)/1000), mil = t%1000;
  return {main:`${pad(m)}:${pad(s)}`, ms:'.'+pad(mil,3)};
}
function fmtCountdown(totalSec){
  totalSec = Math.max(0, Math.round(totalSec));
  const d = Math.floor(totalSec/86400);
  const h = Math.floor((totalSec%86400)/3600);
  const m = Math.floor((totalSec%3600)/60);
  const s = totalSec%60;
  if(d>0) return `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
function uid(){ return Math.random().toString(36).slice(2,10); }
function store(key, val){ if(val===undefined) return JSON.parse(localStorage.getItem(key)||'null'); localStorage.setItem(key, JSON.stringify(val)); }

function toggleFullscreen(container, exitBtnId){
  if(!document.fullscreenElement){
    container.classList.add('fs-mode');
    if(container.requestFullscreen) container.requestFullscreen().catch(()=>{});
  } else {
    document.exitFullscreen && document.exitFullscreen();
  }
}
document.addEventListener('fullscreenchange', ()=>{
  if(!document.fullscreenElement){
    document.querySelectorAll('.fs-mode').forEach(el=>el.classList.remove('fs-mode'));
  }
});

/* ---------------------------------------------------------
   6. ROUTER
--------------------------------------------------------- */
const app = document.getElementById('app');
let currentTeardown = null;
let currentToolApi = {}; // exposes start/stop/reset/lap/fullscreen for keyboard shortcuts

function setActiveNav(route){
  document.querySelectorAll('.primary-nav a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#/'+route);
    if(a.classList.contains('active')){
      const tool = TOOLS.find(x=>x.id===route);
      a.style.setProperty('--tool-color', tool ? `var(${tool.color})` : '');
    }
  });
}

function setToolAccent(id){
  const tool = TOOLS.find(x=>x.id===id);
  const userAccent = getComputedStyle(root).getPropertyValue('--accent-user').trim();
  if(tool){
    root.style.setProperty('--accent', userAccent || `var(${tool.color})`);
  }
}

function render(){
  if(typeof currentTeardown === 'function'){ currentTeardown(); currentTeardown=null; }
  const hash = location.hash.replace('#/','') || '';
  const route = hash.split('/')[0];
  currentToolApi = {};
  setActiveNav(route);

  if(!route){ setToolAccent('stopwatch'); renderHome(); }
  else if(TOOLS.find(x=>x.id===route)){ setToolAccent(route); VIEWS[route](); }
  else { renderHome(); }

  applyStaticI18n();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', render);

/* nav bar build */
function buildNav(){
  const nav = document.getElementById('primaryNav');
  nav.innerHTML = `<a href="#/">${'⌂'} <span data-i18n="nav_home">Home</span></a>` +
    TOOLS.map(tl=>`<a href="#/${tl.id}"><span data-i18n="nav_${tl.id}">${toolLabel(tl.id)}</span></a>`).join('');
}

/* ---------------------------------------------------------
   7. HOME VIEW
--------------------------------------------------------- */
function renderHome(){
  const primary = TOOLS.filter(t=>t.primary);
  const rest = TOOLS.filter(t=>!t.primary);
  app.innerHTML = `
  <section class="hero">
    <div class="hero-eyebrow" data-i18n="hero_eyebrow">Free · No sign-up · Works offline</div>
    <h1 data-i18n="hero_title">Every timer tool you need, in one clean place.</h1>
    <p data-i18n="hero_sub">Stopwatch, countdown, intervals, alarms and more — fast, distraction-free, and built for presentations, workouts, classrooms and meetings.</p>

    <div class="primary-tools">
      ${primary.map(tl=>`
        <a href="#/${tl.id}" class="primary-card" style="--card-color:var(${tl.color})">
          <span class="tool-icon">${tl.icon}</span>
          <h2 data-i18n="nav_${tl.id}">${toolLabel(tl.id)}</h2>
          <div class="preview">${tl.id==='stopwatch' ? '00:00.000' : '01:00:00'}</div>
          <p>${tl.id==='stopwatch' ? 'Millisecond-accurate timing with unlimited laps.' : 'Any duration from 1 second to multiple years.'}</p>
          <span class="go">Open tool →</span>
        </a>`).join('')}
    </div>

    <div class="quick-access-label" data-i18n="quick_access">Quick access</div>
    <div class="quick-grid">
      ${rest.map(tl=>`
        <a href="#/${tl.id}" class="quick-tile" style="--tile-color:var(${tl.color})">
          <span class="qi">${tl.icon}</span>
          <span class="qt" data-i18n="nav_${tl.id}">${toolLabel(tl.id)}</span>
        </a>`).join('')}
    </div>
  </section>

  <section class="seo-grid">
    <div class="seo-card"><h3>Built for big screens</h3><p>Every tool has a true full-screen mode with oversized digits — perfect for classrooms, gyms, conference rooms and stage presentations.</p></div>
    <div class="seo-card"><h3>Works everywhere</h3><p>Runs entirely in your browser on desktop, tablet or mobile. No installs, no accounts, fast to load.</p></div>
    <div class="seo-card"><h3>Your timers, saved locally</h3><p>Countdowns, interval routines and alarms save to your device automatically, ready whenever you come back.</p></div>
  </section>
  `;
  buildNav();
  currentToolApi = { fullscreen: ()=>{} };
}

/* ---------------------------------------------------------
   8. STOPWATCH  (+ reused by Split Timer)
--------------------------------------------------------- */
function stopwatchView(mode){ // mode: 'stopwatch' | 'splits'
  const accentVar = mode==='splits' ? '--accent-splits' : '--accent-stopwatch';
  const titleKey = mode==='splits' ? 'nav_splits' : 'nav_stopwatch';
  const icon = mode==='splits' ? '🏁' : '⏱️';

  app.innerHTML = `
  <div class="tool-shell" id="swContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">${icon}</span><h1 data-i18n="${titleKey}">${toolLabel(mode)}</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="big-display" id="swTime">00:00<small id="swMs">.000</small></div>
      <div class="status-label" id="swStatus" data-i18n="ready">ready</div>
      <div class="controls-row">
        <button class="btn btn-primary" id="btnStart" data-i18n="start">Start</button>
        <button class="btn btn-ghost" id="btnLap" disabled>${mode==='splits' ? t('split') : t('lap')}</button>
        <button class="btn btn-ghost" id="btnReset" data-i18n="reset">Reset</button>
      </div>
      <p class="shortcuts-hint" data-i18n-html="1">
        <span data-i18n="shortcuts">Shortcuts</span>:
        <kbd>Space</kbd> ${t('sc_start')} · <kbd>L</kbd> ${t('sc_lap')} · <kbd>R</kbd> ${t('sc_reset')} · <kbd>F</kbd> ${t('sc_fullscreen')}
      </p>
      <div class="lap-panel">
        <div class="lap-head"><span>${t('lap')}</span><span>${t('split')}</span><span>Total</span></div>
        <ul class="lap-list" id="lapList"></ul>
        <div class="lap-tools">
          <button class="btn btn-ghost" id="btnCopy" data-i18n="copy">Copy results</button>
        </div>
      </div>
    </div>
    <div class="info-block">
      <h2>How to use the ${mode==='splits'?'split timer':'stopwatch'}</h2>
      <p>Press Start to begin timing. Record a ${mode==='splits'?'split':'lap'} at any moment to log an entry — each shows its own duration and the running total. Your best and worst entries are highlighted automatically. Use full screen for gyms, classrooms or stage timing.</p>
    </div>
  </div>`;
  buildNav();

  let startTime=0, elapsed=0, running=false, raf=null;
  const laps=[];
  const timeEl=document.getElementById('swTime'), msEl=document.getElementById('swMs'),
    statusEl=document.getElementById('swStatus'), lapList=document.getElementById('lapList'),
    btnStart=document.getElementById('btnStart'), btnLap=document.getElementById('btnLap'),
    btnReset=document.getElementById('btnReset'), container=document.getElementById('swContainer'),
    fsExit=document.getElementById('fsExit');

  function tick(){
    if(!running) return;
    elapsed = performance.now()-startTime;
    const f = fmtStopwatch(elapsed);
    timeEl.firstChild.textContent = f.main;
    msEl.textContent = f.ms;
    raf = requestAnimationFrame(tick);
  }
  function renderLaps(){
    if(!laps.length){ lapList.innerHTML=''; return; }
    const splits = laps.map(l=>l.split);
    const best=Math.min(...splits), worst=Math.max(...splits);
    lapList.innerHTML='';
    for(let i=laps.length-1;i>=0;i--){
      const lap=laps[i]; const li=document.createElement('li');
      const lf=fmtStopwatch(lap.split), tf=fmtStopwatch(lap.total);
      li.innerHTML = `<span class="lap-num">#${pad(i+1)}</span><span class="lap-t">${lf.main}${lf.ms}</span><span>${tf.main}${tf.ms}</span>`;
      if(splits.length>1){ if(lap.split===best) li.classList.add('best'); if(lap.split===worst) li.classList.add('worst'); }
      lapList.appendChild(li);
    }
  }
  function doStart(){
    if(!running){
      startTime = performance.now()-elapsed; running=true;
      btnStart.textContent = t('stop'); btnStart.classList.add('btn-danger');
      btnLap.disabled=false; statusEl.textContent=t('running');
      raf = requestAnimationFrame(tick);
    } else {
      running=false; if(raf) cancelAnimationFrame(raf);
      btnStart.textContent = t('resume'); btnStart.classList.remove('btn-danger');
      btnLap.disabled=true; statusEl.textContent=t('paused');
    }
  }
  function doLap(){
    if(!running) return;
    const cur = performance.now()-startTime;
    const prevTotal = laps.length ? laps[laps.length-1].total : 0;
    laps.push({total:cur, split:cur-prevTotal});
    renderLaps();
  }
  function doReset(){
    running=false; if(raf) cancelAnimationFrame(raf); elapsed=0; laps.length=0;
    timeEl.firstChild.textContent='00:00'; msEl.textContent='.000';
    statusEl.textContent=t('ready'); btnStart.textContent=t('start'); btnStart.classList.remove('btn-danger');
    btnLap.disabled=true; lapList.innerHTML='';
  }
  btnStart.addEventListener('click', doStart);
  btnLap.addEventListener('click', doLap);
  btnReset.addEventListener('click', doReset);
  document.getElementById('btnCopy').addEventListener('click', ()=>{
    const text = laps.map((l,i)=>`Lap ${i+1}: ${fmtStopwatch(l.split).main}${fmtStopwatch(l.split).ms}  (total ${fmtStopwatch(l.total).main}${fmtStopwatch(l.total).ms})`).join('\n');
    navigator.clipboard && navigator.clipboard.writeText(text||'No laps recorded yet.');
  });
  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());

  currentToolApi = { start:doStart, lap:doLap, reset:doReset, fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>{ running=false; if(raf) cancelAnimationFrame(raf); };
}

/* ---------------------------------------------------------
   9. COUNTDOWN TIMER
--------------------------------------------------------- */
function countdownView(){
  const saved = store('sp_countdowns') || [];
  app.innerHTML = `
  <div class="tool-shell" id="cdContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">⏳</span><h1 data-i18n="nav_countdown">Countdown</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="big-display" id="cdTime">01:00:00</div>
      <div class="status-label" id="cdStatus" data-i18n="ready">ready</div>
      <div class="controls-row">
        <button class="btn btn-primary" id="btnStart" data-i18n="start">Start</button>
        <button class="btn btn-ghost" id="btnReset" data-i18n="reset">Reset</button>
      </div>

      <div class="dropdown-row">
        <select id="unitSelect">
          <option value="s">${t('countdown_units_s')}</option>
          <option value="m" selected>${t('countdown_units_m')}</option>
          <option value="h">${t('countdown_units_h')}</option>
          <option value="d">${t('countdown_units_d')}</option>
          <option value="w">${t('countdown_units_w')}</option>
          <option value="mo">${t('countdown_units_mo')}</option>
          <option value="y">${t('countdown_units_y')}</option>
        </select>
        <input class="text-input" style="max-width:100px;font-family:var(--mono);text-align:center;" id="unitAmount" type="number" min="1" value="1">
        <button class="btn btn-ghost" id="btnApply">Set</button>
      </div>
      <div class="field-row">
        <input class="text-input" style="max-width:220px;" id="cdName" placeholder="${t('name_placeholder')}">
        <button class="btn btn-ghost" id="btnSave" data-i18n="save">Save</button>
      </div>

      <div class="saved-list" id="savedList"></div>
    </div>
    <div class="info-block">
      <h2>About the countdown timer</h2>
      <p>Set any duration from a single second up to multiple years — pick a unit, enter a number, hit Set, then Start. Save named countdowns for recurring events or deadlines; they'll be here next time you visit.</p>
    </div>
  </div>`;
  buildNav();

  let totalSec = 3600, remaining = totalSec, running=false, iv=null;
  const timeEl=document.getElementById('cdTime'), statusEl=document.getElementById('cdStatus'),
    btnStart=document.getElementById('btnStart'), btnReset=document.getElementById('btnReset'),
    container=document.getElementById('cdContainer'), fsExit=document.getElementById('fsExit'),
    savedList=document.getElementById('savedList');

  function unitToSeconds(unit, amount){
    const map = {s:1,m:60,h:3600,d:86400,w:604800,mo:2592000,y:31536000};
    return amount * (map[unit]||1);
  }
  function draw(){ timeEl.textContent = fmtCountdown(remaining); }
  function tickDown(){
    remaining -= 1;
    if(remaining<=0){ remaining=0; draw(); doStop(); playAlertLoop(); statusEl.textContent='0:00'; return; }
    draw();
  }
  function playAlertLoop(){ SOUNDS.chime(); }
  function doStart(){
    if(remaining<=0) return;
    running=true; btnStart.textContent=t('stop'); btnStart.classList.add('btn-danger'); statusEl.textContent=t('running');
    iv = setInterval(tickDown, 1000);
  }
  function doStop(){
    running=false; if(iv) clearInterval(iv); btnStart.textContent=t('resume'); btnStart.classList.remove('btn-danger'); statusEl.textContent=t('paused');
  }
  function doToggle(){ running ? doStop() : doStart(); }
  function doReset(){
    doStop(); remaining=totalSec; draw(); btnStart.textContent=t('start'); statusEl.textContent=t('ready');
  }
  document.getElementById('btnApply').addEventListener('click', ()=>{
    const unit = document.getElementById('unitSelect').value;
    const amt = parseFloat(document.getElementById('unitAmount').value)||1;
    totalSec = unitToSeconds(unit, amt); remaining = totalSec; doReset();
  });
  btnStart.addEventListener('click', doToggle);
  btnReset.addEventListener('click', doReset);

  function renderSaved(){
    const list = store('sp_countdowns')||[];
    if(!list.length){ savedList.innerHTML = `<div class="empty-note">${t('empty_saved')}</div>`; return; }
    savedList.innerHTML = list.map(c=>`
      <div class="saved-item" data-id="${c.id}">
        <div class="si-main"><span class="si-name">${c.name}</span><span class="si-sub">${fmtCountdown(c.seconds)}</span></div>
        <div class="si-actions">
          <button data-act="load" title="${t('load')}">▶</button>
          <button data-act="delete" title="${t('delete')}">🗑</button>
        </div>
      </div>`).join('');
    savedList.querySelectorAll('.saved-item').forEach(item=>{
      const id = item.dataset.id;
      item.querySelector('[data-act="load"]').addEventListener('click', ()=>{
        const c = (store('sp_countdowns')||[]).find(x=>x.id===id);
        if(c){ totalSec=c.seconds; remaining=c.seconds; draw(); doReset(); }
      });
      item.querySelector('[data-act="delete"]').addEventListener('click', ()=>{
        const list = (store('sp_countdowns')||[]).filter(x=>x.id!==id);
        store('sp_countdowns', list); renderSaved();
      });
    });
  }
  document.getElementById('btnSave').addEventListener('click', ()=>{
    const name = document.getElementById('cdName').value.trim() || 'Untitled countdown';
    const list = store('sp_countdowns')||[];
    list.push({id:uid(), name, seconds:totalSec});
    store('sp_countdowns', list);
    document.getElementById('cdName').value='';
    renderSaved();
  });

  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());

  draw(); renderSaved();
  currentToolApi = { start:doToggle, reset:doReset, fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>{ if(iv) clearInterval(iv); };
}

/* ---------------------------------------------------------
   10. INTERVAL TIMER
--------------------------------------------------------- */
function intervalView(){
  app.innerHTML = `
  <div class="tool-shell" id="ivContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">🔁</span><h1 data-i18n="nav_interval">Interval Timer</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="status-label" id="ivStepName">—</div>
      <div class="big-display" id="ivTime">00:00</div>
      <div class="status-label" id="ivStatus" data-i18n="ready">ready</div>
      <div class="controls-row">
        <button class="btn btn-primary" id="btnStart" data-i18n="start">Start</button>
        <button class="btn btn-ghost" id="btnReset" data-i18n="reset">Reset</button>
      </div>

      <div class="info-block" style="margin-top:28px;">
        <h2>Build a routine</h2>
        <div id="stepBuilder"></div>
        <button class="btn btn-ghost" id="btnAddStep" data-i18n="add_step">Add step</button>
        <div class="field-row" style="margin-top:14px;">
          <input class="text-input" style="max-width:220px;" id="routineName" placeholder="${t('routine_name')}">
          <button class="btn btn-ghost" id="btnSaveRoutine" data-i18n="save">Save</button>
        </div>
      </div>

      <div class="saved-list" id="routineList"></div>
    </div>
  </div>`;
  buildNav();

  let steps = [{name:'Work', seconds:30},{name:'Rest', seconds:15}];
  let stepIdx=0, remaining=steps[0].seconds, running=false, iv=null;
  const timeEl=document.getElementById('ivTime'), statusEl=document.getElementById('ivStatus'),
    stepNameEl=document.getElementById('ivStepName'), btnStart=document.getElementById('btnStart'),
    btnReset=document.getElementById('btnReset'), container=document.getElementById('ivContainer'),
    fsExit=document.getElementById('fsExit'), builder=document.getElementById('stepBuilder'),
    routineList=document.getElementById('routineList');

  function drawBuilder(){
    builder.innerHTML = steps.map((s,i)=>`
      <div class="step-row" data-i="${i}">
        <input type="text" value="${s.name}" data-f="name" placeholder="${t('step_name')}">
        <input type="number" class="step-dur" value="${s.seconds}" min="1" data-f="seconds">
        <button data-act="rm" title="${t('delete')}">✕</button>
      </div>`).join('');
    builder.querySelectorAll('.step-row').forEach(row=>{
      const i = +row.dataset.i;
      row.querySelector('[data-f="name"]').addEventListener('input', e=>steps[i].name=e.target.value);
      row.querySelector('[data-f="seconds"]').addEventListener('input', e=>steps[i].seconds=Math.max(1,+e.target.value||1));
      row.querySelector('[data-act="rm"]').addEventListener('click', ()=>{ steps.splice(i,1); if(!steps.length) steps=[{name:'Work',seconds:30}]; drawBuilder(); doReset(); });
    });
  }
  document.getElementById('btnAddStep').addEventListener('click', ()=>{ steps.push({name:'Step '+(steps.length+1), seconds:30}); drawBuilder(); });

  function draw(){
    stepNameEl.textContent = steps[stepIdx] ? steps[stepIdx].name : '—';
    timeEl.textContent = fmtCountdown(remaining);
  }
  function tick(){
    remaining -= 1;
    if(remaining<=0){
      SOUNDS.digital();
      stepIdx++;
      if(stepIdx>=steps.length){ doStop(); stepIdx=0; remaining=steps[0]?steps[0].seconds:0; draw(); statusEl.textContent=t('ready'); return; }
      remaining = steps[stepIdx].seconds;
    }
    draw();
  }
  function doStart(){
    if(!steps.length) return;
    running=true; btnStart.textContent=t('stop'); btnStart.classList.add('btn-danger'); statusEl.textContent=t('running');
    iv = setInterval(tick,1000);
  }
  function doStop(){ running=false; if(iv) clearInterval(iv); btnStart.textContent=t('resume'); btnStart.classList.remove('btn-danger'); statusEl.textContent=t('paused'); }
  function doToggle(){ running?doStop():doStart(); }
  function doReset(){ doStop(); stepIdx=0; remaining = steps[0]?steps[0].seconds:0; draw(); btnStart.textContent=t('start'); statusEl.textContent=t('ready'); }

  btnStart.addEventListener('click', doToggle);
  btnReset.addEventListener('click', doReset);

  function renderRoutines(){
    const list = store('sp_routines')||[];
    if(!list.length){ routineList.innerHTML = `<div class="empty-note">${t('empty_saved')}</div>`; return; }
    routineList.innerHTML = list.map(r=>`
      <div class="saved-item" data-id="${r.id}">
        <div class="si-main"><span class="si-name">${r.name}</span><span class="si-sub">${r.steps.length} steps</span></div>
        <div class="si-actions">
          <button data-act="load" title="${t('load')}">▶</button>
          <button data-act="delete" title="${t('delete')}">🗑</button>
        </div>
      </div>`).join('');
    routineList.querySelectorAll('.saved-item').forEach(item=>{
      const id=item.dataset.id;
      item.querySelector('[data-act="load"]').addEventListener('click', ()=>{
        const r=(store('sp_routines')||[]).find(x=>x.id===id);
        if(r){ steps = JSON.parse(JSON.stringify(r.steps)); drawBuilder(); doReset(); }
      });
      item.querySelector('[data-act="delete"]').addEventListener('click', ()=>{
        store('sp_routines', (store('sp_routines')||[]).filter(x=>x.id!==id)); renderRoutines();
      });
    });
  }
  document.getElementById('btnSaveRoutine').addEventListener('click', ()=>{
    const name = document.getElementById('routineName').value.trim() || 'Untitled routine';
    const list = store('sp_routines')||[];
    list.push({id:uid(), name, steps:JSON.parse(JSON.stringify(steps))});
    store('sp_routines', list);
    document.getElementById('routineName').value='';
    renderRoutines();
  });

  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());

  drawBuilder(); draw(); renderRoutines();
  currentToolApi = { start:doToggle, reset:doReset, fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>{ if(iv) clearInterval(iv); };
}

/* ---------------------------------------------------------
   11. DIGITAL CLOCK
--------------------------------------------------------- */
function clockView(){
  app.innerHTML = `
  <div class="tool-shell" id="clContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">🕒</span><h1 data-i18n="nav_clock">Digital Clock</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="big-display" id="clTime">00:00:00</div>
      <div class="status-label" id="clDate">—</div>
    </div>
  </div>`;
  buildNav();
  const timeEl=document.getElementById('clTime'), dateEl=document.getElementById('clDate'),
    container=document.getElementById('clContainer'), fsExit=document.getElementById('fsExit');
  function draw(){
    const now = new Date();
    timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    dateEl.textContent = now.toLocaleDateString(LANG, {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  }
  draw();
  const iv = setInterval(draw,1000);
  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());
  currentToolApi = { fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>clearInterval(iv);
}

/* ---------------------------------------------------------
   12. ALARM CLOCK
--------------------------------------------------------- */
function alarmView(){
  app.innerHTML = `
  <div class="tool-shell" id="alContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">⏰</span><h1 data-i18n="nav_alarm">Alarm Clock</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="status-label" data-i18n="until_next">Next alarm in</div>
      <div class="big-display" id="alNext">—</div>

      <div class="field-row" style="margin-top:26px;">
        <div class="field"><label data-i18n="alarm_time">Time</label><input type="time" id="alTime"></div>
      </div>
      <div class="field-row">
        <input class="text-input" style="max-width:220px;" id="alLabel" placeholder="${t('alarm_label')}">
        <select id="alSound">
          <option value="beep">Beep</option>
          <option value="chime">Chime</option>
          <option value="digital">Digital</option>
          <option value="bell">Bell</option>
        </select>
        <button class="btn btn-ghost" id="alPreview" data-i18n="preview">Preview</button>
      </div>
      <div class="controls-row">
        <button class="btn btn-primary" id="alAdd" data-i18n="alarm_add">Add alarm</button>
      </div>

      <div class="saved-list" id="alarmList"></div>
    </div>
  </div>`;
  buildNav();
  const container=document.getElementById('alContainer'), fsExit=document.getElementById('fsExit'),
    nextEl=document.getElementById('alNext'), alarmList=document.getElementById('alarmList');

  document.getElementById('alPreview').addEventListener('click', ()=>{
    SOUNDS[document.getElementById('alSound').value]();
  });

  function renderAlarms(){
    const list = store('sp_alarms')||[];
    if(!list.length){ alarmList.innerHTML = `<div class="empty-note">${t('no_alarms')}</div>`; }
    else {
      alarmList.innerHTML = list.map(a=>`
        <div class="saved-item alarm-item" data-id="${a.id}">
          <div class="si-main"><span class="si-name">${a.time} — ${a.label||'Alarm'}</span><span class="si-sub">${a.sound}</span></div>
          <div class="si-actions">
            <button data-act="test" title="${t('test')}">🔊</button>
            <button data-act="delete" title="${t('delete')}">🗑</button>
          </div>
        </div>`).join('');
      alarmList.querySelectorAll('.saved-item').forEach(item=>{
        const id=item.dataset.id;
        item.querySelector('[data-act="test"]').addEventListener('click', ()=>{
          const a=(store('sp_alarms')||[]).find(x=>x.id===id); if(a) SOUNDS[a.sound]();
        });
        item.querySelector('[data-act="delete"]').addEventListener('click', ()=>{
          store('sp_alarms', (store('sp_alarms')||[]).filter(x=>x.id!==id)); renderAlarms();
        });
      });
    }
    updateNext();
  }
  document.getElementById('alAdd').addEventListener('click', ()=>{
    const time = document.getElementById('alTime').value; if(!time) return;
    const label = document.getElementById('alLabel').value.trim();
    const sound = document.getElementById('alSound').value;
    const list = store('sp_alarms')||[];
    list.push({id:uid(), time, label, sound, firedToday:false});
    store('sp_alarms', list);
    document.getElementById('alLabel').value='';
    renderAlarms();
  });

  let lastMinuteChecked = '';
  function secondsUntil(hhmm){
    const [h,m] = hhmm.split(':').map(Number);
    const now = new Date();
    const target = new Date(now.getFullYear(),now.getMonth(),now.getDate(),h,m,0,0);
    if(target <= now) target.setDate(target.getDate()+1);
    return Math.round((target-now)/1000);
  }
  function updateNext(){
    const list = store('sp_alarms')||[];
    if(!list.length){ nextEl.textContent='—'; return; }
    let soonest = null;
    list.forEach(a=>{ const s = secondsUntil(a.time); if(soonest===null || s<soonest) soonest=s; });
    nextEl.textContent = fmtCountdown(soonest);

    const nowStr = `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}`;
    if(nowStr !== lastMinuteChecked){
      lastMinuteChecked = nowStr;
      list.forEach(a=>{ if(a.time===nowStr){ SOUNDS[a.sound](); } });
    }
  }
  const iv = setInterval(updateNext, 1000);

  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());

  renderAlarms();
  currentToolApi = { fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>clearInterval(iv);
}

/* ---------------------------------------------------------
   13. METRONOME
--------------------------------------------------------- */
function metronomeView(){
  app.innerHTML = `
  <div class="tool-shell" id="mtContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">🎵</span><h1 data-i18n="nav_metronome">Metronome</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="metro-visual" id="metroVisual"></div>
      <div class="metro-bpm" id="bpmDisplay">100 <small style="font-size:.4em;color:var(--muted);" data-i18n="bpm">BPM</small></div>
      <input type="range" class="metro-slider" id="bpmSlider" min="30" max="240" value="100">
      <div class="controls-row">
        <button class="btn btn-primary" id="btnStart" data-i18n="start">Start</button>
        <button class="btn btn-ghost" id="btnTap" data-i18n="metronome_tap">Tap tempo</button>
      </div>
    </div>
  </div>`;
  buildNav();
  const container=document.getElementById('mtContainer'), fsExit=document.getElementById('fsExit'),
    visual=document.getElementById('metroVisual'), bpmDisplay=document.getElementById('bpmDisplay'),
    slider=document.getElementById('bpmSlider'), btnStart=document.getElementById('btnStart');

  let bpm=100, running=false, timer=null, tapTimes=[];

  function setBpmLabel(){ bpmDisplay.childNodes[0].textContent = bpm+' '; }
  function beat(){
    SOUNDS.click();
    visual.style.transform='scale(0.82)';
    setTimeout(()=>visual.style.transform='scale(1)', 90);
    schedule();
  }
  function schedule(){ if(running) timer=setTimeout(beat, 60000/bpm); }
  function doToggle(){
    running=!running;
    btnStart.textContent = running ? t('stop') : t('start');
    btnStart.classList.toggle('btn-danger', running);
    if(running) beat(); else clearTimeout(timer);
  }
  slider.addEventListener('input', ()=>{ bpm=+slider.value; setBpmLabel(); });
  document.getElementById('btnTap').addEventListener('click', ()=>{
    const now=performance.now();
    tapTimes.push(now); if(tapTimes.length>5) tapTimes.shift();
    if(tapTimes.length>1){
      const diffs=[]; for(let i=1;i<tapTimes.length;i++) diffs.push(tapTimes[i]-tapTimes[i-1]);
      const avg = diffs.reduce((a,b)=>a+b,0)/diffs.length;
      bpm = Math.min(240, Math.max(30, Math.round(60000/avg)));
      slider.value=bpm; setBpmLabel();
    }
  });
  btnStart.addEventListener('click', doToggle);
  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());

  setBpmLabel();
  currentToolApi = { start:doToggle, fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>{ running=false; clearTimeout(timer); };
}

/* ---------------------------------------------------------
   14. CHESS CLOCK
--------------------------------------------------------- */
function chessView(){
  app.innerHTML = `
  <div class="tool-shell" id="chContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">♟️</span><h1 data-i18n="nav_chess">Chess Clock</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="field-row">
        <div class="field"><label data-i18n="chess_minutes">Minutes per side</label><input type="number" id="chMinutes" value="5" min="1"></div>
      </div>
      <div class="controls-row" style="margin-top:14px;">
        <button class="btn btn-primary" id="chStart" data-i18n="chess_start">Start game</button>
        <button class="btn btn-ghost" id="chReset" data-i18n="reset">Reset</button>
      </div>
      <p class="shortcuts-hint" data-i18n="tap_to_switch">Tap your side after each move</p>
      <div class="chess-wrap" style="margin-top:22px;">
        <div class="chess-side" id="chSide1"><div class="cs-time" id="chTime1">05:00</div><div class="cs-label" data-i18n="chess_p1">Player 1</div></div>
        <div class="chess-side" id="chSide2"><div class="cs-time" id="chTime2">05:00</div><div class="cs-label" data-i18n="chess_p2">Player 2</div></div>
      </div>
    </div>
  </div>`;
  buildNav();
  const container=document.getElementById('chContainer'), fsExit=document.getElementById('fsExit');
  const side1=document.getElementById('chSide1'), side2=document.getElementById('chSide2');
  const time1=document.getElementById('chTime1'), time2=document.getElementById('chTime2');

  let secs1=300, secs2=300, active=0, running=false, iv=null;

  function fmt(s){ s=Math.max(0,s); return `${pad(Math.floor(s/60))}:${pad(s%60)}`; }
  function draw(){
    time1.textContent=fmt(secs1); time2.textContent=fmt(secs2);
    side1.classList.toggle('active', active===1 && running);
    side2.classList.toggle('active', active===2 && running);
    side1.classList.toggle('low', secs1<=30);
    side2.classList.toggle('low', secs2<=30);
  }
  function tick(){
    if(active===1) secs1--; else if(active===2) secs2--;
    if(secs1<=0 || secs2<=0){ running=false; clearInterval(iv); }
    draw();
  }
  function switchTo(player){
    if(!running) return;
    active = player; // just switched — the OTHER player's clock now runs? No: tapping your own side after your move passes turn to opponent
  }
  side1.addEventListener('click', ()=>{ if(running && active===1){ active=2; draw(); } });
  side2.addEventListener('click', ()=>{ if(running && active===2){ active=1; draw(); } });

  document.getElementById('chStart').addEventListener('click', (e)=>{
    if(!running){
      const mins = Math.max(1, +document.getElementById('chMinutes').value||5);
      if(secs1===secs2 && (secs1===300 && !running) && document.getElementById('chMinutes')._touched!==true){
        // keep as-is unless changed
      }
      running=true; active = active||1;
      e.target.textContent = t('stop'); e.target.classList.add('btn-danger');
      iv = setInterval(tick,1000);
    } else {
      running=false; clearInterval(iv);
      e.target.textContent = t('chess_start'); e.target.classList.remove('btn-danger');
    }
    draw();
  });
  document.getElementById('chMinutes').addEventListener('input', (e)=>{
    e.target._touched=true;
    const mins = Math.max(1, +e.target.value||5);
    secs1=mins*60; secs2=mins*60; draw();
  });
  document.getElementById('chReset').addEventListener('click', ()=>{
    running=false; clearInterval(iv); active=0;
    const mins = Math.max(1, +document.getElementById('chMinutes').value||5);
    secs1=mins*60; secs2=mins*60;
    document.getElementById('chStart').textContent=t('chess_start');
    document.getElementById('chStart').classList.remove('btn-danger');
    draw();
  });

  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());

  draw();
  currentToolApi = { fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = ()=>{ running=false; if(iv) clearInterval(iv); };
}

/* ---------------------------------------------------------
   15. TALLY COUNTER
--------------------------------------------------------- */
function tallyView(){
  app.innerHTML = `
  <div class="tool-shell" id="tlContainer">
    <div class="tool-header">
      <div class="tool-title"><span class="ti">🔢</span><h1 data-i18n="nav_tally">Tally Counter</h1></div>
      <div class="tool-actions"><button id="fsBtn">⛶ <span data-i18n="fullscreen">Full screen</span></button></div>
    </div>
    <div class="tool-card">
      <button class="fs-exit" id="fsExit" style="display:none;">✕</button>
      <div class="tally-count" id="tlCount">0</div>
      <div class="tally-btns">
        <button class="tally-dec" id="tlDec">−</button>
        <button class="tally-inc" id="tlInc">+</button>
      </div>
      <div class="controls-row">
        <button class="btn btn-ghost" id="tlReset" data-i18n="tally_reset">Reset</button>
      </div>
      <p class="shortcuts-hint"><kbd>+</kbd> / <kbd>-</kbd> · <kbd>R</kbd> ${t('sc_reset')} · <kbd>F</kbd> ${t('sc_fullscreen')}</p>
    </div>
  </div>`;
  buildNav();
  let count=0;
  const countEl=document.getElementById('tlCount'), container=document.getElementById('tlContainer'), fsExit=document.getElementById('fsExit');
  function draw(){ countEl.textContent=count; }
  function inc(){ count++; draw(); }
  function dec(){ count=Math.max(0,count-1); draw(); }
  function reset(){ count=0; draw(); }
  document.getElementById('tlInc').addEventListener('click', inc);
  document.getElementById('tlDec').addEventListener('click', dec);
  document.getElementById('tlReset').addEventListener('click', reset);
  document.getElementById('fsBtn').addEventListener('click', ()=>{ toggleFullscreen(container); fsExit.style.display='block'; });
  fsExit.addEventListener('click', ()=>document.exitFullscreen && document.exitFullscreen());
  draw();
  currentToolApi = { inc, dec, reset, fullscreen:()=>document.getElementById('fsBtn').click() };
  currentTeardown = null;
}

/* ---------------------------------------------------------
   16. VIEW MAP + GLOBAL KEYBOARD SHORTCUTS
--------------------------------------------------------- */
const VIEWS = {
  stopwatch:()=>stopwatchView('stopwatch'),
  splits:()=>stopwatchView('splits'),
  countdown:countdownView,
  interval:intervalView,
  clock:clockView,
  alarm:alarmView,
  metronome:metronomeView,
  chess:chessView,
  tally:tallyView,
};

document.addEventListener('keydown', (e)=>{
  const tag = document.activeElement.tagName;
  if(tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT') return;
  if(e.code==='Space'){ e.preventDefault(); currentToolApi.start && currentToolApi.start(); }
  else if(e.key==='l' || e.key==='L'){ currentToolApi.lap && currentToolApi.lap(); }
  else if(e.key==='r' || e.key==='R'){ currentToolApi.reset && currentToolApi.reset(); }
  else if(e.key==='f' || e.key==='F'){ currentToolApi.fullscreen && currentToolApi.fullscreen(); }
  else if(e.key==='+' || e.key==='='){ currentToolApi.inc && currentToolApi.inc(); }
  else if(e.key==='-'){ currentToolApi.dec && currentToolApi.dec(); }
  else if(e.key==='Escape' && document.fullscreenElement){ document.exitFullscreen(); }
});

/* ---------------------------------------------------------
   17. LANGUAGE SWITCH (no reload)
--------------------------------------------------------- */
document.getElementById('langSelect').addEventListener('change', (e)=>{
  LANG = e.target.value;
  localStorage.setItem('sp_lang', LANG);
  buildNav();
  render();
});

/* ---------------------------------------------------------
   18. INIT
--------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();
loadTheme();
renderPresets();
buildNav();
render();

})();
