'use strict';
const { runService } = require('../ServiceRunner');
const Create         = require('../services/users/Create');
const Block          = require('../services/users/Block');
const Unblock        = require('../services/users/Unblock');

module.exports = {
  create: runService(Create, req => req.body),
  block:  runService(Block, req => req.params),
  unblock:  runService(Unblock, req => req.params),
};
