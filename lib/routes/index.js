'use strict';
const users         = require('./users');
const applications  = require('./applications');

module.exports = [
  ...users,
  ...applications,
];
