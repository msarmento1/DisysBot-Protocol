const { expect } = require('chai');

const factory = require('../../dwp/factory');
const formattedData = require('./formattedData');

const performCommand = require('../../dwp/pdu/perform_command');

describe('performCommand', () => {
  it('performCommand is correctly validated and encapsulated', () => {
    const data = {
      command: performCommand.Command.RESUME
    };
    const fData = formattedData(performCommand, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.PERFORM_COMMAND
    });
  });

  it('performCommand correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(performCommand, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(performCommand, data)).to.throw()
      .with.property('reason', 'command field is undefined');
    data.command = 'abc';
    expect(() => formattedData(performCommand, data)).to.throw()
      .with.property('reason', 'command field has an invalid value');
    data.command = performCommand.Command.RESUME;
    expect(() => formattedData(performCommand, data)).to.not.throw();
  });
});
