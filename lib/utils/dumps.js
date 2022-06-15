/* eslint-disable camelcase */
'use strict';

function dumpUser(data) {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    status: data.status,
    created: data.created,
    updated: data.updated,
  };
}

module.exports = {
  dumpUser,
};
