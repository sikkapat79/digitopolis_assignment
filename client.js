const client = require('dgt-net').client;

const packet = require('./client_libs/packet');
const remote = require('./client_libs/remote');

const hostInfo = {
    localhost : '127.0.0.1',
    port : '8000'
}

let c = new client.createClient();
c.setPacketObject(packet);
c.setRemoteClass(remote);
c.connect(hostInfo.localhost, hostInfo.port);