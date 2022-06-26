'use strict';
const controllers = require('../controllers');

const adminSessionsRoutes = [{
  method: 'POST',
  url: '/api/admin/sessions',
  handler: controllers.admins.createSession,
},
];

module.exports = adminSessionsRoutes;
