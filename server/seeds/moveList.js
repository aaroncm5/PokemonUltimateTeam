const moveData = require('../seed_data/movesList.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('moves').del()
  await knex('moves').insert(
    moveData
  );
};
