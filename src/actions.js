const ShardState = require(`${__dirname}/state`);
ShardState.loadFromPersistantStorage();

const { NodeVM } = require("vm2");

/**
 * An 'Action' object containing each action and its
 * implementation on the shard.
 * The message:
 *
 * {
 *  "action": "scan",
 *  "timestamp": 8934753948,
 *  "args": {
 *    "radius": 10,
 *    "entityId": "XC4545DFG"
 *  },
 * }
 *
 * would arrive at the shard server
 * and result in
 *
 * Actions.scan({ ...args, timestamp });
 *
 * being ran.
 *
 * If the function returns undefined,
 * that means that it failed, otherwise it should
 * return an object (which might be empty)
 *
 */
const Actions = {
  scan: async ({}) => {},
  harvest: async ({}) => {},
  message: async ({}) => {},
  build: async ({}) => {},
  install: async ({}) => {},
  research: async ({}) => {},
  loadFromShard: async ({ shardId, entityId }) => {
    let entityData;

    // TODO: attempt to get entity data from shard it warped from:

    // if the shard doesn't respond, then get the last known
    // entity data from https://indenthorizon.com/shards/[shardId]/[entityId]
    if (shardResponse.status === 404) {
      let globalNetResponse = await fetch(
        `https://indenthorizon.com/shards/${shardId}/${entityId}?shardKey=${process.env.shardKey}`
      );
      entityData = await globalNetResponse.json();
    }

    return { response: { ...entityData } };
  },
};

// evaluate and execute an action on the shard state:
async function execute({ timestamp, action, args }) {
  return await Actions[action]({ ...args, timestamp });
}

module.exports = { execute };
