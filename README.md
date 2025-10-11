# HRNet - Migration jQuery vers React

## 🎯 Vue d'ensemble du projet

HRNet est un projet de migration d'une application de gestion des ressources humaines de jQuery vers React pour une grande société financière. L'objectif principal est de moderniser l'application en convertissant les plugins jQuery existants en composants React performants et maintenables.

## 📋 Objectifs du projet

### Objectifs principaux

- **Refonte technologique** : Conversion complète de l'application jQuery vers React
- **Remplacement de plugins** : Substitution des plugins jQuery par des composants React natifs
- **Amélioration des performances** : Mesure et optimisation des performances avant/après migration
- **Documentation technique** : Création d'une documentation complète du processus de migration

### Compétences développées

- Maîtrise de la migration jQuery → React
- Analyse et mesure de performances web
- Réduction de la dette technique
- Documentation technique approfondie
- Architecture de composants React modernes

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 18+ recommandée)
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <url-du-repository>
cd HRNet

# Installer les dépendances
npm install
```

### Scripts disponibles

```bash
# Lancement en mode développement
npm run dev
# ou
npm start

# Build de production
npm run build

# Linting du code
npm run lint

# Prévisualisation du build
npm run preview
```

## 🏗️ Structure du projet

```text
HRNet/
├── src/
│   ├── App.jsx              # Composant racine
│   ├── main.jsx             # Point d'entrée de l'application
│   ├── router.jsx           # Configuration des routes
│   ├── components/          # Composants réutilisables
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── pages/               # Pages de l'application
│   │   ├── Employees.jsx # Liste des employés
│   │   └── Home.jsx         # Page d'accueil/formulaire
│   └── styles/              # Fichiers de styles CSS
│       ├── App.css
│       ├── Footer.css
│       ├── Header.css
│       └── index.css
├── package.json
├── vite.config.js           # Configuration Vite
├── eslint.config.js         # Configuration ESLint
└── README.md
```

## 🔧 Technologies utilisées

### Stack technique

- **React 19.1.1** - Framework JavaScript pour l'interface utilisateur
- **React Router DOM 7.9.3** - Gestion du routage côté client
- **Vite 7.1.7** - Outil de build et serveur de développement
- **ESLint** - Linting et formatage du code

### Outils de développement

- **@vitejs/plugin-react-swc** - Plugin Vite pour React avec SWC
- **ESLint plugins** - Règles spécifiques pour React et hooks

## 📊 Méthodologie de migration

### 1. Analyse de l'existant

- [ ] Audit de l'application jQuery actuelle
- [ ] Identification des plugins à remplacer
- [ ] Mesure des performances de base

### 2. Planification de la migration

- [ ] Priorisation des composants à migrer
- [ ] Définition de l'architecture React
- [ ] Choix des alternatives aux plugins jQuery

### 3. Développement

- [ ] Conversion progressive des composants
- [ ] Tests de régression
- [ ] Optimisation des performances

### 4. Documentation et livraison

- [ ] Documentation technique des composants
- [ ] Rapport de performance comparatif
- [ ] Guide de maintenance

## 🎯 Fonctionnalités principales

### Pages actuelles

1. **Page d'accueil** (`/`) - Formulaire de création d'employé
2. **Liste des employés** (`/employees`) - Affichage et gestion des employés

### Composants cibles de migration

- Formulaires de saisie
- Tableaux de données
- Modales et popups
- Sélecteurs de date
- Composants de validation

## 📈 Mesure de performances

### Métriques à surveiller

- **Temps de chargement initial**
- **Taille du bundle JavaScript**
- **Temps de rendu des composants**
- **Utilisation mémoire**
- **Score Lighthouse**

### Outils d'analyse

- Chrome DevTools
- Webpack Bundle Analyzer
- React DevTools Profiler
- Lighthouse CI

## 📝 Documentation

### Structure de documentation

- **README.md** - Vue d'ensemble et installation
- **ARCHITECTURE.md** - Architecture technique détaillée
- **MIGRATION.md** - Guide de migration jQuery → React
- **PERFORMANCE.md** - Rapport d'analyse de performances
- **COMPONENTS.md** - Documentation des composants React

## 🤝 Contribution

### Workflow de développement

1. Créer une branche feature à partir de `main`
2. Développer les modifications
3. Suivre les conventions de nommage et de code
4. Tester les modifications
5. Créer une pull request avec description détaillée

### Standards de code

- Utiliser ESLint pour la cohérence du code
- Suivre les conventions de nommage React
- Commenter les logiques complexes
- Écrire des tests pour les nouveaux composants

## 🎓 Apprentissages clés

Ce projet permet d'acquérir des compétences essentielles en :

- **Migration technologique** : Passage d'une stack ancienne vers moderne
- **Performance web** : Optimisation et mesure des performances
- **Architecture React** : Conception de composants maintenables
- **Documentation technique** : Communication claire des choix techniques

## 📞 Support

Pour toute question ou problème :

1. Consulter la documentation dans `/docs`
2. Vérifier les issues existantes
3. Contacter l'équipe de développement
4. Planifier une session de mentorat si nécessaire

## 📅 Planning

**Durée estimée** : 110 heures

### Phase 1 - Préparation (20h)

- Analyse de l'existant
- Configuration de l'environnement
- Planification détaillée

### Phase 2 - Développement (70h)

- Migration des composants
- Tests et optimisations
- Intégration continue

### Phase 3 - Documentation (20h)

- Rédaction de la documentation
- Rapport de performance
- Présentation des résultats

---

**Version** : 1.0.0
**Dernière mise à jour** : 7 octobre 2025
