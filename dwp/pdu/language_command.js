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

  if (data.languages === undefined || !Array.isArray(data.languages)) {
    throw Object({ error: 'validation error', reason: 'languages fields is invalid' });
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

  let pdu = {};

  if (data !== undefined) {
    pdu = extend(pdu, data);
  }

  const packet = JSON.stringify(pdu);

  return factory.encapsulate(packet, factory.Id.LANGUAGE_COMMAND);
};

module.exports = {
  validate,
  format
};
