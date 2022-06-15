/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base     = require('../Base');
const { User } = require('../../models');
const { STATUSES } = require('../../constants/users');

const {
  ALREADY_EXISTS,
  PASSWORDS_NOT_EQUAL,
} = require('../../utils/errors');
const { dumpUser } = require('../../utils/dumps');

class UsersCreate extends Base {
  async execute(data) {
    const { email, password, confirmPassword, first_name, last_name } = data;
    if (password !== confirmPassword) throw PASSWORDS_NOT_EQUAL();

    const existingUser = await User.findOne({ email });
    if (existingUser) throw ALREADY_EXISTS('User', ['email']);

    const [id] = await User.create({
      email,
      first_name,
      last_name,
      password,
      status: STATUSES.PENDING,
    });
    return { data: dumpUser({ id, ...data, status: STATUSES.PENDING }) };
  }
}

module.exports = UsersCreate;
