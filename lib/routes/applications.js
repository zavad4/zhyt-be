'use strict';
const controllers = require('../controllers');

const applicationRoutes = [{
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
