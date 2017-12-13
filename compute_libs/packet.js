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

packet[packet.CS_ADD_REQUEST] = (remoteProxy, data) => {
    data = JSON.parse(data.read_string());
    if (typeof(data.x) === 'number' && typeof(data.y) === 'number')
        remoteProxy.onAdd(data.x, data.y)
    else
        remoteProxy.onError(`Wrong Input`);
}

/**
 * Send packets
 * compute to lb
 */
packet.response = (sum) => {
    let o = new packet_writer(packet.SC_ADD_RESPONSE);
    o.append_uint32(sum);
    o.finish();
    return o.buffer;
}

/**
 * Export modules
 */

module.exports = packet;