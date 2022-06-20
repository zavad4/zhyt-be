/* eslint-disable new-cap */
'use strict';
const Base         = require('../Base');
const { User }     = require('../../models');
const { dumpUser } = require('../../utils/dumps');

class UsersList extends Base {
  async execute() {
    const users = await User.findAll();

    return { data: users.map(dumpUser) };
  }
}

module.exports = UsersList;
