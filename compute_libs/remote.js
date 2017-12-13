let client = require('dgt-net').client;

let packet = require('./packet');

class Remote extends client.Remote {
    onAdd(x, y) {
        let result = x + y;
        console.log(`x = ${x}, y = ${y}, Result = ${result}`);
        this.send(packet.response(result))
    }

    onError() {
        this.send(packet.bad_input)
    }
}

module.exports = Remote;