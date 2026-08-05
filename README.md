🇫🇷 Français | [🇬🇧 English](README.en.md)

---

Portfolio2026 est une application web de portfolio développée avec React et Strapi.

<img width="1356" height="906" alt="image" src="https://github.com/user-attachments/assets/4b35611c-15ec-4991-8fba-9c6b0cd7e281" />
<br>

**Architecture principale**

* Frontend : Application React 18 avec Redux Toolkit pour la gestion d'état
* Backend : CMS Strapi pour la gestion de contenu
* Build : Webpack avec TypeScript et Sass

**Technologies clés**

* React 18.2.0, Redux Toolkit, React Router
* Strapi (backend CMS)
* Sass pour le styling
* Axios pour les requêtes API
* Audio players (react-h5-audio-player, use-sound)

**Structure**
* Frontend (src/) : Components, containers, Redux store
* Backend (strapi/) : API Strapi pour la gestion de projets

**Fonctionnalités**
* Interface avec grille d'icônes (IconGrid) pour naviguer entre projets/dossiers
* Système de navigation par dossiers et projets
* Support multimédia (audio)

**Lancement**
    ```bash
# Lancer les deux services ensemble (recommandé)
yarn start:all

# Ou lancer séparément :
# Frontend : yarn start (racine) (localhost:3000)
# Backend : yarn start:strapi (dossier strapi) (localhost:1337)
    ```

**Formatage du code**

