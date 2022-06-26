'use strict';
const { runService } = require('../ServiceRunner');
const Create         = require('../services/users/Create');
const List           = require('../services/users/List');
const Show           = require('../services/users/Show');
const Block          = require('../services/users/Block');
const Unblock        = require('../services/users/Unblock');

module.exports = {
  create: runService(Create, req => req.body),
  list: runService(List, req => req.query),
  show:  runService(Show, req => req.params),
  block:  runService(Block, req => req.params),
  unblock:  runService(Unblock, req => req.params),
};
