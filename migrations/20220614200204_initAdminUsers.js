'use strict';
const TABLE_NAME = 'admin_users';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('first_name').notNullable;
    table.string('last_name').notNullable;
    table.string('password').notNullable;
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
