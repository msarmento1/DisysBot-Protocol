/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');

const ReturnCode = {
  EXECUTING: 0,
  DENIED: 1
};

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'data was not set' });
  }

  if (data.task === undefined) {
    throw Object({ error: 'validation error', reason: 'task field is undefined' });
  }

  if (data.task.id === undefined) {
    throw Object({ error: 'validation error', reason: 'task.id field is undefined' });
  }

  if (data.code === undefined) {
    throw Object({ error: 'validation error', reason: 'code field is undefined' });
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.PERFORM_TASK_RESPONSE);
};

module.exports = {
  validate,
  format,
  ReturnCode
};
