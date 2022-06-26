'use strict';
// require('dotenv').config();
const { port } = require('./etc/config');
const routes   = require('./lib/routes');
const { createLogger } = require('./lib/utils/Logger');

// const appConfig = {
//   logger: { level: 'info', prettyPrint: true },
// };

const app = require('fastify')();

// health check route
app.get('/', (req, reply) => {
  reply.send({ message: 'It is zhyt-be' });
});

// reqister routes
routes.forEach(route => {
  app.route(route);
});

// Run the server!
app.listen(port, 'localhost', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  const logger = createLogger('app');
  logger.info(`zhyt-be starting at ${address}`);
});
