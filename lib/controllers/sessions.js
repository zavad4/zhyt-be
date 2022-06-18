'use strict';
const { runService, runRequest } = require('../ServiceRunner');
const Create                     = require('../services/sessions/Create');
const Check                      = require('../services/sessions/Check');

module.exports = {
  create: runService(Create, req => req.body),
  async check(req, res, next) {
    const { data } = await runRequest(Check, {
      params: { token: await req.headers['jwt'] },
    });

    req.session = {
      context: {
        userId: data.id,
        email: data.email,
      },
    };
    return next();
  },
};
