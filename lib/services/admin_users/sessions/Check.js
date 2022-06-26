/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base            = require('../../Base');
const { AdminUser }        = require('../../../models');
const { verifyToken } = require('../../../utils/jwt');
const { dumpUser }    = require('../../../utils/dumps');

const {
  WRONG_TOKEN,
  ACCESS_DENIED,
} = require('../../../utils/errors');
const Exception = require('../../../Exception');

class AdminSessionsCheck extends Base {
  async execute({ token }) {
    try {
      const userInfo = await verifyToken(token);
      if (!userInfo.isAdmin) throw ACCESS_DENIED;
      const admin = await AdminUser.findOne({ id: userInfo.id });

      return { data: dumpUser(admin) };
    } catch (error) {
      console.log(error);
      if (error instanceof Exception) throw error;
      throw WRONG_TOKEN;
    }
  }
}

module.exports = AdminSessionsCheck;
