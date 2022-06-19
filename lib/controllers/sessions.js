'use strict';
const Create = require('../services/sessions/Create');
const Check  = require('../services/sessions/Check');
const {
  runService,
  runRequest,
  makeResponse,
} = require('../ServiceRunner');

module.exports = {
  create: runService(Create, req => req.body),
  async check(req, res, next) {
    const result = runRequest(Check, {
      params: { token: await req.headers['jwt'] },
    });

    try {
      const { data } = await result;

      req.session = {
        context: {
          userId: data.id,
          email: data.email,
        },
      };
      return next();
    } catch (error) {
      return makeResponse(req, res, result);
    }
  },
};
