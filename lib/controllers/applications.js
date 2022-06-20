'use strict';
const { runService } = require('../ServiceRunner');

const List    = require('../services/applications/List');
const Show    = require('../services/applications/Show');
const Accept  = require('../services/applications/Accept');
const Decline = require('../services/applications/Decline');

module.exports = {
  list: runService(List, req =>  req.query),
  show: runService(Show, req => req.params),
  accept: runService(Accept, req =>  req.params),
  decline: runService(Decline, req => req.params),
};
