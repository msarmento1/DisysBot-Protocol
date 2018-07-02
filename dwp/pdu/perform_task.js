/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');

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

  if (data.commandLine === undefined) {
    throw Object({ error: 'validation error', reason: 'commandLine field is undefined' });
  }

  if (data.files === undefined) {
    throw Object({ error: 'validation error', reason: 'files field is undefined' });
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.PERFORM_TASK);
};

module.exports = {
  validate,
  format
};
