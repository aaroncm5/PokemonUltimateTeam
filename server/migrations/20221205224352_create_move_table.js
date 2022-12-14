
exports.up = function(knex) {
    return knex.schema.createTable('moves', (table) => {
        table.integer('id').primary();
        table.string('name');
        table.string('type');
        table.string('effect');
        table.integer('power');
        table.integer('accuracy');
        table.integer('power_points');
        table.integer('priority');
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('moves');
};
