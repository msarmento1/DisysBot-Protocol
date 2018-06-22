/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');

const Command = {
  RESUME: 0,
  PAUSE: 1,
  STOP: 2
};

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' });
  }

  if (data.command === undefined) {
    throw Object({ error: 'validation error', reason: 'command field is undefined' });
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.PERFORM_COMMAND);
};

module.exports = {
  validate,
  format,
  Command
};
