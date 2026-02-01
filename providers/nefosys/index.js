const client = require('./client');

module.exports = {
    sendEvent: async (event, data) => {
        console.log(`[Nefosys] Evento enviado: ${event}`);
        return client.send(event, data);
    }
};