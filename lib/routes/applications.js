'use strict';
const controllers = require('../controllers');

const applicationRoutes = [{
  method: 'GET',
  url: '/api/applications',
  preHandler: controllers.admins.checkSession,
  handler: controllers.applications.list,
},
{
  method: 'GET',
  url: '/api/applications/:id',
  preHandler: controllers.admins.checkSession,
  handler: controllers.applications.show,
},
{
  method: 'POST',
  url: '/api/applications/:id/accept',
  preHandler: controllers.admins.checkSession,
  handler: controllers.applications.accept,
},
{
  method: 'POST',
  url: '/api/applications/:id/decline',
  preHandler: controllers.admins.checkSession,
  handler: controllers.applications.decline,
},
];

module.exports = applicationRoutes;
