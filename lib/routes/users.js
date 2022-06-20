'use strict';
const controllers = require('../controllers');

const userRoutes = [{
  method: 'POST',
  url: '/api/users',
  handler: controllers.users.create,
},
{
  method: 'GET',
  url: '/api/users',
  preHandler: controllers.sessions.check,
  handler: controllers.users.list,
},
{
  method: 'GET',
  url: '/api/users/:id',
  preHandler: controllers.sessions.check,
  handler: controllers.users.show,
},
{
  method: 'POST',
  url: '/api/users/:id/block',
  preHandler: controllers.admins.checkSession,
  handler: controllers.users.block,
},
{
  method: 'POST',
  url: '/api/users/:id/unblock',
  preHandler: controllers.admins.checkSession,
  handler: controllers.users.unblock,
},
];

module.exports = userRoutes;
