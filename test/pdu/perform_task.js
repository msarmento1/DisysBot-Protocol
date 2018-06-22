const { expect } = require('chai');

const factory = require('../../dwp/factory');
const formattedData = require('./formattedData');

const performTask = require('../../dwp/pdu/perform_task');
const performTaskResponse = require('../../dwp/pdu/perform_task_response');

describe('performTask and performTaskResponse', () => {
  it('performTask is correctly validated and encapsulated', () => {
    const data = {
      task: {
        id: 1,
      },
      commandLine: 'ls',
      files: ['ABC', 'DEF'],
    };
    const fData = formattedData(performTask, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.PERFORM_TASK
    });
  });

  it('performTask correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(performTask, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(performTask, data)).to.throw()
      .with.property('reason', 'task field is undefined');
    data.task = {};
    expect(() => formattedData(performTask, data)).to.throw()
      .with.property('reason', 'task.id field is undefined');
    data.task.id = 1;
    expect(() => formattedData(performTask, data)).to.throw()
      .with.property('reason', 'commandLine field is undefined');
    data.commandLine = 'ls';
    expect(() => formattedData(performTask, data)).to.throw()
      .with.property('reason', 'files field is undefined');
  });

  it('performTaskResponse is correctly validated and encapsulated', () => {
    const data = {
      task: {
        id: 1,
      },
      code: 'ls',
    };
    const fData = formattedData(performTaskResponse, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.PERFORM_TASK_RESPONSE
    });
  });

  it('performTaskResponse correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(performTaskResponse, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(performTaskResponse, data)).to.throw()
      .with.property('reason', 'task field is undefined');
    data.task = {};
    expect(() => formattedData(performTaskResponse, data)).to.throw()
      .with.property('reason', 'task.id field is undefined');
    data.task.id = 1;
    expect(() => formattedData(performTaskResponse, data)).to.throw()
      .with.property('reason', 'code field is undefined');
  });
});
