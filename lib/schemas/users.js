/* eslint-disable camelcase */
'use strict';
const createUserShema = {
  body: {
    type: 'object',
    required: [
      'email',
      'first_name',
      'last_name',
      'password',
      'confirmPassword'],
    properties: {
      email: { type: 'string', nullable: false },
      first_name: { type: 'string', nullable: false },
      last_name: { type: 'string', nullable: false },
      password: { type: 'string', nullable: false },
      confirmPassword: { type: 'string', nullable: false },
    },
  },
};

const userSchemas = {
  create: createUserShema,
};
module.exports = userSchemas;
