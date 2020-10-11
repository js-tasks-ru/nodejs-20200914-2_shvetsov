const EventEmitter = require('events');

class Chat {
    #eventEmitter = new EventEmitter();

    subscribe() {
        return new Promise(resolve => {
            this.#eventEmitter.once('message', resolve);
        });
    }

    publish(message) {
        this.#eventEmitter.emit('message', message);
    }
}

module.exports = new Chat();
