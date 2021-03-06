'use strict';
const TABLE_NAME = 'applications';
const { STATUSES } = require('../lib/constants/applications');

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.uuid('id').primary();
    table.enu('status', [
      STATUSES.PENDING,
      STATUSES.ACCEPTED,
      STATUSES.DECLINED]);
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
