const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

// === CONFIGURAÇÃO DO BOT ===
let bot;
function createBot() {
  bot = mineflayer.createBot({
    host: 'survivalist7.aternos.me', // IP do servidor
    port: 22286, // porta
    username: 'MestreDosBots', // nome do bot
    version: false // usa versão automática
  });

  // === QUANDO ENTRAR NO SERVIDOR ===
  bot.on('spawn', () => {
    console.log('🤖 MestreDosBots entrou no servidor!');

    // Login automático
    setTimeout(() => {
      bot.chat('/login tocommedo12');
      console.log('🔐 Bot logou com sucesso!');
    }, 4000);

    // Movimento simples anti-AFK
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 2000);
    }, 15000);
  });

  // === RESPONDE NO CHAT ===
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'oi bot') {
      bot.chat(`Olá ${username}! 👋`);
    }
  });

  // === SE CAIR, RECONECTA AUTOMATICAMENTE ===
  bot.on('end', () => {
    console.log('❌ O bot caiu, tentando reconectar...');
    setTimeout(createBot, 10000); // tenta reconectar após 10s
  });

  // === CAPTURA ERROS ===
  bot.on('error', err => console.log('⚠️ Erro:', err));
}

// cria o bot inicial
createBot();

// === SERVIDOR WEB (Render mantém online) ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('🤖 Bot MestreDosBots está online!'));
app.listen(PORT, () => console.log(`🌐 Servidor web ativo na porta ${PORT}`));

// === PING PERIÓDICO PARA MANTER ONLINE ===
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('💓 Mantendo Render ativo...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 12 * 60 * 1000); // a cada 12 minutos
