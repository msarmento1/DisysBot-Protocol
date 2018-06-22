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

  if (data.flags === undefined) {
    throw Object({ error: 'validation error', reason: 'flags field is undefined' });
  }

  if (typeof data.flags !== 'number' || isNaN(data.flags)) { // eslint-disable-line
    throw Object({ error: 'validation error', reason: 'flags field is not a number' });
  }
};

const format = (data) => {
  validate(data);
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.GET_REPORT);
};

module.exports = {
  validate,
  format
};
