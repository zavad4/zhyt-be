'use strict';
const { runService, runRequest } = require('../ServiceRunner');
const Create                     = require('../services/sessions/Create');
const Check                      = require('../services/sessions/Check');
const CheckUserStatus            = require('../services/users/CheckStatus');

module.exports = {
  create: runService(Create, req => req.body),
  async check(req, res, next) {
    try {
      const { data } = await runRequest(Check, {
        params: { token: await req.headers['jwt'] },
      });

      await runRequest(CheckUserStatus, {
        params: { id: data.id },
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
