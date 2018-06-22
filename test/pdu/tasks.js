const { expect } = require('chai');

const factory = require('../../dwp/factory');
const formattedData = require('./formattedData');

const performTask = require('../../dwp/pdu/perform_task');
const performTaskResponse = require('../../dwp/pdu/perform_task_response');
const terminateTask = require('../../dwp/pdu/terminate_task');
const terminateTaskResponse = require('../../dwp/pdu/terminate_task_response');
const taskResult = require('../../dwp/pdu/task_result');

describe('performTask, performTaskResponse and taskResult', () => {
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
    data.files = ['ABC', 'DEF'];
    expect(() => formattedData(performTask, data)).to.not.throw();
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
    data.code = 'ls';
    expect(() => formattedData(performTaskResponse, data)).to.not.throw();
  });
});

describe('terminateTask and terminateTaskResponse', () => {
  it('terminateTask is correctly validated and encapsulated', () => {
    const data = {
      taskId: 1,
    };
    const fData = formattedData(terminateTask, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.TERMINATE_TASK
    });
  });

  it('terminateTask correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(terminateTask, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(terminateTask, data)).to.throw()
      .with.property('reason', 'taskId field is undefined');
    data.taskId = 1;
    expect(() => formattedData(terminateTask, data)).to.not.throw();
  });

  it('terminateTaskResponse is correctly validated and encapsulated', () => {
    const data = {
      taskId: 1,
      code: 'ls',
    };
    const fData = formattedData(terminateTaskResponse, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.TERMINATE_TASK_RESPONSE
    });
  });

  it('terminateTaskResponse correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(terminateTaskResponse, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(terminateTaskResponse, data)).to.throw()
      .with.property('reason', 'taskId field is undefined');
    data.taskId = 1;
    expect(() => formattedData(terminateTaskResponse, data)).to.throw()
      .with.property('reason', 'code field is undefined');
    data.code = 'ls';
    expect(() => formattedData(terminateTaskResponse, data)).to.not.throw();
  });
});

describe('taskResult', () => {
  it('taskResult is correctly validated and encapsulated', () => {
    const data = {
      task: {
        id: 1,
      },
      code: 'ls',
      output: 'Test'
    };
    const fData = formattedData(taskResult, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.TASK_RESULT
    });
  });

  it('taskResult correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(taskResult, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(taskResult, data)).to.throw()
      .with.property('reason', 'task field is undefined');
    data.task = {};
    expect(() => formattedData(taskResult, data)).to.throw()
      .with.property('reason', 'task.id field is undefined');
    data.task.id = 1;
    expect(() => formattedData(taskResult, data)).to.throw()
      .with.property('reason', 'code field is undefined');
    data.code = 'ls';
    expect(() => formattedData(taskResult, data)).to.throw()
      .with.property('reason', 'output field is undefined');
    data.output = 'ls';
    expect(() => formattedData(taskResult, data)).to.not.throw();
  });
});
