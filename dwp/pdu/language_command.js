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

  if (data.languages === undefined) {
    throw Object({ error: 'validation error', reason: 'languages field is undefined' });
  }

  if (!Array.isArray(data.languages)) {
    throw Object({ error: 'validation error', reason: 'languages field is not an array' });
  }

  const { length } = data.languages;
  for (let i = 0; i < length; i += 1) {
    if (data.languages[i].name === undefined) {
      throw Object({ error: 'validation error', reason: 'name field of a language is undefined' });
    }

    // command can be undefined
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.LANGUAGE_COMMAND);
};

module.exports = {
  validate,
  format
};
