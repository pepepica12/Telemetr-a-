const config = require('./config');

module.exports = {
    sendMessage: async (chatId, text) => {
        console.log(`[Telegram] Enviando mensaje a ${chatId}: ${text}`);
        // Aquí integras tu API real
    }
};