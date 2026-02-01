const config = require('./config');

module.exports = {
    sendMessage: async (number, text) => {
        console.log(`[WhatsApp] Enviando mensaje a ${number}: ${text}`);
        // Aquí integras tu proveedor real
    }
};