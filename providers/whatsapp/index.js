const config = require('./config');
const { withRetry } = require('../retry');
const monitor = require('../monitor');

module.exports = {
    sendMessage: async (number, text) => {
        return withRetry(async () => {
            monitor.logEvent('whatsapp', 'sendMessage', { number, text });
            console.log(`[WhatsApp] Enviando mensaje a ${number}: ${text}`);
        }, { label: 'whatsapp.sendMessage' });
    }
};