# ✅ CHECKLIST DE MIGRATION NEXT.JS

## 🎯 Phase 1: Infrastructure (TERMINÉE ✅)

- [x] Installer Next.js 16
- [x] Installer React 19
- [x] Désinstaller Vite et dépendances
- [x] Créer next.config.ts
- [x] Créer middleware.ts
- [x] Adapter tsconfig.json
- [x] Configurer support SVG
- [x] Créer structure App Router
- [x] Configurer Turbopack
- [x] Mettre à jour package.json
- [x] Créer scripts de migration
- [x] Rédiger documentation

## 🔄 Phase 2: Migration Code (EN COURS)

### A. Préparation
- [ ] Lire MIGRATION_GUIDE.md
- [ ] Lire DEMARRAGE_RAPIDE.md
- [ ] Faire un backup ou commit git
- [ ] Tester le serveur: `npm run dev`

### B. Analyse
- [ ] Exécuter: `npm run migrate:check`
- [ ] Consulter: migration-report.json
- [ ] Noter les fichiers critiques

### C. Migration Automatique
- [ ] Tester en dry-run: `npm run migrate:auto -- --dry-run`
- [ ] Appliquer: `npm run migrate:all`
- [ ] Vérifier les changements git

### D. Composants "use client"
- [ ] Tester: `npm run migrate:client -- --dry-run`
- [ ] Appliquer: `npm run migrate:client`
- [ ] Vérifier: pas d'erreurs dans les composants

### E. Layouts

#### MainLayout
- [ ] Ouvrir: src/app/layouts/MainLayout/index.tsx
- [ ] Ajouter: "use client" en première ligne
- [ ] Remplacer: `import { Outlet } from "react-router"`
- [ ] Par: Paramètre `{ children }: { children: React.ReactNode }`
- [ ] Remplacer: `<Outlet />` par `{children}`
- [ ] Tester le layout

#### Sideblock
- [ ] Ouvrir: src/app/layouts/Sideblock/index.tsx
- [ ] Ajouter: "use client"
- [ ] Remplacer: Outlet par children
- [ ] Tester le layout

#### AppLayout
- [ ] Ouvrir: src/app/layouts/AppLayout.tsx
- [ ] Ajouter: "use client"
- [ ] Remplacer: Outlet par children
- [ ] Tester le layout

### F. Navigation

#### useNavigate → useRouter
Fichiers à traiter:
- [ ] src/app/layouts/MainLayout/Sidebar/index.tsx
- [ ] src/app/layouts/Sideblock/Sidebar/Header.tsx
- [ ] src/components/template/Search.tsx
- [ ] src/components/template/DocsNavigation.tsx

Pour chaque fichier:
- [ ] Remplacer: `import { useNavigate } from "react-router"`
- [ ] Par: `import { useRouter } from "next/navigation"`
- [ ] Remplacer: `const navigate = useNavigate()`
- [ ] Par: `const router = useRouter()`
- [ ] Remplacer: `navigate('/path')` par `router.push('/path')`
- [ ] Remplacer: `navigate(-1)` par `router.back()`

#### Link → Next Link
Fichiers à traiter:
- [ ] src/app/layouts/MainLayout/Profile.tsx
- [ ] src/app/layouts/Sideblock/Profile.tsx
- [ ] src/components/template/Notifications.tsx
- [ ] Tous les fichiers avec Link

Pour chaque fichier:
- [ ] Vérifier: imports déjà convertis par script
- [ ] Vérifier: `to` remplacé par `href`
- [ ] Tester les liens

### G. Pages à Migrer

