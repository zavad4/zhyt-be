/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base                  = require('../Base');
const { User, Application } = require('../../models');
const { STATUSES }          = require('../../constants/users');
const { dumpUser }          = require('../../utils/dumps');
const {
  STATUSES: APPLICATION_STATUSES,
} = require('../../constants/applications');

const {
  ALREADY_EXISTS,
  PASSWORDS_NOT_EQUAL,
} = require('../../utils/errors');

class UsersCreate extends Base {
  async execute(data) {
    try {
      const { email, password, confirmPassword, first_name, last_name } = data;
      if (password !== confirmPassword) throw PASSWORDS_NOT_EQUAL;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw ALREADY_EXISTS({
          entity: 'User',
          fields: ['email'],
        });
      }

      const { id: application_id } = await Application.create({
        status: APPLICATION_STATUSES.PENDING,
      });

      const { id } = await User.create({
        email,
        first_name,
        last_name,
        password,
        status: STATUSES.BLOCKED,
        application_id,
      });

      return { data: dumpUser(await User.findOne({ id })) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = UsersCreate;
