'use strict';
const Create          = require('../services/admin_users/sessions/Create');
const Check           = require('../services/admin_users/sessions/Check');
const {
  runService,
  runRequest,
  makeResponse,
} = require('../ServiceRunner');

module.exports = {
  createSession: runService(Create, req => req.body),
  async checkSession(req, res, next) {
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
