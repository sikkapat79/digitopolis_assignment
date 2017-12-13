class Room {
    constructor() {
        this.clientList = [];
        this.computeList = [];
    }

    addClient(remote) {
        this.clientList.push(remote)
    }

    removeClient(remote) {
        this.clientList.splice(this.clientList.indexOf(remote), 1)
    }

    addCompute(remote) {
        this.computeList.push(remote)
    }

    removeCompute(remote) {
        this.computeList.splice(this.computeList.indexOf(remote), 1)
    }

    forwardToCompute(data) {
        this.computeList[0].send(data);
        this.computeList.push(this.computeList[0]);
        this.computeList.shift();
    }

    forwardToClient(data) {
        this.clientList.forEach((remote) => {
            remote.send(data);
        })
    }
}

module.exports = Room