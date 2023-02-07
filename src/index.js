// import ShardActions
const ShardActions = require(`${__dirname}/actions`);

// import websocket
const WebSocket = require("ws");

// create server object to listen to player clients
const playerServer = new WebSocket.Server({ port: 4200 });

// create a map to store player client connections:
const playerClients = new Map(); //TODO not using this right, now might need it later for something idk

// create the shard history array to periodically send to
// verification server, and thus keep this shard connected
// to the global network in good faith:
const shardHistory = [];

playerServer.on("connection", (client) => {
  client.on("message", async (messageString) => {
    // parse the message (messages should be sent in json):
    const { timestamp, action, args } = JSON.parse(messageString);

    // attempt to execute the action on the shard:
    let success = await ShardActions.execute({ timestamp, action, args });

    // if action was excuted successfully, save the action to
    // shard history & respond to the client:
    if (success) {
      shardHistory.push({ timestamp, action, args });

      // if there was a response message returned,
      // then send that back to the client:
      if (success.response) {
        client.send(JSON.stringify(success.response));
      }
    }
  });
});