Le projet utilise [Prettier](https://prettier.io/) pour un style de code cohérent (`.tsx`, `.ts`, `.scss`).

```bash
# Formater tous les fichiers
npm run format

# Vérifier le formatage sans modifier les fichiers (ex: en CI)
npm run format:check
```

C'est un portfolio interactif avec une architecture full-stack moderne.

---

# Composants — Portfolio2026

L'application simule un **système d'exploitation de bureau** (style macOS/Windows) avec des fenêtres draggables, un explorateur de fichiers virtuel alimenté par Strapi, et deux mini-applications embarquées (Stolify, ArtQuiz).

---

## Architecture globale

| Couche | Technologie |
|---|---|
| État global | Redux (`state.main`) |
| Traduction FR/EN | `LanguageContext` + `useTranslation()` |
| Animations fenêtres | GSAP + CustomEvents DOM |
| Quiz | `QuizContext` (useReducer local) |
| Données projets | API Strapi (fetch au montage) |

---

## Entrée de l'application

### `Main`
Point d'entrée. Lance la récupération des projets Strapi, affiche `LoadingScreen` le temps du chargement, puis rend `Desktop` + `DesktopBottomBar`.

- **Redux** : dispatche `fetchProjects()`, lit `fileSystem`, `loadingState`
- **État local** : `showLoader` — contrôle la visibilité du loader

---

## Bureau

### `Desktop`
Surface principale. Affiche les icônes cliquables (Projets, CV, Contact), les nuages d'arrière-plan et orchestre **toutes les animations GSAP** de fenêtres via un `div.fantom` persistant.

- **CustomEvents DOM écoutés** : `window-minimize`, `window-restore`, `window-close`
- **Redux** : lit `windowItemId`, `windowPositions`, `openWindows` ; dispatche `minimizeWindow`, `openWindow`, `closeWindow`
- **Thème musical** : écoute `stolify-play` / `stolify-stop` pour appliquer la classe `desktop--track-N` (changement de fond et filtre couleur des nuages selon la piste jouée dans Stolify)
- Rend `<Item>` × 3 + `<Window>`

### `MobileScreen`
Écran de repli affiché sous 900px. Présente l'identité (logo, nom, titre), un message d'excuse et un iframe Notion du CV. Aucun Redux.

### `DesktopBottomBar`
Barre latérale gauche fixe. Affiche le logo, le bouton Stolify, la `TaskBar`, l'heure/date en temps réel et le sélecteur de langue.

- **Redux** : lit `openWindows`, `minimizedWindows` ; dispatche `openWindow`, `closeWindow`
- **État local** : `today: Date`, mis à jour toutes les 60 secondes

### `TaskBar`
Liste les fenêtres ouvertes (hors Stolify/ArtQuiz). Clic → restauration ou focus.

- Si minimisée : dispatche le CustomEvent `window-restore` (capturé par Desktop/GSAP)
- Sinon : dispatche `openWindow`
- Chaque item a `data-taskbar-id` (ciblé par GSAP)
- Utilise `ScrambleText` pour les labels

---

## Fenêtres

### `Window`
Gestionnaire des 5 fenêtres draggables : `projets`, `resume`, `contact_me`, `stolify`, `artquiz`. Gère le z-index, la position en cascade, le resize, et la visibilité selon l'état Redux.

- **Redux** : lit `windowItemId`, `isOpen`, `fileSystem`, `view`, `currentPath`, `minimizedWindows`, `openWindows` ; dispatche `openFolder`. Utilise aussi `useSelector` directement pour `getCurrentNode` et `getProjectById`
- **État local** : `zIndexes` (stacking), `forceRerender`
- Utilise `react-draggable` avec `handle=".window-header-container"`
- Chaque fenêtre a `data-window-id` (ciblé par GSAP dans Desktop)
- Selon la vue active, rend : `ExplorerView`, `ProjectView`, `Stolify`, `ArtQuizApp`, `ContactMe`, ou un `<iframe>` Notion (CV)

### `WindowHeader`
Barre de titre de chaque fenêtre (style macOS). Navigation arrière/avant, breadcrumb, boutons trafic lights.

- **Bouton jaune** : dispatche CustomEvent `window-minimize` → GSAP dans Desktop
- **Bouton vert** : dispatche CustomEvent `window-expand` → GSAP dans Desktop → toggle classe `full` (plein écran animé)
- **Bouton rouge** : dispatche `closeWindow`
- **Flèches** : `goBack()` / `goForward()` → `GO_BACK` / `GO_FORWARD` Redux
- Affiche `<Breadcrumb>` ou `<ScrambleText>` selon `useOnlyLabel`

---

## Explorateur de fichiers

### `SidebarTree`
Panneau latéral gauche de la fenêtre Projets. Arbre de fichiers + raccourcis statiques (cv.pdf, contact.me).

- Rend `<TreeNode>` récursivement
- Clics sur cv.pdf / contact.me → `openWindow('resume')` / `openWindow('contact_me')`

### `TreeNode`
Nœud récursif de l'arbre. Icône dossier ouvert/fermé selon `currentPath`, ou icône fichier.

- Clic dossier → `openFolder(node.id)` → `OPEN_FOLDER`
- Clic projet → `openProject(node.id)` → `OPEN_PROJECT`
- `isActive` = `currentPath.includes(node.id)`

### `ExplorerView`
Wrapper minimal : reçoit le nœud courant et délègue à `<IconGrid items={node.children} />`.

### `IconGrid`
Grille d'icônes pour dossiers et projets. Affiche le logo Strapi du projet si disponible.

- Clic dossier → `openFolder` → `OPEN_FOLDER`
- Clic projet → `openProject` → `OPEN_PROJECT`

### `Breadcrumb`
Chemin de navigation cliquable (ex : `Projets › Sites web › MonProjet`). Reconstruit les noms depuis `fileSystem`, traduit via `useTranslation()`.

---

## Projets

### `ProjectView`
Vue projet dans la fenêtre principale. Affiche un `ProjectCard` unique ou une grille selon le type de nœud.

### `ProjectCard`
Carte complète d'un projet : titre, pitch, date, rôle, technologies, paragraphes riches, galerie d'images zoomables, lien externe.

- **Contenu localisé** : `getLocalizedContent()` + `getLocalizedParagraph()` (localizations Strapi)
- **Rendu contenu** : `BlocksRenderer` (Strapi blocks) ou `marked.parse()` (Markdown)
- **Zoom images** : `ImageZoomModal` via `createPortal` (monté sur `.App`), fermeture par Escape ou clic extérieur
- Animation d'ouverture modale : `@keyframes modal-open` (scale 0.08 → 1)

---

## Icône de bureau / sidebar

### `Item`
Icône cliquable du bureau ou de la sidebar. S'adapte selon `inWindow` et `triggerOpen`.

- Capture sa position via `getBoundingClientRect()` → `SET_POSITION` (source GSAP pour l'animation de vol)
- `triggerOpen='stolify'` : vérifie `minimizedWindows` et dispatche `window-restore` si minimisé, sinon `OPEN_WINDOW`
- `clickTrigger='simple'` : clic sur wrapper div ; sinon clic direct sur l'image

---

## Contenu des fenêtres

### `ContactMe`
Fenêtre de contact style terminal rétro. Prompt animé, carte d'identité, liens (Email, LinkedIn, GitHub). Animation GSAP d'entrée en stagger.

### `Stolify`
Lecteur audio vinyle complet. Charge un SVG via `fetch` et l'injecte dans le DOM, puis y attache des listeners JS.

**État local :**
- `currentTrackIndex` (3 pistes : Labi Siffre, Irma Thomas, Mulatu Astatke)
- `isPlaying`, `svgContent`, `volume`
- Refs : `audioRef`, `armAngleRef/AnimRef`, `discAngleRef/AnimRef`, `trackChangeTimeoutRef`

**Interactions :**
- Manipulation directe du DOM SVG : `<image>` (cover), `<text>` + `<animateTransform>` (titre défilant), `<clipPath>`, `<filter>` (ombre portée)
- Tous les sélecteurs DOM sont scopés à `#stolify-ui` pour éviter les conflits avec les autres SVG de la page
- Dispatche `stolify-play { trackIndex }` au démarrage de la lecture et `stolify-stop` à la pause (écoutés par `Desktop` pour le thème couleur)
- **À la fermeture de la fenêtre** (démontage du composant) : `audioRef.current.pause()` stoppe automatiquement la lecture
- Fader volume : `<input type="range">` HTML superposé au SVG, avec CSS custom property `--pct`

**Correctifs notables :**
- `document.querySelector('svg defs')` scopé à `#stolify-ui svg defs` (évitait que le filtre `#vinyl-shadow` soit créé dans le mauvais SVG, rendant disc et bras invisibles sous Chrome)

---

## Utilitaires / Présentation

### `LoadingScreen`
Écran de boot "LIA OS v1.0" animé avec GSAP. 44 lignes de log système apparaissent en stagger, puis l'écran disparaît en fondu. Appelle `onComplete()` à la fin.

### `ScrambleText`
Effet de texte scramble : les caractères sont remplacés par des glyphes aléatoires (`A-Z0-9@#$&`) puis se résolvent vers le vrai texte en 14 frames de 28ms. Se redéclenche au changement de langue.

- **Props** : `text`, `className?`, `tag?` (défaut : `span`)

### `LanguageSwitch`
Bascule FR/EN. Consomme `language` et `setLanguage` depuis `useTranslation()`. Met à jour le `LanguageContext` ET dispatche `SET_LANGUAGE` dans Redux.

### `LogoSvg`
Logo SVG inline (cercles + lignes, style "œil"). Accepte un `className`. Aucune interaction.

### `Loader`
Placeholder minimal (`<span>Loading</span>`). Non connecté.

---

## ArtQuiz (mini-application)

Application de quiz autonome intégrée dans une fenêtre 450×750px. Possède son propre routeur (`BrowserRouter`) et son propre state management (`QuizContext` — `useReducer`).

**État QuizContext :**
```
{ theme, questions[], currentQuestionIndex, currentAnswer,
  correctAnswersCount, showResults, timer (4s) }
```

**Actions :** `SELECT_THEME`, `LOADED_QUESTIONS`, `SELECT_ANSWER`, `NEXT_QUESTION`, `DECREASE_TIMER`, `RESET_QUESTIONS`, `END_QUIZ`

### `ArtQuiz/App`
Racine de l'ArtQuiz. Wrap dans `<QuizProvider>` + `<BrowserRouter>`. Routes : `/` → Home, `/quiz/:theme` → Quiz.

### `ArtQuiz/Home`
Sélection de thème ou affichage des résultats. Rend `<QuizVignette>` avec `<Link>` react-router.

### `ArtQuiz/Quiz`
Écran de quiz actif. Détecte la fin et navigue vers `/`. Rend `<Header>`, `<Timeline>`, `<Timer>`, `<Question>`, `<Answers>`, `<NextQuestion>`.

### Micro-composants ArtQuiz

| Composant | Rôle |
|---|---|
| `Question` | Affiche image + texte de la question courante |
| `Answers` + `Answer` | Liste les réponses, gère les états right/wrong/bad/disabled |
| `Timer` | Décompte 4s par question, dispatche `DECREASE_TIMER` |
| `Timeline` | Barre de progression (une pastille par question) |
| `NextQuestion` | Bouton conditionnel "Suivant" / "Terminer" |
| `Header` | Barre nav quiz : GoBack + TitleHeader + Skip |
| `GoBack` | `<Link to="/">` retour à Home |
| `Skip` | Dispatche `NEXT_QUESTION` sans valider |
| `QuizVignette` | Carte de thème sur Home (image + nom) |

---

## Flux d'interactions Redux

| Action | Déclencheur | Effet |
|---|---|---|
| `OPEN_WINDOW` | Item (clic) | Window s'affiche, Desktop anime, TaskBar s'ajoute |
| `CLOSE_WINDOW` | WindowHeader (rouge) | Window disparaît |
| `MINIMIZE_WINDOW` | WindowHeader (jaune) → CustomEvent | Desktop GSAP → dispatch → Window masquée |
| `RESTORE_WINDOW` | TaskBar / Item → CustomEvent | Desktop GSAP → dispatch → Window restaurée |
| `OPEN_FOLDER` | TreeNode, IconGrid | `currentPath` mis à jour, Window → vue 'folder' |
| `OPEN_PROJECT` | TreeNode, IconGrid | `activeId` mis à jour, Window → vue 'project' |
| `GO_BACK/FORWARD` | WindowHeader (flèches) | `historyIndex` dans Redux |
| `SET_POSITION` | Item (au clic) | Stocke la position source pour GSAP |
| `SET_LANGUAGE` | LanguageSwitch | LanguageContext + Redux → re-render traduit |
| `FETCH_PROJECTS` | Main (au montage) | Appel API Strapi → `fileSystem` dans Redux |

## Flux CustomEvents DOM

| Event | Émetteur | Récepteur | Effet |
|---|---|---|---|
| `window-minimize` | WindowHeader (jaune) | Desktop | GSAP → taskbar + dispatch minimizeWindow |
| `window-restore` | TaskBar / Item | Desktop | GSAP → fenêtre + dispatch openWindow |
| `window-close` | WindowHeader (rouge) | Desktop | GSAP → icône + dispatch closeWindow |
| `window-expand` | WindowHeader (vert) | Desktop | GSAP fantom taille courante → plein écran (ou retour) + toggle `.full` |
| `stolify-play` | Stolify (play) | Desktop | Applique `desktop--track-N` (thème couleur) |
| `stolify-stop` | Stolify (pause/track change) | Desktop | Retire les classes de thème |
