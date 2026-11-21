# Smart Stream TV — Version 2

Application web de télévision en ligne (IPTV) : liste de chaînes, aperçu, programme en cours, recherche et favoris.
Dans cette **V2**, les chaînes ne sont plus dans un fichier local : elles sont lues et modifiées sur une **API REST (MockAPI)** avec `fetch`.

🔗 **Démo en ligne :** URL_DU_DEPLOIEMENT
📦 **Dépôt GitHub :** https://github.com/Mous-ab/smart-stream-tv_V2

---

## Fonctionnalités

- [x] Chargement de la liste des chaînes depuis MockAPI (`GET`), avec messages « Chargement… » et d'erreur
- [x] Aperçu de la chaîne sélectionnée (image, nom, catégorie) et programme en cours (EPG)
- [x] Mémorisation de la dernière chaîne regardée (LocalStorage)
- [x] Recherche par nom ou par numéro de chaîne
- [x] Ajout / retrait d'une chaîne des favoris (`PUT`), enregistré sur le serveur
- [x] Filtre « Toutes » / « Mes Favoris », combiné avec la recherche
- [x] Interface responsive (mobile, tablette, ordinateur)
- [ ] Suppression d'une chaîne (`DELETE`)
- [ ] Formulaire d'ajout d'une chaîne (`POST`) avec validation
- [ ] Mémorisation du filtre choisi (LocalStorage)

> Coche ou décoche les lignes selon l'état réel du projet avant de livrer.

---

## Technologies

| Outil | Usage |
|---|---|
| HTML5 | Structure de la page |
| JavaScript Vanilla (ES6+) | Logique, modules ES, `async/await`, `fetch` |
| Tailwind CSS v4 | Mise en forme (CLI, compilation vers `css/output.css`) |
| MockAPI | API REST simulée (ressource `channels`) |
| LocalStorage | Dernière chaîne regardée |
| Git / GitHub | Versionnement, branches, Pull Requests |
| Jira | Suivi des tickets (projet SSTV) |
| GitHub Pages | Déploiement |

---

## Structure du projet

```
smart-stream-tv_V2/
├── index.html
├── smart-stream-logo.svg
├── smart-stream-icon.svg
├── css/
│   ├── input.css          # source Tailwind
│   └── output.css         # CSS compilé (à versionner pour le déploiement)
├── js/
│   ├── api.js             # appels au serveur : GET, POST, PUT, DELETE
│   ├── app.js             # logique principale, événements, filtres
│   ├── ui.js              # création et mise à jour de l'affichage
│   └── search.js          # recherche (si conservé)
├── data/
│   └── data.js            # programmes (EPG) complétés en local
├── img/                   # logos et images des chaînes
└── package.json
```

---

## L'API (MockAPI)

Ressource : `channels`

| Champ | Type | Description |
|---|---|---|
| `id` | String | Identifiant (généré par MockAPI) |
| `channelNumber` | String | Numéro de la chaîne |
| `name` | String | Nom de la chaîne |
| `category` | String | Catégorie |
| `logo` | String | Chemin du logo (`img/...`) |
| `previewImage` | String | Image d'aperçu |
| `isFavorite` | Boolean | Chaîne favorite ou non |
| `isBlacklisted` | Boolean | Chaîne masquée ou non |

Les fonctions de `js/api.js` :

| Fonction | Méthode HTTP | URL | Rôle |
|---|---|---|---|
| `getChannels()` | GET | `/channels` | Lire toutes les chaînes |
| `createChannel(channel)` | POST | `/channels` | Ajouter une chaîne |
| `updateChannel(id, changes)` | PUT | `/channels/:id` | Modifier une chaîne (ex. favori) |
| `deleteChannel(id)` | DELETE | `/channels/:id` | Supprimer une chaîne |

Chaque fonction vérifie `response.ok` et lance une erreur si le serveur répond avec un code d'erreur. L'erreur est attrapée dans `app.js`, qui affiche un message lisible à l'utilisateur.

> Le programme en cours (EPG) n'existe pas dans MockAPI : il est ajouté côté navigateur à partir de `data/data.js`, avec un texte par défaut (« Programme non disponible ») quand une chaîne n'a pas de programme.

---

## Installation et lancement en local

```bash
# 1. Cloner le dépôt
git clone https://github.com/Mous-ab/smart-stream-tv_V2.git
cd smart-stream-tv_V2

# 2. Installer les dépendances
npm install

# 3. Lancer la compilation Tailwind (laisser ce terminal ouvert)
npm run dev
```

Puis ouvrir `index.html` avec l'extension **Live Server** de VS Code (les modules ES ne fonctionnent pas en ouvrant le fichier directement).

---

## Organisation du travail

**Branches**

| Branche | Rôle |
|---|---|
| `main` | Version stable, livrée |
| `develop` | Intégration |
| `feature/mockapi` | Connexion à MockAPI et lecture des chaînes |
| `feature/favorites` | Favoris et filtres |
| `feature/delete-add` | Suppression et formulaire d'ajout |

Une branche par fonctionnalité, créée depuis `develop` à jour. Chaque Pull Request cible `develop`, puis `develop` est fusionnée dans `main` en fin de version.

**Commits** : format *Conventional Commits* avec la clé Jira, par exemple `feat(SSTV-4): add favorite button`.

---

## Déploiement

Le site est publié avec **GitHub Pages** depuis la branche `main`.
Points d'attention :
- les chemins sont **relatifs** (`img/...`, `js/...`) ;
- les noms de fichiers sont **sensibles à la casse** en ligne ;
- `css/output.css` est versionné, car GitHub Pages n'exécute pas Tailwind ;
- `node_modules` est ignoré (`.gitignore`).

---

## Auteur

**Mahamat** — projet réalisé dans le cadre de la formation Youcode (Simplon).