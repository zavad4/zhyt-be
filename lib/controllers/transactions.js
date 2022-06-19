'use strict';
const { runService } = require('../ServiceRunner');
const Create         = require('../services/transactions/Create');


module.exports = {
  create: runService(Create, req =>  req.body),
};
