module.exports = {
    log: (...args) => {
        const timestamp = new Date().toISOString();
        console.log(`[Providers][${timestamp}]`, ...args);
    },
    error: (...args) => {
        const timestamp = new Date().toISOString();
        console.error(`[Providers:ERROR][${timestamp}]`, ...args);
    }
};