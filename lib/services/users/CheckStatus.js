/* eslint-disable camelcase */
'use strict';
const Base         = require('../Base');
const { User }     = require('../../models');
const { STATUSES } = require('../../constants/users');

const {
  USER_BLOCKED,
} = require('../../utils/errors');
const { dumpUser } = require('../../utils/dumps');

class UsersCheckStatus extends Base {
  async execute({ id }) {
    console.log('**********************************');
    const user = await User.findOne({ id });
    console.log('BEFOOOOOOOOOOOOOOOOOOOOOOORE');
    if (user.status === STATUSES.BLOCKED) throw USER_BLOCKED;
    console.log('AFTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER');

    return { data: dumpUser(user) };
  }
}

module.exports = UsersCheckStatus;
