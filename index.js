const mineflayer = require('mineflayer');
const express = require('express');
const fetch = require('node-fetch');

// === CONFIGURAÇÃO DO BOT ===
let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'rufouscrabhawk.aternos.host', // IP do servidor
    port: 22286, // Porta
    username: 'BotAFK2.0', // Nome do bot
    version: false // Detecta automaticamente
  });

  // === QUANDO ENTRAR NO SERVIDOR ===
  bot.on('spawn', () => {
    console.log('🤖 BotAFK2.0 entrou no servidor!');

    // Faz registro e login automáticos
    setTimeout(() => {
      bot.chat('/register tocommedo12 tocommedo12');
      bot.chat('/login tocommedo12');
      console.log('🔐 Registro e login automáticos enviados!');
    }, 4000);

    // Anti-AFK (anda de tempos em tempos)
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 2000);
    }, 15000);
  });

  // === RESPONDE AO CHAT ===
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'oi bot') {
      bot.chat(`Olá ${username}! 👋`);
    }
  });

  // === SE CAIR, RECONECTA AUTOMATICAMENTE ===
  bot.on('end', () => {
    console.log('❌ O bot caiu, tentando reconectar...');
    setTimeout(createBot, 10000);
  });

  // === CAPTURA ERROS ===
  bot.on('error', err => console.log('⚠️ Erro:', err));
}

// Cria o bot inicial
createBot();

// === SERVIDOR WEB (Render mantém online) ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('🤖 BotAFK2.0 está online e conectado!'));
app.listen(PORT, () => console.log(`🌐 Servidor web ativo na porta ${PORT}`));

// === PING AUTOMÁTICO PRA NÃO DORMIR ===
setInterval(() => {
  fetch('https://mestredosbots.onrender.com')
    .then(() => console.log('💓 Mantendo ativo no Render...'))
    .catch(() => console.log('⚠️ Erro ao enviar ping.'));
}, 12 * 60 * 1000); // a cada 12 minutos
