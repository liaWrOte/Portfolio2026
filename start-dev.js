const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage de Portfolio2026...\n');

// Démarrer Strapi (port 1337)
console.log('📡 Démarrage de Strapi sur le port 1337...');
const strapi = spawn('yarn', ['start'], {
  cwd: path.join(__dirname, 'strapi'),
  stdio: 'inherit',
  shell: true
});

// Gérer les erreurs de démarrage
strapi.on('error', (error) => {
  console.error(`❌ Erreur au démarrage de Strapi: ${error.message}`);
  console.log('💡 Assurez-vous que Strapi est installé avec: cd strapi && yarn install');
  process.exit(1);
});

strapi.on('close', (code) => {
  console.log(`Strapi process exited with code ${code}`);
  process.exit(0);
});

// Attendre 5 secondes pour que Strapi démarre complètement
setTimeout(() => {
  console.log('\n🌐 Démarrage du Frontend sur le port 3000...');
  
  // Démarrer le Frontend (port 3000)
  const frontend = spawn('yarn', ['start'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  // Gérer les erreurs de démarrage
  frontend.on('error', (error) => {
    console.error(`❌ Erreur au démarrage du Frontend: ${error.message}`);
    console.log('💡 Assurez-vous que les dépendances sont installées avec: yarn install');
    strapi.kill();
    process.exit(1);
  });

  frontend.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
    strapi.kill();
  });

}, 5000);

// Gérer l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt des serveurs...');
  process.exit(0);
});
