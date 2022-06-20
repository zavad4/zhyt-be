'use strict';
const { runService } = require('../ServiceRunner');
const Create         = require('../services/transactions/Create');
const List           = require('../services/transactions/List');
const Show           = require('../services/transactions/Show');

module.exports = {
  create: runService(Create, req =>  req.body),
  list: runService(List, req =>  req.query),
  show: runService(Show, req =>  req.params),
};
