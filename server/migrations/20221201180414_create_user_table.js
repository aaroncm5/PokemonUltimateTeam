exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('user_name').notNullable();
    table.string('user_username').notNullable();
    table.string('user_email').notNullable();
    table.string('user_password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
