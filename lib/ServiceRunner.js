/* eslint-disable consistent-return */
'use strict';
const Exception        = require('./Exception');
const hideSecureData = require('./utils/hideSecureData');
const { createLogger } = require('./utils/Logger');

async function runRequest(ServiceClass, { context = {}, params = {}, logger }) {
  function logRequest(type, data, startTime) {
    const payload = { runtime: Date.now() - startTime };

    if (data.params) payload.params = data.params;
    if (data.result) payload.result = data.result;
    if (data.error) payload.error = data.error;

    logger[type](JSON.stringify(payload));
  }

  const startTime = Date.now();

  try {
    const useCase = new ServiceClass({ context });

    useCase.logger = logger;
    logRequest('info', { params: hideSecureData(params) }, startTime);

    const result = await useCase.run(params);
    logRequest('info', { result }, startTime);

    return result;
  } catch (error) {
    const type = error instanceof Exception ? 'warn' : 'error';

    logRequest(type, { error }, startTime);

    throw error;
  }
}

function copyJSON(data) {
  return JSON.parse(JSON.stringify(data));
}

function runService(
  serviceClass,
  paramsBuilder  = () => ({}),
  contextBuilder = req => copyJSON(
    req.session && req.session.context ?
      req.session.context :
      {}),
) {
  const logger = createLogger(serviceClass.name);

  return async function useCaseRunner(req, res) {

    const resultPromise = runRequest(serviceClass, {
      logger,
      params: paramsBuilder(req, res),
      context: contextBuilder(req, res),
    });

    return makeResponse(req, res, resultPromise, logger);
  };
}

async function makeResponse(req, res, promise, logger) {
  try {
    const data = await promise;

    data.status = 1;

    return res.send(data);
  } catch (error) {
    if (error instanceof Exception) {
      res.send({
        status: 0,
        error: error.toSend(),
      });
    } else {
      logger.error(JSON.stringify(
        { 'REQUEST_URL': req.url, 'REQUEST_BODY': req.body },
      ));

      res.send({
        status: 0,
        error: {
          code: 'SERVER_ERROR',
          message: 'It is server error. Something went wrong :(.',
        },
      });
    }
  }
}

module.exports = {
  runRequest,
  runService,
  makeResponse,
};
