
exports.up = function(knex) {
    return knex.schema.createTable('pokemonList', (table) => {
        table.integer('id').primary();
        table.string('name').notNullable();
        table.integer('hp').notNullable();
        table.integer('attack').notNullable();
        table.integer('defense').notNullable();
        table.integer('special_attack').notNullable();
        table.integer('special_defense').notNullable();
        table.integer('speed').notNullable();
        table.string('ability1').notNullable();
        table.string('ability2');
        table.string('sprite').notNullable();
        table.string('type1').notNullable();
        table.string('type2');
        table.json('moves');
      })
};


exports.down = function(knex) {
    return knex.schema.dropTable('pokemonList');
};
