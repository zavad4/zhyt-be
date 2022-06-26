/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base              = require('../Base');
const { User }          = require('../../models');
const { STATUSES }      = require('../../constants/users');
const { generateToken } = require('../../utils/jwt');

const {
  AUTHENTICATION_FAILED,
  USER_BLOCKED,
} = require('../../utils/errors');

class SessionsCreate extends Base {
  async execute(data) {
    const { email, password  } = data;
    const user = await User.findOne({ email });
    if (!user) throw AUTHENTICATION_FAILED;
    if (user.status === STATUSES.BLOCKED) throw USER_BLOCKED;

    const isCredentialsValid = await User.checkPassword(
      password,
      user.password);
    if (!isCredentialsValid) throw AUTHENTICATION_FAILED;

    const token = generateToken(user);
    return { data: { token, userId: user.id } };
  }
}

module.exports = SessionsCreate;
