# Focus or Suffer — page de présentation

Page d'atterrissage de l'extension Chrome
[Focus or Suffer](https://github.com/romlly/focus).

Trois fichiers, aucune dépendance, aucun build, aucun script de suivi. Elle se
déploie n'importe où et fonctionne hors ligne.

```
index.html      la page
styles.css      les styles
app.js          galerie, citations, compteur, démonstration du casse-tête
img/            les dix décors de l'extension + l'icône
```

## À faire après la publication sur le Chrome Web Store

Une seule ligne à modifier, en tête de [app.js](app.js) :

```js
const STORE_URL = "https://chromewebstore.google.com/detail/xxxxxxxx";
```

Les boutons « Installer sur Chrome » pointeront alors dessus, et la note
expliquant que l'extension est en cours de validation disparaîtra d'elle-même.

## À envisager : masquer l'adresse de la cagnotte

Le lien de don utilise le format PayPal par adresse e-mail, ce qui expose
`c.romlly@gmail.com` dans le code source de la page — récoltable par les robots à
spam. L'adresse n'apparaît nulle part en texte visible, ce qui limite la casse,
mais pour la retirer complètement il suffit de créer un lien **PayPal.me** et de
remplacer le lien « soutenir » du pied de page :

```
https://paypal.me/votrepseudo
```

## Prévisualiser en local

Les fichiers s'ouvrent directement dans un navigateur (`file://`) puisqu'il n'y a
ni module ES ni requête. Pour un contexte plus proche de la production :

```bash
python3 -m http.server 8765
```

## Déployer

**GitHub Pages** — pousser ce dossier sur une branche, puis *Settings* → *Pages*
→ choisir la branche et la racine. Rien à configurer de plus.

**Netlify ou Vercel** — glisser le dossier dans l'interface, ou pointer le dépôt.
Aucune commande de build, aucun répertoire de sortie : la racine est le site.

**N'importe quel hébergement statique** — copier les quatre entrées ci-dessus.

## Ce que la page contient

- Un hero dont le décor est celui de l'extension, en pixel art affiché en
  `image-rendering: pixelated` — sans cette propriété, le navigateur lisse
  l'image et l'effet disparaît.
- **La démonstration du casse-tête**, qui reprend les trois étapes réelles :
  vingt secondes d'attente, une phrase tirée au sort à recopier sans
  copier-coller, trois multiplications de tête. Abandonner en cours de route est
  une issue prévue — c'est même l'argument de vente, et le message d'abandon le
  dit.
- Une galerie des dix décors, cliquables : chacun remplace le fond du hero.
- Une trentaine de citations du corpus de l'extension, tirées sans répétition
  jusqu'à épuisement.
- Un compteur qui commente le temps passé sur la page, avec une ironie
  croissante.

## Accessibilité et sobriété

Contrastes conformes sur fond sombre, focus visible au clavier, `prefers-reduced-motion`
respecté, aucune police distante, aucune image de plus de 40 Ko. La page pèse
environ 200 Ko au total, dont 156 Ko d'illustrations.
