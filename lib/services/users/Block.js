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

class UsersBlock extends Base {
  async execute({ id }) {
    const user = await User.findOne({ id });
    if (!user) throw NOT_EXISTS({ entity: 'User' });

    await User.update(id, {
      status: STATUSES.BLOCKED,
    });


    return { data: dumpUser({ ...user, status: STATUSES.BLOCKED }) };
  }
}

module.exports = UsersBlock;
