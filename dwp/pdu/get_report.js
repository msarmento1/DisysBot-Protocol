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

  if (data.flags === undefined) {
    throw Object({ error: 'validation error', reason: 'flags field is undefined' })
  }
}

var format = function format (data) {
  validate(data)

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data)
  }

  const packet = JSON.stringify(pdu)

  return factory.encapsulate(packet, factory.Id.GET_REPORT)
}

module.exports = {
  validate: validate,
  format: format
}
