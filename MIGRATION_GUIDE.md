# Guide de Migration vers Next.js 15

## ✅ Modifications Effectuées

### 1. Installation et Configuration
- ✅ Next.js 15 installé avec React 19
- ✅ Turbopack configuré (natif à Next.js 15)
- ✅ Vite et ses dépendances supprimés
- ✅ Configuration TypeScript adaptée pour Next.js
- ✅ Support SVG via Webpack (car Turbopack ne supporte pas encore complètement SVGR)

### 2. Structure du Projet
- ✅ Dossier `app/` créé pour Next.js App Router
- ✅ `app/layout.tsx` - Layout principal avec providers
- ✅ `app/providers.tsx` - Providers client-side
- ✅ `app/globals.css` - Styles globaux
- ✅ `middleware.ts` - Protection des routes (remplace AuthGuard/GhostGuard)

### 3. Routes Migrées
- ✅ `/` → Redirection vers `/dashboards/home`
- ✅ `/dashboards/home` → Page d'accueil
- ✅ `/login` → Page de connexion
- ✅ `/settings/*` → Pages de paramètres

### 4. Fichiers Supprimés
- ❌ vite.config.ts
- ❌ index.html
- ❌ src/main.tsx
- ❌ src/App.tsx
- ❌ tsconfig.app.json
- ❌ tsconfig.node.json
- ❌ vercel.json

## 🔄 Modifications à Faire

### Étapes de Migration Manuelle

#### 1. Adapter tous les imports `react-router`
Tous les fichiers utilisant `react-router` doivent être convertis :

**Avant (React Router):**
```tsx
import { Link } from "react-router";
import { useNavigate, useLocation } from "react-router";

<Link to="/path">Link</Link>
const navigate = useNavigate();
navigate('/path');
```

**Après (Next.js):**
```tsx
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

<Link href="/path">Link</Link>
const router = useRouter();
router.push('/path');
```

#### 2. Convertir les Layouts
Les layouts dans `src/app/layouts/` doivent être adaptés :
- Remplacer `<Outlet />` par `{children}`
- Ajouter la directive `"use client"` si nécessaire
- Convertir en layout Next.js si approprié

#### 3. Migrer les Pages
Pour chaque page dans `src/app/pages/`:
1. Créer un dossier dans `app/` avec la structure de route
2. Créer un fichier `page.tsx`
3. Ajouter `"use client"` si le composant utilise des hooks ou états
4. Adapter les imports

#### 4. Adapter les Composants
- Vérifier tous les imports SVG (remplacer `?react` par import direct)
- Convertir les composants utilisant `react-router` vers Next.js
- Ajouter `"use client"` aux composants avec interactivité

## 📋 Scripts Disponibles

```json
{
  "dev": "next dev --turbo",      // Développement avec Turbopack
  "build": "next build",           // Build production
  "start": "next start",           // Démarrer en production
  "lint": "next lint"              // Linting
}
```

## 🚀 Démarrage

```bash
npm run dev
```

Le serveur démarre sur http://localhost:3000 avec Turbopack activé.

## ⚠️ Points d'Attention

### 1. Middleware
Le fichier `middleware.ts` remplace `AuthGuard` et `GhostGuard`. Il gère:
- Protection des routes authentifiées
- Redirection des utilisateurs connectés
- Gestion du paramètre de redirection

### 2. SVG Icons
Les imports SVG fonctionnent avec Webpack (pas encore supporté par Turbopack).
Pour utiliser Turbopack complètement, il faudra attendre le support SVGR ou utiliser une alternative.

### 3. Composants Client vs Server
- Par défaut, les composants Next.js sont des Server Components
- Ajoutez `"use client"` pour les composants nécessitant:
  - useState, useEffect, hooks React
  - Event handlers (onClick, onChange, etc.)
  - Contexts
  - Browser APIs

### 4. Styles
- Les styles Tailwind sont maintenus
- `app/globals.css` importe vos styles depuis `src/styles/`
- La configuration Tailwind doit être compatible avec Next.js

## 📝 Liste de Vérification Complète

### À Faire Manuellement
- [ ] Convertir tous les composants utilisant `react-router`
- [ ] Migrer toutes les pages de `src/app/pages/` vers `app/`
- [ ] Adapter les layouts (`MainLayout`, `Sideblock`, etc.)
- [ ] Vérifier et corriger les imports SVG
- [ ] Tester l'authentification avec le nouveau middleware
- [ ] Adapter les contextes si nécessaire
- [ ] Vérifier les imports de composants UI
- [ ] Tester la navigation entre les pages
- [ ] Vérifier le fonctionnement des formulaires
- [ ] Tester le dark mode et les thèmes
- [ ] Vérifier l'i18n (internationalisation)

### Configuration Tailwind
Si vous avez un fichier `tailwind.config.js`, assurez-vous qu'il pointe vers le bon dossier:

```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... reste de la config
}
```

## 🔧 Dépannage

### Erreur: Module not found
- Vérifiez que le chemin d'alias `@` pointe vers `./src`
- Relancez le serveur après modification de `next.config.ts`

### Erreur: Hooks can only be called inside the body of a function component
- Ajoutez `"use client"` en haut du fichier

### Import SVG ne fonctionne pas
- Assurez-vous d'importer sans `?react`
- Exemple: `import Logo from "@/assets/logo.svg";`

## 📚 Ressources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Turbopack](https://nextjs.org/docs/architecture/turbopack)
- [Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
