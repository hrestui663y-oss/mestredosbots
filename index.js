const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

// === CONFIGURAÇÃO DO SERVIDOR MINECRAFT ===
const bot = mineflayer.createBot({
  host: 'survivalist7.aternos.me', // IP do seu servidor
  port: 22286, // Porta do servidor
  username: 'MestreDosBots', // Nome do bot
  version: false // Versão automática
});

// === EVENTO: BOT ENTROU NO SERVIDOR ===
bot.on('spawn', () => {
  console.log('🤖 MestreDosBots entrou no servidor!');

  // Faz login automático
  setTimeout(() => {
    bot.chat('/login tocommedo12');
    console.log('🔐 Login automático enviado!');
  }, 3000);

  // Anti-AFK (movimenta o bot de tempos em tempos)
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 2000);
  }, 10000);
});

// === RESPONDE NO CHAT ===
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message === 'oi bot') {
    bot.chat(`Olá ${username}! 👋`);
  }
});

// === SE CAIR, TENTA RECONECTAR ===
bot.on('end', () => {
  console.log('❌ O bot caiu, tentando reconectar...');
  setTimeout(() => process.exit(), 5000); // Render reinicia automaticamente
});

// === CAPTURA ERROS ===
bot.on('error', err => console.log('⚠️ Erro:', err));

// === SERVIDOR EXPRESS (mantém o Render ativo) ===
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot MestreDosBots está online!'));
app.listen(PORT, () => console.log(`🌐 Servidor web ativo na porta ${PORT}`));

// === MANTÉM O SITE ONLINE NO RENDER (ping a cada 10min) ===
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('✅ Mantendo ativo...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 600000); // 10 minutos
