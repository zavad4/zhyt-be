'use strict';
const controllers = require('../controllers');

const userRoutes = [{
  method: 'POST',
  url: '/api/users',
  handler: controllers.users.create,
},
{
  method: 'POST',
  url: '/api/users/:id/block',
  preHandler: controllers.admins.checkSession,
  handler: controllers.users.block,
},
];

module.exports = userRoutes;
