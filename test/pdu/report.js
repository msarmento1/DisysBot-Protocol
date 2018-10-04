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
      .with.property('reason', `flags field is not a number, but ${data.flags}`);
  });

  it('report is correctly validated and encapsulated', () => {
    let data = {
      flags: 1 | 2 | 4 | 8 | 16,
      resource: {
        cpu: 30,
        memory: 30,
      },
      state: common.SlaveState.EXECUTING,
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
      state: common.SlaveState.EXECUTING,
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
      .with.property('reason', 'resource field is undefined with RESOURCE flag set');
    data.resource = {};
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'resource.cpu field is undefined');
    data.resource.cpu = 30;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'resource.memory field is undefined');
    data.resource.memory = 30;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'state field is undefined with STATE flag set');
    data.state = 32132;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', `state field has an invalid ${data.state} value`);
    data.state = correctData.state;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'tasks field is undefined with TASKS flag set');
    data.tasks = correctData.tasks;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'languages field is undefined with SUPPORTED_LANGUAGES set');
    data.languages = correctData.languages;
    expect(() => formattedData(data)).to.not.throw();
  });
});
