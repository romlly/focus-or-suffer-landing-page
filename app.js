/* Focus or Suffer — scripts de la page de présentation.
   Aucune dépendance, aucun appel réseau, aucun cookie. */

/* L'adresse de la fiche du Chrome Web Store est écrite directement dans les
   deux boutons « Installer » : un lien d'installation ne doit pas dépendre de
   l'exécution d'un script. */

const $ = (sel) => document.querySelector(sel);
const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

/* ── Le décor du hero, pilotable depuis la galerie ───────────────── */

const SCENES = [
  ['aube', 'Aube sur le lac', 'Montagne et reflets'],
  ['synthwave', 'Synthwave', 'Soleil à bandes et grille néon'],
  ['cyberpunk', 'Néons et pluie', 'Mégapole nocturne'],
  ['desert', 'Mesa au crépuscule', 'Ouest américain'],
  ['aurore', 'Aurores boréales', 'Forêt enneigée'],
  ['tropiques', 'Lagune tropicale', 'Palmiers au coucher'],
  ['orbite', 'Orbite lointaine', 'Planète annelée'],
  ['pagode', 'Pagode et cerisiers', 'Nuit japonaise'],
  ['volcan', 'Terres de lave', 'Coulées incandescentes'],
  ['donjon', 'Château sur la falaise', 'Pleine lune médiévale'],
];

const gallery = $('#gallery');
const heroScene = $('#heroScene');

SCENES.forEach(([id, nom, ambiance], index) => {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile' + (index === 0 ? ' is-active' : '');
  tile.innerHTML = `<img src="img/scene-${id}.png" alt="Décor « ${nom} »" loading="lazy">
    <b></b><em></em>`;
  tile.querySelector('b').textContent = nom;
  tile.querySelector('em').textContent = ambiance;
  tile.addEventListener('click', () => {
    heroScene.style.backgroundImage = `url("img/scene-${id}.png")`;
    gallery.querySelectorAll('.tile').forEach((t) => t.classList.remove('is-active'));
    tile.classList.add('is-active');
  });
  gallery.appendChild(tile);
});

/* ── Citations ───────────────────────────────────────────────────── */

const QUOTES = [
  ["Ce n'est pas que nous ayons peu de temps : c'est que nous en perdons beaucoup.", 'Sénèque'],
  ['Pendant qu’on remet à plus tard, la vie passe.', 'Sénèque'],
  ['Cesse de discourir sur ce que doit être l’honnête homme : sois-le.', 'Marc Aurèle'],
  ["L'obstacle à l'action fait avancer l'action.", 'Marc Aurèle'],
  ["Ce qui nous trouble n'est pas les choses, mais le jugement que nous portons sur elles.", 'Épictète'],
  ['Tout le malheur des hommes vient de ne savoir pas demeurer en repos dans une chambre.', 'Pascal'],
  ['Nous ne vivons jamais, mais nous espérons de vivre.', 'Pascal'],
  ["La plus grande chose du monde, c'est de savoir être à soi.", 'Montaigne'],
  ['Patience et longueur de temps font plus que force ni que rage.', 'La Fontaine'],
  ["Il n'est pas suffisant d'être occupé : les fourmis le sont aussi. À quoi sommes-nous occupés ?", 'Thoreau'],
  ['Vingt fois sur le métier remettez votre ouvrage.', 'Boileau'],
  ["Penser, c'est dire non.", 'Alain'],
  ["L'attention est la forme la plus rare et la plus pure de la générosité.", 'Simone Weil'],
  ["La concentration, c'est décider de ce qu'on ne fera pas.", null],
  ["L'ennui est le seuil de la concentration. Traverse-le.", null],
  ['Ce que tu cherches là-bas n’y est pas. Tu le sais déjà.', null],
  ["Personne ne t'attend de l'autre côté de ce défilement.", null],
  ['Il faut vingt minutes pour rentrer dans un problème et une seconde pour en sortir.', null],
  ['« Une minute » est le plus long mensonge que tu te racontes.', null],
  ['Le perfectionnisme est la procrastination en costume.', null],
  ["Tu n'as pas besoin de savoir ce qui s'est passé pendant que tu travaillais.", null],
  ['Ce que tu appelles une distraction est un choix, répété.', null],
  ["Ranger son bureau n'est pas travailler, même si ça y ressemble beaucoup.", null],
  ['Aucune notification n’a jamais mérité d’interrompre une idée.', null],
  ["Le fil ne s'arrête jamais. C'est à toi de t'arrêter.", null],
  ['Ce que tu remets à demain, demain le remettra à après-demain.', null],
  ["La volonté s'épuise. Les règles, non. C'est pour cela qu'il y a des règles.", null],
  ['Décider une fois vaut mieux que résister cent fois.', null],
  ["On ne résiste pas à la tentation : on l'éloigne.", null],
  ['Le soir, tu ne compteras pas les onglets ouverts.', null],
  ['Fais la chose difficile d’abord. Le reste suivra.', null],
  ['Deux heures de concentration réelle par jour suffisent à changer une année.', null],
];

