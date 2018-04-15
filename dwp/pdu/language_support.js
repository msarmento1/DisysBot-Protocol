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

  if (data.name === undefined) {
    throw Object({ error: 'validation error', reason: 'name field is undefined' });
  }

  if (data.allow === undefined) {
    throw Object({ error: 'validation error', reason: 'allow field is undefined' });
  }

  if (data.allow === true && data.version === undefined) {
    throw Object({ error: 'validation error', reason: 'version field is undefined' });
  }
}

const format = (data) => {
  validate(data);

  var pdu = {}

  if (data !== undefined) {
    pdu = extend(pdu, data);
  }

  const packet = JSON.stringify(pdu);

  return factory.encapsulate(packet, factory.Id.LANGUAGE_SUPPORT);
}

module.exports = {
  validate: validate,
  format: format
}
