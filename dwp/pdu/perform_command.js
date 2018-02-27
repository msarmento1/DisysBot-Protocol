/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
/// /////////////////////////////////////////////

const factory = require('../factory')
const extend = require('util')._extend

const Command = {
  RESUME: 0,
  PAUSE: 1,
  STOP: 2
}

var validate = function validate (data) {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' })
  }

  if (data.command === undefined) {
    throw Object({ error: 'validation error', reason: 'command field is undefined' })
  }
}

var format = function format (data) {
  validate(data)

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data)
  }

  const packet = JSON.stringify(pdu)

  return factory.encapsulate(packet, factory.Id.PERFORM_COMMAND)
}

module.exports = {
  validate: validate,
  format: format,
  Command: Command
}
