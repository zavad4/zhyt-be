'use strict';
const knex      = require('../../dbConnection');
const AdminUser = require('./AdminUser');
const User      = require('./User');
const Application      = require('./Application');

const models = {
  AdminUser,
  User,
  Application,
};

for (const key in models) {
  models[key] = models[key](knex);
}

module.exports = models;
