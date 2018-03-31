/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Matheus Medeiros Sarmento
//
/// /////////////////////////////////////////////

const getReport = require('./pdu/get_report')
const report = require('./pdu/report')
const performTask = require('./pdu/perform_task')
const performTaskResponse = require('./pdu/perform_task_response')
const taskResult = require('./pdu/task_result')
const terminateTask = require('./pdu/terminate_task')
const terminateTaskResponse = require('./pdu/terminate_task_response')
const performCommand = require('./pdu/perform_command')
const languageSupport = require('./pdu/language_support')
const extend = require('util')._extend

// Protocol Version
const VERSION = "1.0"

const Id = {
  GET_REPORT: 0,
  REPORT: 1,
  PERFORM_TASK: 2,
  PERFORM_TASK_RESPONSE: 3,
  TASK_RESULT: 4,
  TERMINATE_TASK: 5,
  TERMINATE_TASK_RESPONSE: 6,
  PERFORM_COMMAND: 7,
  LANGUAGE_SUPPORT: 8
}

module.exports.Id = Id

module.exports.validate = function (pdu) {
  if (pdu.header.id === undefined) {
    throw Object({ error: 'validation error', reason: 'pdu id is undefined' })
  }

  switch (pdu.header.id) {
    case Id.GET_REPORT:
      getReport.validate(pdu)
      break

    case Id.REPORT:
      report.validate(pdu)
      break

    case Id.PERFORM_TASK:
      performTask.validate(pdu)
      break

    case Id.PERFORM_TASK_RESPONSE:
      performTaskResponse.validate(pdu)
      break

    case Id.TASK_RESULT:
      taskResult.validate(pdu)
      break

    case Id.TERMINATE_TASK:
      terminateTask.validate(pdu)
      break

    case Id.TERMINATE_TASK_RESPONSE:
      terminateTaskResponse.validate(pdu)
      break

    case Id.PERFORM_COMMAND:
      performCommand.validate(pdu)
      break

    case Id.LANGUAGE_SUPPORT:
      languageSupport.validate(pdu)
      break

    default:
      throw Object({ error: 'validation error', reason: 'pdu id is invalid' })
  }
}

const BEGIN_TAG = '/BEGIN/'
const END_TAG = '/END/'

module.exports.encapsulate = function (packet, id) {
  packet = JSON.stringify(extend(JSON.parse(packet), {
    header: {
      id: id,
      date: new Date(),
      version: VERSION
    }
  }))

  return BEGIN_TAG + packet + END_TAG
}

module.exports.expose = function (packet) {
  var response = {}

  var beginIndex = packet.search(BEGIN_TAG)

  if (beginIndex === -1) {
    throw Object({ error: 'expose error', reason: 'begin tag was not found' })
  }

  var endIndex = packet.search(END_TAG, beginIndex)

  if (endIndex === -1) {
    throw Object({ error: 'expose error', reason: 'end tag was not found' })
  }

  return packet.substring(beginIndex + BEGIN_TAG.length, endIndex)
}

/*
 * Removes first occurrence of DWP packet
*/
module.exports.remove = function (packet) {
  var beginIndex = packet.search(BEGIN_TAG)

  if (beginIndex === -1) {
    throw Object({ error: 'remove error', reason: 'begin tag was not found' })
  }

  var endIndex = packet.search(END_TAG, beginIndex)

  if (endIndex === -1) {
    throw Object({ error: 'remove error', reason: 'end tag was not found' })
  }

  return packet.replace(packet.substring(beginIndex, endIndex + END_TAG.length), '')
}
