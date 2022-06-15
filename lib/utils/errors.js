'use strict';
const Exception = require('../Exception');

module.exports = {
  NOT_EXISTS: ({ entity = 'Entity' }) => new Exception({
    code: `${entity.toUpperCase}_NOT_EXISTS`,
    message: `${entity} does not exist`,
    fields: { },
  }),
  ALREADY_EXISTS: ({ entity = 'Entity', fields = [] }) => new Exception({
    code: `${entity.toUpperCase}_ALREADY_EXISTS`,
    message: `${entity} already exists`,
    errors: fields.map(field => ({
      uri: `#/${field}`,
      message: `${field} already exists`,
    })),
  }),
  PASSWORDS_NOT_EQUAL: () => new Exception({
    code: 'PASSWORDS_NOT_EQUAL',
    message: 'Passwords should be equal',
    fields: { confirmPassword: 'PASSWORDS_NOT_EQUAL' },
  }),
};
