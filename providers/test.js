const providers = require('./');

(async () => {
    console.log('--- TEST TELEGRAM ---');
    await providers.telegram.sendMessage('12345', 'Test Telegram');

    console.log('--- TEST WHATSAPP ---');
    await providers.whatsapp.sendMessage('999999', 'Test WhatsApp');

    console.log('--- TEST NEFOSYS ---');
    await providers.nefosys.sendEvent('test_event', { ok: true });

    console.log('--- TEST SCHEDULER ---');
    providers.scheduler.run();

    console.log('--- TEST COMPLETADO ---');
})();