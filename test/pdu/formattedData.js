const factory = require('../../dwp/factory');

module.exports = (protocol, data) => JSON.parse(factory.expose(protocol.format(data)));
