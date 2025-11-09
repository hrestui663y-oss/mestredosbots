const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

// === CONFIGURAÇÕES DO BOT ===
const bot = mineflayer.createBot({
  host: 'survivalist7.aternos.me', // IP do servidor
  port: 22286, // Porta do servidor
  username: 'MestreDosBots', // Nome do bot
  version: false // Detecta versão automaticamente
});

// === QUANDO O BOT ENTRAR NO SERVIDOR ===
bot.on('spawn', () => {
  console.log('🤖 MestreDosBots entrou no servidor!');

  // Anti-AFK: anda pra frente e para de tempos em tempos
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 2000);
  }, 10000);
});

// === RESPOSTAS NO CHAT ===
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message.toLowerCase().includes('oi bot')) {
    bot.chat(`Olá ${username}! 👋`);
  }
});

// === AUTO RECONEXÃO ===
bot.on('end', () => {
  console.log('❌ O bot caiu, tentando reconectar...');
  setTimeout(() => {
    process.exit(); // Reinicia o processo no Render
  }, 5000);
});

// === CAPTURA DE ERROS ===
bot.on('error', err => console.log('⚠️ Erro detectado:', err));

// === SERVIDOR WEB PARA O RENDER ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🤖 Bot MestreDosBots está online e ativo!');
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor web ativo na porta ${PORT}`);
});

// === PING AUTOMÁTICO PARA O RENDER NÃO DORMIR ===
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('✅ Mantendo ativo no Render...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 600000); // 10 minutos
