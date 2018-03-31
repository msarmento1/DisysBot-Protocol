/// /////////////////////////////////////////////
//
// Copyright (c) 2017 Mikael Marques Mello
//
/// /////////////////////////////////////////////

const factory = require('../factory')
const extend = require('util')._extend

const validate = (data) => {
  if (data === undefined) {
    throw Object({ error: 'validation error', reason: 'no data was set' });
  }

  if (data.language === undefined) {
    throw Object({ error: 'validation error', reason: 'language field is undefined' });
  }

  if (data.language.name === undefined) {
    throw Object({ error: 'validation error', reason: 'language.name field is undefined' });
  }

  if (data.language.version === undefined) {
    throw Object({ error: 'validation error', reason: 'language.version field is undefined' });
  }

  if (data.language.allow === undefined) {
    throw Object({ error: 'validation error', reason: 'language.allow field is undefined' });
  }

  if (data.supports === undefined) {
    throw Object({ error: 'validation error', reason: 'supports field is undefined' });
  }
}

const format = (data) => {
  validate(data);

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data);
  }

  const packet = JSON.stringify(pdu);

  return factory.encapsulate(packet, factory.Id.TASK_RESULT);
}

module.exports = {
  validate: validate,
  format: format
}
