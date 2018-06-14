const URL = 'ws://localhost:3002';

const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');

const DUMMY_REQUEST_ID = 1;

class HexWebsocket {
    constructor(identity = 'sandbox-service:_qd') {
        this.id = null;
        this.identity = identity;
        this.ws = new WebSocketAsPromised(URL, {
            packMessage: data => JSON.stringify(data),
            unpackMessage: data => JSON.parse(data),
            createWebSocket: url => new W3CWebSocket(url),
            attachRequestId: data => data,
            extractRequestId: data => DUMMY_REQUEST_ID,
        });
    }

    open() {
        return this.ws.open()
            .then(this.checkIn.bind(this))
            .then(this.saveId.bind(this))
    }

    close() {
        return this.ws.close()
    }

    send(data) {
        return this.ws.sendRequest(this.prepareData(data), {
            requestId: DUMMY_REQUEST_ID,
        })
    }

    checkIn() {
        return this.send({
            to: 'messenger',
            message: {
                name: 'checkin',
                identity: this.identity,
            },
        });
    }

    saveId(data) {
        this.id = data.to.id;
    }

    prepareData(data) {
        if (this.id) {
            data.message = data.message || {};
            data.message.from = {
                id: this.id,
                type: this.identity,
            }
        }

        return data;
    }
}

module.exports = HexWebsocket;
