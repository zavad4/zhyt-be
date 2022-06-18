/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base            = require('../Base');
const { User }        = require('../../models');
const { verifyToken } = require('../../utils/jwt');
const { dumpUser }    = require('../../utils/dumps');

const {
  WRONG_TOKEN,
} = require('../../utils/errors');

class SessionsCheck extends Base {
  async execute({ token }) {
    try {
      const userInfo = await verifyToken(token);
      const user = await User.findOne({ id: userInfo.id });

      return { data: dumpUser(user) };
    } catch (error) {
      console.log(error);
      throw WRONG_TOKEN;
    }
  }
}

module.exports = SessionsCheck;
