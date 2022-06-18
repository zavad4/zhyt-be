'use strict';
const controllers = require('../controllers');

const sesionsRoutes = [{
  method: 'POST',
  url: '/api/sessions',
  handler: controllers.sessions.create,
},
];

module.exports = sesionsRoutes;
