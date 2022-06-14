/* eslint-disable camelcase */
'use strict';
const TABLE_NAME = 'admin_users';

const superAdmins = [
  {
    id: 1,
    email: 'lizavodovska@gmail.com',
    first_name: 'Elizavieta',
    last_name: 'Zavodovska',
  },
  {
    id: 2,
    email: 'dirayser@gmail.com',
    first_name: 'Dmytro',
    last_name: 'Dmytriiev',
  },
  {
    id: 3,
    email: 'zemark2012@gmail.com',
    first_name: 'Mark',
    last_name: 'Zehelman',
  },
];

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert(superAdmins);
};
