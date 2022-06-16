'use strict';
const Exception = require('../Exception');

module.exports = {
  NOT_EXISTS: ({ entity = 'Entity' }) => new Exception({
    code: `${entity.toUpperCase()}_NOT_EXISTS`,
    message: `${entity} does not exist`,
    fields: { },
  }),
  ALREADY_EXISTS: ({ entity = 'Entity', fields = [] }) => new Exception({
    code: `${entity.toUpperCase()}_ALREADY_EXISTS`,
    message: `${entity} already exists`,
    fields,
  }),
  USER_BLOCKED: () => new Exception({
    code: 'USER_BLOCKED',
    message: 'User is blocked',
    fields: [],
  }),
  PASSWORDS_NOT_EQUAL: () => new Exception({
    code: 'PASSWORDS_NOT_EQUAL',
    message: 'Passwords should be equal',
    fields: ['confirmPassword'],
  }),
};
