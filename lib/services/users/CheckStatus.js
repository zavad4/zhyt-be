/* eslint-disable camelcase */
/* eslint-disable new-cap */
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
    const user = await User.findOne({ id });
    if (user.status === STATUSES.BLOCKED) throw USER_BLOCKED();


    return { data: dumpUser(await User.findOne({ id })) };
  }
}

module.exports = UsersCheckStatus;
