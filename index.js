const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

// === CONFIGURAÇÃO DO SERVIDOR MINECRAFT ===
const bot = mineflayer.createBot({
  host: 'survivalist7.aternos.me', // IP do servidor
  port: 22286, // Porta
  username: 'MestreDosBots', // Nome do bot
  version: false // Detecta automaticamente
});

// === EVENTO: BOT ENTROU NO SERVIDOR ===
bot.on('spawn', () => {
  console.log('🤖 MestreDosBots entrou no servidor!');

  // Login ou registro automático
  setTimeout(() => {
    bot.chat('/register tocommedo12 tocommedo12');
    bot.chat('/login tocommedo12');
    console.log('🔐 Registro e login automáticos enviados!');
  }, 3000);

  // Anti-AFK (se move pra não cair)
  setInterval(() => {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 2000);
  }, 10000);
});

// === RESPONDE A MENSAGENS SIMPLES ===
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message.toLowerCase() === 'oi bot') {
    bot.chat(`Olá ${username}! 👋`);
  }
});

// === SE O BOT CAIR, REINICIA PRA VOLTAR ===
bot.on('end', () => {
  console.log('❌ O bot caiu, tentando reconectar...');
  setTimeout(() => process.exit(), 5000);
});

// === CAPTURA ERROS ===
bot.on('error', err => console.log('⚠️ Erro:', err));

// === SERVIDOR EXPRESS PRA MANTER O RENDER ONLINE ===
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot MestreDosBots está online!'));
app.listen(PORT, () => console.log(`🌐 Servidor web ativo na porta ${PORT}`));

// === PING AUTOMÁTICO PRA O RENDER NÃO DORMIR ===
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('✅ Mantendo Render ativo...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 600000); // a cada 10 minutos
