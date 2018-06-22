const { expect } = require('chai');

const factory = require('../../dwp/factory');

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
    const formattedData = JSON.parse(factory.expose(performTask.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.PERFORM_TASK
    });
  });

  it('performTask correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(performTask.format(data)));
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'task field is undefined');
    data.task = {};
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'task.id field is undefined');
    data.task.id = 1;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'commandLine field is undefined');
    data.commandLine = 'ls';
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'files field is undefined');
  });

  it('performTaskResponse is correctly validated and encapsulated', () => {
    const data = {
      task: {
        id: 1,
      },
      code: 'ls',
    };
    const formattedData = JSON.parse(factory.expose(performTaskResponse.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.PERFORM_TASK_RESPONSE
    });
  });

  it('performTaskResponse correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(performTaskResponse.format(data)));
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'task field is undefined');
    data.task = {};
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'task.id field is undefined');
    data.task.id = 1;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'code field is undefined');
  });
});
