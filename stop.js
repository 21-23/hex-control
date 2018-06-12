const HexWebsocket = require("./hex_websocket");

const ws = new HexWebsocket();

ws.open()
  .then(() => console.log("Requesting shutdown..."))
  .then(() => ws.send({
    to: "container-service",
    message: {
      name: "shutdown"
    }
  }))
  .then(() => ws.close())
  .then(() => console.log("Done!"))
  .catch(console.error)
