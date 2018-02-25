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
const extend = require('util')._extend

const Id = {
  GET_REPORT: 0,
  REPORT: 1,
  PERFORM_TASK: 2,
  PERFORM_TASK_RESPONSE: 3,
  TASK_RESULT: 4,
  TERMINATE_TASK: 5,
  TERMINATE_TASK_RESPONSE: 6,
  PERFORM_COMMAND: 7
}

module.exports.Id = Id

module.exports.validate = function (pdu) {
  if (pdu.header.id === undefined) {
    throw Object({ error: 'validation error', reason: 'pdu id is undefined' })
  }

  switch (pdu.header.id) {
    case Id.GETREPORT:
      getReport.validate(pdu)
      break

    case Id.REPORT:
      report.validate()
      break

    case Id.PERFORM_TASK:
      performTask.validate()
      break

    case Id.PERFORM_TASK_RESPONSE:
      performTaskResponse.validate()
      break

    case Id.TASK_RESULT:
      taskResult.validate()
      break

    case Id.TERMINATE_TASK:
      terminateTask.validate()
      break

    case Id.TERMINATE_TASK_RESPONSE:
      terminateTaskResponse.validate()
      break

    case Id.PERFORM_COMMAND:
      performCommand.validate()
      break

    default:
      throw Object({ error: 'validation error', reason: 'pdu id is invalid' })
  }
}

const beginTag = '/BEGIN/'
const endTag = '/END/'

module.exports.encapsulate = function (packet, id) {
  packet = JSON.stringify(extend(JSON.parse(packet), {
    header: {
      id: id,
      date: new Date()
    }
  }))

  return beginTag + packet + endTag
}

module.exports.expose = function (packet) {
  var response = {}

  var beginIndex = packet.search(beginTag)

  if (beginIndex === -1) {
    throw Object({ error: 'expose error', reason: 'begin tag was not found' })
  }

  var endIndex = packet.search(endTag, beginIndex)

  if (endIndex === -1) {
    throw Object({ error: 'expose error', reason: 'end tag was not found' })
  }

  return packet.substring(beginIndex + beginTag.length, endIndex)
}

/*
   Removes first occurrence of DWP packet
*/
module.exports.remove = function (packet) {
  var beginIndex = packet.search(beginTag)

  if (beginIndex === -1) {
    throw Object({ error: 'remove error', reason: 'begin tag was not found' })
  }

  var endIndex = packet.search(endTag, beginIndex)

  if (endIndex === -1) {
    throw Object({ error: 'remove error', reason: 'end tag was not found' })
  }

  return packet.replace(packet.substring(beginIndex, endIndex + endTag.length), '')
}
