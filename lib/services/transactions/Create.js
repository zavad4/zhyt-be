/* eslint-disable camelcase */
/* eslint-disable new-cap */
'use strict';
// const knex                  = require('../../../dbConnection');
const Base                  = require('../Base');
const { User, Transaction } = require('../../models');
const { dumpTransaction }   = require('../../utils/dumps');

const {
  NOT_EXISTS,
  INSUFFICIENT_FUNDS,
} = require('../../utils/errors');

class TransactionsCreate extends Base {
  async execute(data) {
    try {
      const sender_id = this.context.userId;
      const { recipient_id, amount } = data;

      const sender = await User.findOne({ id: sender_id });
      if (!sender) throw NOT_EXISTS({ entity: 'Sender' });

      const recipient = await User.findOne({ id: recipient_id });
      if (!recipient) throw NOT_EXISTS({ entity: 'Recipient' });

      if (+sender.balance < +amount) throw INSUFFICIENT_FUNDS;
      // const transaction = await knex.transaction();

      sender.balance -= amount;
      recipient.balance += amount;

      await User.update(sender_id, {
        balance: sender.balance,
      });

      await User.update(recipient_id, {
        balance: recipient.balance,
      });

      const { id } = await Transaction.create({
        sender_id,
        recipient_id,
        amount,
      });

      return { data: dumpTransaction(await Transaction.findOne({ id })) };
    } catch (error) {
      // rollback
      console.log(error);
      throw error;
    }
  }
}

module.exports = TransactionsCreate;
