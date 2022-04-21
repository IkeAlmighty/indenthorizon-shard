# Indent Horizon

A community hosted Space MMORPG

## Getting a shard key:

In order to run your own shard, you need to get a key. Keys can be obtained from https://indenthorizon.com/shards/register

## About Indent Horizon Shards

Each registered shard is accessible through the global shard network cache, which can be listed in json format with an HTTP GET request to https://indenthorizon.com/shards/list

You will want to limit the number of players able to travel to your shard
by editing the "maxplayers" property of the config.json file

Shards are required to send a compressed history of everything that happens in the shard every 48 hours to https://indenthorizon.com/shards/verify. If your server appears to be sending invalid responses to player actions, then it will be flagged and its key revoked. As keys are used to verify that a shard is safe to travel to, your shard will no longer get any traffic. Additionally, shards that fail to send compressed histories to a verification server will be flagged and cut off from the global network, but this flag can be lifted if the server sends a valid history.

**note**: verification servers run the entirety of your shard's actions, sped up, to catch cheating behaviors. DO NOT CHEAT. It is bad for the community, and will get both your shard and you banned from the game.

## Why run your own Shard?

IndentHorizon is a community. The spirit of the game is to give beginner to advanced programmers a creative outlet where they can learn new things while simultaneously becoming better progammers. Running your own shard is a way to advance faster in the community. Some basic things you can do with your own shard:

- Imploy shard-wide warp taxes for players visiting, which adds to your personal in-game currency.
- Enjoy unlimited (albiet limited to a specific shard) ai-entities to test out ideas or generate trade.
- Provide a place of safety for your friends by controlling the shard's pvp settings
- Write shard scripts to enforce laws within the shard.
- Become a regional power in the community by using shard privlages to help local in game organizations.

## How the Verification Server Works

Shards connected to the global network are required to send the 49 hours of shard history to the verification server every 48 hours. The history can be sent more often, but if it is not sent at least once every 48 hours, then the shard is flagged and removed from the global network.

Once the shard history arrives at the verification server, the server will run it in sped up time on its own instance, and compare the ending results of the history.
If the end result does not match, then the shard is removed from the global network.
