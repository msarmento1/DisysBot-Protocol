/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
/// /////////////////////////////////////////////

const factory = require('../factory')
const extend = require('util')._extend

const ReturnCode = {
  SUCCESS: 0,
  ERROR: 1
}

var validate = function validate(data) {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' })
  }

  if (data.task === undefined) {
    throw Object({ error: 'validation error', reason: 'task field is undefined' })
  }

  if (data.task.id === undefined) {
    throw Object({ error: 'validation error', reason: 'task.id field is undefined' })
  }

  if (data.code === undefined) {
    throw Object({ error: 'validation error', reason: 'code field is undefined' })
  }

  if (data.output === undefined) {
    throw Object({ error: 'validation error', reason: 'output field is undefined' })
  }
}

var format = function format(data) {
  validate(data)

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data)
  }

  const packet = JSON.stringify(pdu)

  return factory.encapsulate(packet, factory.Id.TASK_RESULT)
}

module.exports = {
  validate: validate,
  format: format,
  ResultCode: ResultCode
}
