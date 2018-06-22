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
      throw Object({ error: 'validation error', reason: 'resource field is undefined with RESOURCE flag set' });
    }

    if (data.resource.cpu === undefined) {
      throw Object({ error: 'validation error', reason: 'resource.cpu field is undefined' });
    }

    if (data.resource.memory === undefined) {
      throw Object({ error: 'validation error', reason: 'resource.memory field is undefined' });
    }
  }

  if (data.flags & Flags.STATE) {
    if (data.state === undefined) {
      throw Object({ error: 'validation error', reason: 'state field is undefined with STATE flag set' });
    }

    if (data.state !== WorkerState.EXECUTING && data.state !== WorkerState.PAUSED) {
      throw Object({ error: 'validation error', reason: `state field has an invalid ${data.state} value` });
    }
  }

  if (data.flags & Flags.TASKS) {
    if (data.tasks === undefined) {
      throw Object({ error: 'validation error', reason: 'tasks field is undefined with TASKS flag set' });
    }
  }

  if (data.flags & Flags.SUPPORTED_LANGUAGES) {
    if (data.languages === undefined) {
      throw Object({ error: 'validation error', reason: 'languages field is undefined with SUPPORTED_LANGUAGES set' });
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
