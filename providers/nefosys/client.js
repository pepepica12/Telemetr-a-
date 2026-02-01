module.exports = {
    send: async (event, data) => {
        console.log(`[Nefosys] Payload:`, data);
        // Aquí integras tu API real
        return { ok: true };
    }
};