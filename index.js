const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

// === CONFIGURAÇÃO DO SERVIDOR E BOT ===
const SERVER_IP = 'rufouscrabhawk.aternos.host';
const SERVER_PORT = 22286;
const BOT_NAME = 'BotAFK2.0';
const SENHA = 'tocommedo12';
const SITE_URL = 'https://mestredosbots.onrender.com'; // seu site no Render

let bot;

// === FUNÇÃO DE CRIAÇÃO DO BOT ===
function createBot() {
  bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: BOT_NAME,
    version: false // Detecta automaticamente
  });

  bot.once('spawn', () => {
    console.log('🤖 BotAFK2.0 entrou no servidor!');

    // Aguardar alguns segundos antes de tentar login/registro
    setTimeout(() => {
      bot.chat(`/register ${SENHA} ${SENHA}`);
      bot.chat(`/login ${SENHA}`);
      console.log('🔐 Tentando registrar/login...');
    }, 8000);

    // Anti-AFK: movimento leve a cada 20s
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 2000);
    }, 20000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'oi bot') {
      bot.chat(`Olá ${username}! 👋 Estou ativo no servidor.`);
    }
  });

  bot.on('end', () => {
    console.log('❌ O bot caiu! Tentando reconectar...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ Erro no bot:', err.message);
  });
}

// Inicia o bot
createBot();

// === SERVIDOR WEB (mantém Render acordado) ===
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 BotAFK2.0 está online!'));
app.listen(PORT, () => console.log(`🌍 Servidor web ativo na porta ${PORT}`));

// === PING AUTOMÁTICO ===
setInterval(() => {
  fetch(SITE_URL)
    .then(() => console.log('💓 Mantendo ativo no Render...'))
    .catch(() => console.log('⚠️ Falha ao enviar ping.'));
}, 12 * 60 * 1000);
