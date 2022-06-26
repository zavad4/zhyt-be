/* eslint-disable camelcase */
'use strict';
const { AdminUser } = require('../lib/models');

const TABLE_NAME = 'admin_users';
const superAdmins = require('../fixtures/superAdmins');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();
  await Promise.all(superAdmins.map(data => AdminUser.create(data)));
};
