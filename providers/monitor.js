const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const LOG_FILE = path.join(__dirname, '..', 'telemetry_events.log');

function logEvent(source, type, payload) {
    const timestamp = new Date().toISOString();
    const entry = {
        timestamp,
        source,
        type,
        payload
    };

    const line = JSON.stringify(entry) + '\n';

    try {
        fs.appendFileSync(LOG_FILE, line);
    } catch (e) {
        logger.error('Error escribiendo en telemetry_events.log:', e.message);
    }

    logger.log('[Monitor]', source, type, payload);
}

module.exports = {
    logEvent
};