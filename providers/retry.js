const logger = require('./logger');

async function withRetry(fn, options = {}) {
    const {
        retries = 3,
        delayMs = 500,
        backoffFactor = 2,
        label = 'operation'
    } = options;

    let attempt = 0;
    let currentDelay = delayMs;

    while (attempt < retries) {
        try {
            attempt++;
            return await fn();
        } catch (e) {
            logger.error(`[Retry] Error en ${label}, intento ${attempt}:`, e.message);
            if (attempt >= retries) {
                throw e;
            }
            await new Promise(res => setTimeout(res, currentDelay));
            currentDelay *= backoffFactor;
        }
    }
}

module.exports = {
    withRetry
};