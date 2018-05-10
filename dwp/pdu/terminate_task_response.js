/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');
const extend = require('util')._extend;

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' });
  }

  if (data.taskId === undefined) {
    throw Object({ error: 'validation error', reason: 'taskId field is undefined' });
  }

  if (data.code === undefined) {
    throw Object({ error: 'validation error', reason: 'code field is undefined' });
  }
};

const format = (data) => {
  validate(data);

  let pdu = {};

  if (data !== undefined) {
    pdu = extend(pdu, data);
  }

  const packet = JSON.stringify(pdu);

  return factory.encapsulate(packet, factory.Id.TERMINATE_TASK_RESPONSE);
};

module.exports = {
  validate,
  format
};
