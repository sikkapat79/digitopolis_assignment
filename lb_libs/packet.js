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
 * client to lb
 */

packet[packet.CS_ADD_REQUEST] = (remoteProxy, data) => {
    const msg = data.read_string();
    console.log(`Meessage from ${remoteProxy.getPeerName()} : ${msg}`)
    if (!data.completed())
        return true;
    remoteProxy.forward(msg)
}


/**
 * Received packets
 * compute to lb
 */
packet[packet.SC_ADD_RESPONSE] = (remoteProxy, data) => {
    const result = data.read_uint32();
    if (!data.completed())
        return true;
    remoteProxy.forward(result)
}

/**
 * Send packets
 * lb to client
 */

packet.response = (sum) => {
    let o = new packet_writer(packet.SC_ADD_RESPONSE);
    o.append_uint32(sum);
    o.finish();
    return o.buffer;
}

packet.noResources = () => {
    let o = new packet_writer(packet.SC_NO_COMPUTE);
    o.append_string(`There isn't any compute in pool.`);
    o.finish();
    return o.buffer;
}

/**
 * Send packets
 * lb to compute
 */
packet.forwardData = (msg) => {
    let o = new packet_writer(packet.CS_ADD_REQUEST);
    o.append_string(msg);
    o.finish();
    return o.buffer;
}

/**
 * Export modules
 */

module.exports = packet;