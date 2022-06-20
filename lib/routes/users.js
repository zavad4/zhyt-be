'use strict';
const controllers = require('../controllers');
const schemas = require('../schemas');

const userRoutes = [{
  method: 'POST',
  url: '/api/users',
  schema: schemas.users.create,
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
