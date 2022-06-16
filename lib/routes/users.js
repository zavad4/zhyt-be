'use strict';
const controllers = require('../controllers');

const userRoutes = [{
  method: 'POST',
  url: '/api/users',
  handler: controllers.users.create,
},
];

module.exports = userRoutes;
