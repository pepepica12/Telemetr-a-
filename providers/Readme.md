# Providers

Este módulo contiene integraciones externas del sistema:

- Telegram
- WhatsApp
- Nefosys
- Scheduler

## Estructura

Cada provider expone una interfaz consistente y modular.

## Archivos clave

- `index.js` → Loader central
- `dispatcher.js` → Enrutador universal de providers
- `logger.js` → Sistema de logs forenses
- `config.js` → Configuración global
- `types.js` → Interfaces y contratos
- `test.js` → Pruebas manuales