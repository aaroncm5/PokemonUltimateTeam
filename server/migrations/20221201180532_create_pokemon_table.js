exports.up = function(knex) {
    return knex.schema.createTable('pokemon', (table) => {
        table.string('id').primary();
        table
            .string('team_id')
            .references('teams.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.string('name').notNullable();
        table.string('type1').notNullable();
        table.string('type2');
        table.string('sprite').notNullable();
        table.integer('hp').notNullable();
        table.integer('attack').notNullable();
        table.integer('defense').notNullable();
        table.integer('special_attack').notNullable();
        table.integer('special_defense').notNullable();
        table.integer('speed').notNullable();
        table.string('ability1').notNullable();
        table.string('ability2');
        table.string('move1').notNullable();
        table.string('move2');
        table.string('move3');
        table.string('move4');
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pokemon');
};