const quoteEl = $('#bigQuote');
let quoteBag = [];

function showQuote() {
  if (!quoteBag.length) {
    quoteBag = QUOTES.map((_, i) => i);
    for (let i = quoteBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quoteBag[i], quoteBag[j]] = [quoteBag[j], quoteBag[i]];
    }
  }
  const [texte, auteur] = QUOTES[quoteBag.pop()];
  quoteEl.textContent = texte;
  if (auteur) {
    const cite = document.createElement('cite');
    cite.textContent = auteur;
    quoteEl.appendChild(cite);
  }
}

showQuote();
$('#quoteNext').addEventListener('click', showQuote);

/* ── Le compteur qui vous observe ────────────────────────────────── */

const loiter = $('#loiter');
const arrivee = Date.now();

const REMARQUES = [
  [0, () => 'Cette page est aussi une distraction, techniquement.'],
  [20, (s) => `Vous lisez ceci depuis ${s} secondes. On ne juge pas. On compte.`],
  [50, (s) => `${s} secondes. À ce rythme, l'extension va vous manquer.`],
  [90, () => "Une minute et demie. Vous auriez pu commencer ce que vous évitez."],
  [150, () => 'Deux minutes et demie sur la page d’un bloqueur de distractions. Bravo.'],
  [300, () => "Cinq minutes. L'ironie a été relevée, vous pouvez arrêter."],
  [600, () => 'Dix minutes. Sincèrement, allez travailler.'],
];

setInterval(() => {
  const s = Math.floor((Date.now() - arrivee) / 1000);
  const [, texte] = REMARQUES.filter(([seuil]) => s >= seuil).pop();
  loiter.textContent = texte(s);
}, 1000);

/* ══════════════════════════════════════════════════════════════════
   La démonstration du casse-tête

   Reprend les trois étapes de l'extension, à l'identique — y compris
   les vingt secondes d'attente. Abandonner en cours de route est une
   issue prévue : c'est même l'argument de vente.
   ══════════════════════════════════════════════════════════════════ */

const PHRASES = [
  "L'attention est la seule monnaie que je ne peux pas regagner",
  'Personne ne m’attend de l’autre côté de ce défilement',
  'Je choisis ce qui compte plutôt que ce qui appelle',
  'La page que je veux ouvrir ne contient rien pour moi',
  'Revenir demande vingt minutes, partir demande une seconde',
  'Trois minutes de curiosité coûtent une heure de concentration',
];

function jeton(n = 6) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: n }, () => alphabet[rand(0, alphabet.length - 1)]).join('');
}

function makeTranscription() {
  const a = PHRASES[rand(0, PHRASES.length - 1)];
  let b = PHRASES[rand(0, PHRASES.length - 1)];
  while (b === a) b = PHRASES[rand(0, PHRASES.length - 1)];
  return `${a}, et ${b[0].toLowerCase()}${b.slice(1)}. Code : ${jeton()}-${jeton(4)}.`;
}

function makeSums(n = 3) {
  return Array.from({ length: n }, () => {
    const a = rand(12, 39);
    const b = rand(3, 9);
    const c = rand(11, 89);
    const plus = rand(0, 1) === 1;
    return { label: `${a} × ${b} ${plus ? '+' : '−'} ${c}`, answer: plus ? a * b + c : a * b - c };
  });
}

const squash = (s) => String(s).replace(/\s+/g, ' ').trim();

const demo = $('#demo');
const body = $('#demoBody');
const err = $('#demoError');
const next = $('#demoNext');
const quit = $('#demoQuit');
const BREATHE = 20;

let etape = 0;
let timer = null;
let attendu = '';
let sommes = [];

function marquer() {
  demo.querySelectorAll('.demo-steps span').forEach((el) => {
    const n = Number(el.dataset.step);
    el.classList.toggle('is-done', n < etape);
    el.classList.toggle('is-current', n === etape);
  });
}

function echouer(message) {
  err.textContent = `${message} On reprend depuis le début.`;
  demo.classList.remove('is-shaking');
  void demo.offsetWidth; // force un reflow pour rejouer l'animation
  demo.classList.add('is-shaking');
  respirer();
}

/* Écran d'accueil */
function repos(message) {
  if (timer) clearInterval(timer);
  timer = null;
  etape = 0;
  marquer();
  body.innerHTML = '<div class="demo-idle"><p></p></div>';
  body.querySelector('p').textContent =
    message ||
    "Trois étapes, la moindre erreur renvoyant au début. C'est ce que l'extension demande pour retirer un site de votre liste.";
  next.textContent = 'Commencer';
  next.disabled = false;
  next.onclick = respirer;
  quit.hidden = true;
}

