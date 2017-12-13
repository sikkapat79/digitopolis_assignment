/**
 * Constant Parameter
 */
const clientPort = 8000;
const computePort = 8001;

/**
 * Import dgt-net
 */
const clientSocket = require('dgt-net').server;
const computeSocket = require('dgt-net').server;

/**
 * Import packet Objects
 */
const packet = require('./lb_libs/packet');
const remoteProxy = require('./lb_libs/remote_proxy');

clientSocket.setPacketObject(packet);
clientSocket.setRemoteProxyClass(remoteProxy.ClientRemoteProxy);
clientSocket.listen(clientPort);

computeSocket.setPacketObject(packet);
computeSocket.setRemoteProxyClass(remoteProxy.ComputeRemoteProxy);
computeSocket.listen(computePort);