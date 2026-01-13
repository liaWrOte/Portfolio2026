Portfolio III est une application web de portfolio développée avec React et Strapi.

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
* Remote (remote/) : Applications additionnelles (dont Artquiz)

**Fonctionnalités**
* Interface avec grille d'icônes (IconGrid) pour naviguer entre projets/dossiers
* Système de navigation par dossiers et projets
* Support multimédia (audio)

**Lancement**
    ```bash
# Frontend : yarn start (racine)
# Backend : yarn run develop (dossier strapi)
# Artquiz : npm start (dossier remote/artquiz)
    ```

C'est un portfolio interactif avec une architecture full-stack moderne.