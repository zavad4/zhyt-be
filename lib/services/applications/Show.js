/* eslint-disable new-cap */
'use strict';
const Base            = require('../Base');
const { Application } = require('../../models');

const {
  NOT_EXISTS,
} = require('../../utils/errors');
const { dumpApplication } = require('../../utils/dumps');

class ApplicationsShow extends Base {
  async execute({ id }) {
    const application = await Application.findOne({ id });
    if (!application) throw NOT_EXISTS({ entity: ' Applications' });


    return { data: dumpApplication({ ...application }) };
  }
}

module.exports = ApplicationsShow;
