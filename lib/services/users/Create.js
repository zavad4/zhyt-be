'use strict';
const { User } = require('../../models');
async function UsersCreate(data, res) {
  const user = await User.create(data);
  res.json({
    status: 1,
    data: user,
  });
}

module.exports = UsersCreate;
