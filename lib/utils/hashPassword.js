'use strict';
const crypto      = require('crypto');
const { salt }    = require('../../etc/config');
const KEY_LENGTH  = 64;

function hashPassword(password) {
  const hash = crypto.scryptSync(
    password,
    salt,
    KEY_LENGTH);

  return hash.toString('hex');
}

module.exports = hashPassword;
