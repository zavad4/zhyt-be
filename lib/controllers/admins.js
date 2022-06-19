'use strict';
const Create          = require('../services/admin_users/sessions/Create');
const Check           = require('../services/admin_users/sessions/Check');
const {
  runService,
  runRequest,
} = require('../ServiceRunner');

module.exports = {
  createSession: runService(Create, req => req.body),
  async checkSession(req, res, next) {
    try {
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
