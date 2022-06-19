'use strict';
const controllers = require('../controllers');

const transactionRoutes = [{
  method: 'POST',
  url: '/api/transactions',
  preHandler: controllers.sessions.check,
  handler: controllers.transactions.create,
},
];

module.exports = transactionRoutes;
