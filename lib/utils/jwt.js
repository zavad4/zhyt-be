'use strict';
const knex                        = require('knex');
const jwt                         = require('jsonwebtoken');
// const X                           = require('chista/Exception').default;
// const MobileUser                  = require('../../models/MobileUser');
const { sessionDuration, secret } = require('../../etc/config');

const USERS_TABLE_NAME = 'users';

function generateToken(user) {
  const combinedSecret = user.passwordHash ?
    secret + user.passwordHash :
    secret;

  const tokenData = { id: user.id, email: user.email };

  return jwt.sign(tokenData, combinedSecret, {
    expiresIn: sessionDuration,
  });
}

async function verifyToken(token) {
  try {
    const data = jwt.decode(token);
    const user = await knex(USERS_TABLE_NAME).where('id', data.id);
    console.log({ user });

    if (!user) {
    //   throw new X({
    //     code: 'WRONG_TOKEN',
    //     fields: { token: 'WRONG_ID' },
    //   });
    }
    const combinedSecret = user.passwordHash ?
      secret + user.passwordHash :
      secret;

    return jwt.verify(token, combinedSecret);
  } catch (error) {
    console.log(error);
    throw error;
    //     if (error instanceof X) throw error;

    //     throw new X({
    //       code: 'WRONG_TOKEN',
    //       fields: { token: 'WRONG_TOKEN' },
    //     });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};

const token = generateToken({ id: 1, email: 'aaa@test,com' });
console.log({ token });
(async () => verifyToken(token))();
