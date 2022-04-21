const state = { entities: {} };

function loadFromPersistantStorage() {
  // TODO: load the shard state from persistant storage
}

function getByEntityId(id) {
  return state.entities[id];
}

module.exports = { loadFromPersistantStorage, getByEntityId };
