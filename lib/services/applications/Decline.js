/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base            = require('../Base');
const { Application } = require('../../models');
const { STATUSES }     = require('../../constants/applications');

const {
  NOT_EXISTS,
} = require('../../utils/errors');
const { dumpApplication } = require('../../utils/dumps');

class ApplicationAccept extends Base {
  async execute({ id }) {
    try {
      const application = await Application.findOne({ id });
      if (!application) throw NOT_EXISTS({ entity: 'Application' });

      await Application.update(id, { status: STATUSES.DECLINED });

      return { data: dumpApplication(await Application.findOne({ id })) };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ApplicationAccept;
