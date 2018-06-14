/* eslint-disable no-console */

const HexWebsocket = require('./hex_websocket');

const ws = new HexWebsocket();

ws.open()
    .then(() => console.log('Requesting shutdown...'))
    .then(() => ws.send({
        to: 'container-service',
        message: {
            name: 'shutdown',
        },
    }))
    .catch(() => console.log('Done!')) // server will drop connection, so exception will be thrown
