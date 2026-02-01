module.exports = {
    dispatch: (type, payload) => {
        switch (type) {
            case 'telegram':
                return providers.telegram.sendMessage(payload.chatId, payload.text)
            case 'whatsapp':
                return providers.whatsapp.sendMessage(payload.number, payload.text)
            case 'event':
                return providers.nefosys.sendEvent(payload.event, payload.data)
        }
    }
}