/* eslint-disable new-cap */
/* eslint-disable camelcase */
'use strict';
const Base         = require('../Base');
const { User }     = require('../../models');
const { STATUSES } = require('../../constants/users');

const {
  NOT_EXISTS,
} = require('../../utils/errors');
const { dumpUser } = require('../../utils/dumps');

class UsersUnblock extends Base {
  async execute(data) {
    const { id } = data;
    const user = await User.findOne({ id });
    if (!user) throw NOT_EXISTS({ entity: 'User' });

    await User.update(id, {
      status: STATUSES.ENABLED,
    });


    return { data: dumpUser({ ...user, status: STATUSES.ENABLED }) };
  }
}

module.exports = UsersUnblock;
