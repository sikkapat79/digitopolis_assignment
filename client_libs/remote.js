let client = require('dgt-net').client;

let packet = require('./packet');

let interval = null;

class Remote extends client.Remote {
    onConnected() {
        interval = setInterval(() => {
            const param = {
                x : Math.round(Math.random() * 65534),
                y : Math.round(Math.random() * 65534),
            };
            console.log(`x = ${param.x}, y = ${param.y}`)
            this.send(packet.add(param));            
        }, 3000);
    }

    onDisconnected() {
        clearInterval(interval);
    }

    onAddSuccess(result) {
        console.log(`Result = ${result}`);
    }
}

module.exports = Remote;