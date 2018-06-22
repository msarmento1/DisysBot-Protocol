const { expect } = require('chai');

const factory = require('../../dwp/factory');
const formattedData = require('./formattedData');

const languageCommand = require('../../dwp/pdu/language_command');
const getLanguageCommand = require('../../dwp/pdu/get_language_command');

describe('languageCommand and getLanguageCommand', () => {
  it('getLanguageCommand is correctly validated and encapsulated', () => {
    const data = {
      names: ['Python', 'Java', 'C++'],
    };
    const fData = formattedData(getLanguageCommand, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.GET_LANGUAGE_COMMAND
    });
  });

  it('getLanguageCommand correctly throws with invalid objects', () => {
    const data = {};
    expect(() => formattedData(getLanguageCommand, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(getLanguageCommand, data)).to.throw()
      .with.property('reason', 'names field is undefined');
    data.names = 'Test';
    expect(() => formattedData(getLanguageCommand, data)).to.throw()
      .with.property('reason', 'names field is not an array');
  });

  it('languageCommand is correctly validated and encapsulated', () => {
    const data = {
      languages: [{ name: 'Python' }, { name: 'Java' }, { name: 'C++' }],
    };
    const fData = formattedData(languageCommand, data);
    expect(fData).to.deep.include(data);
    expect(fData.header).to.include({
      id: factory.Id.LANGUAGE_COMMAND
    });
  });

  it('languageCommand correctly throws with invalid objects', () => {
    const data = {
      languagexs: [{ test: 'Python' }, { name: 'Java' }, { name: 'C++' }],
    };
    expect(() => formattedData(languageCommand, undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(languageCommand, data)).to.throw()
      .with.property('reason', 'languages field is undefined');
    data.languages = 'Test';
    expect(() => formattedData(languageCommand, data)).to.throw()
      .with.property('reason', 'languages field is not an array');
    data.languages = data.languagexs;
    expect(() => formattedData(languageCommand, data)).to.throw()
      .with.property('reason', 'name field of a language is undefined');
  });
});
