/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
/// /////////////////////////////////////////////

const factory = require('../factory')
const extend = require('util')._extend
const Flags = require('../common').Flags

var validate = function validate (data) {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' })
  }

  if (data.flags === undefined) {
    throw Object({ error: 'validation error', reason: 'reportData field is undefined' })
  }

  if (data.flags & Flags.RESOURCE) {
    if (data.resource === undefined) {
      throw Object({ error: 'validation error', reason: 'resource is undefined' })
    }

    if (data.resource.cpu === undefined) {
      throw Object({ error: 'validation error', reason: 'cpu field is undefined' })
    }

    if (data.resource.memory === undefined) {
      throw Object({ error: 'validation error', reason: 'memory field is undefined' })
    }
  }

  if (data.flags & Flags.STATE) {
    if (data.state === undefined) {
      throw Object({ error: 'validation error', reason: 'state is undefined' })
    }
  }

  if (data.flags & Flags.TASKS) {
    if (data.tasks === undefined) {
      throw Object({ error: 'validation error', reason: 'tasks is undefined' })
    }
  }
}

var format = function format (data) {
  validate(data)

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data)
  }

  const packet = JSON.stringify(pdu)

  return factory.encapsulate(packet, factory.Id.REPORT)
}

module.exports = {
  validate: validate,
  format: format
}
