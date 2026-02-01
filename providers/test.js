const providers = require('./');

providers.telegram.sendMessage('12345', 'Test Telegram');
providers.whatsapp.sendMessage('999999', 'Test WhatsApp');
providers.nefosys.sendEvent('test_event', { ok: true });
providers.scheduler.run();