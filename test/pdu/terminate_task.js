const { expect } = require('chai');

const factory = require('../../dwp/factory');
const formattedData = require('./formattedData');

const terminateTask = require('../../dwp/pdu/terminate_task');
const terminateTaskResponse = require('../../dwp/pdu/terminate_task_response');

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
