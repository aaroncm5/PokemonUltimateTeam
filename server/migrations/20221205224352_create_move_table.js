
exports.up = function(knex) {
    return knex.schema.createTable('moves', (table) => {
        table.integer('id').primary();
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.string('effect').notNullable();
        table.integer('power').notNullable();
        table.integer('accuracy').notNullable();
        table.integer('power_points').notNullable();
        table.integer('priority').notNullable();
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('moves');
};
