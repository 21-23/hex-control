const HexWebsocket = require("./hex_websocket");

const ws = new HexWebsocket();

const checkIn = () => ws.send({
  to: "messenger",
  message: {
    name: "checkin",
    identity: "sandbox-service:_qd"
  }
});

let id = null;
const saveId = (data) => {
  id = data.to.id
}

const requestService = (type) => () => {
  console.log(`Requesting "${type}" service...`);
  return ws.send({
    to: "container-service",
    message: {
      name: "service.request",
      from: {
        id,
        type: "sandbox-service:_qd"
      },
      type
    }
  });
}

ws.open()
  .then(checkIn)
  .then(saveId)
  .then(requestService("state-service"))
  .then(requestService("front-service"))
  .then(requestService("init-service"))
  .then(() => ws.close())
  .then(() => console.log("All done!"))
  .catch(console.error);
