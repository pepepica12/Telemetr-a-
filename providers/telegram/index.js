const config = require('./config');
const { withRetry } = require('../retry');
const monitor = require('../monitor');

module.exports = {
    sendMessage: async (chatId, text) => {
        return withRetry(async () => {
            monitor.logEvent('telegram', 'sendMessage', { chatId, text });
            console.log(`[Telegram] Enviando mensaje a ${chatId}: ${text}`);
        }, { label: 'telegram.sendMessage' });
    }
};