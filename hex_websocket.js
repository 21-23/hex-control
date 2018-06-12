const URL = "ws://localhost:3002";

const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');

const DUMMY_REQUEST_ID = 1;

class HexWebsocket {
  constructor() {
    this.ws = new WebSocketAsPromised(URL, {
      packMessage: data => JSON.stringify(data),
      unpackMessage: data => JSON.parse(data),
      createWebSocket: url => new W3CWebSocket(url),
      attachRequestId: data => data,
      extractRequestId: data => DUMMY_REQUEST_ID,     
    });
  }

  open() { return this.ws.open() }
  close() { return this.ws.close() }
  send(data) { return this.ws.sendRequest(data, { requestId: DUMMY_REQUEST_ID }) }
}

module.exports = HexWebsocket;
