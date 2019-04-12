'use strict';

const { EventEmitter } = require('events');

class TriggerEmitter extends EventEmitter {
    constructor(postgres) {
        super();
        
        postgres.on('notification', message => {
            const { channel, payload } = message;
            this.emit(channel, JSON.parse(payload));
        })
    }
    static connect(postgres) {
        return new TriggerEmitter(postgres);
    }
}

module.exports = TriggerEmitter;