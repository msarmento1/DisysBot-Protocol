const { expect } = require('chai');

const factory = require('../../dwp/factory');
const formattedData = require('./formattedData');

const languageSupport = require('../../dwp/pdu/language_support');
const getLanguageSupport = require('../../dwp/pdu/get_language_support');

describe('languageSupport and getLanguageSupport', () => {
  it('getLanguageSupport is correctly validated and encapsulated', () => {
    const data = {
      name: 'Python',
      command: 'python --version'
    };
    const fData = formattedData(getLanguageSupport, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.GET_LANGUAGE_SUPPORT
    });
  });

  it('getLanguageSupport correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(getLanguageSupport, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(getLanguageSupport, data)).to.throw()
      .with.property('reason', 'name field is undefined');
    data.name = 'Python';
    expect(() => formattedData(getLanguageSupport, data)).to.throw()
      .with.property('reason', 'command field is undefined');
  });

  it('languageSupport is correctly validated and encapsulated', () => {
    const data = {
      name: 'Python',
      allow: false
    };
    let fData = formattedData(languageSupport, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.LANGUAGE_SUPPORT
    });
    data.allow = true;
    data.version = 'Python 2.7.12';
    fData = formattedData(languageSupport, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.LANGUAGE_SUPPORT
    });
  });

  it('languageSupport correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(languageSupport, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(languageSupport, data)).to.throw()
      .with.property('reason', 'name field is undefined');
    data.name = 'Python';
    expect(() => formattedData(languageSupport, data)).to.throw()
      .with.property('reason', 'allow field is undefined');
    data.allow = true;
    expect(() => formattedData(languageSupport, data)).to.throw()
      .with.property('reason', 'version field is undefined');
  });
});
