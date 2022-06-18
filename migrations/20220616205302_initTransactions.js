'use strict';
const TABLE_NAME = 'transactions';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.integer('sender_id').notNullable;
    table.integer('recipient_id').notNullable;
    table.integer('amount').notNullable;
    table.timestamps();
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
