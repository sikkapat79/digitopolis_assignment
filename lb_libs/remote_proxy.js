let server = require('dgt-net').server;
let packet = require('./packet');

const room = new (require('./room'))();

class ClientRemoteProxy extends server.RemoteProxy {
    onConnected() {
        room.addClient(this);
    }

    onDisconnected() {
        room.removeClient(this);
    }

    forward(msg) {
        if (room.computeList.length > 0) {
            console.log('Forward msg to', room.computeList[0].getPeerName());
            room.forwardToCompute(packet.forwardData(msg));
        }
        else
            this.send(packet.noResources());
    }
}

class ComputeRemoteProxy extends server.RemoteProxy {
    onConnected() {
        room.addCompute(this);
    }

    onDisconnected() {
        room.removeCompute(this);
    }

    forward(data) {
        room.forwardToClient(packet.response(data));
    }
}

module.exports.ClientRemoteProxy = ClientRemoteProxy;
module.exports.ComputeRemoteProxy = ComputeRemoteProxy;