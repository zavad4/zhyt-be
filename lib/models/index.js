'use strict';
const knex        = require('../../dbConnection');
const AdminUser   = require('./AdminUser');
const User        = require('./User');
const Application = require('./Application');
const Transaction = require('./Transaction');

const models = {
  AdminUser,
  User,
  Application,
  Transaction,
};

for (const key in models) {
  models[key] = models[key](knex);
}

module.exports = models;
