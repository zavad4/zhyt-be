/* eslint-disable new-cap */
'use strict';
const Base            = require('../Base');
const { Transaction } = require('../../models');

const {
  NOT_EXISTS,
} = require('../../utils/errors');
const { dumpTransaction } = require('../../utils/dumps');

class TransactionsShow extends Base {
  async execute({ id }) {
    const transaction = await Transaction.findOne({ id });
    if (!transaction) throw NOT_EXISTS({ entity: 'Transaction' });


    return { data: dumpTransaction({ ...transaction }) };
  }
}

module.exports = TransactionsShow;