#### Dashboard
- [ ] Créer: app/dashboards/ si pas déjà fait
- [ ] Migrer: src/app/pages/dashboards/* vers app/dashboards/
- [ ] Ajouter: "use client" si nécessaire
- [ ] Tester: navigation vers dashboard

#### Settings
- [ ] Créer structure: app/settings/
- [ ] Migrer: General.tsx → app/settings/general/page.tsx
- [ ] Migrer: Appearance.tsx → app/settings/appearance/page.tsx
- [ ] Créer: app/settings/layout.tsx si besoin
- [ ] Ajouter: "use client" partout
- [ ] Tester: pages settings

#### Erreurs
- [ ] Créer: app/not-found.tsx (404)
- [ ] Créer: app/error.tsx (erreur globale)
- [ ] Adapter: pages d'erreur existantes
- [ ] Tester: pages d'erreur

### H. Composants Spécifiques

#### Breadcrumbs
- [ ] Ouvrir: src/components/shared/Breadcrumbs.tsx
- [ ] Convertir: useLocation → usePathname
- [ ] Tester: affichage breadcrumbs

#### Progress (NProgress)
- [ ] Ouvrir: src/components/template/Progress.tsx
- [ ] Adapter: pour Next.js navigation
- [ ] Tester: barre de progression

#### Toc (Table of Contents)
- [ ] Ouvrir: src/components/template/Toc/index.tsx
- [ ] Convertir: navigation React Router
- [ ] Tester: navigation TOC

### I. Utilitaires

#### isRouteActive
- [ ] Ouvrir: src/utils/isRouteActive.ts
- [ ] Remplacer: useLocation par usePathname
- [ ] Mettre à jour: logique de matching
- [ ] Tester: menu actif

## 🧪 Phase 3: Tests et Validation

### Tests Fonctionnels
- [ ] Démarrer serveur: `npm run dev`
- [ ] Tester: page d'accueil (/)
- [ ] Tester: redirection vers /dashboards/home
- [ ] Tester: page dashboard
- [ ] Tester: navigation menu
- [ ] Tester: page login
- [ ] Tester: middleware (routes protégées)
- [ ] Tester: dark mode
- [ ] Tester: changement de langue
- [ ] Tester: responsive design

### Tests Authentification
- [ ] Tester: accès routes protégées sans auth
- [ ] Tester: redirection vers login
- [ ] Tester: login avec credentials
- [ ] Tester: redirection après login
- [ ] Tester: logout
- [ ] Tester: session persistante

### Tests Composants
- [ ] Tester: tous les boutons
- [ ] Tester: tous les formulaires
- [ ] Tester: tous les inputs
- [ ] Tester: toutes les modales
- [ ] Tester: tous les dropdowns
- [ ] Tester: toutes les tooltips

### Tests Performance
- [ ] Vérifier: temps de démarrage serveur
- [ ] Vérifier: temps de HMR
- [ ] Vérifier: temps de build
- [ ] Vérifier: taille du bundle

## 🧹 Phase 4: Nettoyage

### Fichiers Obsolètes
- [ ] Supprimer: src/app/router/ (tout le dossier)
- [ ] Supprimer: src/middleware/AuthGuard.tsx
- [ ] Supprimer: src/middleware/GhostGuard.tsx
- [ ] Supprimer: src/app/layouts/Root.tsx si inutilisé
- [ ] Supprimer: anciens layouts si migrés

### Imports Inutilisés
- [ ] Exécuter: `npm run lint`
- [ ] Corriger: tous les warnings
- [ ] Supprimer: imports non utilisés
- [ ] Supprimer: variables non utilisées

### Code Mort
- [ ] Rechercher: fichiers non importés
- [ ] Supprimer: code commenté obsolète
- [ ] Supprimer: console.log de debug

## 🚀 Phase 5: Optimisation

### Performance
- [ ] Optimiser: images avec next/image
- [ ] Ajouter: lazy loading où approprié
- [ ] Vérifier: code splitting
- [ ] Analyser: bundle size

### SEO
- [ ] Ajouter: metadata dans layouts
- [ ] Ajouter: metadata dans pages
- [ ] Vérifier: titres de pages
- [ ] Vérifier: descriptions

### Accessibilité
- [ ] Vérifier: attributs alt sur images
- [ ] Vérifier: labels sur formulaires
- [ ] Vérifier: contraste des couleurs
- [ ] Tester: navigation clavier

## 📦 Phase 6: Build et Déploiement

### Build
- [ ] Exécuter: `npm run build`
- [ ] Corriger: toutes les erreurs
- [ ] Corriger: tous les warnings
- [ ] Vérifier: taille du build

### Tests Production
- [ ] Exécuter: `npm run start`
- [ ] Tester: toutes les routes
- [ ] Tester: toutes les fonctionnalités
- [ ] Vérifier: pas d'erreurs console

### Documentation Finale
- [ ] Mettre à jour: README.md
- [ ] Documenter: changements majeurs
- [ ] Documenter: nouvelles dépendances
- [ ] Créer: CHANGELOG.md

### Déploiement
- [ ] Préparer: variables d'environnement
- [ ] Configurer: plateforme de déploiement
- [ ] Tester: en staging
- [ ] Déployer: en production
- [ ] Vérifier: tout fonctionne

## ✅ Validation Finale

- [ ] Toutes les pages fonctionnent
- [ ] Tous les tests passent
- [ ] Aucune erreur de build
- [ ] Performance satisfaisante
- [ ] Documentation à jour
- [ ] Code propre et optimisé
- [ ] Prêt pour la production

---

## 📊 Progression

- Phase 1 (Infrastructure): ████████████████████ 100%
- Phase 2 (Migration Code): ████░░░░░░░░░░░░░░░░  20%
- Phase 3 (Tests): ░░░░░░░░░░░░░░░░░░░░   0%
- Phase 4 (Nettoyage): ░░░░░░░░░░░░░░░░░░░░   0%
- Phase 5 (Optimisation): ░░░░░░░░░░░░░░░░░░░░   0%
- Phase 6 (Déploiement): ░░░░░░░░░░░░░░░░░░░░   0%

**Total: 35% complété**

---

## 💡 Conseils

- Faire des commits réguliers
- Tester après chaque changement
- Demander de l'aide si bloqué
- Consulter la documentation Next.js
- Utiliser les scripts de migration fournis

## 🆘 Ressources

- **MIGRATION_GUIDE.md** - Guide détaillé
- **RAPPORT_FINAL.md** - Rapport complet
- **migration-report.json** - Analyse des fichiers
- **Next.js Docs** - https://nextjs.org/docs

Bon courage! 🚀
