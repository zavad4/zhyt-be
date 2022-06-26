'use strict';
const TABLE_NAME = 'transactions';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary();
    table.string('sender_id').notNullable;
    table.string('recipient_id').notNullable;
    table.integer('amount').notNullable;
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
