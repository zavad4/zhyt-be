'use strict';
const controllers = require('../controllers');

const transactionRoutes = [{
  method: 'POST',
  url: '/api/transactions',
  preHandler: controllers.sessions.check,
  handler: controllers.transactions.create,
},
{
  method: 'GET',
  url: '/api/transactions',
  preHandler: controllers.sessions.check,
  handler: controllers.transactions.list,
},
{
  method: 'GET',
  url: '/api/transactions/:id',
  preHandler: controllers.sessions.check,
  handler: controllers.transactions.show,
},
];

module.exports = transactionRoutes;
