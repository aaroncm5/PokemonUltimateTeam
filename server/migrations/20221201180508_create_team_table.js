
exports.up = function(knex) {
    return knex.schema.createTable('teams', (table) => {
        table.uuid('id').primary();
        table
            .uuid('user_id')
            .references('users.id')
            .onUpdate('CASCADE')
        table.string('team_name').notNullable();
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams');
};
