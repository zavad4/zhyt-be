/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
const Base                = require('../Base');
const { Transaction }     = require('../../models');
const { dumpTransaction } = require('../../utils/dumps');

class TransactionsList extends Base {
  async execute({ sender_id }) {
    const query = {};
    if (sender_id) query.sender_id = sender_id;
    const transactions = await Transaction.find(query);

    return { data: transactions.map(dumpTransaction) };
  }
}

module.exports = TransactionsList;
