#!/usr/bin/env node

/**
 * Script pour identifier les fichiers nécessitant une migration React Router → Next.js
 * 
 * Usage: node migration-checker.js
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const extensions = ['.tsx', '.ts', '.jsx', '.js'];

// Patterns à rechercher
const patterns = {
  reactRouter: {
    imports: [
      /from ['"]react-router['"]/,
      /import.*\{.*Link.*\}.*from ['"]react-router['"]/,
      /import.*\{.*useNavigate.*\}.*from ['"]react-router['"]/,
      /import.*\{.*useLocation.*\}.*from ['"]react-router['"]/,
      /import.*\{.*Navigate.*\}.*from ['"]react-router['"]/,
      /import.*\{.*Outlet.*\}.*from ['"]react-router['"]/,
    ],
    usage: [
      /<Link\s+to=/,
      /useNavigate\(/,
      /useLocation\(/,
      /<Navigate\s+to=/,
      /<Outlet\s*\/>/,
      /navigate\(/,
    ]
  },
  svgImports: [
    /import.*from ['"].*\.svg\?react['"]/,
  ],
  needsClientDirective: [
    /useState\(/,
    /useEffect\(/,
    /onClick=/,
    /onChange=/,
    /useContext\(/,
  ]
};

function scanDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath, results);
      }
    } else if (extensions.includes(path.extname(file))) {
      results.push(filePath);
    }
  });

  return results;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(__dirname, filePath);
  
  const issues = {
    reactRouterImports: false,
    reactRouterUsage: false,
    svgImports: false,
    needsClientDirective: false,
    hasClientDirective: content.includes('"use client"') || content.includes("'use client'"),
  };

  // Check React Router imports
  patterns.reactRouter.imports.forEach(pattern => {
    if (pattern.test(content)) {
      issues.reactRouterImports = true;
    }
  });

  // Check React Router usage
  patterns.reactRouter.usage.forEach(pattern => {
    if (pattern.test(content)) {
      issues.reactRouterUsage = true;
    }
  });

  // Check SVG imports
  patterns.svgImports.forEach(pattern => {
    if (pattern.test(content)) {
      issues.svgImports = true;
    }
  });

  // Check if needs client directive
  if (!issues.hasClientDirective) {
    patterns.needsClientDirective.forEach(pattern => {
      if (pattern.test(content)) {
        issues.needsClientDirective = true;
      }
    });
  }

  return {
    path: relativePath,
    issues,
    needsMigration: issues.reactRouterImports || issues.reactRouterUsage || issues.svgImports
  };
}

console.log('\n🔍 Analyse des fichiers nécessitant une migration...\n');

const allFiles = scanDirectory(srcDir);
const results = allFiles.map(analyzeFile);

const needsMigration = results.filter(r => r.needsMigration);
const needsClient = results.filter(r => r.issues.needsClientDirective && !r.issues.hasClientDirective);

console.log('📊 RÉSULTATS:\n');
console.log(`Total de fichiers analysés: ${results.length}`);
console.log(`Fichiers nécessitant une migration: ${needsMigration.length}\n`);

if (needsMigration.length > 0) {
  console.log('🔴 FICHIERS À MIGRER:\n');
  
  const reactRouterFiles = needsMigration.filter(r => r.issues.reactRouterImports || r.issues.reactRouterUsage);
  if (reactRouterFiles.length > 0) {
    console.log(`\n📦 React Router (${reactRouterFiles.length} fichiers):`);
    reactRouterFiles.forEach(result => {
      console.log(`  - ${result.path}`);
      if (result.issues.reactRouterImports) console.log('    ⚠️  Imports React Router détectés');
      if (result.issues.reactRouterUsage) console.log('    ⚠️  Usage React Router détecté');
    });
  }

  const svgFiles = needsMigration.filter(r => r.issues.svgImports);
  if (svgFiles.length > 0) {
    console.log(`\n🖼️  Imports SVG avec ?react (${svgFiles.length} fichiers):`);
    svgFiles.forEach(result => {
      console.log(`  - ${result.path}`);
    });
  }
}

if (needsClient.length > 0) {
  console.log(`\n\n⚠️  FICHIERS NÉCESSITANT "use client" (${needsClient.length} fichiers):`);
  needsClient.slice(0, 20).forEach(result => {
    console.log(`  - ${result.path}`);
  });
  if (needsClient.length > 20) {
    console.log(`  ... et ${needsClient.length - 20} autres fichiers`);
  }
}

console.log('\n\n📝 PROCHAINES ÉTAPES:');
console.log('1. Convertir les imports et usages React Router vers Next.js');
console.log('2. Retirer ?react des imports SVG');
console.log('3. Ajouter "use client" aux composants avec hooks/événements');
console.log('4. Migrer les pages de src/app/pages/ vers app/');
console.log('\n📖 Voir MIGRATION_GUIDE.md pour plus de détails\n');

// Sauvegarder le rapport
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalFiles: results.length,
    needsMigration: needsMigration.length,
    needsClientDirective: needsClient.length,
  },
  files: needsMigration.map(r => ({
    path: r.path,
    issues: Object.keys(r.issues).filter(key => r.issues[key] && key !== 'hasClientDirective')
  }))
};

fs.writeFileSync(
  path.join(__dirname, 'migration-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('✅ Rapport sauvegardé dans migration-report.json\n');
