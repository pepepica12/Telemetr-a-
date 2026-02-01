const providers = require('./');
const logger = require('./logger');

async function checkTelegram() {
    try {
        if (!providers.config.enabled.telegram) return { ok: false, disabled: true };
        // Aquí podrías hacer una llamada real a la API
        return { ok: true };
    } catch (e) {
        logger.error('Health Telegram:', e);
        return { ok: false, error: e.message };
    }
}

async function checkWhatsApp() {
    try {
        if (!providers.config.enabled.whatsapp) return { ok: false, disabled: true };
        return { ok: true };
    } catch (e) {
        logger.error('Health WhatsApp:', e);
        return { ok: false, error: e.message };
    }
}

async function checkNefosys() {
    try {
        if (!providers.config.enabled.nefosys) return { ok: false, disabled: true };
        return { ok: true };
    } catch (e) {
        logger.error('Health Nefosys:', e);
        return { ok: false, error: e.message };
    }
}

async function checkScheduler() {
    try {
        if (!providers.config.enabled.scheduler) return { ok: false, disabled: true };
        return { ok: true };
    } catch (e) {
        logger.error('Health Scheduler:', e);
        return { ok: false, error: e.message };
    }
}

module.exports = {
    checkAll: async () => {
        const [telegram, whatsapp, nefosys, scheduler] = await Promise.all([
            checkTelegram(),
            checkWhatsApp(),
            checkNefosys(),
            checkScheduler()
        ]);

        return {
            telegram,
            whatsapp,
            nefosys,
            scheduler
        };
    }
};