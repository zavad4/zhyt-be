/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base                  = require('../Base');
const { User, Application } = require('../../models');
const { STATUSES }          = require('../../constants/users');
const {
  STATUSES: APPLICATION_STATUSES,
} = require('../../constants/applications');

const {
  NOT_EXISTS,
} = require('../../utils/errors');
const { dumpApplication } = require('../../utils/dumps');

class ApplicationAccept extends Base {
  async execute({ id }) {
    try {
      const application = await Application.findOne({ id });
      if (!application) throw NOT_EXISTS({ entity: 'Application' });

      await Application.update(id, { status: APPLICATION_STATUSES.ACCEPTED });
      const user = await User.findOne({ application_id: id });
      await User.update(user.id, { status: STATUSES.ENABLED });

      return { data: dumpApplication(await Application.findOne({ id })) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ApplicationAccept;
