'use strict';
const jwt                         = require('jsonwebtoken');
const { sessionDuration, secret } = require('../../etc/config');
const { User, AdminUser }         = require('../models');
const {
  WRONG_TOKEN,
} = require('../utils/errors');

function generateToken(user, isAdmin = false) {
  const combinedSecret = user.password ?
    secret + user.password :
    secret;

  const tokenData = { id: user.id, email: user.email, isAdmin };

  return jwt.sign(tokenData, combinedSecret, {
    expiresIn: sessionDuration,
  });
}

async function verifyToken(token) {
  try {
    const data = jwt.decode(token);

    const model = data.isAdmin ? AdminUser : User;
    const user = await model.findOne({ id: data.id });
    if (!user) throw WRONG_TOKEN;

    const combinedSecret = user.password ?
      secret + user.password :
      secret;

    return jwt.verify(token, combinedSecret);
  } catch (error) {
    console.log(error);
    throw WRONG_TOKEN;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
