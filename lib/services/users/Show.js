/* eslint-disable new-cap */
'use strict';
const Base         = require('../Base');
const { User }     = require('../../models');

const {
  NOT_EXISTS,
} = require('../../utils/errors');
const { dumpUser } = require('../../utils/dumps');

class UsersShow extends Base {
  async execute({ id }) {
    const user = await User.findOne({ id });
    if (!user) throw NOT_EXISTS({ entity: 'User' });


    return { data: dumpUser({ ...user }) };
  }
}

module.exports = UsersShow;
