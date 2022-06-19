/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base              = require('../../Base');
const { AdminUser }     = require('../../../models');
const { generateToken } = require('../../../utils/jwt');

const {
  AUTHENTICATION_FAILED,
} = require('../../../utils/errors');

class AdminSessionsCreate extends Base {
  async execute(data) {
    try {
      const isAdmin = true;
      const { email, password  } = data;

      const admin = await AdminUser.findOne({ email });
      if (!admin) throw AUTHENTICATION_FAILED;

      const isCredentialsValid = await AdminUser.checkPassword(
        password,
        admin.password);
      if (!isCredentialsValid) throw AUTHENTICATION_FAILED;

      const token = generateToken(admin, isAdmin);
      return { data: { token } };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = AdminSessionsCreate;
