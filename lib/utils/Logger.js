'use strict';
const colors                               = require('colors');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;

colors.enabled = true;

const LEVELS = {
  SILENT: 'silent',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly',
};

const COLORS_BY_LEVEL = {
  [LEVELS.ERROR]: 'red',
  [LEVELS.WARN]: 'yellow',
  [LEVELS.INFO]: 'gray',
  [LEVELS.VERBOSE]: 'cyan',
  [LEVELS.DEBUG]: 'blue',
  [LEVELS.SILLY]: 'magenta',
};

const DEFAULT_LEVEL   = process.env.VERBOSE || LEVELS.INFO;
const IS_PLAIN_FORMAT = process.env.LOG_FORMAT === 'plain';

let   MAX_LABEL_LENGTH    = 0;
const MAX_LEVEL_LENGTH    = 7;
const COLOR_PREFIX_LENGTH = IS_PLAIN_FORMAT ? 10 : 0;

function addSpacesToEnd(text) {
  const fixedLength = MAX_LABEL_LENGTH + COLOR_PREFIX_LENGTH;

  return text.length > fixedLength ?
    text.slice(0, fixedLength) :
    `${text}${' '.repeat(fixedLength - text.length)}`;
}

function addSpacesToStart(text) {
  const fixedLength = MAX_LEVEL_LENGTH + COLOR_PREFIX_LENGTH;

  return text.length > fixedLength ?
    text.slice(0, fixedLength) :
    `${' '.repeat(fixedLength - text.length)}${text}`;
}

function formatObject(param) {
  let payload = param;

  if (typeof param === 'object') payload = `${JSON.stringify(param)}`;

  return payload;
}

function myFormatDev(service) {
  return printf(({ timestamp: time, level, message, ...meta }) => {
    const coloredLevel = addSpacesToStart(level[COLORS_BY_LEVEL[level]]);

    return `${time} ${coloredLevel}:` +
    `[ ${addSpacesToEnd(service.green)} ] ${formatObject(message, meta)}`;
  });
}


function table(tableData, dump) {
  if (process.env.VERBOSE === 'silent') return;
  if (Array.isArray(tableData)) {
    if (tableData.length) console.log('');
    if (tableData.length) console.table(tableData, dump);
  } else {
    console.log('');
    console.table([ tableData ], dump);
  }
}

function isSilent(service) {
  const {
    VERBOSE,
    LOUD_SERVICES,
    SILENT_SERVICES,
  } = process.env;

  if (VERBOSE === 'silent') return true;
  if (SILENT_SERVICES && SILENT_SERVICES.includes(service)) return true;
  if (LOUD_SERVICES && !LOUD_SERVICES.includes(service)) return true;

  return false;
}

function loggerManager(service = '', level = DEFAULT_LEVEL) {
  if (MAX_LABEL_LENGTH < service.length) MAX_LABEL_LENGTH = service.length;

  const logger = createLogger({
    label,
    level,
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5,
    },
    format: combine(
      timestamp({ format: 'DD/MM HH:mm:ss.SSS' }),
      myFormatDev(service),
    ),
    silent: isSilent(service),
    transports: [
      new transports.Console(),
    ],
  });

  logger.table = table;

  return logger;
}

module.exports.LEVELS = LEVELS;
module.exports.createLogger = loggerManager;
