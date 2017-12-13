const cluster = require('cluster');

const client = require('dgt-net').client;

const packet = require('./compute_libs/packet');
const remote = require('./compute_libs/remote');

const instaces = process.env.INSTANCES || 2;
const hostInfo = {
    localhost : '127.0.0.1',
    port : '8001'
}

let main = () => {
    for (let i = 0; i < instaces; i ++) {
        let c = new client.createClient();
        c.setPacketObject(packet);
        c.setRemoteClass(remote);
        c.connect(hostInfo.localhost, hostInfo.port);        
    }
}

main();