'use strict';

const bcrypt          = require('bcrypt');
const getBasicMethods = require('./utils/basicMethods');

const tableName = 'users';

// Properties that are allowed to be selected from the database for reading.

const selectableProps = [
  'id',
  'email',
  'first_name',
  'last_name',
  'created_at',
  'updated_at',
];

const SALT_ROUNDS = 16;
const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS);

const beforeSave = user => {
  if (!user.password_hash) return Promise.resolve(user);

  return hashPassword(user.password)
    .then(hash => ({ ...user, password: hash }))
    .catch(err => `Error hashing password: ${err}`);
};

module.exports = knex => {
  const basicMethods = getBasicMethods({
    knex,
    tableName,
    selectableProps,
  });

  // Augment default `create` function to include custom `beforeSave` logic.
  const create = data => beforeSave(data)
    .then(user => basicMethods.create(user));

  return {
    ...basicMethods,
    create,
  };
};
