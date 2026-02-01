const tasks = require('./tasks');

module.exports = {
    run: () => {
        console.log('[Scheduler] Ejecutando tareas programadas...');
        tasks.executeAll();
    }
};