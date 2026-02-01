const cron = require('node-cron');
const scheduler = require('./scheduler');
const logger = require('./logger');

function startCron() {
    logger.log('Iniciando cron de scheduler...');

    // Cada minuto
    cron.schedule('* * * * *', () => {
        logger.log('Cron: ejecutando scheduler.run()');
        scheduler.run();
    });
}

module.exports = {
    startCron
};