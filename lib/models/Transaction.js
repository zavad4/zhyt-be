'use strict';
const getBasicMethods = require('./Base');
const tableName = 'transactions';

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
  'id',
  'sender_id',
  'recipient_id',
  'amount',
  'created_at',
  'updated_at',
];

module.exports = knex => {
  const basicMethods = getBasicMethods({
    knex,
    tableName,
    selectableProps,
  });

  return {
    ...basicMethods,
  };
};
