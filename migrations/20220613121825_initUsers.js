'use strict';
const TABLE_NAME = 'users';
const { STATUSES } = require('../lib/constants/users');

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
    table.integer('balance');
    table.string('application_id').notNullable;
    table.enu('status', [STATUSES.ENABLED, STATUSES.BLOCKED]);
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
