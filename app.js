'use strict';
require("dotenv").config();
const { port } = require('./etc/config');
const PORT = process.env.A || 3000;

const app = require('../server');

const isDevMode = process.env.NODE_ENV === 'development'

const appConfig = {
  logger: isDevMode ?  { level: 'info', prettyPrint: true } : { level: 'warn' }
}

const app = require('fastify')(appConfig);

app.register(require('./lib/router'));

app.listen(port, '::', (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

module.exports = { build };