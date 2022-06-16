/* eslint-disable camelcase */
'use strict';

function dumpUser(data) {
  return {
    id: data.id,
    application_id: data.application_id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    status: data.status,
    created: data.created,
    updated: data.updated,
  };
}

function dumpApplication(data) {
  return {
    id: data.id,
    status: data.status,
    created: data.created,
    updated: data.updated,
  };
}

module.exports = {
  dumpUser,
  dumpApplication,
};
