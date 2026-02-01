module.exports = {
    MessageProvider: {
        sendMessage: 'function(identifier, text)'
    },
    EventProvider: {
        sendEvent: 'function(event, data)'
    },
    SchedulerProvider: {
        run: 'function()'
    }
};