const client = require('./client');
const { withRetry } = require('../retry');
const monitor = require('../monitor');

module.exports = {
    sendEvent: async (event, data) => {
        return withRetry(async () => {
            monitor.logEvent('nefosys', 'sendEvent', { event, data });
            console.log(`[Nefosys] Evento enviado: ${event}`);
            return client.send(event, data);
        }, { label: 'nefosys.sendEvent' });
    }
};