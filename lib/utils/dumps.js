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
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

function dumpApplication(data) {
  return {
    id: data.id,
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

function dumpTransaction(data) {
  return {
    id: data.id,
    sender_id: data.sender_id,
    recipient_id: data.recipient_id,
    amount: data.amount,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

module.exports = {
  dumpUser,
  dumpApplication,
  dumpTransaction,
};
