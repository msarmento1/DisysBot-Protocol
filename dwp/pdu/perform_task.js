/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');
const extend = require('util')._extend;

const validate = (payload) => {
  if (payload === undefined) {
    throw Object({ error: 'validation error', reason: 'payload was not set' });
  }

  if (payload.task === undefined) {
    throw Object({ error: 'validation error', reason: 'task field is undefined' });
  }

  if (payload.task.id === undefined) {
    throw Object({ error: 'validation error', reason: 'task.id field is undefined' });
  }

  if (payload.commandLine === undefined) {
    throw Object({ error: 'validation error', reason: 'commandLine field is undefined' });
  }

  if (payload.files === undefined) {
    throw Object({ error: 'validation error', reason: 'files field is undefined' });
  }
};

const format = (payload) => {
  validate(payload);

  let pdu = {};

  if (payload !== undefined) {
    pdu = extend(pdu, payload);
  }

  const packet = JSON.stringify(pdu);

  return factory.encapsulate(packet, factory.Id.PERFORM_TASK);
};

module.exports = {
  validate,
  format
};
