/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');

const ReturnCode = {
  SUCCESS: 0,
  ERROR: 1
};

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' });
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

  if (data.output === undefined) {
    throw Object({ error: 'validation error', reason: 'output field is undefined' });
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.TASK_RESULT);
};

module.exports = {
  validate,
  format,
  ReturnCode
};
