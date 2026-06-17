#!/usr/bin/env node

/**
 * Script pour ajouter automatiquement "use client" aux fichiers qui en ont besoin
 * 
 * Usage: node add-use-client.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const dryRun = process.argv.includes('--dry-run');

const clientPatterns = [
  /useState\(/,
  /useEffect\(/,
  /useCallback\(/,
  /useMemo\(/,
  /useRef\(/,
  /useReducer\(/,
  /useContext\(/,
  /onClick=/,
  /onChange=/,
  /onSubmit=/,
  /onFocus=/,
  /onBlur=/,
  /useRouter\(/,
  /usePathname\(/,
  /useSearchParams\(/,
];

function needsUseClient(content) {
  return clientPatterns.some(pattern => pattern.test(content));
}

function hasUseClient(content) {
  return /^['"]use client['"]/.test(content.trim()) ||
         /^\/\/.*\n['"]use client['"]/.test(content.trim());
}

function addUseClient(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Vérifier si le fichier a besoin de "use client"
  if (!needsUseClient(content)) {
    return { added: false, reason: 'not needed' };
  }

  // Vérifier si "use client" est déjà présent
  if (hasUseClient(content)) {
    return { added: false, reason: 'already present' };
  }

  // Ajouter "use client" en première ligne
  const lines = content.split('\n');
  let insertIndex = 0;

  // Skip les commentaires en début de fichier
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '' || line.startsWith('//') || line.startsWith('/*')) {
      insertIndex = i + 1;
    } else {
      break;
    }
  }

  lines.splice(insertIndex, 0, '"use client";', '');
  content = lines.join('\n');

  if (!dryRun) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { added: true, reason: 'added' };
}

function scanAndAddClient(dir, stats = { files: 0, added: 0, skipped: 0 }) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        scanAndAddClient(filePath, stats);
      }
    } else if (['.tsx', '.jsx'].includes(path.extname(file))) {
      stats.files++;
      const result = addUseClient(filePath);
      
      if (result.added) {
        stats.added++;
        const relativePath = path.relative(process.cwd(), filePath);
        console.log(`✅ ${relativePath}`);
      } else if (result.reason === 'already present') {
        stats.skipped++;
      }
    }
  });

  return stats;
}

console.log('\n🎯 Ajout automatique de "use client"\n');

if (dryRun) {
  console.log('⚠️  MODE DRY-RUN: Aucun fichier ne sera modifié\n');
}

const srcDir = path.join(__dirname, 'src');
const stats = scanAndAddClient(srcDir);

console.log('\n\n📊 RÉSUMÉ:');
console.log(`Fichiers analysés: ${stats.files}`);
console.log(`"use client" ajouté: ${stats.added}`);
console.log(`Déjà présent: ${stats.skipped}`);
console.log(`Pas nécessaire: ${stats.files - stats.added - stats.skipped}`);

if (dryRun) {
  console.log('\n💡 Pour appliquer les changements, exécutez: node add-use-client.js');
} else {
  console.log('\n✅ Ajout de "use client" terminé!');
}

console.log('');
