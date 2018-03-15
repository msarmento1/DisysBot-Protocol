/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
/// /////////////////////////////////////////////

const factory = require('../factory')
const extend = require('util')._extend

var validate = function validate (data) {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' })
  }

  if (data.taskId === undefined) {
    throw Object({ error: 'validation error', reason: 'taskId field is undefined' })
  }

  if (data.exec === undefined) {
    throw Object({ error: 'validation error', reason: 'exec field is undefined' })
  }

  if (data.exec.file === undefined) {
    throw Object({ error: 'validation error', reason: 'exec.file field is undefined' })
  }

  if (data.exec.arguments === undefined) {
    throw Object({ error: 'validation error', reason: 'exec.arguments field is undefined' })
  }

  if (data.files === undefined) {
    throw Object({ error: 'validation error', reason: 'files field is undefined' })
  }
}

var format = function format (data) {
  validate(data)

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data)
  }

  const packet = JSON.stringify(pdu)

  return factory.encapsulate(packet, factory.Id.PERFORM_TASK)
}

module.exports = {
  validate: validate,
  format: format
}
