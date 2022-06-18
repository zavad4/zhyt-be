'use strict';
const Exception = require('../Exception');

module.exports = {
  NOT_EXISTS: ({ entity = 'Entity' }) => new Exception({
    code: `${entity.toUpperCase()}_NOT_EXISTS`,
    message: `${entity} does not exist`,
    fields: [],
  }),
  ALREADY_EXISTS: ({ entity = 'Entity', fields = [] }) => new Exception({
    code: `${entity.toUpperCase()}_ALREADY_EXISTS`,
    message: `${entity} already exists`,
    fields,
  }),
  USER_BLOCKED: new Exception({
    code: 'USER_BLOCKED',
    message: 'User is blocked',
    fields: [],
  }),
  WRONG_TOKEN: new Exception({
    code: 'WRONG_TOKEN',
    message: 'Wrong token',
    fields: ['token'],
  }),
  PASSWORDS_NOT_EQUAL: new Exception({
    code: 'PASSWORDS_NOT_EQUAL',
    message: 'Passwords should be equal',
    fields: ['confirmPassword'],
  }),
  AUTHENTICATION_FAILED: new Exception({
    code: 'AUTHENTICATION_FAILED',
    message: 'Authentication failed. Invalid credentials.',
    fields: ['email', 'password'],
  }),
  INSUFFICIENT_FUNDS: new Exception({
    code: 'INSUFFICIENT_FUNDS',
    message: 'Insufficient funds on your balance',
    fields: ['amount'],
  }),
};
