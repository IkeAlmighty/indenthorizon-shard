// import ShardActions
const ShardActions = require(`${__dirname}/actions`);
const { NodeVM } = require("vm2");

const { NodeVM } = require("vm2");
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

    // if the action is 'runCode' then make a vm2 instance and run the code:
    // TODO: decide what kind of architecture to use for running untrusted code (ie the ship code)
    // TODO (continued): the key thing here is that it is weird and innefficient to create a websocket
    // connection within the server code to send individual actions to the the same server.
    // possibly better to pass the actions into the sandbox, but then also a decision about
    // the final form of the code being sent in needs to be made in such a way that it can be ran
    // from anywhere or just sent to the server to be ran
    if (action === "runCode") {
      const websocket = new WebSocket();
      const vm = new NodeVM({ sandbox: { websocket } });
      vm.run(code);
    }
    // else just execute the individual action:
    else {
      // attempt to execute the action on the shard:
      let success = await ShardActions.execute({ timestamp, action, args });

      // if action was excuted successfully, save the action to
      // shard history:
      if (success) {
        shardHistory.push({ timestamp, action, args });

        // if there was a response message returned,
        // then send that back to the client:
        if (success.response) {
          client.send(JSON.stringify(success.response));
        }
      }
    }
  });
});

// TODO: every x amount of time, store the shard history in persistant local storage
