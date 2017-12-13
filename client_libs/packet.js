const packet_writer = require('dgt-net').packet_writer;

let packet = {
    /**
     * CLient to Load Balancer
     */
    CS_ADD_REQUEST : 11,

    /**
     * Load Balancer to Client
     */
    SC_ADD_RESPONSE : 21,
    SC_NO_COMPUTE : 22,
};

/**
 * Received packets
 */

packet[packet.SC_ADD_RESPONSE] = (remoteProxy, data) => {
    const result = data.read_uint32();
    if (!data.completed())
        return true;
    remoteProxy.onAddSuccess(result);
}

packet[packet.SC_NO_COMPUTE] = (remoteProxy, data) => {
    const errMsg = data.read_string();
    if (!data.completed())
        return true;
    console.log(errMsg);
    process.exit(1);
}

/**
 * Send packets
 */

packet.add = (data) => {
    let o = new packet_writer(packet.CS_ADD_REQUEST);
    o.append_string(JSON.stringify(data));
    o.finish();
    return o.buffer;
}

/**
 * Received Packets
 */


 /**
 * Export modules
 */

module.exports = packet;