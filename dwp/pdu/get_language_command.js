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

  if (data.names === undefined) {
    throw Object({ error: 'validation error', reason: 'names field is undefined' });
  }

  if (!Array.isArray(data.names)) {
    throw Object({ error: 'validation error', reason: 'names field is not an array' });
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.GET_LANGUAGE_COMMAND);
};

module.exports = {
  validate,
  format
};
