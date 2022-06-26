/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base            = require('../Base');
const { User }        = require('../../models');
const { STATUSES }    = require('../../constants/users');
const { verifyToken } = require('../../utils/jwt');
const { dumpUser }    = require('../../utils/dumps');

const {
  USER_BLOCKED,
  WRONG_TOKEN,
} = require('../../utils/errors');
const Exception = require('../../Exception');

class SessionsCheck extends Base {
  async execute({ token }) {
    try {
      const userInfo = await verifyToken(token);
      const user = await User.findOne({ id: userInfo.id });
      if (user.status === STATUSES.BLOCKED) throw USER_BLOCKED;

      return { data: dumpUser(user) };
    } catch (error) {
      console.log(error);
      if (error instanceof Exception) throw error;
      throw WRONG_TOKEN;
    }
  }
}

module.exports = SessionsCheck;
