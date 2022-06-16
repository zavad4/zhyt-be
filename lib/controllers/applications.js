'use strict';
const { runService } = require('../ServiceRunner');
const Accept = require('../services/applications/Accept');
const Decline = require('../services/applications/Decline');

module.exports = {
  accept: runService(Accept, req =>  req.params),
  decline: runService(Decline, req => req.params),
};
