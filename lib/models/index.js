'use strict';
const knex      = require('../../dbConnection');
const AdminUser = require('./AdminUser');
const User      = require('./User');

const models = {
  AdminUser,
  User,
};

models.forEach(model => model(knex));

module.exports = models;
