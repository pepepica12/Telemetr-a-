const providers = require('./');

module.exports = {
    dispatch: async (type, payload) => {
        switch (type) {
            case 'telegram':
                return providers.telegram.sendMessage(payload.chatId, payload.text);

            case 'whatsapp':
                return providers.whatsapp.sendMessage(payload.number, payload.text);

            case 'event':
                return providers.nefosys.sendEvent(payload.event, payload.data);

            case 'schedule':
                return providers.scheduler.run();

            default:
                providers.logger.log('Tipo de provider no reconocido:', type);
                return { error: 'Provider no válido' };
        }
    }
};