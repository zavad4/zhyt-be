/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base                = require('../Base');
const { Application }     = require('../../models');
const { dumpApplication } = require('../../utils/dumps');

class TransactionsList extends Base {
  async execute({ sender_id }) {
    const query = {};
    if (sender_id) query.sender_id = sender_id;
    const applications = await Application.find(query);

    return { data: applications.map(dumpApplication) };
  }
}

module.exports = TransactionsList;
