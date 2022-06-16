'use strict';

const bcrypt          = require('bcrypt');
const getBasicMethods = require('./Base');

const tableName = 'users';

// Properties that are allowed to be selected from the database for reading.

const selectableProps = [
  'id',
  'email',
  'first_name',
  'last_name',
  'balance',
  'status',
  'application_id',
  'created_at',
  'updated_at',
];

const SALT_ROUNDS = 16;
const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const beforeSave = user => {
  if (!user.password) return Promise.resolve(user);

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

  const checkPassword = (email, password) => {
    const matchErrorMsg = 'Username or password do not match';

    knex.select()
      .from(tableName)
      .where({ email })
      .timeout(basicMethods.timeout)
      .then(user => {
        if (!user) throw matchErrorMsg;

        return user;
      })
      .then(user => Promise.all(
        [user, verifyPassword(password, user.password)],
      ))
      .then(([user, isMatch]) => {
        if (!isMatch) throw matchErrorMsg;

        return user;
      });
  };

  return {
    ...basicMethods,
    create,
    checkPassword,
  };
};
