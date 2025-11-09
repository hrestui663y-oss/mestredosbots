const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

const PASSWORD = process.env.BOT_PASSWORD || ''; // pega do env var

// === CONFIGURAÇÕES DO BOT ===
const bot = mineflayer.createBot({
  host: 'survivalist7.aternos.me',
  port: 22286,
  username: 'MestreDosBots',
  version: false
});

function tryLogin() {
  if (!PASSWORD) {
    console.log('⚠️ BOT_PASSWORD não definido. Não será feito login automático.');
    return;
  }
  // Comandos comuns: /login <senha> ou /register <senha> <senha>
  // Ajuste abaixo se seu servidor usar /register na primeira vez.
  bot.chat(`/login ${PASSWORD}`);
  console.log('🔐 Comando de login enviado.');
}

bot.on('spawn', () => {
  console.log('🤖 MestreDosBots entrou no servidor!');
  // Espera alguns segundos e tenta logar (alguns servidores exigem delay)
  setTimeout(tryLogin, 3000);

  // Anti-AFK: anda um pouco de tempos em tempos
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 2000);
  }, 10000);
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message.toLowerCase().includes('oi bot')) {
    bot.chat(`Olá ${username}! 👋`);
  }
});

bot.on('end', () => {
  console.log('❌ O bot caiu, tentando reconectar...');
  setTimeout(() => process.exit(), 5000); // Render reinicia o processo
});

bot.on('error', err => console.log('⚠️ Erro detectado:', err));

// Servidor web para Render / UptimeRobot
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot MestreDosBots está online e ativo!'));
app.listen(PORT, () => console.log(`🌐 Servidor web ativo na porta ${PORT}`));

// Ping periódico (manter o Render acordado)
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('✅ Mantendo ativo no Render...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 600000); // 10 minutos
