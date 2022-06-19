/* eslint-disable camelcase */
'use strict';
const { AdminUser } = require('../lib/models');

const TABLE_NAME = 'admin_users';

const superAdmins = [
  {
    id: 1,
    email: 'lizavodovska@gmail.com',
    first_name: 'Elizavieta',
    last_name: 'Zavodovska',
    password: 'zavad',
  },
  {
    id: 2,
    email: 'dirayser@gmail.com',
    first_name: 'Dmytro',
    last_name: 'Dmytriiev',
    password: 'dirayser',
  },
  {
    id: 3,
    email: 'zemark2012@gmail.com',
    first_name: 'Mark',
    last_name: 'Zehelman',
    password: 'zemark',
  },
];

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();
  await Promise.all(superAdmins.map(data => AdminUser.create(data)));
};
