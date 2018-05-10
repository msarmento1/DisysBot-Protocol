/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');
const extend = require('util')._extend;
const { Flags } = require('../common');

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' });
  }

  if (data.flags === undefined) {
    throw Object({ error: 'validation error', reason: 'reportData field is undefined' });
  }

  if (data.flags & Flags.RESOURCE) {
    if (data.resource === undefined) {
      throw Object({ error: 'validation error', reason: 'resource is undefined' });
    }

    if (data.resource.cpu === undefined) {
      throw Object({ error: 'validation error', reason: 'cpu field is undefined' });
    }

    if (data.resource.memory === undefined) {
      throw Object({ error: 'validation error', reason: 'memory field is undefined' });
    }
  }

  if (data.flags & Flags.STATE) {
    if (data.state === undefined) {
      throw Object({ error: 'validation error', reason: 'state is undefined' });
    }
  }

  if (data.flags & Flags.TASKS) {
    if (data.tasks === undefined) {
      throw Object({ error: 'validation error', reason: 'tasks is undefined' });
    }
  }

  if (data.flags & Flags.SUPPORTED_LANGUAGES) {
    if (data.languages === undefined) {
      throw Object({ error: 'validation error', reason: 'languages is undefined' });
    }
  }
};

const format = (data) => {
  validate(data);

  let pdu = {};

  if (data !== undefined) {
    pdu = extend(pdu, data);
  }

  const packet = JSON.stringify(pdu);

  return factory.encapsulate(packet, factory.Id.REPORT);
};

module.exports = {
  validate,
  format
};
