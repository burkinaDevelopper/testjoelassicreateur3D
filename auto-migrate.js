#!/usr/bin/env node

/**
 * Script d'aide à la migration automatique React Router → Next.js
 * 
 * Ce script effectue les remplacements suivants:
 * 1. Import Link de react-router → next/link
 * 2. Import useNavigate → useRouter from next/navigation
 * 3. Import useLocation → usePathname/useSearchParams from next/navigation
 * 4. Retire ?react des imports SVG
 * 
 * Usage: node auto-migrate.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const dryRun = process.argv.includes('--dry-run');

const replacements = [
  // React Router imports vers Next.js
  {
    pattern: /import\s*\{\s*Link\s*\}\s*from\s+['"]react-router['"]/g,
    replacement: 'import Link from "next/link"',
    description: 'Import Link'
  },
  {
    pattern: /import\s*\{\s*useNavigate\s*\}\s*from\s+['"]react-router['"]/g,
    replacement: 'import { useRouter } from "next/navigation"',
    description: 'Import useNavigate → useRouter'
  },
  {
    pattern: /import\s*\{\s*useLocation\s*\}\s*from\s+['"]react-router['"]/g,
    replacement: 'import { usePathname, useSearchParams } from "next/navigation"',
    description: 'Import useLocation → usePathname + useSearchParams'
  },
  {
    pattern: /import\s*\{\s*Navigate\s*\}\s*from\s+['"]react-router['"]/g,
    replacement: 'import { redirect } from "next/navigation"',
    description: 'Import Navigate → redirect'
  },
  
  // SVG imports
  {
    pattern: /import\s+(\w+)\s+from\s+['"](.+?)\.svg\?react['"]/g,
    replacement: 'import $1 from "$2.svg"',
    description: 'Import SVG (retire ?react)'
  },

  // Usage patterns (plus complexes, à vérifier manuellement après)
  {
    pattern: /<Link\s+to=/g,
    replacement: '<Link href=',
    description: 'Link to → href'
  },
];

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const changes = [];

  replacements.forEach(({ pattern, replacement, description }) => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      modified = true;
      changes.push(`  ✓ ${description} (${matches.length} occurrence(s))`);
    }
  });

  if (modified) {
    if (!dryRun) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`\n📝 ${relativePath}`);
    changes.forEach(change => console.log(change));
  }

  return { modified, changes: changes.length };
}

function scanAndMigrate(dir, stats = { files: 0, modified: 0, changes: 0 }) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        scanAndMigrate(filePath, stats);
      }
    } else if (['.tsx', '.ts', '.jsx', '.js'].includes(path.extname(file))) {
      stats.files++;
      const result = migrateFile(filePath);
      if (result.modified) {
        stats.modified++;
        stats.changes += result.changes;
      }
    }
  });

  return stats;
}

console.log('\n🚀 Migration automatique React Router → Next.js\n');

if (dryRun) {
  console.log('⚠️  MODE DRY-RUN: Aucun fichier ne sera modifié\n');
}

const srcDir = path.join(__dirname, 'src');
const stats = scanAndMigrate(srcDir);

console.log('\n\n📊 RÉSUMÉ:');
console.log(`Fichiers analysés: ${stats.files}`);
console.log(`Fichiers modifiés: ${stats.modified}`);
console.log(`Changements effectués: ${stats.changes}`);

if (dryRun) {
  console.log('\n💡 Pour appliquer les changements, exécutez: node auto-migrate.js');
} else {
  console.log('\n✅ Migration automatique terminée!');
  console.log('\n⚠️  ATTENTION:');
  console.log('Certaines modifications nécessitent une révision manuelle:');
  console.log('1. useNavigate() → useRouter() - vérifier navigate() → router.push()');
  console.log('2. useLocation() → usePathname() + useSearchParams()');
  console.log('3. <Navigate /> → redirect() ou router.push()');
  console.log('4. <Outlet /> → {children} dans les layouts');
  console.log('\n📖 Consultez MIGRATION_GUIDE.md pour plus de détails');
}

console.log('');
