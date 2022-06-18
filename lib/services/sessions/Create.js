/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base              = require('../Base');
const { User }          = require('../../models');
const { generateToken } = require('../../utils/jwt');

const {
  AUTHENTICATION_FAILED,
} = require('../../utils/errors');

class SessionsCreate extends Base {
  async execute(data) {
    const { email, password  } = data;
    const user = await User.findOne({ email });
    if (!user) throw AUTHENTICATION_FAILED;

    const isCredentialsValid = await User.checkPassword(
      password,
      user.password);
    if (!isCredentialsValid) throw AUTHENTICATION_FAILED;

    const token = generateToken(user);
    return { data: { token } };
  }
}

module.exports = SessionsCreate;