/* Étape 1 — attendre */
function respirer() {
  etape = 1;
  marquer();
  quit.hidden = false;
  if (timer) clearInterval(timer);

  let reste = BREATHE;
  body.innerHTML = `<div class="demo-center">
      <div class="demo-ring"><span class="demo-count"></span></div>
      <p class="demo-hint">Rien à faire pendant ${BREATHE} secondes. Si l'envie retombe
      avant la fin, c'est qu'elle n'était pas nécessaire.</p>
    </div>`;
  const compteur = body.querySelector('.demo-count');

  const tic = () => {
    compteur.textContent = String(Math.max(0, reste));
    if (reste <= 0) {
      clearInterval(timer);
      timer = null;
      next.disabled = false;
      next.textContent = 'Continuer';
      next.focus();
    }
    reste -= 1;
  };

  next.disabled = true;
  next.textContent = 'Patientez…';
  next.onclick = recopier;
  tic();
  timer = setInterval(tic, 1000);
}

/* Étape 2 — recopier */
function recopier() {
  etape = 2;
  marquer();
  err.textContent = '';
  attendu = makeTranscription();

  body.innerHTML = `<p class="demo-hint">Recopiez cette phrase à l'identique, accents et
      ponctuation compris. Le copier-coller est désactivé.</p>
    <p class="demo-source"></p>
    <textarea class="demo-input" rows="4" spellcheck="false" autocomplete="off"
      aria-label="Recopie de la phrase"></textarea>
    <p class="demo-meter"><span></span></p>`;

  body.querySelector('.demo-source').textContent = attendu;
  const champ = body.querySelector('.demo-input');
  const jauge = body.querySelector('.demo-meter span');

  ['paste', 'drop', 'dragover'].forEach((type) =>
    champ.addEventListener(type, (e) => {
      e.preventDefault();
      err.textContent = 'Le collage est désactivé. À la main.';
    })
  );

  const avancer = () => {
    const tape = squash(champ.value);
    const cible = squash(attendu);
    let commun = 0;
    while (commun < tape.length && tape[commun] === cible[commun]) commun += 1;
    jauge.style.width = `${Math.min(100, (commun / cible.length) * 100)}%`;
    jauge.classList.toggle('is-off', tape.length > commun);
    next.disabled = tape.length === 0;
  };

  champ.addEventListener('input', avancer);
  avancer();
  champ.focus();

  next.textContent = 'Vérifier';
  next.onclick = () => {
    if (squash(champ.value) !== squash(attendu)) {
      echouer('La phrase ne correspond pas.');
      return;
    }
    calculer();
  };
}

/* Étape 3 — calculer */
function calculer() {
  etape = 3;
  marquer();
  err.textContent = '';
  sommes = makeSums(3);

  body.innerHTML = `<p class="demo-hint">Dernière étape : ces trois calculs, de tête.</p>
    <div class="demo-sums"></div>`;
  const zone = body.querySelector('.demo-sums');

  sommes.forEach((somme) => {
    const ligne = document.createElement('label');
    ligne.className = 'demo-sum';
    const libelle = document.createElement('span');
    libelle.textContent = `${somme.label} =`;
    const champ = document.createElement('input');
    champ.type = 'text';
    champ.inputMode = 'numeric';
    champ.autocomplete = 'off';
    champ.addEventListener('paste', (e) => e.preventDefault());
    ligne.append(libelle, champ);
    zone.appendChild(ligne);
  });

  const champs = [...zone.querySelectorAll('input')];
  const verifier = () => {
    next.disabled = champs.some((c) => c.value.trim() === '');
  };
  champs.forEach((c) => c.addEventListener('input', verifier));
  verifier();
  champs[0].focus();

  next.textContent = 'Valider';
  next.onclick = () => {
    if (!sommes.every((s, i) => Number(champs[i].value.trim()) === s.answer)) {
      echouer('Au moins un résultat est faux.');
      return;
    }
    gagner();
  };
}

/* Fin */
function gagner() {
  etape = 4;
  marquer();
  err.textContent = '';
  body.innerHTML = `<div class="demo-win"><p>
      <strong>Épreuve réussie.</strong>
      Dans l'extension, il faudrait maintenant attendre deux heures avant de pouvoir
      confirmer — et vous n'auriez qu'une demi-heure pour le faire. Toujours envie
      d'ouvrir cet onglet ?
    </p></div>`;
  next.textContent = 'Recommencer';
  next.disabled = false;
  next.onclick = respirer;
  quit.hidden = true;
}

quit.addEventListener('click', () => {
  repos("Vous venez d'abandonner au bout de quelques secondes. C'est exactement l'effet recherché.");
});

repos();
