/* eslint-disable no-console */

const HexWebsocket = require('./hex_websocket');

const ws = new HexWebsocket();

const requestService = (type) => () => {
    console.log(`Requesting "${type}" service...`);
    return ws.send({
        to: 'container-service',
        message: {
            name: 'service.request',
            type,
        },
    });
}

ws.open()
    .then(requestService('state-service'))
    .then(requestService('front-service'))
    .then(requestService('init-service'))
    .then(() => ws.close())
    .then(() => console.log('All done!'))
    .catch(console.error);
