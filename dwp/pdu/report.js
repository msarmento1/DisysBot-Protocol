/*
 *
 * Copyright (c) 2017 Matheus Medeiros Sarmento
 *
 */

const factory = require('../factory');
const { Flags, WorkerState } = require('../common');

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' });
  }

  if (data.flags === undefined) {
    throw Object({ error: 'validation error', reason: 'flags field is undefined' });
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

    if (data.state !== WorkerState.EXECUTING && data.state !== WorkerState.PAUSED) {
      throw Object({ error: 'validation error', reason: 'state is not valid' });
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
  const packet = JSON.stringify(data);
  return factory.encapsulate(packet, factory.Id.REPORT);
};

module.exports = {
  validate,
  format
};
