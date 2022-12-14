const pokemonData = require('../seed_data/pokemonList.json')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pokemonList').del()
  await knex('pokemonList').insert(
    pokemonData
  );
};
