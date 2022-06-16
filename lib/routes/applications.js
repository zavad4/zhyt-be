'use strict';
const controllers = require('../controllers');

const applicationRoutes = [{
  method: 'POST',
  url: '/api/applications/:id/accept',
  handler: controllers.applications.accept,
},
{
  method: 'POST',
  url: '/api/applications/:id/decline',
  handler: controllers.applications.decline,
},
];

module.exports = applicationRoutes;
