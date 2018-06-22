const { expect } = require('chai');

const factory = require('../../dwp/factory');
const common = require('../../dwp/common');

const getReport = require('../../dwp/pdu/get_report');
const report = require('../../dwp/pdu/report');


describe('report and getReport', () => {
  it('getReport is correctly validated and encapsulated', () => {
    const data = {
      flags: 1 | 2 | 8 | 16
    };
    const formattedData = JSON.parse(factory.expose(getReport.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.GET_REPORT
    });
  });

  it('getReport correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(getReport.format(data)));
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'flags field is undefined');
    data.flags = 'Test';
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'flags field is not a number');
  });

  it('report is correctly validated and encapsulated', () => {
    let data = {
      flags: 1 | 2 | 4 | 8 | 16,
      resource: {
        cpu: 30,
        memory: 30,
      },
      state: common.WorkerState.EXECUTING,
      tasks: [{}],
      languages: ['Python'],
    };
    let formattedData = JSON.parse(factory.expose(report.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.REPORT
    });
    data = {
      flags: 0
    };
    formattedData = JSON.parse(factory.expose(report.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.REPORT
    });
  });

  it('report correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(report.format(data)));
    };
    const correctData = {
      flags: 1 | 2 | 4 | 8 | 16,
      resource: {
        cpu: 30,
        memory: 30,
      },
      state: common.WorkerState.EXECUTING,
      tasks: [{}],
      languages: ['Python'],
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'flags field is undefined');
    data.flags = correctData.flags;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'resource is undefined');
    data.resource = {};
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'cpu field is undefined');
    data.resource.cpu = 30;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'memory field is undefined');
    data.resource.memory = 30;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'state is undefined');
    data.state = 32132;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'state is not valid');
    data.state = correctData.state;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'tasks is undefined');
    data.tasks = correctData.tasks;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'languages is undefined');
    data.languages = correctData.languages;
    expect(() => formattedData(data)).to.not.throw();
  });
});
