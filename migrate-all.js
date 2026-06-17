#!/usr/bin/env node

/**
 * Script Master de Migration - Exécute toutes les étapes de migration
 * 
 * Usage: node migrate-all.js [--auto]
 *        --auto: Applique tous les changements automatiquement sans confirmation
 */

const { execSync } = require('child_process');
const readline = require('readline');

const autoMode = process.argv.includes('--auto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function exec(command, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔄 ${description}`);
  console.log(`${'='.repeat(60)}\n`);
  
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n❌ Erreur lors de: ${description}`);
    return false;
  }
}

async function run() {
  console.log('\n' + '═'.repeat(60));
  console.log('🚀 MIGRATION COMPLÈTE VERS NEXT.JS 16 + TURBOPACK');
  console.log('═'.repeat(60));
  
  if (!autoMode) {
    console.log('\nCe script va effectuer les migrations suivantes:');
    console.log('1. Analyse des fichiers à migrer');
    console.log('2. Migration des imports React Router → Next.js');
    console.log('3. Ajout de "use client" aux composants');
    console.log('\n⚠️  AVERTISSEMENT: Ce script va modifier vos fichiers!');
    console.log('Assurez-vous d\'avoir une sauvegarde ou un commit git.\n');
    
    const answer = await question('Voulez-vous continuer? (o/N): ');
    if (answer.toLowerCase() !== 'o' && answer.toLowerCase() !== 'oui') {
      console.log('\n❌ Migration annulée.');
      rl.close();
      return;
    }
  }

  // Étape 1: Analyse
  console.log('\n\n📋 ÉTAPE 1: ANALYSE DES FICHIERS');
  exec('node migration-checker.js', 'Analyse des fichiers à migrer');

  if (!autoMode) {
    await question('\n📊 Rapport généré. Appuyez sur Entrée pour continuer...');
  }

  // Étape 2: Migration React Router
  console.log('\n\n📦 ÉTAPE 2: MIGRATION REACT ROUTER');
  
  if (!autoMode) {
    const answer = await question('\nVoulez-vous migrer les imports React Router? (o/N): ');
    if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'oui') {
      exec('node auto-migrate.js', 'Migration React Router → Next.js');
    } else {
      console.log('⏭️  Migration React Router ignorée');
    }
  } else {
    exec('node auto-migrate.js', 'Migration React Router → Next.js');
  }

  // Étape 3: Ajout "use client"
  console.log('\n\n🎯 ÉTAPE 3: AJOUT "use client"');
  
  if (!autoMode) {
    const answer = await question('\nVoulez-vous ajouter "use client" automatiquement? (o/N): ');
    if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'oui') {
      exec('node add-use-client.js', 'Ajout de "use client"');
    } else {
      console.log('⏭️  Ajout "use client" ignoré');
    }
  } else {
    exec('node add-use-client.js', 'Ajout de "use client"');
  }

  // Analyse finale
  console.log('\n\n📊 ANALYSE FINALE');
  exec('node migration-checker.js', 'Réanalyse des fichiers');

  // Résumé
  console.log('\n\n' + '═'.repeat(60));
  console.log('✅ MIGRATION TERMINÉE!');
  console.log('═'.repeat(60));
  console.log('\n📝 PROCHAINES ÉTAPES MANUELLES:');
  console.log('\n1. Convertir <Outlet /> → {children} dans les layouts');
  console.log('2. Adapter useNavigate() → useRouter()');
  console.log('3. Adapter useLocation() → usePathname() + useSearchParams()');
  console.log('4. Migrer les pages de src/app/pages/ vers app/');
  console.log('5. Tester l\'application: npm run dev');
  console.log('\n📖 Consultez RAPPORT_FINAL.md pour les détails\n');

  rl.close();
}

run().catch(error => {
  console.error('\n❌ Erreur:', error);
  rl.close();
  process.exit(1);
});
