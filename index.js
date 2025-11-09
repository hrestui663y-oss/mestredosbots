const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

const bot = mineflayer.createBot({
  host: 'survivalist7.aternos.me', // IP do seu servidor
  port: 22286, // porta
  username: 'MestreDosBots', // nome do bot
  version: false // usa versão automática
});

// Quando o bot entrar
bot.on('spawn', () => {
  console.log('🤖 MestreDosBots entrou no servidor!');
});

// Responde no chat
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message === 'oi bot') {
    bot.chat(`Olá ${username}! 👋`);
  }
});

// Se cair, tenta reconectar
bot.on('end', () => {
  console.log('❌ O bot caiu, tentando reconectar...');
  setTimeout(() => process.exit(), 5000);
});

// Captura erros
bot.on('error', err => console.log('Erro:', err));

// Mantém servidor web ativo (Render precisa disso)
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot MestreDosBots está online!'));
app.listen(PORT, () => console.log(`🌐 Servidor web ativo na porta ${PORT}`));

// Mantém online no Render (ping periódico)
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('📡 Mantendo ativo...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 5 * 60 * 1000);
