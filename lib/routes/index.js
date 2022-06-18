'use strict';
const users         = require('./users');
const sessions      = require('./sessions');
const applications  = require('./applications');
const transactions  = require('./transactions');

module.exports = [
  ...users,
  ...sessions,
  ...applications,
  ...transactions,
];
