'use strict';
const { runService } = require('../ServiceRunner');
const Create         = require('../services/users/Create');
const Block          = require('../services/users/Block');

module.exports = {
  create: runService(Create, req => req.body),
  block:  runService(Block, req => req.body),
};
