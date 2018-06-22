const { expect } = require('chai');

const factory = require('../../dwp/factory');

const languageSupport = require('../../dwp/pdu/language_support');
const getLanguageSupport = require('../../dwp/pdu/get_language_support');

describe('languageSupport and getLanguageSupport', () => {
  it('getLanguageSupport is correctly validated and encapsulated', () => {
    const data = {
      name: 'Python',
      command: 'python --version'
    };
    const formattedData = JSON.parse(factory.expose(getLanguageSupport.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.GET_LANGUAGE_SUPPORT
    });
  });

  it('getLanguageSupport correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(getLanguageSupport.format(data)));
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'name field is undefined');
    data.name = 'Python';
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'command field is undefined');
  });

  it('languageSupport is correctly validated and encapsulated', () => {
    const data = {
      name: 'Python',
      allow: false
    };
    let formattedData = JSON.parse(factory.expose(languageSupport.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.LANGUAGE_SUPPORT
    });
    data.allow = true;
    data.version = 'Python 2.7.12';
    formattedData = JSON.parse(factory.expose(languageSupport.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.LANGUAGE_SUPPORT
    });
  });

  it('languageSupport correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(languageSupport.format(data)));
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'name field is undefined');
    data.name = 'Python';
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'allow field is undefined');
    data.allow = true;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'version field is undefined');
  });
});
